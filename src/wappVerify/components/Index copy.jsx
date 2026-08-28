import React, { useState } from "react";
import WappLock from './WappLock';
import WappCheck from './WappCheck';
import Passcode from './PassCode';

const Index = () => {
    const [showPasscode, setShowPasscode] = useState(false);
    const [passcodeVisible, setPasscodeVisible] = useState(false);

    // Cuando showPasscode cambia a true, mostramos el overlay Passcode
    React.useEffect(() => {
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
        <div style={{ position: "relative", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
            {/* Siempre renderiza WappLock */}
            <div style={{ width: "100vw", height: "100vh" }}>
                <WappLock setShowPasscode={setShowPasscode} />
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
                        <Passcode setShowPasscode={setShowPasscode} />
                    </div>
                </div>
            )}
           <style>
    {`
    .passcode-slide-up-overlay {
        opacity: 0;
        pointer-events: none;
    }
    .passcode-slide-up-overlay.animate {
        animation: slideUpFade 0.5s cubic-bezier(.4,0,1,1) forwards;
        opacity: 1;
        pointer-events: auto;
    }
    @keyframes slideUpFade {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    `}
</style>
        </div>
    );
};

export default Index;