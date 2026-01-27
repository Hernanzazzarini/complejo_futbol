import React, { useEffect, useState } from "react";
import { getAdminUser, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { listarReservas } from "../services/api";

const ReservasAdmin = () => {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  const admin = getAdminUser(); // usuario logueado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listarReservas();
        setReservas(data);
      } catch (error) {
        // Si el token venció o es inválido → volver al login
        logout();
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container my-4">

      {/* HEADER ADMIN */}
      <div className="d-flex justify-content-between align-items-center mb-3">
  <h3>Panel de Administración</h3>

  <div>
    <span className="me-3">
      👤 Admin: <strong>{admin?.username}</strong>
    </span>

    {/* Botón Crear admin */}
    <button
      className="btn btn-primary btn-sm me-2"
      onClick={() => navigate("/crear-admin")}
    >
      Crear admin
    </button>

    {/* Botón Cerrar sesión */}
    <button className="btn btn-danger btn-sm" onClick={handleLogout}>
      Cerrar sesión
    </button>
  </div>
</div>


      <h1>Reservas del Complejo</h1>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Comentario</th>
            <th>Estado</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id}>
              <td>{r.nombre}</td>
              <td>{r.telefono}</td>
              <td>{r.email}</td>
              <td>{r.fecha}</td>
              <td>{r.hora_inicio}</td>
              <td>{r.hora_fin}</td>
              <td>{r.comentario}</td>
              <td>{r.estado}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasAdmin;



