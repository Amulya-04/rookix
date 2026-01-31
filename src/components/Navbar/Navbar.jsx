import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../../assets/profile.png";        // profile icon
import notificationIcon from "../../assets/notification.png"; // notification icon

export default function Navbar({ search, setSearch }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // "user" or "admin"
  const userName = localStorage.getItem("name") || "User"; // fallback
  const isLoggedIn = !!role;

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
      <div style={styles.logo}></div>

      {/* Right side items */}
      <div style={styles.right}>
        {/* Search bar */}
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search films..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </form>

        

        {/* Notification and Profile icons */}
        {isLoggedIn && (
          <>
            <div
              style={styles.iconWrapper}
              onClick={() => alert("Notifications clicked!")}
            >
              <img src={notificationIcon} alt="Notifications" style={styles.icon} />
            </div>

            <div
              style={styles.iconWrapper}
              onClick={() => navigate("/profile")}
            >
              <img src={profileIcon} alt="Profile" style={styles.icon} />
            </div>
          </>
        )}

        {/* Login / Logout buttons */}
        {isLoggedIn ? (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

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
    marginLeft: "auto", // shifts everything to the right
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
  
  iconWrapper: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    width: "20px",
    height: "20px",
  },
  loginBtn: {
    background: "#46ddd6",
    color: "black",
    padding: "8px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "#46ddd6",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
