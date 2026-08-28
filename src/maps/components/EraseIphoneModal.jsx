import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EraseIphoneModal = ({ show, onClose, onNext, deviceName, translator }) => (
    <Modal
        show={show}
        onHide={onClose}
        centered
        backdrop="static"
        contentClassName="erase-iphone-modal"
        dialogClassName="erase-iphone-modal-dialog"
        style={{ zIndex: 2000 }}
    >
        <Modal.Body
            style={{
                textAlign: 'center',
                padding: '44px 28px 36px 28px',
                borderRadius: 22,
                minWidth: 340,
                minHeight: 260,
                boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
                background: '#fff',
            }}
        >
            <h2
                style={{
                    margin: '0 0 10px 0',
                    fontSize: '1.85rem',
                    fontWeight: 600,
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif',
                    letterSpacing: '-0.02em',
                    color: '#111',
                    lineHeight: 1.18,
                }}
            >
                {translator("Borrar iPhone")}
            </h2>
            <p
                className="subtitle"
                style={{
                    color: '#888',
                    marginBottom: 14,
                    fontSize: '1.13rem',
                    fontWeight: 500,
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                }}
            >
                {deviceName}
            </p>
            <p
                className="description"
                style={{
                    color: '#444',
                    fontSize: '1.09rem',
                    marginBottom: 36,
                    fontWeight: 400,
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif',
                    lineHeight: 1.45,
                    letterSpacing: '-0.01em',
                }}
            >
                {translator("Confirmar borrado")}
            </p>
            <Button
                className="next-btn"
                style={{
                    background: '#179a20',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '13px 0',
                    width: '100%',
                    fontSize: '1.18rem',
                    fontWeight: 600,
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif',
                    transition: 'background 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    marginTop: 0,
                }}
                onClick={onNext}
                onMouseOver={e => (e.target.style.background = '#107c16')}
                onMouseOut={e => (e.target.style.background = '#179a20')}
            >
                {translator("Siguiente")}
            </Button>
        </Modal.Body>
        <style>{`
            .erase-iphone-modal .modal-content {
                border-radius: 22px !important;
                border: none;
                box-shadow: 0 4px 32px rgba(0,0,0,0.10);
            }
            .erase-iphone-modal-dialog {
                max-width: 410px;
                margin: 60px auto;
            }
        `}</style>
    </Modal>
);

export default EraseIphoneModal;