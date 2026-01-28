import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ search, setSearch, userName, isAdmin }) {
  const navigate = useNavigate();

  // ✅ Logged-in state comes from prop presence
  const isLoggedIn = !!userName;

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/home");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(search)}`);
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logo}>🎬 StudentFlix</div>

      {/* Right side */}
      <div style={styles.right}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search films..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </form>

        {isAdmin && <span style={styles.admin}>ADMIN</span>}

        {isLoggedIn ? (
          <>
            {/* ✅ STEP 4: USE PROP, NOT localStorage */}
            <span style={{ color: "white", marginRight: "10px" }}>
              {userName}
            </span>

            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

// ================== STYLES ==================
const styles = {
  nav: {
    width: "92%",
    padding: "15px 40px",
    display: "flex",
    alignItems: "center",
    background: "#020617",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: "red",
    fontSize: "24px",
    fontWeight: "bold",
  },
  right: {
    marginLeft: "auto",
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  search: {
    width: "400px",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },
  admin: {
    background: "red",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "white",
  },
  loginBtn: {
    background: "red",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
