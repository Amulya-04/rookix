import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      style={{
        display: "flex",
        background: "#0f172a", // fixed dark background
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <main
        style={{
          marginLeft: "240px",
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          overflowX: "hidden",
          padding: "20px",
          background: "#0f172a",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
