import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import SearchResults from "./pages/SearchResults/SearchResults";
import Category from "./pages/Category/Category";
import FilmDetails from "./pages/FilmDetails/FilmDetails";
import UploadFilm from "./pages/UploadFilm/UploadFilm";
import Player from "./pages/Player/Player";
import Layout from "./Layout";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Public Pages (NO sidebar) */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Pages WITH sidebar */}

          <Route element={<Layout />}>
            {/* User Pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/film-details" element={<FilmDetails />} />
            <Route path="/player/:id" element={<Player />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin Pages */}
            <Route path="/upload-film" element={<UploadFilm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
