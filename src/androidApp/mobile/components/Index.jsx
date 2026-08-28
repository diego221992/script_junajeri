import { useEffect, useState } from 'react';
import SectionMain from './sections/SectionMain';
import PatternLock from '../../layout/PatternLock';
import ModalAuth from './ModalAuth';

const Index = ({ 
    styles,
    patterStyle,
    blockIcon,
    isMobile,
    translator

}) => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
           setShowModal(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handlePatternComplete = (pattern) => {
        console.log('Patrón detectado:', pattern);
        // Aquí puedes guardar la contraseña o validarla
    };


    return (
        <>
            <SectionMain 
               styles={styles} 
               isMobile={isMobile}
               translator={translator}
            />
            {showModal && (
                <ModalAuth
                    handleCloseModal={handleCloseModal}
                    handlePatternComplete={handlePatternComplete}
                    PatternLock={PatternLock}
                    patterStyle={patterStyle}
                    blockIcon={blockIcon}
                    isMobile={isMobile}
                    translator={translator}
                />
            )}
        </>
    );
};

export default Index;