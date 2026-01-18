import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ReservasAdmin from "./pages/ReservasAdmin.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservas-admin" element={<ReservasAdmin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

