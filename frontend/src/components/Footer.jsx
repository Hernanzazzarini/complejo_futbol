import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import canchaImg from "../assets/pasto_cancha.jpg"; // tu imagen de pasto

const Footer = () => {
  const phoneNumber = "+54 9 11 1234-5678";
  const whatsappLink = `https://wa.me/5491112345678`;
  const instagramLink = "https://www.instagram.com/tu_usuario";
  const facebookLink = "https://www.facebook.com/tu_usuario";

  return (
    <footer
      className="footer"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${canchaImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        padding: "80px 20px 40px 20px",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", zIndex: 2 }}>
        <h2 style={{ fontWeight: "700", fontSize: "2rem", marginBottom: "10px" }}>
          Complejo de Futbol 5
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "15px" }}>
          📞 Teléfono:{" "}
          <a href={`tel:${phoneNumber}`} className="text-white fw-bold">
            {phoneNumber}
          </a>
        </p>

        <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
          >
            <FaWhatsapp />
          </a>
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FaInstagram />
          </a>
          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon facebook"
          >
            <FaFacebook />
          </a>
        </div>

        <p className="mt-5 mb-1" style={{ fontSize: "0.9rem", letterSpacing: "0.5px" }}>
          &copy; 2026 Complejo de Futbol 5. Todos los derechos reservados.
        </p>

        {/* Contacto del desarrollador */}
        <p style={{ fontSize: "0.8rem", marginTop: "5px", color: "#cccccc" }}>
          Desarrollador: ZazzariniH – Villa Reducción (Cba)
        </p>
      </div>

      <style jsx>{`
        .social-icon {
          color: white;
          font-size: 2rem;
          transition: transform 0.3s, color 0.3s, text-shadow 0.3s;
        }
        .social-icon:hover {
          transform: translateY(-5px) scale(1.2);
          text-shadow: 0 0 10px white;
        }
        .whatsapp:hover {
          color: #25d366;
          text-shadow: 0 0 15px #25d366;
        }
        .instagram:hover {
          color: #e4405f;
          text-shadow: 0 0 15px #e4405f;
        }
        .facebook:hover {
          color: #3b5998;
          text-shadow: 0 0 15px #3b5998;
        }

        @media (max-width: 576px) {
          .d-flex {
            flex-direction: column;
            gap: 1rem !important;
          }
          h2 {
            font-size: 1.6rem !important;
          }
          .social-icon {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
