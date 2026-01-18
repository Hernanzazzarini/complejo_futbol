import React from "react";
import { Link } from "react-router-dom";
import { FaFutbol } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg, #2ecc71, #27ae60)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        padding: "10px 0",
      }}
    >
      <div className="container">
        {/* Logo + Nombre */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaFutbol style={{ marginRight: "8px", fontSize: "1.5rem" }} />
          Complejo de Futbol 5
        </Link>

        {/* Toggle mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{ position: "relative", transition: "0.3s" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn-reserva"
                to="/reservas-admin"
              >
                Reservas Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Estilos extra */}
      <style jsx>{`
        .nav-link {
          font-weight: 500;
          transition: all 0.3s;
        }
        .nav-link:hover {
          color: #f1c40f !important;
          transform: scale(1.1);
        }
        .btn-reserva {
          background-color: #f39c12;
          color: white !important;
          padding: 5px 15px;
          border-radius: 5px;
          margin-left: 10px;
          transition: all 0.3s;
        }
        .btn-reserva:hover {
          background-color: #e67e22;
          transform: scale(1.05);
          color: white !important;
        }
        @media (max-width: 576px) {
          .btn-reserva {
            margin-left: 0;
            margin-top: 5px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

