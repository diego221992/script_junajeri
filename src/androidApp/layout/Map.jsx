import { useEffect, useRef, useState } from 'react';
import iconModalWeb from '../assetsGlobal/img/iconModalWeb.png';
import iconModalMobile from '../assetsGlobal/img/iconModalMobile.png';
import { createGlobalStyle } from 'styled-components';
import { useData } from '../../context/UserContext';


const Map = ({ stylesProps, classNameProps, isMobile }) => {
    const { user } = useData();


    const GlobalStyles = createGlobalStyle`
  .leaflet-popup-content {
    width: ${isMobile ? '100px' : '80px'}
  }
  .leaflet-popup-content-wrapper, .leaflet-popup-tip {
    box-shadow: none;
    background-color: transparent;
  }
  a.leaflet-popup-close-button {
    display: none;
  }
  .leaflet-popup-content {
    margin: 0;
    padding: 0;
  }
  .leaflet-popup.leaflet-zoom-animated {
    position: absolute;
    opacity: 1;
    transform: translate3d(348px, 195px, 0px);
    bottom: -56px!important;
    left: -27px;
  }
  img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive {
    display: none !important;
  }
`;
    const [circleVisible, setCircleVisible] = useState(false);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (circleVisible) {
            //  alert("El cir culo ahora es visible");
        }
    }, [circleVisible])
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
        const mapInstance = L.map("maps", {
            /* zoomControl: false,
             dragging: false,
             scrollWheelZoom: false,
             doubleClickZoom: false,
             boxZoom: false,
             keyboard: false,
             touchZoom: false,
             tap: false,
             attributionControl: false,*/
        }).setView([lat, lon], 10);

        const tileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 60,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(mapInstance);

        const marker = L.marker([lat, lon]).addTo(mapInstance)
            .bindPopup(
                `<img src="${isMobile ? iconModalMobile : iconModalWeb}" alt='phone-pc' class='img-fluid' style='width: ${isMobile ? '100px' : '80px'}; height: auto;'>`,
                { className: '' }
            );

        markerRef.current = marker;
        mapRef.current = mapInstance;

        tileLayer.on('load', () => {
            marker.openPopup();
        });

        // 🔍 Zoom progresivo con flyTo
        const zoomSequence = [12, 14, 16];
        zoomSequence.forEach((zoomLevel, index) => {
            setTimeout(() => {
                mapInstance.flyTo([lat, lon], zoomLevel, {
                    animate: true,
                    duration: 0.6,
                    easeLinearity: 0.25
                });

                if (zoomLevel === 16) {
                    // Espera a que el zoom finalice antes de mostrar el círculo
                    setTimeout(() => {
                        setCircleVisible(true);
                    }, 700); // espera extra para asegurar que el zoom terminó
                }
            }, index * 600);
        });

        return () => {
            mapInstance.remove();
        };
    }, []);

    useEffect(() => {
        if (circleVisible && mapRef.current) {
            L.circle([lat, lon], {
                color: 'blue',
                fillColor: 'blue',
                fillOpacity: 0.1,
                radius: 80,
                weight: 0.5
            }).addTo(mapRef.current);
        }
    }, [circleVisible]);


    return (
        <>
            <GlobalStyles />
            <div
                className={classNameProps}
                style={stylesProps}
                id="maps"
            />
        </>
    );
};

export default Map;
