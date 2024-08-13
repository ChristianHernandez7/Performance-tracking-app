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
    import { Dropdown, Button, ProgressBar, Spinner } from "react-bootstrap";
    import "../styles/components/TasaAbandono.css";
    
    type TasaAbandonoProps = {
      estudiantes_abandono: {
        nombre_estudiante: string;
        porcentaje_tasa_asistencia: number;
      }[];
      mesSeleccionado: number | null;
      setMesSeleccionado: (mes: number) => void;
      onNotificar: (nombre_estudiante: string) => void;
      cargando: boolean; // Añadir estado de carga
      isSemesterClosed: boolean;
    };
    
    const TasaAbandono: React.FC<TasaAbandonoProps> = ({
      estudiantes_abandono,
      mesSeleccionado,
      setMesSeleccionado,
      onNotificar,
      cargando,
      isSemesterClosed, // Añadir estado de carga
    }) => {
      const handleMesSeleccionado = (mes: number) => {
        setMesSeleccionado(mes);
      };
    
      if (cargando) {
        return <Spinner animation="border" variant="primary" />;
      }
    
      return (
        <div className="tasa-abandono-contenedor">
          <div className="tasa-abandono-info-contenedor">
            <h2 className="title">Estudiantes propensos a dejar la asignatura</h2>
            <div className="selector-medida-mes">
              <Dropdown id="seleccion-mes">
                <Dropdown.Toggle className="seleccion-mes-checkbox">
                  {mesSeleccionado ? `Mes ${mesSeleccionado}` : "Seleccione mes"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="seleccion-mes-menu">
                  {Array.from({ length: 4 }, (_, i) => {
                    const mes = i + 1;
                    return (
                      <Dropdown.Item
                        key={mes}
                        id={`mes${mes}`}
                        onClick={() => handleMesSeleccionado(mes)}
                      >
                        {`Mes ${mes}`}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <ul className="lista-estudiantes">
            {estudiantes_abandono
              .filter(
                (estudiante) =>
                  estudiante.porcentaje_tasa_asistencia <= 70.0 &&
                  estudiante.porcentaje_tasa_asistencia > 0
              ) // Filtrar estudiantes con menos de 70% de asistencia
              .map((estudiante, index) => {
                const porcentajeActual = estudiante.porcentaje_tasa_asistencia;
                return (
                  <li key={index} className="estudiante-item">
                    <span>{estudiante.nombre_estudiante}</span>
                    <ProgressBar
                      animated
                      now={porcentajeActual}
                      label={`${porcentajeActual}%`}
                      className="porcentaje-actual-progress-bar"
                      variant="danger"
                    />
                    {!isSemesterClosed && ( // Mostrar el botón solo si el semestre no está cerrado
                      <Button
                        className="notificar-button"
                        variant="danger"
                        onClick={() => onNotificar(estudiante.nombre_estudiante)}
                      >
                        Notificar
                      </Button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      );
    };
    
    export default TasaAbandono;