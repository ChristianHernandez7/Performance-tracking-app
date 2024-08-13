/**
 * Feature1:Distinción de estudiantes propensos a abandonar la asignatura
     Como docente
     Quiero identificar automáticamente aquellos estudiantes con posible tasa de abandono
     Para decidir si notificar a bienestar estudiantil sobre un posible abandono.
 
  * Grupo 3:
     Anrrango Erika -> Desarrolladora FrontEnd
     Hernández Christian -> Desarrollador BackEnd
     Pillajo Edwin -> Documentación

  * Documentación asociada:
     Mapa navegacional y wireframe (pantalla Asistencia, Notificación): 
     https://www.figma.com/design/ihvX1EY7yVl6tCnNEyzsZQ/DCU?node-id=0-1
     Tokens de diseño: 
     https://www.figma.com/design/ihvX1EY7yVl6tCnNEyzsZQ/DCU?node-id=116-2

  * Entidades con las que se relaciona desde el backend
     Estudiante y Asitencia

  * Descripción corta:
     Visualizar a los estudiantes próximos a salir de la asignatura dada su tasa de asistencia mensual.
 */
import React from "react";
import { Button, Modal } from "react-bootstrap";

type NotificacionModalProps = {
  show: boolean;
  estudianteNotificar: string | null;
  onClose: () => void;
  onConfirm: () => void;
};

const NotificacionAbandono: React.FC<NotificacionModalProps> = ({
  show,
  estudianteNotificar,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Notificar a Bienestar Estudiantil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Desea notificar el posible abandono de
        asignatura del estudiante <strong>{estudianteNotificar}</strong>?
      </Modal.Body>
      <Modal.Footer className="decision-opciones">
        <Button variant="secondary" onClick={onClose} id="no-opcion">
          No
        </Button>
        <Button variant="primary" onClick={onConfirm} id="si-opcion">
          Sí
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificacionAbandono;
