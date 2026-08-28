import React, { useEffect } from "react";
import { Container, Card, Button, Badge, Image } from "react-bootstrap";
import CheckData from "./CheckData";

const whatsappLogo =
  "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
const headerBg =
  "https://i.imgur.com/2yaf2wb.png";
const eventImg =
  "https://i.imgur.com/2yaf2wb.png";

import bannerBackground from '../assets/img/bannerBackground.png';
import wappLogo from '../assets/img/wappLogo.png';
import footerBackground from '../assets/img/footerBackground.png';
import appsImg from '../assets/img/apps.png';
import arcadeImg from '../assets/img/arcade.png';
import gamesImg from '../assets/img/games.png';
import searchImg from '../assets/img/search.png';
import todayImg from '../assets/img/today.png';
import uploadImg from '../assets/img/upload.png';
import btnImg from '../assets/img/btn.png';

const WappCheck = ({
  translator
}) => {
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.style.display = "flex";
    }
  }, []);
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-start"
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: 0,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        maxWidth: 430,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Contenido scrolleable */}
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          flex: 1,
          overflowY: "auto",
          paddingBottom: 50, // espacio para la barra inferior
          position: "relative",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <button
          style={{
            display: "none",
            position: "absolute",
            top: 18,
            left: 18,
            width: 30,
            height: 30,
            zIndex: 200,
            cursor: "pointer",
            background: "transparent",
            border: "none",
            padding: 0,
          }}
        >
          <img
            src={btnImg}
            alt="Botón"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </button>
        {/* Header gráfico */}
        <div
          style={{
            width: "100%",
            height: 200,
            minHeight: 200,
            background: `url(${bannerBackground}) center/cover no-repeat, linear-gradient(180deg, #25d366 0%, #60e89d 100%)`,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          {/* Logo opcional */}
        </div>

        {/* Card App */}
        <div
          style={{
            width: "100%",
            background: "#111",
            borderBottom: "1px solid #222",
            padding: "15px 0 0 0",
            marginBottom: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", padding: "0 18px" }}>
            <div style={{ width: 60 }} /> {/* Espacio para el logo */}

            <div style={{ position: "absolute" }}>
              <img src={wappLogo} alt="" width={85} height={80} />
            </div>

            <div style={{ flex: 1, marginLeft: '30px', display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>
                  WhatsApp Messenger
                </div>
                <div style={{ color: "#bbb", fontSize: 12, marginBottom: 2 }}>
                  {translator("Simple. Confiable. Privado.")}
                </div>
                <span className="rotating-spinner" style={{ display: "inline-flex", margin: "8px 0 8px 0", opacity: 0.8 }}>
                  <svg width="28" height="28" viewBox="0 0 50 50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="31.4 31.4"
                    />
                  </svg>
                  <style>
                    {`
                     .rotating-spinner {
                       animation: spin 1s linear infinite;
                     }
                     @keyframes spin {
                       0% { transform: rotate(0deg);}
                       100% { transform: rotate(360deg);}
                     }
                   `}
                  </style>
                </span>
              </div>
              <span
                style={{
                  color: "#007aff",
                  fontSize: 20,
                  marginLeft: "auto",
                  marginTop: 25,
                  cursor: "pointer",
                  userSelect: "none",
                }}
                title={translator("Compartir")}
              >
                <img src={uploadImg} alt="" width={18} height={23} />
              </span>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 0 0", padding: "0 18px" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 8, color: "#bbb" }}>{translator("603 K CALIFICACIÓN")}</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>4.7</div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                {[...Array(4)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill="#fff">
                    <polygon points="10,1.5 12.6,7.5 19,8 14,12.5 15.5,19 10,15.5 4.5,19 6,12.5 1,8 7.4,7.5" />
                  </svg>
                ))}
                <svg width="12" height="12" viewBox="0 0 20 20">
                  <defs>
                    <linearGradient id="halfStar" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="50%" stopColor="#fff" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="10,1.5 12.6,7.5 19,8 14,12.5 15.5,19 10,15.5 4.5,19 6,12.5 1,8 7.4,7.5"
                    fill="url(#halfStar)"
                    stroke="#fff"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 8, color: "#bbb" }}>{translator("EDAD")}</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>12+</div>
              <div style={{ fontSize: 12, color: "#bbb" }}>{translator("años")}</div>
            </div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 8, color: "#bbb" }}>{translator("LUGAR")}</div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>#7</div>
              <div style={{ fontSize: 12, color: "#bbb" }}>{translator("Redes sociales")}</div>
            </div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 8, color: "#bbb" }}>{translator("DESARROLLADOR")}</div>
              <div style={{ fontSize: 20, color: "#bbb", marginTop: "-3px" }}>
                <svg width="20" height="20" fill="#bbb" viewBox="0 0 20 20"><path d="M10 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm0 2V4H8v1h4V4h-2zm-4 3v9h8V7H6z" /></svg>
              </div>
              <div style={{ fontSize: 10, color: "#bbb" }}>"WhatsApp"</div>
            </div>
          </div>
        </div>

        {/* Eventos */}
        <div
          style={{
            width: "100%",
            maxWidth: 430,
            marginTop: 18,
            padding: "0 0 80px 0",
          }}
        >
          <div style={{ flex: 1, color: "#fff", fontWeight: 700, fontSize: 18, margin: "18px 18px 8px 18px" }}>
            <div style={{ fontWeight: 700, fontSize: 17 }}>
              <span>
                {translator("Eventos")}
              </span>
            </div>
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#007aff",
              background: "transparent",
              borderRadius: 8,
              padding: "0",
              letterSpacing: 0.5,
            }}>
              {translator("YA ESTÁ DISPONIBLE")}
            </div>
          </div>

          <Card
            style={{
              width: "94%",
              margin: "0 auto",
              borderRadius: 18,
              background: `url(${footerBackground}) center/cover no-repeat, linear-gradient(180deg, #25d366 0%, #60e89d 100%)`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              overflow: "hidden",
              padding: 0,
              position: "relative",
              border: "none"
            }}
          >
            {/* Main event row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 0 0 0",
                height: 300,
                background: "linear-gradient(transparent 60%, rgb(14 81 19) 100%)"
              }}
            >
              <div style={{ flex: 1, marginLeft: 0, marginRight: 0, marginTop: 230, paddingLeft: "10px" }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: "#fff", marginBottom: 2, letterSpacing: 0.2 }}>
                  {translator("ACTUALIZACIÓN IMPORTANTE")}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 2 }}>
                  {translator("Disfruta de WhatsApp en iPad")}
                </div>
                <div style={{ fontSize: 13, color: "#e6e6e6", marginBottom: 8 }}>
                  {translator("Conéctate en una pantalla más grande.")}
                </div>
              </div>
            </div>
            {/* Card interna */}
            <div
              style={{
                background: "#181818",
                borderRadius: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
              }}
            >
              <Image
                src={whatsappLogo}
                alt="WhatsApp"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "#fff",
                  border: "1px solid #25d366",
                  marginRight: 10,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#fff" }}>
                  WhatsApp Messenger
                </div>
                <div style={{ fontSize: 11, color: "#bbb" }}>
                  {translator("Simple. Confiable. Privado.")}
                </div>
              </div>
              <Button
                variant="primary"
                style={{
                  background: "#007aff",
                  border: "none",
                  fontWeight: 600,
                  padding: "2px 16px",
                  borderRadius: 10,
                  fontSize: 14,
                  marginLeft: "auto",
                }}
              >
                {translator("Abrir")}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Barra inferior */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 0,
          width: "100%",
          maxWidth: 430,
          background: "#181818",
          borderTop: "1px solid #222",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 54,
          zIndex: 100,
        }}
      >
        <div style={{ color: "#fff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
          <div>
            <img src={todayImg} alt="Hoy" width={22} />
          </div>
          {translator("Hoy")}
        </div>
        <div style={{ color: "#fff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
          <div>
            <img src={gamesImg} alt="Juegos" width={22} />
          </div>
          {translator("Juegos")}
        </div>
        <div style={{ color: "#fff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
          <div>
            <img src={appsImg} alt="Apps" width={22} />
          </div>
          Apps
        </div>
        <div style={{ color: "#fff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
          <div>
            <img src={arcadeImg} alt="Arcade" width={22} />
          </div>
          Arcade
        </div>
        <div style={{ color: "#007aff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
          <div>
            <img src={searchImg} alt="Buscar" width={22} />
          </div>
          {translator("Buscar")}
        </div>
      </div>
      <CheckData 
        translator={translator}
      />
    </Container>
  );
};

export default WappCheck;