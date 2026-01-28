import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ REAL BACKEND LOGIN (STORES ONLY WHAT BACKEND SENDS)
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      // ✅ STEP 2: FIX FRONTEND LOGIN STORAGE
      if (data.message) {
        // store ONLY backend values
        localStorage.setItem("name", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);

        navigate("/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("Backend not running");
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(-45deg, #ff6b6b, #5f27cd, #1dd1a1, #54a0ff);
          background-size: 400% 400%;
          animation: bgAnimation 10s ease infinite;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes bgAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

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
          <br />
          Admin?
          <Link to="/admin">Admin Login</Link>
        </div>
      </div>
    </>
  );
}
