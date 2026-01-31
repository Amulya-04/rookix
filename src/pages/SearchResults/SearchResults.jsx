import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import filmsData from "../../data/filmsData";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Read query from URL
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Update URL whenever searchQuery changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    }
    navigate(`/search-results?${params.toString()}`, { replace: true });
  }, [searchQuery, navigate]);

  // Filter films based on query
  const filteredFilms = filmsData.filter(
    (film) =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update document title
  useEffect(() => {
    document.title = searchQuery
      ? `${searchQuery} - Search Results`
      : "Search Results";
  }, [searchQuery]);

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 style={styles.title}>Search Results</h2>

      {/* Search Input */}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search films..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* No Results */}
      {filteredFilms.length === 0 ? (
        <p style={styles.noResult}>No films found</p>
      ) : (
        <div style={styles.grid}>
          {filteredFilms.map((film) => (
            <div
              key={film.id}
              style={styles.card}
              onClick={() => navigate("/film-details", { state: film })}
            >
              <div
                style={{
                  height: "120px",
                  background: "#1e293b",
                  borderRadius: "6px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Thumbnail
              </div>
              <h3>{film.title}</h3>
              <p style={styles.genre}>{film.category}</p>
              <span>👁 {film.views}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    padding: "30px",
  },
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
  title: { marginBottom: "20px" },
  searchWrapper: { marginBottom: "20px" },
  searchInput: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#111",
    color: "white",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#111",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  genre: { color: "gray" },
  noResult: { marginTop: "50px", fontSize: "18px" },
};
