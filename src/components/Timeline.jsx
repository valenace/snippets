import { useState } from "react";
import '../../assets/css/tl.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Container, Row, Col, Card, Modal, Button,Carousel } from "react-bootstrap";


const Timeline = ({ datos }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  if (!datos || datos.length === 0) {
    return <p>No hay datos disponibles para mostrar en esta línea de tiempo.</p>;
  }

  return (
    <Container className="timeline-container">
      <h4 className="text-center my-4">Línea de Tiempo</h4>
      <hr />
      <Carousel indicators={false} interval={null} controls={true}>
        {[...Array(Math.ceil(datos.length / 4))].map((_, i) => (
          <Carousel.Item key={i}>
            <Row className="justify-content-evenly timeline-row" style={{ minHeight: '150px' }}>
              {datos.slice(i * 4, (i + 1) * 4).map((item) => (
                <Col
                  md={2}
                  key={item.id || item.fecha}
                  className="timeline-item"
                  onClick={() => handleShowModal(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card className="custom-card-container shadow-sm">
                    <Card.Body className="text-center">
                      <span className="timeline-date badge bg-primary">{item.fecha}</span>
                      {/* <p className="mt-2">{item.descripcionCorta}</p> */}
                      <p className="mt-2">{item.titulo}</p>
                      
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Modal para mostrar descripcionLarga */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Fecha:</strong> {selectedItem?.fecha}</p>
          <p>{selectedItem?.descripcionLarga}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Timeline;