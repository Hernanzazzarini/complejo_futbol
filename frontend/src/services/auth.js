// src/services/auth.js

const API_URL = "http://127.0.0.1:8000/api";

// -------------------- LOGIN --------------------
export async function login(username, password) {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const data = await res.json();

  // Guardar tokens
  sessionStorage.setItem("accessToken", data.access);
  sessionStorage.setItem("refreshToken", data.refresh);

  // Guardar nombre del admin desde el token JWT
  const payload = JSON.parse(atob(data.access.split(".")[1]));
  sessionStorage.setItem("adminUser", payload.username);

  return data;
}

// -------------------- TOKEN --------------------
export function getToken() {
  return sessionStorage.getItem("accessToken");
}

// -------------------- NOMBRE ADMIN --------------------
export function getAdminUser() {
  return sessionStorage.getItem("adminUser");
}

// -------------------- LOGOUT --------------------
export function logout() {
  sessionStorage.clear();
}

// -------------------- ¿AUTENTICADO? --------------------
export function isAuthenticated() {
  return !!sessionStorage.getItem("accessToken");
}
// -------------------- CREAR ADMIN --------------------
export async function crearAdmin(username, password) {
    const token = getToken();
  
    const res = await fetch("http://127.0.0.1:8000/api/crear-admin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Error al crear usuario");
    }
  
    return await res.json();
  }
  