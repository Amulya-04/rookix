import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>

      <div style={styles.bottom}>
        <p>© {new Date().getFullYear()} Rookix. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#020617",
    color: "#fff",
    padding: "20px 40px",
    marginTop: "auto",
  },
  bottom: {
    textAlign: "center",
    fontSize: "14px",
    opacity: 0.7,
  },
};
