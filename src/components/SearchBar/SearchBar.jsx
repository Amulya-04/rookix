import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState(""); // local state
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <form onSubmit={submitHandler} style={styles.form}>
      <input
        type="text"
        placeholder="Search films..."
        value={query} // bind to local state
        onChange={(e) => setQuery(e.target.value)} // correct setter
        style={styles.input}
      />
    </form>
  );
}

const styles = {
  form: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  input: {
    width: "100%",
    maxWidth: "500px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#111",
    color: "white",
    fontSize: "16px",
  },
};
