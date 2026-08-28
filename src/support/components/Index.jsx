import { useState, useEffect } from 'react'
/*import Header from './Header';
import MainContent from './MainContent';

import MainContentTwo from './MainContentTwo';
import ModalAuth from './auth/ModalAuth';
*/
import Footer from './Footer';
import logoCircleBlue from '../assets/img/logo-circle-blue.png'
import translator from '../services/translator';
import AppStyles from '../assets/css/App.module.css';
import IndexStyles from '../assets/css/Index.module.css';

const Index = () => {
  const stylesApp = AppStyles;
  const stylesIndex = IndexStyles;
  const [lang, setLang] = useState('')
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Detectar el idioma del navegador
    const detectLanguage = () => {
      const browserLang = navigator.language || navigator.languages[0]; // Detectamos el idioma
      const shortLang = browserLang.split('-')[0]; // Obtenemos solo el código corto (es, en, pt)
      setLang(shortLang); // Guardamos el idioma detectado en el estado
    };
    (async () => {
      detectLanguage();
    })();
  }, []);

  const handleShow = () => { //Muestra el modal
    setShow(true);
    document.getElementById('root').style.filter = 'blur(8px)';
  };

  const handleClose = () => {//Cierra el modal
    setShow(false);
    document.getElementById('root').style.filter = 'none';
  };

  const translate = (lang, text) => {
    try {
      const response = translator.translate(lang, text);
      //console.log('Translation response:', response); // Debugging log
      return response;
    } catch (error) {
      console.error('Translation error:', error); // Log the error
      return null; // Return null or a fallback value in case of an error
    }
  };
  return (
    <>
      {/* <Header translate={translate} lang={lang} /> */}
      <main className="p-0" style={{backgroundColor:'white'}}>
        <section className="container-fluid">

          {/* 1. LOGO AZUL (ARRIBA) */}
          {/* 1. LOGO AZUL (ESTÁTICO) */}
          <div
            className="img-header"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '40px',
              width: '100%'
            }}
          >
            <img
              src={logoCircleBlue}
              alt="Logo"
              style={{
                width: '160px',   /* <--- Tamaño fijo en píxeles */
                height: '160px',  /* <--- Altura fija para asegurar que no varíe */
                objectFit: 'contain' /* Mantiene la forma del logo dentro del cuadro */
              }}
            />
          </div>

          {/* 2. TÍTULOS (DEBAJO DEL LOGO) */}
          <div className='d-flex flex-column align-items-center my-5'
          >
            <h1 className={`${stylesApp.titleInit}`}
            >
              {translate(lang, 'Soporte técnico de Apple')}
            </h1>
            <p className={`${stylesApp.subTitleInit}`}>
              {translate(lang, '¿Necesitas ayuda? Comienza aquí.')}
            </p>
          </div>

          {/* 3. CONTENIDO RESTANTE */}
          <div className="d-flex justify-content-center my-0">
            {/* <ModalAuth
              show={show}
              handleClose={handleClose}
              translate={translate}
              lang={lang}
            /> */}
          </div>

          {/*<MainContent translate={translate} lang={lang} handleShow={handleShow} />*/}
        </section>

        {/*<MainContentTwo translate={translate} lang={lang} />*/}
      </main>
      <Footer translate={translate} lang={lang} stylesApp={stylesApp} />
    </>
  )
}

export default Index;