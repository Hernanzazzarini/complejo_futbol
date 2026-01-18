const API_URL = "http://localhost:8000/api/reservas/";

export const listarReservas = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearReserva = async (reserva) => {
  try {
    const bodyData = {
      ...reserva,
      hora_inicio: reserva.hora_inicio + ":00",
      hora_fin: reserva.hora_fin + ":00",
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const cancelarReserva = async ({ codigo }) => {
  try {
    const res = await fetch(API_URL + "cancelar/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};
