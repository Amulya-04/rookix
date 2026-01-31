import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function UploadFilm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      genre,
      director,
      cast,
      thumbnail,
      video,
    });
    alert("Film data collected! Backend connection coming next.");
  };

  const categories = ["Drama", "College", "Documentary"];
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  return (
    <div
      style={{
        display: "flex",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Sidebar categories={categories} isAdmin={isAdmin} />

      {/* Main Content */}
      <div style={{ marginLeft: "240px", width: "100%", padding: "40px" }}>
        {/* Back Button */}
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div style={styles.container}>
          <h1 style={styles.title}>Upload New Film</h1>

          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Film Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              required
            />

            <input
              type="text"
              placeholder="Genre (Drama, Sci-Fi, Comedy)"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="text"
              placeholder="Director Name"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="text"
              placeholder="Popular Cast (eg:cast1,cast2...)"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label}>Upload Thumbnail Image:</label>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              style={styles.file}
              accept="image/*"
              required
            />

            <label style={styles.label}>Upload Video File:</label>
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              style={styles.file}
              accept="video/*"
              required
            />

            <button type="submit" style={styles.btn}>
              Upload Film
            </button>
          </form>
        </div>
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
  container: {
    background: "#111",
    padding: "40px",
    borderRadius: "12px",
    color: "white",
    width: "400px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  title: {
    marginBottom: "25px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "white",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "white",
    minHeight: "100px",
  },
  label: {
    marginTop: "10px",
  },
  file: {
    padding: "10px",
    background: "#111",
    borderRadius: "8px",
    border: "1px solid #333",
    color: "white",
  },
  btn: {
    padding: "12px",
    background: "#46ddd6",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "black",
  },
};
