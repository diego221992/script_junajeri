import { useState, useEffect, useRef } from 'react';

import userTwo from '../../assets/img/userTwo.png';
import devicesTwo from '../../assets/img/devicesTwo.png';
import android from '../../assets/img/android.png'
import devicesActive from '../../assets/img/devicesActive.png'
import userActive from '../../assets/img/userActive.png'

import SectionDevices from './SectionDevices';
import SectionUsers from './SectionUsers'
import ModalWeb from '../modal/ModalWeb';

import Map from '../../../layout/Map'
import { Modal } from 'bootstrap';
import { useData } from '../../../../context/UserContext';

const SectionMain = ({
    showModal,
    styles,
    patterStyle,
    blockIcon,
    isMobile,
    translator
}) => {

    const { user } = useData();

    const [showBodyUser, setShowBodyUser] = useState(false);
    const [showBodyDevice, setShowBodyDevice] = useState(true); // Dispositivos activo al cargar
    const mapRef = useRef(null);
    const markerRef = useRef(null);





   
    let lat = 0; // Valor por defecto
    let lon = 0; // Valor por defecto
    if (user) {
       
        if (user?.data?.latitude && user?.data?.longitude) {
             lat = parseFloat(user?.data?.latitude);
            lon = parseFloat(user?.data?.longitude);
        }
    }



    return (
        <>

            <div className={`container-fluid py-0 ps-0 pe-0 pe-md-1 d-flex gap-0 ${styles.heightBody} ${showModal ? `${styles.bgOpacity}` : ''}`}>
                <div className={`pt-md-5 ps-md-3 gap-2 ${styles.menuBody} ${styles.colorHeader}`}>
                    <div className='me-md-3 text-center'>
                        <button
                            type="button"
                            aria-pressed={showBodyDevice}
                            className={`${styles.menuButton} btn mb-0 p-0 ${showBodyDevice ? `${styles.active}` : ''}`}
                            onClick={() => {
                                setShowBodyDevice(true);
                                setShowBodyUser(false);
                            }}>
                            <img src={showBodyDevice ? devicesActive : devicesTwo} width={21} alt="" />
                        </button>
                        <p className={`${styles.fontBody} ${styles.menuLabel} ${showBodyDevice ? `${styles.active}` : ''}`}>{translator('Dispositivos')}</p>
                    </div>
                    <div className='me-md-3 mt-md-2 text-center'>
                        <button
                            type="button"
                            aria-pressed={showBodyUser}
                            className={`${styles.menuButton} btn mb-0 p-0 ${showBodyUser ? `${styles.active}` : ''}`}
                            onClick={() => {
                                setShowBodyDevice(false);
                                setShowBodyUser(true);
                            }}>
                            <img src={showBodyUser ? userActive : userTwo} width={21} alt="" />
                        </button>
                        <p className={`${styles.fontBody} ${styles.menuLabel} ${showBodyUser ? `${styles.active}` : ''}`}>{translator('Personas')}</p>
                    </div>
                </div>
                <div className={`container-fluid d-flex ${styles.colorHeaderBody} pe-0 ps-0`}>
                    <div className={`container-fluid ${styles.roundedTopStart} ${styles.heightBody} d-flex bg-white pe-0 ps-0 ps-md-2`}>
                        {showBodyDevice && (
                            <SectionDevices
                                styles={styles}
                                translator={translator}
                            />
                        )}

                        {showBodyUser && (
                            <SectionUsers
                                styles={styles}
                                translator={translator}
                            />
                        )}

                        <Map
                            stylesProps={{ height: '95%', zIndex: 1 }}
                            classNameProps={'w-md-75 w-100 ms-0 me-0 ms-md-2 mt-3 me-md-3 rounded-4'}
                            isMobile={isMobile}

                        />
                    </div>
                </div>
            </div>

            <div className={`position-absolute top-50 start-50 translate-middle z-3 `}>
                {showModal
                    && <ModalWeb
                        styles={styles}
                        patterStyle={patterStyle}
                        blockIcon={blockIcon}
                        isMobile={isMobile}
                        translator={translator}
                    />
                }
            </div>
        </>
    )
}

export default SectionMain;