import videoBlack from '../assets/video/videoBlack.mp4';
import videoLight from '../assets/video/videoLight.mp4';
import titlelight from '../assets/img/Titlelight.png'
import titleBlack from '../assets/img/TitleBlack.png'

import titleBlackSM from '../assets/img/titleBlackSM.png';
import titleBlackXXL from '../assets/img/titleBlackXXL.png'
import titleLightXXL from '../assets/img/titleLightXXL.png'
import titleLightSM from '../assets/img/titleLightSM.png'

import radar from '../assets/img/radar.png';
import radarBlack from '../assets/img/radarBlack.png';
import { href } from 'react-router';

const SectionOne = ({
    setViewAuth,
    translator,
    styles
}) => {

    const handleViewAuth = () => {
        setViewAuth(true);
    }
    return (
        <>
            <section className={`container-fluid d-flex flex-column justify-content-center ${styles.minWidthSection} d-block`}>
                <div className="container d-flex justify-content-center flex-column align-items-center">
                    <div className={`container text-center ${styles.marginRadar}`}>
                        <img className={`${styles.imgHeaderTwo}`} src={radar} width="100" height="100" alt="" />
                        <img className={`${styles.imgHeader}`} src={radarBlack} width="100" height="100" alt="" />
                    </div>
                    <h1
                        className={`${styles.headerTitle}`}
                        style={{
                            color: localStorage.getItem('darkMode') === 'true' ? '#FFFFFF' : '#1F1F1F',
                        }}
                    >
                        {translator('Encontrar dispositivos')}
                    </h1>

                    {/* Subtítulo */}
                    <h2 className={`text-center ${styles.headerSubtitle}`}
                        style={{
                            color: localStorage.getItem('darkMode') === 'true' ? '#FFFFFF' : '#515154',
                        }}
                    >
                        {translator('Busca tus dispositivos iPhone...')}
                    </h2>
                </div>

                <div className="text-center">
                    <button onClick={handleViewAuth} className={` ${styles.bgBtn} rounded-pill`}>
                        <span className="fw-bold">
                            {translator('Iniciar sesión')}
                        </span>
                    </button>
                </div>
                <div className="container d-flex justify-content-center mt-4">
                    <a className={`${styles.headerSubtitle} text-center`} href="https://support.apple.com/es-mx/guide/icloud/mm6b1aa045/icloud" target="_blank" rel="noopener noreferrer">
                        {translator('Obtén más información sobre Buscar Dispositivos')}
                        <span className="nobreak">
                            &nbsp;
                            <svg
                                viewBox="0 0 72.127685546875 72.2177734375"
                                xmlns="http://www.w3.org/2000/svg"
                                className="glyph-box"
                                aria-label="(se abre en una pestaña nueva)"
                                style={{ height: '10.2495px', width: '10.2367px', fill: 'currentColor' }}
                            >
                                <g transform="matrix(1 0 0 1 -12.451127929687573 71.3388671875)">
                                    <path d="M84.5703-17.334L84.5215-66.4551C84.5215-69.2383 82.7148-71.1914 79.7852-71.1914L30.6641-71.1914C27.9297-71.1914 26.0742-69.0918 26.0742-66.748C26.0742-64.4043 28.1738-62.4023 30.4688-62.4023L47.4609-62.4023L71.2891-63.1836L62.207-55.2246L13.8184-6.73828C12.9395-5.85938 12.4512-4.73633 12.4512-3.66211C12.4512-1.31836 14.5508 0.878906 16.9922 0.878906C18.1152 0.878906 19.1895 0.488281 20.0684-0.439453L68.5547-48.877L76.6113-58.0078L75.7324-35.2051L75.7324-17.1387C75.7324-14.8438 77.7344-12.6953 80.127-12.6953C82.4707-12.6953 84.5703-14.6973 84.5703-17.334Z" />
                                </g>
                            </svg>
                        </span>
                    </a>
                </div>
            </section>
        </>
    )
}

export default SectionOne;