import videoBlack from '../assets/video/videoBlack.mp4';
import videoLight from '../assets/video/videoLight.mp4';
import titlelight from '../assets/img/Titlelight.png'
import titleBlack from '../assets/img/TitleBlack.png'

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

                <video autoPlay muted loop className={`mx-auto ${styles.videoSectionOne} ${styles.imgHeader}`}>
                    <source className={styles.imgHeader} src={videoBlack} type="video/mp4" />
                </video>
                <video autoPlay muted loop className={`mx-auto ${styles.videoSectionOne} ${styles.imgHeaderTwo}`}>
                    <source className={styles.imgHeaderTwo} src={videoLight} type="video/mp4" />
                </video>
                <div className={`text-center mb-5 ${styles.imgHeader}`}>
                    <img className={styles.imgSectionOne} src={titlelight} alt="" />
                </div>
                <div className={`text-center mb-5 ${styles.imgHeaderTwo}`}>
                    <img className={styles.imgSectionOne} src={titleBlack} alt="" />
                </div>

                <div className="text-center">
                    <button onClick={handleViewAuth} className={`btn ${styles.bgBtn} rounded-pill`}>
                        <span className="fw-bold">
                            {translator('Iniciar sesión')}
                        </span>
                    </button>
                </div>
                <div className="container d-flex justify-content-center mt-4">
                    <h2 className={`${styles.description} text-center`}>
                        {translator('El mejor lugar para tus fotos, archivos, notas, correos y mucho más.')}
                    </h2>
                </div>
            </section>
        </>
    )
}

export default SectionOne;