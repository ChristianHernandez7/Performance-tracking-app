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
