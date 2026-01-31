import { useNavigate } from "react-router-dom";
import filmsData from "../../data/filmsData"; // centralized films data

// Example genre thumbnails
import actionThumb from "../../assets/action.jpg";
import comedyThumb from "../../assets/comedy.jpg";
import dramaThumb from "../../assets/drama.jpg";
import romanceThumb from "../../assets/romance.jpg";
import documentaryThumb from "../../assets/documentary.jpg";
const genreThumbnails = {
  action: actionThumb,
  comedy: comedyThumb,
  documentary:documentaryThumb,
  romance:romanceThumb,
  drama: dramaThumb,
};

export default function Category() {
  const navigate = useNavigate();

  // Get unique genres from filmsData
  const genres = [
    ...new Set(filmsData.map((film) => film.category.toLowerCase())),
  ];

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 style={{ marginBottom: "30px" }}>🎬 Browse by Genre</h1>

      <div style={styles.genreGrid}>
        {genres.map((genre) => (
          <div
            key={genre}
            style={styles.genreCard}
            onClick={() => navigate(`/category/${genre}`)}
          >
            <img
              src={genreThumbnails[genre] || actionThumb} // fallback if no thumbnail
              alt={genre}
              style={styles.thumbnail}
            />
            <span style={styles.genreName}>{genre.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  backBtn: {
    padding: "6px 12px",
    marginBottom: "20px",
    background: "#46ddd6",
    border: "none",
    borderRadius: "6px",
    color: "black",
    cursor: "pointer",
    fontWeight: "bold",
  },
  genreGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },
  genreCard: {
    background: "#1e293b",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  thumbnail: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
  },
  genreName: {
    marginTop: "10px",
    padding: "8px 0",
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "center",
    width: "100%",
    background: "#111827",
  },
};
