import { useEffect } from "react";
//import useVisibleTime from "../../hooks/useVisibleTime";
const DivWindosOne = ({
    translator,
    collEventOne,
    menu,
    menu_2,
    phoneBG,
    deviceName,
    device

}) => {
   // const visibleTimeText = useVisibleTime();

    useEffect(() => {
    }, [])
    return (
        <>
            <div className="container-fluid" id="divWindosOne">
                <header className="container-fluid pt-3 pe-4 pb-3 d-flex justify-content-between">
                    <h5 className="">{translator("Todos los dispositivos")}</h5>
                    <a href="#" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne" onClick={collEventOne}
                        id="btnCollapseOne"><img className="ms-7" src={menu} width="20" height="20" alt="" /></a>
                    {/*<a href="#" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                    aria-expanded="false" aria-controls="collapseOne">
                                    <img className="ms-5" src={menu_2}  width="20" height="20" alt="" />
                                </a>*/}
                </header>


                <div className="container-fluid collapse show" id="collapseOne">
                    <p style={{fontWeight : 600}}>{translator("Tu dispositivo")}</p>

                    <div className="btn btn-light btn1 d-flex mb-3 primaryWindos align-items-center" id="btnToggle" type="button">
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
                        <div style={{ marginLeft: 12 }}>
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


export default DivWindosOne;