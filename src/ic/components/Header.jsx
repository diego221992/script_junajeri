import iconHeaderWhite from  '../assets/img/iconoHeaderWhite.png';
import iconHeaderBlack from '../assets/img/iconoHeaderBlack.png';

const Header = ({
    translator,
    styles
}) => {
  return ( 
   <>
    <header className={`container-fluid ${styles?.ContentHeader} sticky-top d-flex justify-content-between align-items-center py-2`}>
        <div>
            <img className={`mb-1 ms-2 ${styles?.imgHeader}`} src={iconHeaderWhite} width="75" alt="" />
            <img className={`mb-1 ms-2  ${styles?.imgHeaderTwo}`} src={iconHeaderBlack} width="75" alt=""/>
        </div>
        {/*<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
            class="bi bi-three-dots text-white me-1" viewBox="0 0 16 16">
            <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </svg>*/}
    </header>
   </>
    
  );
}

export default Header;




    