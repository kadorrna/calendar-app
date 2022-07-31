import Offcanvas from "react-bootstrap/Offcanvas";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const EventOffCanvas = ({ show, date }) => {
  return (
    <>
      <Offcanvas show={show}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {date.getDate()} - {MONTHS[date.getMonth()]}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>Description: Event Color:</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EventOffCanvas;
