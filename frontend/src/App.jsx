import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ReservasAdmin from "./pages/ReservasAdmin.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CrearAdmin from "./pages/CrearAdmin.jsx";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />

        {/* Login administrador */}
        <Route path="/login" element={<Login />} />

        {/* Admin protegido */}
        <Route
          path="/reservas-admin"
          element={
            <ProtectedRoute>
              <ReservasAdmin />
            </ProtectedRoute>
          }
         

        />
        <Route
           path="/crear-admin"
           element={
          <ProtectedRoute>
             <CrearAdmin />
          </ProtectedRoute>
         }
         />
      </Routes>


      <Footer />
    </Router>
  );
}

export default App;

