import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/home.jpg";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* BLUR OVERLAY */}
      <div style={styles.blurOverlay}></div>

      {/* HEADER BUTTONS */}
      <div style={styles.header}>
        <button style={styles.loginBtn} onClick={() => navigate("/login")}>
          Login
        </button>
        <button style={styles.signupBtn} onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div style={styles.rightContent}>
        <h1 style={styles.title}>Rookix</h1>
        <p style={styles.subtitle}>
          A simple streaming where students can upload short films, showcase creativity.
        </p>
        <button style={styles.exploreBtn} onClick={() => navigate("/login")}>
          Explore Now
        </button>
      </div>
    </div>
    
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 80px",
    color: "white",
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },

  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // Gradually increase blur from left to right
    background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 100%)",
    backdropFilter: "blur(10px)",
    pointerEvents: "none",
    zIndex: 0,
    animation: "blurMove 2s forwards",
  },

  header: {
    position: "absolute",
    top: "20px",
    right: "80px",
    display: "flex",
    gap: "15px",
    zIndex: 1,
  },

  loginBtn: {
    padding: "10px 22px",
    background: "transparent",
    color: "black",
    border: "2px solid white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  signupBtn: {
    padding: "10px 22px",
    background: "#46ddd6",
    color: "black",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  rightContent: {
    maxWidth: "45%",
    textAlign: "right",
    zIndex: 1,
    animation: "slideRight 1.3s ease-out",
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "20px",
    color:"black",
  },

  subtitle: {
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "35px",
    opacity: 0.85,
    color:"black",
  },

  exploreBtn: {
    padding: "12px 30px",
    background: "#46ddd6",
    color: "black",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "17px",
    transition: "0.3s",
    animation: "fadeUp 1.6s ease",
  },
};

/* KEYFRAMES */
const sheet = document.styleSheets[0];

sheet.insertRule(`
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
  }
`);

sheet.insertRule(`
  @keyframes fadeUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`);

// Optional: animate blur overlay if you want it to gradually appear
sheet.insertRule(`
  @keyframes blurMove {
    from { backdrop-filter: blur(0px); }
    to { backdrop-filter: blur(10px); }
  }
`);
