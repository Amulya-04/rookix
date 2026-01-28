import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryRow({ title, films, setFilms }) {
  const navigate = useNavigate();

  // 🗑 DELETE HANDLER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this film?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/films/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete film");
        return;
      }

      // ✅ Remove film from UI
      setFilms((prev) => prev.filter((film) => film.id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Something went wrong while deleting");
    }
  };

  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{ marginBottom: "15px" }}>{title}</h2>

      <div style={styles.row}>
        {films.map((film) => (
          <div key={film.id} style={styles.card}>
            {/* 🎬 Thumbnail */}
            <img
              src={film.thumbnail_url}
              alt={film.title}
              style={styles.thumbnail}
            />

            <h3 style={{ margin: "10px 0 4px" }}>{film.title}</h3>

            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
              {film.category}
            </p>

            {film.username && (
              <p style={{ fontSize: "12px", color: "#64748b" }}>
                By {film.username}
              </p>
            )}

            {/* ▶ WATCH — ✅ CORRECT NAVIGATION */}
            <button
              style={styles.watchButton}
              onClick={() => navigate(`/film-details/${film.id}`)}
            >
              ▶ Watch
            </button>

            {/* 🗑 DELETE */}
            <button
              onClick={() => handleDelete(film.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ================== STYLES ==================
const styles = {
  row: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    paddingBottom: "10px",
  },
  card: {
    minWidth: "220px",
    background: "#020617",
    padding: "15px",
    borderRadius: "12px",
  },
  thumbnail: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  watchButton: {
    width: "100%",
    marginTop: "12px",
    padding: "8px",
    background: "red",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
  deleteButton: {
    width: "100%",
    marginTop: "8px",
    padding: "6px",
    background: "#1f2937",
    color: "#f87171",
    border: "1px solid #f87171",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
