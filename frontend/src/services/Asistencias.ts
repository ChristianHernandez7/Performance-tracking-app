import { TasaAsistencia } from '../types/TasaAsistencias';

export const obtenerEstudiantesEnRiesgo = async (
  mes: number
): Promise<TasaAsistencia[]> => {
  const url = `https://syncademic-0-1.onrender.com/syncademic/asistencia/estudiantes-en-riesgo/${mes}/`;
  
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Aquí extraemos el arreglo de estudiantes
      return data.estudiantes.map((estudiante: any) => ({
        nombre_estudiante: estudiante.nombre,
        porcentaje_tasa_asistencia: estudiante.tasa_asistencia
      }));
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};
