// ================== IMPORTS ==================
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// ================== INIT ==================
const app = express();

// ================== CLOUDINARY CONFIG ==================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================== SINGLE MULTER SETUP ==================
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith("video")) {
      return {
        folder: "stuflix/videos",
        resource_type: "video",
      };
    }
    return {
      folder: "stuflix/thumbnails",
      resource_type: "image",
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

// ================== MIDDLEWARE ==================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    name: "stuflix.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ================== DATABASE ==================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL Connected!");
});

// ================== AUTH ROUTES ==================

// 🔐 SIGNUP
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: "Username or email already exists" });
          }
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "User created successfully" });
      }
    );
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔐 LOGIN (FIXED RESPONSE)
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role || "user",
      };

      res.json({
        message: "Login successful",
        username: user.username,
        role: user.role || "user",
        userId: user.id,
      });
    }
  );
});

// 🔍 CHECK LOGIN
app.get("/api/auth/me", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// 🚪 LOGOUT
app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("stuflix.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// ================== UPLOAD FILM ==================
app.post(
  "/api/films/upload",
  (req, res, next) => {
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "video", maxCount: 1 },
    ])(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      }
      if (err) {
        return res.status(500).json({ error: "Upload failed" });
      }
      next();
    });
  },
  (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const { title, description, category } = req.body;

    db.query(
      `INSERT INTO films
       (title, description, category, video_url, thumbnail_url, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        category,
        req.files.video[0].path,
        req.files.thumbnail[0].path,
        req.session.user.id,
      ],
      (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Film uploaded successfully" });
      }
    );
  }
);

// ================== DELETE FILM ==================
app.delete("/api/films/:id", (req, res) => {
  const filmId = req.params.id;

  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  db.query("SELECT * FROM films WHERE id = ?", [filmId], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: "Film not found" });
    }

    const film = results[0];

    if (
      film.uploaded_by !== req.session.user.id &&
      req.session.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not authorized to delete" });
    }

    try {
      const getPublicId = (url) => {
        const parts = url.split("/");
        const uploadIndex = parts.indexOf("upload");
        return parts
          .slice(uploadIndex + 1)
          .join("/")
          .replace(/\.[^/.]+$/, "");
      };

      await cloudinary.uploader.destroy(getPublicId(film.video_url), {
        resource_type: "video",
      });
      await cloudinary.uploader.destroy(getPublicId(film.thumbnail_url));

      db.query("DELETE FROM films WHERE id = ?", [filmId], (err2) => {
        if (err2)
          return res.status(500).json({ error: "DB delete failed" });
        res.json({ message: "Film deleted successfully" });
      });
    } catch (error) {
      console.error("DELETE ERROR:", error);
      res.status(500).json({ error: "Delete failed internally" });
    }
  });
});

// ================== FETCH ALL FILMS ==================
app.get("/api/films", (req, res) => {
  db.query(
    `SELECT films.*, users.username
     FROM films
     JOIN users ON films.uploaded_by = users.id
     ORDER BY uploaded_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: "Fetch failed" });
      res.json(results);
    }
  );
});

// ================== 🟢 NEW: FETCH FILM BY ID ==================
app.get("/api/films/:id", (req, res) => {
  const filmId = req.params.id;

  const query = "SELECT * FROM films WHERE id = ?";
  db.query(query, [filmId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Film not found" });
    }

    res.json(results[0]);
  });
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
