import  styles from '../assetsGlobal/css/modalAuth.module.css'

const HeaderModalAuth = ({ title, subtitle, iconHeader, isMobile }) => {
    return (
        <>
            <div className={styles.headerModal}>
                <div><img src={iconHeader} alt="" className={styles.iconModal}  /></div>
                <h4 style={{ color: isMobile ? 'white' : 'black' }}>{title}</h4>
                <p style={{ color: isMobile ? 'white' : 'black' }}>{subtitle}</p>
            </div>
        </>
    )
}

export default HeaderModalAuth;