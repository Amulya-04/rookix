import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "user",
    uploadedFilms: [
      { id: 1, title: "My Short Film" },
      { id: 2, title: "Campus Life Documentary" },
    ],
  });

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    const savedRole = localStorage.getItem("role");

    if (savedName && savedEmail && savedRole) {
      setUser({
        ...user,
        name: savedName,
        email: savedEmail,
        role: savedRole,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/home");
  };

  const handlePasswordChange = () => {
    navigate("/change-password"); // redirect to change password page
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>Profile</h1>

      {/* User Info */}
      <div style={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button style={styles.actionBtn} onClick={handlePasswordChange}>
          Update Password
        </button>

        {user.uploadedFilms.length > 0 && (
          <button
            style={styles.actionBtn}
            onClick={() => navigate("/my-uploads")}
          >
            My Uploads ({user.uploadedFilms.length})
          </button>
        )}

        <button style={styles.actionBtn} onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      {/* My Uploads Section (for admin only) */}
      {user.role === "admin" && (
        <div style={styles.adminSection}>
          <h2>Uploaded Films</h2>
          {user.uploadedFilms.length === 0 ? (
            <p>No films uploaded yet.</p>
          ) : (
            <ul>
              {user.uploadedFilms.map((film) => (
                <li key={film.id}>{film.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
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
  card: {
    background: "#020617",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  actions: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
  },
  actionBtn: {
    padding: "10px 16px",
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  adminSection: {
    background: "#020617",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
};
