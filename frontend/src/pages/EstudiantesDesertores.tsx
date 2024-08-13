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

     import React, { useState, useEffect } from "react";
     import { Alert } from "react-bootstrap";
     import { TasaAsistencia } from "../types/TasaAsistencias";
     import TasaAbandono from "../components/TasaAbandono";
     import { obtenerEstudiantesEnRiesgo } from "../services/EstudiantesDesertores";
     
     import "../styles/pages/EstudiantesDesertores.css";
     import NotificacionAbandono from "../components/NotificacionAbandono";
     
     type EstudiantesDesertoresProps = {
       id: string;
       isSemesterClosed: boolean;
     };
     
     const EstudiantesDesertores: React.FC<EstudiantesDesertoresProps> = ({ id, isSemesterClosed}) => {
       // Variables de estado
       // Estado para el mes seleccionado
       const [mesSeleccionado, setMesSeleccionado] = useState<number | null>(null);
     
       // Estado para los estudiantes en riesgo de abandono
       const [estudiantesAbandono, setEstudiantesAbandono] = useState<
         TasaAsistencia[]
       >([]);
     
       // Estado para mostrar el modal o pop-up de la notificacion
       const [showModal, setShowModal] = useState<boolean>(false);
     
       // Estado para el estudiante a notificar
       const [estudianteNotificar, setEstudianteNotificar] = useState<string | null>(
         null
       );
     
       // Estado para el mensaje de notificación
       const [mensaje, setMensaje] = useState<string | null>(null);
     
       // Estado para indicar la cantidad de carga en el progress-bar
       const [cargando, setCargando] = useState<boolean>(false);
     
       // Obtener lista de estudiantes en riesgo de abandono del backend según el mes
       useEffect(() => {
         if (mesSeleccionado !== null) {
           setCargando(true);
           obtenerEstudiantesEnRiesgo(mesSeleccionado)
             .then((data) => {
               setEstudiantesAbandono(data);
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
     
       // Función que muestra los detalles de la notificación en un pop-up (Modal)
       const handleNotificarClick = (nombre_estudiante: string) => {
         setEstudianteNotificar(nombre_estudiante);
         setShowModal(true);
       };
     
       // Función que toma el no de la notificación y retorna a la página
       const handleCloseModal = () => setShowModal(false);
     
       // Función que toma el si de la notificación y envía la confirmación en mensaje
       // Tiempo de espera que tiene el mensaje
       const handleNotificarSi = () => {
         setMensaje(`Se envió la notificación a bienestar estudiantil.`);
         setShowModal(false);
     
         // Eliminar al estudiante de la lista de abandono
         setEstudiantesAbandono((prevEstudiantes) =>
           prevEstudiantes.filter(
             (estudiante) => estudiante.nombre_estudiante !== estudianteNotificar
           )
         );
     
         setTimeout(() => {
           setMensaje("");
         }, 2000);
       };
     
       return (
         <div className="asistencia-principal-contenedor">
           <div className="mensaje-contenedor">
             {mensaje && (
               <Alert variant="success" className="mensaje-notificar">
                 {mensaje}
               </Alert>
             )}
           </div>
           <div className="abandono-contenedor">
             <div className="izquierdo-contenedor"></div>
             <TasaAbandono
               estudiantes_abandono={estudiantesAbandono}
               mesSeleccionado={mesSeleccionado}
               setMesSeleccionado={setMesSeleccionado}
               onNotificar={handleNotificarClick}
               cargando={cargando}
               isSemesterClosed={isSemesterClosed} 
             />
             <div className="derecho-contenedor"></div>
           </div>
           <NotificacionAbandono
             show={showModal}
             estudianteNotificar={estudianteNotificar}
             onClose={handleCloseModal}
             onConfirm={handleNotificarSi}
           />
         </div>
       );
     };
     
     export default EstudiantesDesertores;