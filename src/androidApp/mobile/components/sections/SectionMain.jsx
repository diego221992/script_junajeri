import { useState } from 'react';
import { Container } from 'react-bootstrap';
import user from '../../assets/img/users.png';
import userActive from '../../assets/img/usersActive.png'
import devices from '../../assets/img/devices.png';
import devicesActive from '../../assets/img/devicesActive.png';
import SectionDevices from './SectionDevices';
import SectionUsers from './SectionUsers';
import Map from '../../../layout/Map';
import sectionMainStyles from '../../assets/css/sectionMain.module.css';

const SectionMain = ({
    styles,
    isMobile,
    translator

}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showDevices, setShowDevices] = useState(true); // Dispositivos activo al cargar

    const handleShowDevices = () => {
        setShowDevices(true);
        setShowUser(false);
    };

    const handleShowUser = () => {
        setShowUser(true);
        setShowDevices(false);

    };

    return (
        <>
            <Map
                className={""}
                stylesProps={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', margin: 0, padding: 0 }}
                isMobile={isMobile}
            />

            <Container
                fluid
                className={`${styles.footerColor} fixed-bottom pt-1 px-0 rounded-top-5 ${isOpen ? styles.shifted : ""
                    }`}
            >
                {/* Contenedor con clases dinámicas para manejar la transición */}
                <div className="content">
                    <div className={`${sectionMainStyles.slideFade} ${showDevices ? sectionMainStyles.show : ''}`}>
                        {showDevices && (
                            <SectionDevices
                                styles={styles}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                translator={translator}
                            />
                        )}
                    </div>

                    <div className={`${sectionMainStyles.slideFade} ${showUser ? sectionMainStyles.show : ''}`}>
                        {showUser && (
                            <SectionUsers
                                styles={styles}
                                translator={translator}
                            />
                        )}
                    </div>
                </div>


                <div className={`${styles.containerFluid} ${styles.colorFooter}`}>
                    <div className="row">
                        <div className={`col text-center my-auto`} onClick={handleShowDevices}>
                            <button className="btn" style={{ height: '40px' }}>
                                <div className={showDevices ? styles.devicesActive : styles.divicesNoActive}>
                                    <img
                                        width={25}
                                        height={20}
                                        src={showDevices ? devicesActive : devices}
                                        alt=""
                                    />
                                </div>
                            </button>
                            <p className={styles.iconsFooter}>{translator('Dispositivos')}</p>
                        </div>
                        <div className={`col text-center`} onClick={handleShowUser}>
                            <button className="btn" style={{ height: '40px' }}>
                                <div className={showUser ? styles.devicesActive : styles.divicesNoActive}>
                                    <img
                                        src={showUser ? userActive : user}
                                        width={25}
                                        height={20}
                                        alt=""
                                    />
                                </div>
                            </button>
                            <p className={styles.iconsFooter}>{translator('Personas')}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SectionMain;