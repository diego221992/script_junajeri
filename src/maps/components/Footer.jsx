import phoneBG from '../assets/img/phoneBG.png';
import volume from '../assets/img/volume.png';
import volumeWhite from '../assets/img/volumeWhite.png';
import unlock from '../assets/img/unlock.png';
import unlockWhite from '../assets/img/unlockWhite.png';

import DivFooterOne from './footer/DivFooterOne';
import DivfooterTwo from './footer/DivfooterTwo';

const collEventFooterOne = () => {
    document.getElementById('imgmapa').style.bottom = "410px";
    document.getElementById('imgBrujula').style.bottom = "410px";
    document.querySelector('.windowFooter').style.height = "410px";
    document.querySelector('#divfooterOne').classList.add("d-none");
    document.querySelector('#divfooterTwo').classList.remove("d-none");
    document.querySelector('#divfooterTwo').classList.add("d-block");
    
};

const collEventFooterTwo = () => {
    document.getElementById('imgmapa').style.bottom = "160px";
    document.getElementById('imgBrujula').style.bottom = "160px";
    document.querySelector('.windowFooter').style.height = "159px";
    document.querySelector('#divfooterTwo').classList.add("d-none");
    document.querySelector('#divfooterOne').classList.remove("d-none");
    document.querySelector('#divfooterOne').classList.add("d-block");
};

const Footer = ({
    translator,
    deviceName,
    device
}) => {
    return (
        <>
            <footer className="container-fluid windowFooter">
                <div className="d-flex justify-content-center m-0 p-0 text-muted" style={{height: '30px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-dash-lg"
                        viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                    </svg>
                </div>

                <DivFooterOne 
                    translator={translator}
                    collEventFooterOne={collEventFooterOne} 
                    phoneBG={phoneBG} 
                    deviceName={deviceName}
                    device={device}
                />

                <DivfooterTwo 
                    translator={translator}
                    collEventFooterTwo={collEventFooterTwo} 
                    volume={volume} 
                    volumeWhite={volumeWhite} 
                    unlock={unlock}  
                    unlockWhite={unlockWhite}
                    deviceName={deviceName}
                    device={device}
                />
            </footer>
        </>
    )
};

export default Footer;  