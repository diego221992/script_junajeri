import radar from '../assets/img/radar.png';
import radarBlack from '../assets/img/radarBlack.png';
import titleBlackSM from '../assets/img/titleBlackSM.png';
import titleBlackXXL from '../assets/img/titleBlackXXL.png'
import titleLightXXL from '../assets/img/titleLightXXL.png'
import titleLightSM from '../assets/img/titleLightSM.png'
const SectionOne = ({setViewAuth}) => {
    const handleViewAuth = () => {
        console.log("Se abre el auth modal");
        setViewAuth(true);
           
    }
    return (
        <>
            <section className="container-fluid d-flex flex-column justify-content-center minWidthSection">
                <div className="container d-flex justify-content-center flex-column align-items-center">
                    <div className="container text-center marginRadar">
                        <img className="imgHeaderTwo" src={radar} width="90" height="90" alt="" />
                        <img className="imgHeader" src={radarBlack} width="90" height="90" alt="" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <picture>
                            <source className="img-fluid responsive-image imgHeaderTwo" media="(min-width: 1200px)"
                                srcSet={titleBlackXXL} />
                            <source className="img-fluid responsive-image imgHeaderTwo" media="(min-width: 200px)"
                                srcSet={titleBlackSM} />
                            <img className="img-fluid responsive-image imgHeaderTwo" src={titleBlackXXL} alt="Imagen adaptable" />
                        </picture>

                        <picture>
                            <source className="img-fluid responsive-image imgHeader" media="(min-width: 800px)"
                                srcSet={titleLightXXL} />
                            <source className="img-fluid responsive-image imgHeader" media="(min-width: 200px)"
                                srcSet={titleLightSM} />
                            <img className="img-fluid responsive-image imgHeader" src={titleLightXXL} alt="Imagen adaptable" />
                        </picture>
                    </div>
                    <p className="container-fluid text-center pSection fw-bold">Busca tus dispositivos iPhone, iPad, Mac, Apple Watch,
                        AirPods o Beats. O ayuda a encontrar los dispositivos registrados en Compartir en familia.
                    </p>


                </div>

                <div className="text-center" onClick={()=>{handleViewAuth()}}>
                    <button className="btn bgBtn rounded-pill inicioSesion">
                        <span className="fw-bold">Iniciar sesión</span>
                    </button>
                </div>
                <div className="container d-flex justify-content-center mt-4">
                    <a className="description text-center">Obtén detalles sobre Encontrar dispositivos
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-arrow-up-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                        </svg>
                    </a>
                </div>
            </section>
        </>
    )
}

export default SectionOne;