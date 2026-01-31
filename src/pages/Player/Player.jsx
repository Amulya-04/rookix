import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Player() {
  const { id } = useParams(); // film id from URL
  const navigate = useNavigate();
  const location = useLocation();

  // Film data passed from FilmDetails
  const film = location.state;

  if (!film) {
    return (
      <div style={styles.container}>
        <h2>Video not available</h2>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2 style={styles.title}>{film.title}</h2>
      </div>

      {/* VIDEO PLAYER */}
      <div style={styles.playerWrapper}>
        <video
          src={film.videoUrl}
          controls
          autoPlay
          style={styles.video}
        />
      </div>

      {/* DETAILS */}
      <div style={styles.details}>
        <h3>Description</h3>
        <p>{film.description || "No description available."}</p>
        <p style={styles.meta}>Category: {film.category}</p>
        <p style={styles.meta}>Views: {film.views}</p>
        <p style={styles.idText}>Film ID: {id}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  backBtn: {
    background: "#46ddd6",
    border: "none",
    color: "black",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  title: {
    fontSize: "22px",
  },
  playerWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  video: {
    width: "100%",
    maxWidth: "900px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  details: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#020617",
    padding: "16px",
    borderRadius: "10px",
  },
  meta: {
    opacity: 0.8,
    marginTop: "6px",
  },
  idText: {
    marginTop: "10px",
    fontSize: "12px",
    opacity: 0.6,
  },
};