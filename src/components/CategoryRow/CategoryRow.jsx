import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryRow({ title, films, titleColor }) {
  const navigate = useNavigate();

  return (
    <section
      style={{
        marginBottom: "40px",
        backgroundColor: "#000", // set page background to black
        padding: "20px",
        minHeight: "100vh", // optional: make it cover full page height
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
          color: titleColor || "white", // ensure title is visible on black
        }}
      >
        {title}
      </h2>

      <div style={styles.grid}>
        {films.map((film) => (
          <div
            key={film.id}
            style={{
              ...styles.card,
              background: "#111", // dark card background for contrast
              color: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <div style={styles.thumbnail}>Thumbnail</div>

            <h3 style={{ margin: "8px 0" }}>{film.title}</h3>
            <p style={{ fontSize: "14px", opacity: 0.7 }}>{film.category}</p>
            <span style={{ fontSize: "12px", opacity: 0.7 }}>👁 {film.views}</span>

            <button
              style={{
                ...styles.button,
                background: "#4fd1c5",
                color: "#020617",
              }}
              onClick={() => navigate("/film-details", { state: film })}
            >
              Watch
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gap: "20px",
  },
  card: {
    padding: "15px",
    borderRadius: "12px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  thumbnail: {
    height: "140px",
    borderRadius: "8px",
    marginBottom: "10px",
    background: "#1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s ease",
  },
};
