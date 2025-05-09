import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../assets/tl.css'


import { Container, Row, Col, Card, Button, Modal, Carousel } from "react-bootstrap";

const items = [
  { id: 1, titulo: "Evento 1", fecha: "1956", descripcion: "Breve descripción 1", detalle: "Descripción más larga del evento 1." },
  { id: 2, titulo: "Evento 2", fecha: "1960", descripcion: "Breve descripción 2", detalle: "Descripción más larga del evento 2." },
  { id: 3, titulo: "Evento 3", fecha: "1970", descripcion: "Breve descripción 3", detalle: "Descripción más larga del evento 3." },
  { id: 4, titulo: "Evento 4", fecha: "1980", descripcion: "Breve descripción 4", detalle: "Descripción más larga del evento 4." },
  { id: 5, titulo: "Evento 5", fecha: "1990", descripcion: "Breve descripción 5", detalle: "Descripción más larga del evento 5." },
  { id: 6, titulo: "Evento 6", fecha: "2000", descripcion: "Breve descripción 6", detalle: "Descripción más larga del evento 6." },
  { id: 7, titulo: "Evento 7", fecha: "2010", descripcion: "Breve descripción 7", detalle: "Descripción más larga del evento 7." },
  { id: 8, titulo: "Evento 8", fecha: "2020", descripcion: "Breve descripción 8", detalle: "Descripción más larga del evento 8." }
];

const Timeline = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
<Container className="timeline-container">
  <Carousel indicators={false} interval={null} controls={true}>
    {[...Array(Math.ceil(items.length / 4))].map((_, i) => (
      <Carousel.Item key={i}>
        <Row className="justify-content-center timeline-row">
          {items.slice(i * 4, (i + 1) * 4).map((item) => (
            <Col md={3} key={item.id} className="timeline-item">
              <Card className="custom-card-container">
                <Card.Body>
                  <span className="timeline-date">{item.fecha}</span>
                  <p>{item.descripcion}</p>
                  <Button variant="primary" onClick={() => handleShowModal(item)}>
                    Ver más
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Carousel.Item>
    ))}
  </Carousel>







      {/* Modal para mostrar detalles */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Fecha:</strong> {selectedItem?.fecha}</p>
          <p>{selectedItem?.detalle}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Timeline;
