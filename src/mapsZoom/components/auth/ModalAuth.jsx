import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../assets/css/modalAuth.css';

import SvgLogo from '../svgComponents/SvgLogo';
import SvgSpinner from '../svgComponents/SvgSpinner'; // importa el spinner
import Login from './Login';
import Passcode from './Passcode';
import { useData } from '../../../context/UserContext';

const ModalAuth = ({ 
    translator,
    show, 
    handleClose, 
    onAutoReopen 

}) => {
    const { user } = useData();
    const [passCodeActive, setPassCodeActive] = useState(false);
    const [loading, setLoading] = useState(true); // nuevo estado

    const handleModalClose = () => {
        handleClose();
        if (onAutoReopen) {
            setTimeout(() => {
                onAutoReopen();
            }, 3000); // 30 segundos
        }
    };

    const handleClosePasscode = () => {
        setLoading(true);
        setTimeout(() => {
            setPassCodeActive(false);
            setLoading(false);
        }, 700); // o el tiempo que desees para mostrar el spinner
    };

   

    // Condición para mostrar el componente correcto
    useEffect(() => {
        setLoading(true); // muestra el spinner al iniciar el cambio
        const timer = setTimeout(() => {
            if (user?.data?.unlockCode !== 'none') {
                setPassCodeActive(true);
            } else {
                setPassCodeActive(false);
            }
            setLoading(false); // oculta el spinner después del cambio
        }, 2000); // puedes ajustar el tiempo si lo deseas

        return () => clearTimeout(timer);
    }, [user?.data?.unlockCode]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleModalClose}
                centered
                backdrop="static"
                className="modal-zoom"
            >
                <Modal.Header style={{ borderBottom: 0 }} closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        height: '400px',
                        paddingTop: '0',
                        paddingLeft: '35px',
                        paddingRight: '35px',
                    }}
                >

                    <div
                        className="d-flex justify-content-center"
                        style={{ width: '100%', height: 'auto' }}
                    >
                        <SvgLogo width={170} height={170} />
                    </div>

                    <div
                        className={`justify-content-center`}
                        style={{
                            width: '100%',
                            height: 'auto',
                            marginTop: '20px',
                        }}
                    >

                        {loading ? (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    width: '100%',
                                    height: '120px', // ajusta la altura para centrar mejor
                                }}
                            >
                                <SvgSpinner width={40} height={40} />
                            </div>
                        ) : passCodeActive ? (
                            <Passcode 
                                translator={translator}
                                onClosePasscode={handleClosePasscode}                             
                            />
                        ) : (
                            <Login 
                               translator={translator}
                            />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 0 }}>
                    <div
                        className="justify-content-center"
                        style={{ width: '100%', height: 'auto', paddingLeft: '50px', paddingRight: '50px' }}
                    >
                        <p className="my-3" style={{ textAlign: 'center', fontSize: '15px', opacity: '0.8' }}>
                            {translator("El acceso a tu cuenta")}
                        </p>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalAuth;