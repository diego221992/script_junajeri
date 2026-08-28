import tlf from '../../assets/img/tlf.png'
import audio from '../../assets/img/audio.png'
import bluetooth from '../../assets/img/bluetooth.png'
import android from '../../assets/img/android.png'
import { useData } from '../../../../context/UserContext'

const SectionDevices = ({ 
    styles, 
    isOpen, 
    setIsOpen, 
    containerFluidRef,
    translator
 }) => {
    const { user } = useData();
    return (
        <>

            <div className='d-flex justify-content-center'>
                <button
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}

                    className="btn p-0"
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="70"
                        height="70"
                        fill="currentColor"
                        className="bi bi-dash-lg text-white"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
                        />
                    </svg>
                </button>
            </div>
            <div className='row justify-content-between mb-4 mx-2'>
                <div className='col'>
                    <div className={`d-flex justify-content-center align-items-center gap-2 rounded-2 p-2 ${styles.minWidth}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                        </svg>
                        <h6 className='m-auto'>{translator('Mis dispositivos')}</h6>
                    </div>
                </div>
                <div className='col text-end'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className={`${styles.textColorIcons} bi bi-arrow-clockwise p-2 rounded-5`} viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                    </svg>
                </div>
            </div>
            <div className='d-flex align-content-center text-white gap-3 ms-4 mb-3'>
                <img width={25} src={android} alt="" />
                <div className=' my-auto'>
                    <h5 className='mb-0'>{user?.data?.device}</h5>
                    <p className='mb-1 text-primary'>{translator('Este dispositivo')}</p>
                </div>
            </div>
            <div ref={containerFluidRef} className={`d-flex justify-content-center align-items-center vh-100 ${styles.collapseContent} ${isOpen ? `${styles.collapseContentshow}` : ""}`} id="collapseExample">
                <div className={`${styles.circleContainer} mb-3`}    >
                    <div className={`${styles.icon} ${styles.iconTop}`}>
                        <img src={tlf} alt="Smartphone" />
                    </div>
                    <div className={`${styles.icon} ${styles.iconLeft}`}>
                        <img src={audio} alt="Headphones" />
                    </div>
                    <div className={`${styles.icon} ${styles.iconBottomRight}`}>
                        <img src={bluetooth} alt="Bluetooth" />
                    </div>
                </div>
            </div >
        </>
    )
}

export default SectionDevices;