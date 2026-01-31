import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import dashboardIcon from "../../assets/dashboard.png";
import searchIcon from "../../assets/search.png";
import categoryIcon from "../../assets/category.png";
import myspaceIcon from "../../assets/myspace.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistMovies(stored);
  }, [location]); // update if route changes

  const isActive = (path) => location.pathname.startsWith(path);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: dashboardIcon },
    { name: "Search", path: "/search-results", icon: searchIcon },
    { name: "Category", path: "/category/action", icon: categoryIcon },
    { name: "My Space", path: "/profile", icon: myspaceIcon },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Rookix</h2>

      {menuItems.map((item) => (
        <div
          key={item.path}
          style={{ ...styles.item, ...(isActive(item.path) && styles.active) }}
          onClick={() => navigate(item.path)}
        >
          <div style={styles.iconWrapper}>
            <img src={item.icon} alt={item.name} style={styles.icon} />
          </div>
          <span style={styles.itemText}>{item.name}</span>
        </div>
      ))}

      {/* Watchlist Section */}
      <h3 style={{ marginTop: "20px", color: "#46ddd6" }}>Watchlist</h3>
      {watchlistMovies.length === 0 ? (
        <p style={{ color: "#aaa", fontSize: "14px" }}>No movies yet</p>
      ) : (
        watchlistMovies.map((film) => (
          <div
            key={film.id}
            style={styles.watchlistItem}
            onClick={() => navigate("/film-details", { state: film })}
          >
            {film.title}
          </div>
        ))
      )}

      {/* + Upload Film Button */}
      <button style={styles.uploadButton} onClick={() => navigate("/upload-film")}>
        + Upload Film
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "#020617",
    color: "white",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    marginBottom: "30px",
    color: "#46ddd6",
  },
  item: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "8px",
    transition: "background 0.2s",
  },
  active: {
    backgroundColor: "#1e293b",
  },
  iconWrapper: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px",
  },
  icon: {
    width: "20px",
    height: "20px",
  },
  itemText: {
    fontSize: "16px",
  },
  uploadButton: {
    marginTop: "auto",
    padding: "10px",
    backgroundColor: "#46ddd6",
    color: "black",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  watchlistItem: {
    padding: "6px 8px",
    marginBottom: "5px",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#111",
    fontSize: "14px",
    transition: "background 0.2s",
  },
};
