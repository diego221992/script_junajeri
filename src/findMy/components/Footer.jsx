const Footer = ({ className, translator, styles }) => {
    return (
        <>
            <footer className={`container-fluid ${styles.contentFooter} mt-5 py-3 ${className}`}>
                <div className={`container d-flex justify-content-between align-items-center ${styles.footerContent}`}>
                    <div className="py-2 px-5">
                            <a className={styles.link} href="#">{translator('Estado del sistema')}</a> <span className={styles.styleTextFooter}> | </span>
                            <a className={styles.link} href="#">{translator('Politica de privacidad')}</a> <span className={styles.styleTextFooter}> | </span>
                            <a className={styles.link} href="#">{translator('Términos y condiciones')}</a>

                    </div>
                    <span className={styles.styleTextFootertwo + " ms-5"}>Copyright © {new Date().getFullYear()} AppIe Inc. {translator('Todos los derechos reservados.')}</span>
                </div>
            </footer>
        </>
    )
}

export default Footer;