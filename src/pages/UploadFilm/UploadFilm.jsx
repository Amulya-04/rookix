import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function UploadFilm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  // ✅ STEP 3: uploading state
  const [uploading, setUploading] = useState(false);

  // ✅ STEP 4: REPLACED handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) return; // prevent double click

    if (!thumbnail || !video) {
      alert("Please select both thumbnail and video files");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", genre);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);

    try {
      const res = await fetch("http://localhost:5000/api/films/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Upload failed");
      } else {
        alert("🎉 Film uploaded successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const categories = ["Drama", "College", "Documentary"];
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  return (
    <div style={{ display: "flex", background: "#0f172a", color: "white" }}>
      {/* Sidebar */}
      <Sidebar categories={categories} isAdmin={isAdmin} />

      {/* Main Content */}
      <div style={{ marginLeft: "240px", width: "100%" }}>
        <Navbar isAdmin={isAdmin} />

        <div style={styles.container}>
          <h1 style={styles.title}>Upload New Film</h1>

          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Film Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
              disabled={uploading}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              required
              disabled={uploading}
            />

            <input
              type="text"
              placeholder="Genre (Drama, College, Documentary)"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={styles.input}
              required
              disabled={uploading}
            />

            <label style={styles.label}>Upload Thumbnail Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              style={styles.file}
              required
              disabled={uploading}
            />

            <label style={styles.label}>Upload Video File:</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              style={styles.file}
              required
              disabled={uploading}
            />

            {/* ✅ STEP 5: REPLACED BUTTON */}
            <button
              type="submit"
              disabled={uploading}
              style={{
                background: uploading ? "#7f1d1d" : "#ff0000",
                opacity: uploading ? 0.7 : 1,
                cursor: uploading ? "not-allowed" : "pointer",
                padding: "14px",
                borderRadius: "8px",
                fontWeight: "bold",
                color: "white",
                border: "none",
                width: "100%",
              }}
            >
              {uploading ? "Uploading…" : "Upload Film"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ================== STYLES ==================
const styles = {
  container: {
    background: "black",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
  },
  title: {
    marginBottom: "25px",
    textAlign: "center",
  },
  form: {
    width: "400px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "white",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "white",
    minHeight: "100px",
  },
  label: {
    marginTop: "10px",
  },
  file: {
    padding: "10px",
    background: "#111",
    borderRadius: "8px",
    border: "1px solid #333",
    color: "white",
  },
};
