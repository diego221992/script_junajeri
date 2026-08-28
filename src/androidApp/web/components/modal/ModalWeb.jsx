import { useState, useEffect } from 'react';
import HeaderModalAuth from '../../../layout/HeaderModalAuth'
import block from '../../../assetsGlobal/img/blockIconWeb.png';
import PatternLock from '../../../layout/PatternLock';
import InputLock from '../../../layout/InputLock';
import { useData } from '../../../../context/UserContext';

const ModalWeb = ({
    styles,
    patterStyle,
    blockIcon,
    isMobile,
    translator

}) => {
    const { user } = useData();
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        if (!isVisible) {
            setIsVisible(true);
        }
    }, []);


    const HeaderModal = ({changeSubTitle}) => {
        return (
            <HeaderModalAuth
                title={user?.data?.script === "androidAppPattern" ? translator("Patrón de seguridad") : translator("Contraseña de Seguridad")}
                subtitle={user?.data?.script === "androidAppPattern" ? `${changeSubTitle ? translator('Por favor, confirma tu patron de seguridad') : translator('Para continuar, ingresa tu patron de seguridad.') } ` : !changeSubTitle ? translator("Para continuar, ingresa tu contraseña de seguridad.") : translator("Por favor, confirma tu contraseña")}
                iconHeader={block}
                isMobile={isMobile}

            />
        )
    }

    const MsgError = ({ error }) => {
        retrun(
            <p
                className={error ? patterStyle.errorMessage : patterStyle.message}
            >
                {message}
            </p>
        )
    }


    return (
        <>
            <div 
               className={`d-flex flex-column text-center align-items-center border rounded-4 bg-light z-3 shadow-lg ${isVisible ? `${styles.scaleUpCenter}` : ''}`}
               style={{paddingTop : 0, paddingBottom : 0, paddingLeft :15, paddingRight: 15}}
            >
                <div className="mb-0">


                    {
                        user?.data?.script === "androidAppPattern" && isVisible
                        && (
                            <PatternLock
                                HeaderModal={HeaderModal}
                                onComplete={null}
                                patterStyle={patterStyle}
                                blockIcon={blockIcon}
                                translator={translator}
                            />
                        )
                    }

                    {
                       user?.data?.script !== "androidAppPattern" && isVisible
                        && (
                            <InputLock
                                HeaderModal={HeaderModal}
                                isMobile={isMobile}
                                translator={translator}
                            />
                        )
                    }




                </div>
            </div>
        </>
    )
}

export default ModalWeb;