import { useState, useEffect} from 'react';
import google from '../assets/img/google.png';
import block from '../assets/img/block.png'
import comment from '../assets/img/comment.png'
import help from '../assets/img/help.png'
import SectionMain from './sections/SectionMain'


const Index = ({ 
  styles,
  patterStyle,
  blockIcon,
  isMobile,
  translator

}) => {

  const [showModal, setShowModal] = useState(false);
  
      useEffect(() => {
          const timeout = setTimeout(() => {
              setShowModal(true); // Muestra el modal después de 3 segundos
          }, 2000);
      }, []);

  return (
    <>
      <div className={`container-fluid ${styles.colorHeader} ${styles.headerSmall} ${showModal ? `${styles.bgOpacity}` : ''} ps-3 pt-3 p-2 d-flex justify-content-between align-items-center`}>
        <div className='d-flex align-items-center'>
          <img className={`ms-3`} src={google} width={72} alt="" />
          <a className={`m-0 ps-2 text-muted ${styles.truncate}`}>
            {translator('Localizador')}
          </a>
        </div>
        <div>
          <button className="btn">
            <img className='mb-1 me-2' src={block} width={11} alt="" />
            <p className={`${styles.pHeader} d-inline `}>{translator('Bloqueo remoto')}</p>
          </button>
          <button className="btn">
            <img src={comment} width={22} alt="" />
          </button>
          <button className="btn">
            <img src={help} width={22} alt="" />
          </button>
        </div>
      </div>
      <SectionMain
        showModal={showModal}
        styles={styles} 
        patterStyle={patterStyle}
        blockIcon={blockIcon}
        isMobile={isMobile}
        translator={translator}

      />
    </>
  )
}

export default Index;