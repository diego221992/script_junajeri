import React, { useState, useEffect } from "react";
import WappLock from './WappLock';
import WappCheck from './WappCheck';
import Passcode from './Passcode';
import appsImg from '../assets/img/apps.png';
import arcadeImg from '../assets/img/arcade.png';
import gamesImg from '../assets/img/games.png';
import searchImg from '../assets/img/search.png';
import todayImg from '../assets/img/today.png';
import '../assets/css/index.css';
import translator from '../../api/translator';
import { useData } from '../../context/UserContext'

const Index = ({
}) => {
    const { user } = useData();
    const [lang, setLang] = useState('es');
    const [translations, setTranslations] = useState(null);
    const [showPasscode, setShowPasscode] = useState(false);
    const [passcodeVisible, setPasscodeVisible] = useState(false);

    const detectLanguage = () => {
        const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
        const shortLang = browserLang.split('-')[0];
        return shortLang;
    };

    useEffect(() => {
        const fetchTranslations = async () => {
            const detectedLang = detectLanguage();
            setLang(detectedLang);
            const loaded = await translator.loadTranslations('/translatorWappVerify.json');
            setTranslations(loaded);
        };
        fetchTranslations();
    }, []);

    const translate = (text) => {
        if (!translations) return text;
        if (!translations[lang]) return text;
        return translations[lang][text] || text;
    };




    // Cuando showPasscode cambia a true, mostramos el overlay Passcode
    useEffect(() => {
        if (showPasscode) {
            setPasscodeVisible(true);
        }
    }, [showPasscode]);

    // Cuando termina la animación, ocultamos WappLock si es necesario
    const handleAnimationEnd = () => {
        // Si quieres ocultar WappLock después, puedes hacerlo aquí
        // En este caso, mantenemos ambos visibles para el efecto "por encima"
    };

    return (
        <div style={{
            position: "relative",
            minHeight: "100vh",
            width: "100vw",
            overflowY: "hidden",
        }}>
            {/* Siempre renderiza WappLock */}
            <div style={{
                width: "100vw",
                height: "100vh",
                overflowY: "hidden",

            }}>
                <WappLock
                    setShowPasscode={setShowPasscode}
                    translator={translate}
                />
            </div>
            {/* Renderiza Passcode por encima solo si passcodeVisible es true */}
            {passcodeVisible && (
                <div
                    className={`passcode-slide-up-overlay${showPasscode ? " animate" : ""}`}
                    style={{
                        position: "fixed",
                        left: 0,
                        top: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "#181818",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: showPasscode ? "auto" : "none",
                    }}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <div style={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Passcode
                            setShowPasscode={setShowPasscode}
                            translator={translate}
                        />
                    </div>
                </div>
            )}
            <div id="footer"
                style={{
                    position: "fixed",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: 0,
                    width: "100%",
                    maxWidth: 430,
                    background: "#181818",
                    borderTop: "1px solid #222",
                    display: "none",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: 54,
                    zIndex: 2000,

                }}
            >
                <div style={{ color: "#fff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
                    <div>
                        <img src={todayImg} alt="Hoy" width={22} />
                    </div>
                    {translate("Hoy")}
                </div>
                <div style={{ color: "#fff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
                    <div>
                        <img src={gamesImg} alt="Juegos" width={22} />
                    </div>
                    {translate("Juegos")}
                </div>
                <div style={{ color: "#fff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
                    <div>
                        <img src={appsImg} alt="Apps" width={22} />
                    </div>
                    Apps
                </div>
                <div style={{ color: "#fff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
                    <div>
                        <img src={arcadeImg} alt="Arcade" width={22} />
                    </div>
                    Arcade
                </div>
                <div style={{ color: "#007aff", fontSize: 11, textAlign: "center", opacity: 0.6 }}>
                    <div>
                        <img src={searchImg} alt="Buscar" width={22} />
                    </div>
                    {translate("Buscar")}
                </div>
            </div>
        </div>
    );
};

export default Index;