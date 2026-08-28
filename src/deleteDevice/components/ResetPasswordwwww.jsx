import React, { useState } from "react";
import { Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";

const ResetPassword = () => {
  const [value, setValue] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #23242a 0%, #18181c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <Container style={{ maxWidth: 380, background: "rgba(24,24,28,0.98)", borderRadius: 28, boxShadow: "0 8px 32px #0006", padding: 0 }}>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center" style={{ marginTop: 32 }}>
            {/* Apple logo with dots */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <svg width="54" height="54" viewBox="0 0 54 54">
                  <circle cx="27" cy="27" r="25" stroke="#4e8cff" strokeDasharray="2 7" strokeWidth="3" fill="none" />
                  <circle cx="27" cy="27" r="13" fill="#18181c" />
                  <svg x="13" y="13" width="28" height="28" viewBox="0 0 80 80">
                    <path d="M53.7,21.2c-2.6,0-5.8-1.8-9.6-1.8c-3.9,0-7.1,1.7-9.6,1.7c-2.7,0-6.1-1.6-10.1-1.6c-5.2,0-10,3-12.7,7.7
                      c-5.4,9.3-1.4,23.1,3.9,30.7c2.6,3.7,5.7,7.8,9.8,7.7c3.8-0.1,5.2-2.5,9.8-2.5c4.6,0,5.8,2.5,9.8,2.5c4.1,0,7-3.7,9.6-7.4
                      c2.6-3.8,3.7-7.5,3.7-7.7c-0.1-0.1-7.1-2.7-7.2-10.7c-0.1-6.7,5.5-9.9,5.7-10C60.1,25.2,56.7,21.2,53.7,21.2z"
                      fill="#4e8cff" />
                    <path d="M49.7,13.7c1.8-2.2,3-5.3,2.7-8.4c-2.6,0.1-5.8,1.7-7.7,3.9c-1.7,2-3.2,5.1-2.6,8.1C45.1,17.6,47.9,15.9,49.7,13.7z"
                      fill="#4e8cff" />
                  </svg>
                </svg>
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 8 }}>
              Restablecer contraseña
            </div>
            <div style={{ color: "#e5e5e7", fontSize: 16, marginBottom: 8 }}>
              Ingresa la dirección de correo electrónico o el número de teléfono de la cuenta que quieres restablecer.
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} style={{ marginTop: 10 }}>
            <Form>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Correo o número telefónico"
                    style={{
                      background: "#23232a",
                      border: "none",
                      borderRadius: 16,
                      color: "#fff",
                      fontSize: 17,
                      padding: "14px 16px",
                      boxShadow: "none",
                    }}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <div style={{ color: "#b0b0b0", fontSize: 13, marginTop: 12, marginBottom: 8 }}>
                Tu privacidad es muy importante. Si restableces tu contraseña en el dispositivo de otra persona, tu información personal no se guardará en su dispositivo.
              </div>
              <Button
                variant="secondary"
                disabled={!value}
                style={{
                  width: "100%",
                  borderRadius: 16,
                  background: !value ? "#44454a" : "#4e8cff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: 17,
                  padding: "12px 0",
                  marginTop: 8,
                  marginBottom: 24,
                  color: "#fff",
                  opacity: !value ? 0.7 : 1,
                  transition: "background 0.2s, opacity 0.2s",
                }}
              >
                Continuar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;