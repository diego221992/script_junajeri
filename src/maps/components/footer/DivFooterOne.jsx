//import useVisibleTime from "../../hooks/useVisibleTime";
const DivFooterOne = ({
    translator,
    collEventFooterOne,
    phoneBG, 
    deviceName,
    device
}) => {
   // const visibleTimeText = useVisibleTime();
    return (
        <>
            <div className="container-fluid" id="divfooterOne">
                <div className="container-fluid">
                    <p className="">{translator("Tu dispositivo")}</p>

                    {/*BOTON DE FOOTER PEQUEÑO*/}
                    <div
                        className="btn btn1 d-flex mb-3 primaryWindos align-items-center"
                        id="btnFooterOne"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#divfooterTwo"
                        aria-expanded="true"
                        aria-controls="collapseFooterTwo"
                        onClick={collEventFooterOne}
                    >
                        <div style={{ position: 'relative', width: 40, height: 40 }}>
                            <img className="me-2" src={phoneBG} width="40" height="40" alt="" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#3dc93d"
                                className="bi bi-dash-circle-fill"
                                viewBox="0 0 16 16"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    zIndex: 2
                                }}
                            >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                            </svg>
                        </div>
                        <div style={{ marginLeft: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <p className="mb-0" style={{ textAlign: 'left' }}>
                                {
                                    (() => {
                                        try {                                            
                                            return deviceName || "iPhone";
                                        } catch {
                                            return "iPhone";
                                        }
                                    })()
                                }
                            </p>
                            <span className="text-warning">{translator("Hace 1 minuto")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};

export default DivFooterOne;