import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FilmDetails() {
  const { id } = useParams();               // ✅ ID from URL
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);
  const [error, setError] = useState("");

  // ✅ FETCH FILM SAFELY
  useEffect(() => {
    fetch(`http://localhost:5000/api/films/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Film not found");
        return res.json();
      })
      .then((data) => setFilm(data))
      .catch(() => setError("Failed to load film"));
  }, [id]);

  // ❌ ERROR STATE (NO CRASH)
  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          padding: "40px",
        }}
      >
        <p>{error}</p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "20px",
            padding: "10px 16px",
            background: "#ef4444",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  // ⏳ LOADING STATE
  if (!film) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          padding: "40px",
        }}
      >
        Loading film…
      </div>
    );
  }

  // ✅ SUCCESS STATE
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px 40px",
      }}
    >
      {/* 🔙 BACK */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          background: "#ef4444",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* 🎬 THUMBNAIL */}
        <img
          src={film.thumbnail_url}
          alt={film.title}
          style={{
            width: "320px",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        {/* 📄 INFO */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1>{film.title}</h1>
          <p>
            <strong>Category:</strong> {film.category}
          </p>

          <button
            onClick={() => navigate(`/player/${film.id}`)}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "red",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ▶ Watch Film
          </button>
        </div>
      </div>
    </div>
  );
}
