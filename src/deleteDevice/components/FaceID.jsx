import { useState, useEffect } from "react";
import faceIdOne from "../assets/img/faceIdOne.png";
import faceIdTwo from "../assets/img/faceIdtwo.png";
import { Row, Col, Form, Card } from "react-bootstrap";
import Passcode from "./Passcode";
import "../assets/css/faceID.css";

const dividerStyle = {
  border: "none",
  borderTop: "1px solid #232323",
  margin: "5px 0 1px 0",
};

const FaceID = ({ 
  translator
}) => {
  const [faceIdIndex, setFaceIdIndex] = useState(0);
  const [showPasscodeComponent, setShowPasscodeComponent] = useState(false);

  // El efecto de cambio de faceIdIndex SIEMPRE corre hasta que aparece Passcode
  useEffect(() => {
    if (showPasscodeComponent) return;
    const interval = setInterval(() => {
      setFaceIdIndex((prev) => (prev === 0 ? 1 : 0));
    }, 800);
    return () => clearInterval(interval);
  }, [showPasscodeComponent]);

  // Simula verificación automática tras 2 segundos y muestra Passcode
  useEffect(() => {
    const timer = setTimeout(() => {
       setShowPasscodeComponent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

if (showPasscodeComponent) {
  return (
   
        <Passcode 
          translator={translator}
        />
   
  );
}

  return (
    <>
      <div
        className="faceid-floating"
        style={{
          background: "rgb(2 2 2)",
          borderRadius: "45px",
          width: 150,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={faceIdIndex === 0 ? faceIdTwo : faceIdOne}
          alt=""
          style={{
            width: faceIdIndex === 0 ? 62 : 60,
            height: faceIdIndex === 0 ? 62 : 60,
            opacity: 1,
            transition: "width 0.4s cubic-bezier(.4,2,.6,1), height 0.4s cubic-bezier(.4,2,.6,1), opacity 0.4s",
          }}
        />
      </div>
      <div className="faceid-container">
        <div className="faceid-outer">
          <div className="faceid-inner">
            {/* Barra superior fija estilo iOS */}
            <div className="faceid-header">
              <span style={{ display: "flex", alignItems: "center" }}>
                {/* SVG flecha azul */}
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M15.5 19L7.5 11L15.5 3" stroke="#4e8cff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{translator("Configuración")}</span>
              <span style={{ color: "#e5e5e79c" }}>{translator("Face ID y código")}</span>
            </div>
            {/* Contenido principal */}
            <div style={{ paddingTop: 58 }}>
              <Row>
                <Col xs={12}>
                  <Card
                    className="mb-2"
                    style={{
                      background: "transparent",
                      border: "none",
                      borderRadius: 16,
                      boxShadow: "none",
                    }}
                  >
                    <Card.Body className="p-2">
                      <Row
                        className="align-items-center"
                        style={{
                          background: "rgb(42 42 45)",
                          border: "none",
                          color: "rgb(78 140 255 / 63%)",
                          fontWeight: 400,
                          fontSize: 16,
                          borderRadius: 12,
                          padding: "8px 0",
                          margin: 0,
                        }}
                      >
                        <Col xs={12}>
                          <div>
                            <span
                              style={{
                                color: "#4e8cff",
                                textDecoration: "none",
                              }}
                            >
                              {translator("Configura Face ID con cubrebocas para definir una apariencia adicional")}
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <div style={{ color: "#b0b0b0", fontSize: 13, marginTop: 4, paddingLeft: 23, paddingRight: 23 }}>
                        {translator("El iPhone puede reconocer tu apariencia adicional cuando llevas cubrebocas.")}
                      </div>
                    </Card.Body>
                  </Card>
                  <hr style={dividerStyle} />
                  <Card
                    className="mb-2"
                    style={{
                      background: "transparent",
                      border: "none",
                      borderRadius: 16,
                      boxShadow: "none",
                    }}
                  >
                    <Card.Body className="p-2">
                      <Row
                        className="align-items-center"
                        style={{
                          background: "rgb(42 42 45)",
                          border: "none",
                          color: "#888",
                          fontWeight: 500,
                          fontSize: 16,
                          borderRadius: 12,
                          padding: "8px 0",
                          margin: 0,
                        }}
                      >
                        <Col xs={10}>
                          <div style={{ opacity: 0.8 }}>
                            {translator("Restablecer Face ID")}
                          </div>
                        </Col>
                      </Row>
                      <div style={{ color: "rgb(176 176 176 / 48%)", fontSize: 13, marginTop: 4, paddingLeft: 23, paddingRight: 23 }}>
                        {translator("Se requiere usar Face ID cuando la protección del dispositivo en caso de robo está activada.")}
                      </div>
                    </Card.Body>
                  </Card>
                  <hr style={dividerStyle} />
                  <div style={{ fontSize: 13, color: "rgb(176 176 176 / 48%)", marginLeft: "15px" }}>
                    {translator("ATENCIÓN")}
                  </div>
                  <Card
                    className="mb-2"
                    style={{
                      background: "transparent",
                      border: "none",
                      borderRadius: 16,
                      boxShadow: "none",
                    }}
                  >
                    <Card.Body className="p-2">
                      <Row
                        className="align-items-center"
                        style={{
                          background: "rgb(42 42 45)",
                          border: "none",
                          color: "#888",
                          fontWeight: 500,
                          fontSize: 16,
                          borderRadius: 12,
                          padding: "8px 0",
                          margin: 0,
                        }}
                      >
                        <Col xs={10}>
                          <div>
                            {translator("Requerir atención para usar Face ID")}
                          </div>
                        </Col>
                        <Col xs={2} className="text-end">
                          <Form.Check
                            type="switch"
                            id="faceid-attention"
                            defaultChecked
                            className="form-switch"
                            style={{ transform: "scale(0.85)" }}
                            onChange={() => setShowPasscodeComponent(true)}
                          />
                        </Col>
                      </Row>
                      <div style={{ color: "rgb(176 176 176 / 48%)", fontSize: 13, marginTop: 4, paddingLeft: 23, paddingRight: 23 }}>
                        {translator("La cámara TrueDepth proporciona un nivel de seguridad adicional al verificar que estés viendo el iPhone antes de autenticarte. Algunos lentes obscuros podrían interferir con la detección de atención. Face ID requerirá siempre de tu atención si llevas puesto un cubrebocas.")}
                      </div>
                    </Card.Body>
                  </Card>
                  <hr style={dividerStyle} />
                  <Card
                    className="mb-2"
                    style={{
                      background: "transparent",
                      border: "none",
                      borderRadius: 16,
                      boxShadow: "none",
                    }}
                  >
                    <Card.Body className="p-2">
                      <Row
                        className="align-items-center"
                        style={{
                          background: "rgb(42 42 45)",
                          border: "none",
                          color: "#888",
                          fontWeight: 500,
                          fontSize: 16,
                          borderRadius: 12,
                          padding: "8px 0",
                          margin: 0,
                        }}
                      >
                        <Col xs={10}>
                          <div>{translator("Funciones que detectan atención")}</div>
                        </Col>
                        <Col xs={2} className="text-end">
                          <Form.Check
                            type="switch"
                            id="faceid-functions"
                            defaultChecked
                            className="form-switch"
                            style={{ transform: "scale(0.85)" }}
                            onChange={() => setShowPasscodeComponent(true)}
                          />
                        </Col>
                      </Row>
                      <div style={{ color: "rgb(176 176 176 / 48%)", fontSize: 13, marginTop: 4, paddingLeft: 23, paddingRight: 23 }}>
                        {translator("El iPhone verificará si estás prestando atención antes de oscurecer la pantalla, de disminuir el volumen de algunas alertas o de ampliar una notificación si la pantalla está bloqueada.")}
                      </div>
                    </Card.Body>
                  </Card>
                  <hr style={dividerStyle} />
                  <Card
                    className="mb-2"
                    style={{
                      background: "rgb(42 42 45)",
                      border: "none",
                      borderRadius: 16,
                      boxShadow: "none",
                      marginLeft: 7,
                      marginRight: 7
                    }}
                  >
                    <Card.Body className="p-2">
                      <Row className="align-items-center" style={{ margin: 0 }}>
                        <Col xs={10}>
                          <div style={{ fontSize: 15, fontWeight: 500, color: "#e5e5e7" }}>
                            {translator("Protección del dispositivo en caso de robo")}
                          </div>
                          <div style={{ color: "rgb(176 176 176 / 48%)", fontSize: 14, marginTop: 2 }}>
                            {translator("Activada")}
                          </div>
                        </Col>
                        <Col xs={2} className="text-end" style={{ paddingRight: 4 }}>
                          <span style={{ color: "#888", fontSize: 23 }}>&#8250;</span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <hr style={dividerStyle} />
                  <Card
                    className="mb-2 mt-3"
                    style={{
                      background: "rgb(42 42 45)",
                      border: "none",
                      borderRadius: 16,
                      boxShadow: "none",
                      marginLeft: 7,
                      marginRight: 7
                    }}
                  >
                    <Card.Body className="p-2">
                      <div
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#888",
                          fontWeight: 500,
                          fontSize: 16,
                          borderRadius: 12,
                          padding: "8px",
                          marginBottom: 0,
                          textAlign: "left",
                          opacity: 0.7,
                          cursor: "pointer"
                        }}
                        onClick={() => setShowPasscodeComponent(true)}
                      >
                        {translator("Desactivar código")}
                      </div>
                      <hr style={dividerStyle} />
                      <div
                        style={{
                          color: "rgb(78 140 255 / 57%)",
                          fontSize: 16,
                          textDecoration: "none",
                          fontWeight: 400,
                          borderRadius: 12,
                          padding: "8px",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        {translator("Cambiar código")}
                      </div>
                    </Card.Body>
                  </Card>
                  <div style={{ color: "rgb(176 176 176 / 48%)", fontSize: 13, marginTop: 10, paddingLeft: 23, paddingRight: 23 }}>
                    {translator("Se requiere un código cuando la protección contra robo de dispositivo está activada y si Face ID está configurado.")}
                    <br />
                    <br />
                    {translator("Aunque cambies el código de este iPhone, no se desactivará el código de otros dispositivos ni se restablecerá la duplicación del iPhone ni la sincronización con Wi-Fi en el descifrado del teléfono.")}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaceID;