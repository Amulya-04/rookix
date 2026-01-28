import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import SearchResults from "./pages/SearchResults/SearchResults";
import Category from "./pages/Category/Category";
import FilmDetails from "./pages/FilmDetails/FilmDetails";
import UploadFilm from "./pages/UploadFilm/UploadFilm";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Player from "./pages/Player/Player";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/category/:name" element={<Category />} />

        {/* ✅ CRITICAL FIX: ID-BASED ROUTES */}
        <Route path="/film-details/:id" element={<FilmDetails />} />
        <Route path="/player/:id" element={<Player />} />

        {/* Admin Pages */}
        <Route path="/upload-film" element={<UploadFilm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
