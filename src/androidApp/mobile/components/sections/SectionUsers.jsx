import contac from '../../assets/img/contac.png'

const SectionUsers = ({ 
    styles,
    translator 
}) => {
    return (
        <>
            <div className={`d-flex justify-content-center align-items-center`}>
                <div className="mx-4 mb-3">
                    <div className={`d-none justify-content-center align-items-center opacity-75 gap-2 p-2 mt-3 ${styles.bgAlert}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-battery-half" viewBox="0 0 16 16">
                            <path d="M2 6h5v4H2z" />
                            <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8" />
                        </svg>

                        <p className="m-2 fw-bold">{translator('El ahorra de bateria esta activado')}</p>
                        <p className="m-2 fw-bold">{translator('Configuración')}</p>
                    </div>
                    <div className=" d-flex flex-column align-items-center text-white">
                        <img className='img-fluid my-3' src={contac} alt="" />
                        <h5>{translator('Mantente en contacto')}</h5>
                        <p className='text-secondary text-center'>
                            {translator('Comparte tu ubicación en tiempo real con tus amigos y familiares. Podrán ver donde estas y compartir su ubicación contigo en todas las apps y servicios de Google.')}
                        </p>
                        <button className="mt-3 btn btn-primary rounded-5 d-flex justify-content-center align-items-center gap-1 p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg text-black" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg>
                            <h6 className="m-0 text-black">{translator('Nueva ubicación compartida')}</h6>
                        </button>
                    </div>
                    <div className="">
                    </div>
                </div>
            </div >
        </>
    )
}

export default SectionUsers;