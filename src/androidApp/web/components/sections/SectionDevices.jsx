import android from '../../assets/img/android.png'
import arrow from '../../assets/img/arrow.png'
import setting from '../../assets/img/setting.png'
import arrowTwo from '../../assets/img/arrowTwo.png'
import sign from '../../assets/img/sign.png'
import battery from '../../assets/img/battery.png'
import sound from '../../assets/img/sound.png'
import block from '../../assets/img/block.png'
import restore from '../../assets/img/restore.png'
import { useData } from '../../../../context/UserContext';


const SectionDevices = ({ 
    styles,
    translator    
 }) => {
    const { user } = useData();
    return (
        <>
            <div className={`${styles.colorHeader} rounded-4 mx-0 mx-md-2 mt-md-3 pt-md-3 ${styles.descriptionBody} ${styles.fontGlobal}`}>
                <div className={`container d-flex justify-content-between px-0 `}>
                    <button className={`ms-3 ${styles.hoverBtn} ${styles.btnMedium}`}>
                        <img src={arrow} width={18} alt="" />
                    </button>
                    <div className='d-flex gap-2 me-3'>
                        <button className={`${styles.hoverBtn} ${styles.btnMedium}`}>
                            <img src={setting} width={22} alt="" />
                        </button>
                        <button className={`${styles.hoverBtn} ${styles.rotate} ${styles.btnMedium}`}>
                            <img src={arrowTwo} width={17} alt="" />
                        </button>
                    </div>
                </div>

                <div className='d-flex justify-content-md-center align-items-center mt-3 mt-md-4 gap-3'>
                    <div className='py-3 px-4 ms-3 bg-white rounded-4'>
                        <img className='mx-2' src={android} width={33} alt="" />
                    </div>

                    <article className='d-flex w-100 justify-content-between me-3'>
                        <div className='text-start mt-3 '>
                            <h5 className={`${styles.fontBodyMoto}`}>{user?.data?.device}</h5>
                            <p className={`${styles.fontBody} m-0 p-0`}>{translator('Visto por última vez: ahora mismo')}</p>
                            <p className={`${styles.fontBody} mt-2 p-0`}>
                                <img className='me-2 mb-1' src={sign} width={18} alt="" />
                                {translator('LGDeveloper5G')}
                                <img className='mx-2 mb-1' src={battery} width={8} alt="" />
                                {translator('74 %')}
                            </p>
                        </div>

                        <button className={`${styles.hoverBtn} ${styles.btnSmall} ${styles.rotate} me-3`}>
                            <img src={arrowTwo} width={17} alt="" />
                        </button>
                    </article>

                </div>

                <div className='d-flex flex-column gap-3 mt-4 px-3'>
                    <div className='d-flex align-items-center mb-2'>
                        <img className='mx-3' src={sound} width={16} alt="" />
                        <h6 className={`${styles.fontBodySign} mt-1`}>{translator('Reproducir sonido')}</h6>
                    </div>
                    <div className='d-flex align-items-center mb-2'>
                        <img className='mx-3' src={block} width={16} alt="" />
                        <h6 className={`${styles.fontBodySign} mt-1`}>{translator('Bloquear dispositivo')}</h6>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img className='mx-3' src={restore} width={16} alt="" />
                        <h6 className={`mt-1 ${styles.fontBodySign}`}>{translator('Restablecer el estado de fabrica del dispositivo')}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionDevices;