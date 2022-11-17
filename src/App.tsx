import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
