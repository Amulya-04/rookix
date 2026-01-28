import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // ✅ State for inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ REAL BACKEND SIGNUP
  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.message) {
        alert(data.message);
        navigate("/"); // go to home/login after signup
      } else {
        alert(data.error || "Signup failed");
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
          animation: bgMove 10s ease infinite;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

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

        .link span {
          color: #ffeaa7;
          cursor: pointer;
          margin-left: 5px;
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
          <label>Username</label>
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

        {/* ✅ HOME NAVIGATION (PROFESSIONAL WAY) */}
        <p className="link">
          Already have an account?
          <span onClick={() => navigate("/")}> Login from home</span>
        </p>
      </div>
    </>
  );
}
