import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CategoryRow from "../../components/CategoryRow/CategoryRow";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // 🟢 STEP 4: SAFE READING (NEVER UNDEFINED)
  const userName = localStorage.getItem("name") || "Student";

  const isAdmin = role === "admin";

  const [search, setSearch] = useState("");
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Drama", "College", "Documentary"];

  // ⭐ Recommended films
  const recommendedFilms = [...films].slice(0, 3);

  // 🎬 Fetch films
  useEffect(() => {
    fetch("http://localhost:5000/api/films")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar categories={categories} isAdmin={isAdmin} />

      {/* MAIN AREA */}
      <div
        style={{
          marginLeft: "240px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🟢 STEP 3: SINGLE SOURCE OF TRUTH */}
        <Navbar
          isAdmin={isAdmin}
          search={search}
          setSearch={setSearch}
          userName={userName}
        />

        {/* CONTENT */}
        <main
          style={{
            paddingTop: "100px",
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingBottom: "40px",
            maxWidth: "1400px",
            flex: 1,
          }}
        >
          {/* 🟢 STEP 5: CLEAN WELCOME TEXT */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <div>
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "700" }}>
                Welcome, {userName} 👋
              </h1>
              <p
                style={{
                  marginTop: "8px",
                  color: "#94a3b8",
                  fontSize: "15px",
                  maxWidth: "520px",
                }}
              >
                Discover, watch, and explore student short films from creators
                across the platform.
              </p>
            </div>

            <button
              onClick={() => navigate("/upload-film")}
              style={{
                background: "linear-gradient(135deg, #ff0000, #e50914)",
                border: "none",
                borderRadius: "12px",
                padding: "14px 26px",
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(229,9,20,0.45)",
              }}
            >
              ➕ Upload Film
            </button>
          </div>

          {/* FILMS */}
          {loading ? (
            <p style={{ color: "#94a3b8" }}>Loading films...</p>
          ) : (
            <>
              <CategoryRow
                title="⭐ Recommended for You"
                films={recommendedFilms}
                setFilms={setFilms}
              />

              <div style={{ marginTop: "40px" }}>
                <CategoryRow
                  title="🎬 All Films"
                  films={films}
                  setFilms={setFilms}
                />
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
