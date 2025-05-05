import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">
              &copy; {currentYear} Employee Management System. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              Developed by 23IT062
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 