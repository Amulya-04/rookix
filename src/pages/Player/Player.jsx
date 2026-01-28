import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Player() {
  const { id } = useParams(); // 🎯 film ID from URL
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);
  const [error, setError] = useState("");

  // 🎬 Fetch film by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/films/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Film not found");
        return res.json();
      })
      .then((data) => setFilm(data))
      .catch(() => setError("Video not available"));
  }, [id]);

  // ❌ Error state
  if (error) {
    return (
      <div style={styles.error}>
        <h2>{error}</h2>
        <button onClick={() => navigate("/dashboard")}>Back</button>
      </div>
    );
  }

  // ⏳ Loading state
  if (!film) {
    return <div style={styles.loading}>Loading…</div>;
  }

  return (
    <div style={styles.page}>
      {/* 🔙 Back */}
      <button
        style={styles.backBtn}
        onClick={() => navigate(`/film-details/${film.id}`)}
      >
        ← Back
      </button>

      {/* 🎬 Film Info */}
      <div style={styles.info}>
        <h1>{film.title}</h1>
        <p>
          <b>Category:</b> {film.category}
        </p>
        <p style={styles.desc}>
          {film.description || "No description available."}
        </p>
      </div>

      {/* ▶ Video Player */}
      <div style={styles.playerWrapper}>
        <video controls style={styles.video}>
          {/* ✅ MOST IMPORTANT LINE */}
          <source src={film.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

// ================== STYLES ==================
const styles = {
  page: {
    background: "#0b0f19",
    minHeight: "100vh",
    padding: "30px",
    color: "white",
  },
  backBtn: {
    background: "#ff0000",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
  },
  info: {
    maxWidth: "1000px",
    marginBottom: "20px",
  },
  desc: {
    opacity: 0.85,
    lineHeight: "1.6",
  },
  playerWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    maxWidth: "1100px",
    borderRadius: "12px",
    background: "black",
  },
  loading: {
    padding: "40px",
    color: "white",
  },
  error: {
    padding: "40px",
    color: "white",
  },
};
