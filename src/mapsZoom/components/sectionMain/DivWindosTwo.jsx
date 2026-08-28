//import useVisibleTime from "../../hooks/useVisibleTime";
const DivWindosTwo = ({
    translator,
    collapseEventTwo,
    menu,
    menu_2,
    phonePc,
    volume,
    volumeWhite,
    unlock,
    unlockWhite,
    deviceName,
    device
}) => {
  //  const visibleTimeText = useVisibleTime();

    return (
        <>
            <div id="divWindosTwo">
                <div className=" container mt-2 d-flex justify-content-between align-items-center">
                    <span className="btn btnClose d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                            className="bi bi-chevron-left textFloat textFloatIcono mt-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>
                        <h5 className="textFloat smFloat mb-0 ps-1">{translator("Todos los dispositivos")}</h5>
                    </span>
                    <a className="smFloat " href="#" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo" onClick={collapseEventTwo}
                        id="btnCollapseTwo"><img className="ms-5" src={menu} width="20" height="20" alt="" /></a>
                    {/*<a href="#" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                aria-expanded="false" aria-controls="collapseTwo"><img className="ms-5" src={menu_2}  width="20" height="20" alt="" /></a>*/}
                </div>

                <div className="container p-3 d-none" id="headercollapseTwo">
                    <p className="mb-0">
                        {
                            (() => {
                                try {
                                    return device || "iPhone";
                                } catch {
                                    return "iPhone";
                                }
                            })()
                        }
                    </p>
                    <span className="text-warning">{translator("Hace 1 minuto")}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-battery-half me-2 mt-1 text-muted" viewBox="0 0 16 16">
                        <path d="M2 6h5v4H2z" />
                        <path
                            d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-lightning-charge-fill mt-1 text-muted" viewBox="0 0 16 16">
                        <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                    </svg>
                    <div className="d-flex justify-content-between">
                        <p>Se eliminara el 10 de mayo 2025</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3dc93d" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                        </svg>
                    </div>


                </div>

                <div className="collapse show" id="collapseTwo">
                    <div className="text-center smFloat ms-4 mb-3 me-3" type="button">
                        <img className="" src={phonePc} width="100" height="100" alt="" />
                        <div className="">
                            <p className="mb-0">
                                 {
                                    (() => {
                                        try {
                                            
                                            return deviceName ||  "iPhone";
                                        } catch {
                                            return  "iPhone";
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
                        </div>
                    </div>
                    <div className="mx-3 pb-2">
                        <div className="d-flex ">
                            <p className="me-2 text-warning" style={{ marginLeft: '7px' }}>{translator("Hace 1 minuto")}</p>
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
                        <div className="row mx-1">
                            <div className="col-12 bg-col12 rounded-3 mb-2 p-2 p-sm-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3dc93d"
                                    className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                                </svg>
                                <p style={{fontWeight : 400}} >{translator("Se eliminará")}</p>
                            </div>
                        </div>
                        <div className="rowFloat">
                            <div className="bg-col6 border-bottom-1 p-2 p-sm-2 me-2" style={{cursor : 'pointer'}}>
                                <img className="mb-2 d-none" src={volume} width="30" height="30" alt="" />
                                <img className="mb-2" src={volumeWhite} width="30" height="30" alt="" />
                                <p style={{fontWeight : 400, cursor : 'pointer'}} >{translator("Emitir sonido")}</p>
                            </div>
                            <div className="bg-col6 border-bottom-1 p-2 p-sm-2" style={{cursor : 'pointer'}}>
                                <img className="mb-2 d-none" src={unlock} width="30" height="30" alt="" />
                                <img className="mb-2" src={unlockWhite} width="30" height="30" alt="" />
                                <p style={{fontWeight : 400, cursor : 'pointer'}}>{translator("iPhone perdido")}</p>
                            </div>
                        </div>
                        <div className="row mx-1 ">
                            <div style={{cursor : 'pointer'}} className="col-12 border-bottom-1 bgDelete rounded-3 mt-3 p-1" >
                                <p style={{fontWeight : 400, cursor : 'pointer'}} className="pt-2 ps-2">{translator("Borrar")}</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )


};

export default DivWindosTwo;