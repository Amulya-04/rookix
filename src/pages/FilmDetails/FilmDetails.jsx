import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import your downloaded icons
import likeIcon from "../../assets/like.png";
import dislikeIcon from "../../assets/dislike.png";
import watchlistIcon from "../../assets/watchlist.png";

export default function FilmDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const film = location.state;

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [watchlist, setWatchlist] = useState(false);

  // Check if this film is already in watchlist on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (stored.some((m) => m.id === film?.id)) {
      setWatchlist(true);
    }
  }, [film]);

  if (!film) {
    return (
      <div style={styles.container}>
        <h2>No film selected</h2>
        <button onClick={() => navigate("/dashboard")} style={styles.back}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleWatch = () => {
    navigate(`/player/${film.id || 1}`, {
      state: film,
    });
  };

  const toggleWatchlist = () => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    let updated = [];

    if (!watchlist) {
      // Add film to watchlist
      updated = [...stored, film];
      setWatchlist(true);
    } else {
      // Remove film from watchlist
      updated = stored.filter((m) => m.id !== film.id);
      setWatchlist(false);
    }

    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/dashboard")} style={styles.back}>
        ← Back to Dashboard
      </button>

      <div style={styles.details}>
        {/* THUMBNAIL */}
        <div style={styles.thumbnail}>
          <img
            src={film.thumbnail || "https://via.placeholder.com/800x450"}
            alt={film.title}
            style={styles.thumbnailImage}
          />
        </div>

        {/* INFO */}
        <div style={styles.info}>
          <h1 style={styles.title}>{film.title}</h1>
          <p><strong>Category:</strong> {film.category}</p>
          <p><strong>Views:</strong> {film.views}</p>

          {/* ACTION ICONS */}
          <div style={styles.actions}>
            <div
              style={{
                ...styles.iconWrapper,
                backgroundColor: liked ? "#46ddd6" : "white",
              }}
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
            >
              <img src={likeIcon} alt="Like" style={styles.icon} />
            </div>

            <div
              style={{
                ...styles.iconWrapper,
                backgroundColor: disliked ? "#f87171" : "white",
              }}
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
            >
              <img src={dislikeIcon} alt="Dislike" style={styles.icon} />
            </div>

            <div
              style={{
                ...styles.iconWrapper,
                backgroundColor: watchlist ? "#facc15" : "white",
              }}
              onClick={toggleWatchlist}
            >
              <img src={watchlistIcon} alt="Watchlist" style={styles.icon} />
            </div>
          </div>

          <button style={styles.watch} onClick={handleWatch}>
            ▶ Watch Film
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "30px 40px",
  },
  back: {
    marginBottom: "20px",
    padding: "8px 16px",
    background: "#46ddd6",
    border: "none",
    borderRadius: "6px",
    color: "black",
    cursor: "pointer",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    maxWidth: "800px",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#1e293b",
  },
  thumbnailImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  info: {
    width: "100%",
    maxWidth: "800px",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "15px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    marginTop: "15px",
  },
  iconWrapper: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  icon: {
    width: "24px",
    height: "24px",
  },
  watch: {
    marginTop: "20px",
    padding: "12px 24px",
    background: "#46ddd6",
    border: "none",
    borderRadius: "8px",
    color: "black",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
};
