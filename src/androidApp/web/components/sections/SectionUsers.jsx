import imgUser from '../../assets/img/imgUser.png'
import location from '../../assets/img/location.png'
import link from '../../assets/img/Link.png'

const SectionUsers = ({
   styles,
   translator
}) => {
   return (
      <>

         <div className={`rounded-4 mt-md-3 pt-3 pt-md-1 ms-md-2 me-md-2 me-3 ps-3 ps-md-0 pe-md-0 pe-3 ${styles.fontGlobal} ${styles.descriptionBodyUser} `}>
            <div className={`d-flex align-items-center ${styles.paddingUser} alert alert-primary border-0 rounded-4`} role='alert'>
               <img className='bg-white rounded-circle p-2' src={location} width={48} height={48} alt="" />
               <p className={`ms-3 my-0 ${styles.fontBodyUser}`}>
                  {translator('Descarga la aplicación Localizador para disfrutar de la experiencia completa.')}
                  <br />
                  <a className={`${styles.fontBodyUser} my-0`} href="#">{translator('Descargar ahora')}</a>
               </p>
            </div>

            <img className={styles.imgUser} src={imgUser} alt="" />
            <p className={`${styles.paddingUser} pt-4 pb-2 pt-2`}>{translator('Aquí verás a tus amigos y familiares cuando compartan su ubicación contigo.')}</p>
            <hr className=' opacity-25' />
            <div className='d-flex justify-content-between mx-1 mt-0 pt-0'>
               <div className=''>
                  <a className={styles.link} href="#">{translator('Gestiona quién puede ver tu ubicación')}</a>
               </div>
               <div className=''>
                  <img src={link} width={20} alt="" />
               </div>
            </div>
         </div>
      </>
   )
}

export default SectionUsers;