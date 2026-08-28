//import useVisibleTime from "../../hooks/useVisibleTime";
const DivFooterTwo = ({
    translator,
    collEventFooterTwo,
    volume,
    volumeWhite,
    unlock,
    unlockWhite, 
    deviceName,
    device
}) => {
   // const visibleTimeText = useVisibleTime();
    return (

        <>
            <div className="d-none" id="divfooterTwo">
                <div className="d-flex justify-content-between align-items-center">

                    {/*BOTON DE FOOTER GRANDE*/}

                    <button className="btn"
                        id="btnFooterTwo"
                        data-bs-toggle="collapse"
                        data-bs-target="#divfooterOne"
                        aria-expanded="false"
                        aria-controls="collapseFooterOne"
                        onClick={collEventFooterTwo} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-x-lg closefooterWhite" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>


                </div>
                <div className="mx-3">
                    <p className="mb-0">
                        {
                            (() => {
                                try {                                   
                                    return deviceName ||  "iPhone";
                                } catch {
                                    return "iPhone";
                                }
                            })()
                        }

                    </p>
                    <span className="text-muted">
                        {
                            (() => {
                                try {
                                    
                                    return device || "iPhone";
                                } catch {
                                    return "iPhone";
                                }
                            })()
                        }
                    </span>
                    <div className="d-flex ">
                        <p className="me-2 text-warning">{translator("Hace 1 minuto")}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-battery-half me-2 mt-1 text-muted" viewBox="0 0 16 16">
                            <path d="M2 6h5v4H2z" />
                            <path
                                d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-lightning-charge-fill mt-1 text-muted" viewBox="0 0 16 16">
                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                        </svg>
                    </div>
                    <div className="row mx-1 mb-3">
                        <div className="col-12 bg-col12 rounded-3 mb-2 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3dc93d"
                                className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                            </svg>
                            <p className=''>{translator("Se eliminará")}</p>
                        </div>
                    </div>
                    <div className="rowFloat">
                        <div className="bg-col6 border-bottom-1 p-2 p-sm-2 me-2">
                            <img className="mb-2 d-none" src={volume} width="30" height="30" alt="" />
                            <img className="mb-2" src={volumeWhite} width="30" height="30" alt="" />
                            <p>{translator("Emitir sonido")}</p>
                        </div>
                        <div className="bg-col6 border-bottom-1 p-2 p-sm-2">
                            <img className="mb-2 d-none" src={unlock} width="30" height="30" alt="" />
                            <img className="mb-2" src={unlockWhite} width="30" height="30" alt="" />
                            <p>{translator("iPhone perdido")}</p>
                        </div>
                    </div>
                    <div className="row mx-1 mb-3 pb-3">
                        <div className="col-12 border-bottom-1 bgDelete rounded-3 mt-3 p-1">
                            <p className="pt-2 ps-2">{translator("Borrar")}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DivFooterTwo;