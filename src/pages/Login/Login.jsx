import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../../assets/login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("name", "Admin");
      navigate("/dashboard");
    } else if (username === "student" && password === "user123") {
      localStorage.setItem("role", "user");
      localStorage.setItem("name", "Student");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
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
        .login-box {
          width: 340px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: fadeIn 0.9s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-box h2 {
          text-align: center;
          margin-bottom: 25px;
          color: white;
        }

        .input-group {
          position: relative;
          margin-bottom: 25px;
        }

        .input-group input {
          width: 100%;
          padding: 12px;
          background: transparent;
          color: #fff;
          font-size: 16px;
          border: none;
          border-bottom: 2px solid #fff;
          outline: none;
        }

        .input-group label {
          position: absolute;
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
          color: #eee;
          pointer-events: none;
          transition: 0.3s ease;
        }

        .input-group input:focus ~ label,
        .input-group input:valid ~ label {
          top: -6px;
          font-size: 12px;
          color: yellow;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 30px;
          background: white;
          color: #333;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s ease;
          margin-top: 8px;
        }

        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0px 6px 15px rgba(255,255,255,0.4);
        }

        .bottom-links {
          text-align: center;
          margin-top: 20px;
          color: white;
        }

        .bottom-links a {
          color: #ffeaa7;
          text-decoration: none;
          margin-left: 5px;
        }
      `}</style>

      <div className="login-box">
        <h2>Login</h2>

        <div className="input-group">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button className="btn" onClick={handleLogin}>
          Login
        </button>

        <div className="bottom-links">
          New user?
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}
