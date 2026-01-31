import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../../assets/login.jpg";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("role", "user");
    localStorage.setItem("name", username);

    alert(`New profile created with username: ${username}`);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>{`
        .box {
          width: 340px;
          padding: 40px;
          background: rgba(255,255,255,0.15);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: fadeIn 1s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h2 {
          text-align: center;
          color: white;
          margin-bottom: 25px;
        }

        .group {
          position: relative;
          margin-bottom: 25px;
        }

        .group input {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: none;
          border-bottom: 2px solid white;
          color: white;
          font-size: 16px;
          outline: none;
        }

        .group label {
          position: absolute;
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
          color: #eee;
          pointer-events: none;
          transition: 0.3s ease;
        }

        .group input:focus ~ label,
        .group input:valid ~ label {
          top: -6px;
          font-size: 12px;
          color: yellow;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 30px;
          margin-top: 10px;
          background: white;
          color: #333;
          cursor: pointer;
          transition: 0.3s;
          font-size: 16px;
          font-weight: bold;
        }

        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(255,255,255,0.4);
        }

        .link {
          text-align: center;
          margin-top: 15px;
          color: white;
        }

        .link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="box">
        <h2>Create Account</h2>

        <div className="group">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Name</label>
        </div>

        <div className="group">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <div className="group">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button className="btn" onClick={handleSignup}>
          Signup
        </button>

        <p className="link">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ffeaa7", textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
