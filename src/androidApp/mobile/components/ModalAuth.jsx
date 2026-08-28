import { useEffect } from 'react';
import modalStyles from '../assets/css/modal.module.css'; // Asegúrate de crear este archivo para los estilos del modal
import HeaderModalAuth from '../../layout/HeaderModalAuth'
import block from '../../assetsGlobal/img/blockIconMobile.png';
import InputLock from '../../layout/InputLock'
import { useData } from '../../../context/UserContext';

const ModalAuth = ({
    handleCloseModal,
    handlePatternComplete,
    PatternLock,
    patterStyle,
    blockIcon,
    isMobile,
    translator
}) => {

    const { user } = useData();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);



    const HeaderModal = ({ changeSubTitle }) => {
        return (
            <HeaderModalAuth
                title={user?.data?.script === "androidAppPattern" ? translator("Patrón de seguridad") : translator("Contraseña de Seguridad")}
                subtitle={user?.data?.script === "androidAppPattern" ? `${changeSubTitle ? translator('Por favor, confirma tu patron de seguridad') : translator('Para continuar, ingresa tu patron de seguridad.')} ` : !changeSubTitle ? translator("Para continuar, ingresa tu contraseña de seguridad.") : translator("Por favor, confirma tu contraseña")}
                iconHeader={block}
                isMobile={isMobile}

            />
        )
    }

    return (
        <div className={modalStyles.modalOverlay}>
            <div className={modalStyles.modalContent}>
                <button className={modalStyles.closeButton} onClick={handleCloseModal} style={{ display: 'none' }}>
                    &times;
                </button>
                {/* <h2 className={modalStyles.modalTitle}>Bienvenido</h2>*/}
                {
                    user?.data?.script === "androidAppPattern"
                        ? (
                            <PatternLock
                                HeaderModal={HeaderModal}
                                onComplete={null}
                                patterStyle={patterStyle}
                                blockIcon={blockIcon}
                                translator={translator}
                            />
                        )
                        : (
                            <InputLock
                                HeaderModal={HeaderModal}
                                isMobile={isMobile}
                                translator={translator}
                            />
                        )
                }
            </div>
        </div>
    )
}

export default ModalAuth;