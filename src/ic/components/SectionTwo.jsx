import imgOne from '../assets/img/imgOne.png'
import imgOneLight from '../assets/img/imgOneLight.png'
import imgTwo from '../assets/img/imgTwo.png'
const SectionTwo = ({
    darkMode,
    translator,
    styles
}) => {
    const isDarkMode = darkMode === true || darkMode === 'true';
    return (
        <>
            <section className={`container-fluid minWidthSection d-block ${styles?.section}`}>
                <div className={`row gap-5 d-flex justify-content-center ${styles?.sectionImg}`}>
                    <div className={`col-xxl-4 col-xl-5 col-lg-8 col-md-8 col-sm-7 d-flex flex-column  ${styles?.bgSectionTwo}`}>
                        {isDarkMode
                           ? (<img className={`img-fluid mx-auto ${styles?.imgSection}`} src={imgOne} alt="" />)
                           : ( <img className={`img-fluid mx-auto ${styles?.imgSection}`} src={imgOneLight} alt="" />)
                        }
                            <h2 className={`${styles?.h2SectionTwo}`}>
                                {translator(`Accede fácilmente a las apps y a los datos de tu iPhone en la web`)}
                            </h2>
                            <p className={`pt-2 pSectionTwo ${styles?.pSectionTwo}`}>
                                {translator('icloud fundamental')}
                            </p>
                    </div>
                    <div className={`col-xl-5 col-lg-8 col-md-8 col-sm-7 d-flex flex-column justify-content-center  ${styles?.bgSectionTwo}`}>
                        <img className={`img-fluid mx-auto ${styles?.imgSection}`} src={imgTwo} alt="" />
                            <h2 className={`${styles?.h2SectionTwo}`}>
                                {translator('Más almacenamiento, además de funciones para proteger tu privacidad y conectarte con tus amistades')}
                            </h2>
                            <p className={`pt-2 ${styles?.pSectionTwo}`}>
                                {translator('actualiza icloud')}{' '}
                                <a className={` ${styles?.linkOne}`} href="https://www.apple.com/icloud/" target='_blank'>
                                    appIe.com/icIoud
                                </a>.
                            </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionTwo;