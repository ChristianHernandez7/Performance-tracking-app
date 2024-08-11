/* eslint-disable @typescript-eslint/no-unused-vars */
/**Feature1:Distinción de estudiantes propensos a abandonar la asignatura
 * Como docente
  Quiero identificar automáticamente aquellos estudiantes con posible tasa de abandono
  Para decidir si notificar a bienestar estudiantil sobre un posible abandono.
 * Integrantes:
  Anrrango Erika -> Desarrolladora FrontEnd
  Hernández Christian -> Desarrollador BackEnd
  Pillajo Edwin -> Documentación
 * https://www.figma.com/design/ihvX1EY7yVl6tCnNEyzsZQ/DCU?node-id=0-1&t=xo35RUXDQw3SNzwP-1
 * En el Wireframe
    Ver Asistencia
    Notificacion Propenso Abandono
 */

import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { TasaAsistencia } from "../types/TasaAsistencias";
import TasaAbandono from "../components/TasaAbandono";
import { obtenerEstudiantesEnRiesgo } from "../services/Asistencias"; // Asegúrate de tener esta ruta correcta
import "../styles/pages/Asistencia.css";

// Definición de las propiedades del componente
type AsistenciaProps = {
  id: string;
};

// Componente funcional Asistencia
const Asistencia: React.FC<AsistenciaProps> = ({ id }) => {
  const [mesSeleccionado, setMesSeleccionado] = useState<number | null>(null); // Estado para el mes seleccionado
  const [estudiantesAbandono, setEstudiantesAbandono] = useState<
    TasaAsistencia[]
  >([]); // Estado para los estudiantes en riesgo
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para mostrar el modal
  const [estudianteNotificar, setEstudianteNotificar] = useState<string | null>(
    null
  ); // Estado para el estudiante a notificar
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para el mensaje de notificación
  const [cargando, setCargando] = useState<boolean>(false); // Estado para indicar carga

  useEffect(() => {
    if (mesSeleccionado !== null) {
      setCargando(true);
      obtenerEstudiantesEnRiesgo(mesSeleccionado)
        .then((data) => {
          setEstudiantesAbandono(data); // Asegúrate de que data sea un array
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
          setEstudiantesAbandono([]);
        })
        .finally(() => {
          setCargando(false);
        });
    }
  }, [mesSeleccionado]);

  const handleNotificarClick = (nombre_estudiante: string) => {
    setEstudianteNotificar(nombre_estudiante);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleNotificarSi = () => {
    setMensaje(
      `Se envió la notificación a bienestar estudiantil.`
    );
    setShowModal(false);

    // Desaparece el mensaje después de 500ms
    setTimeout(() => {
      setMensaje("");
    }, 2000);
  };

  return (
    <div className="asistencia-principal-contenedor">
      <div className="registrar-asistencia-contenedor">
        <Button className="registrar-asistencia" variant="outline-primary">
          Registrar Asistencia
        </Button>
      </div>
      <div className="mensaje-contenedor">
      {mensaje && <Alert variant="success"className="mensaje-notificar">{mensaje}</Alert>}
      </div>
      <div className="abandono-contenedor">
        <div className="izquierdo-contenedor"></div>
        <TasaAbandono
          estudiantes_abandono={estudiantesAbandono}
          mesSeleccionado={mesSeleccionado}
          setMesSeleccionado={setMesSeleccionado}
          onNotificar={handleNotificarClick}
          cargando={cargando}
        />
        <div className="derecho-contenedor"></div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notificar a Bienestar Estudiantil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Desea notificar el posible abandono de
          asignatura del estudiante <strong>{estudianteNotificar}</strong>?
        </Modal.Body>
        <Modal.Footer className="decision-opciones" >
          <Button variant="secondary" onClick={handleCloseModal} id="no-opcion">
            No
          </Button>
          <Button variant="primary" onClick={handleNotificarSi} id="si-opcion">
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Asistencia;
