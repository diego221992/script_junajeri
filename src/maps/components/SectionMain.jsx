import React, { useEffect } from 'react';
import iconoSectionWhite from '../assets/img/iconoSectionWhite.png';
import iconoSectionBlack from '../assets/img/iconoSectionBlack.png';
import brujula from '../assets/img/brujula.png';
import menu from '../assets/img/menu.png';
import menu2 from '../assets/img/menu_2.png';
import phonePc from '../assets/img/phone-pc.png';
import phoneBG from '../assets/img/phoneBG.png';
import volume from '../assets/img/volume.png';
import volumeWhite from '../assets/img/volumeWhite.png';
import unlock from '../assets/img/unlock.png';
import unlockWhite from '../assets/img/unlockWhite.png';


import DivWindosOne from './sectionMain/DivWindosOne';
import DivWindosTwo from './sectionMain/DivWindosTwo';
import ModalAuth from './auth/ModalAuth';



const collEventOne = (event) => {
    const btnCollapseOne = document.getElementById("btnCollapseOne");
    const isExpanded = btnCollapseOne.getAttribute("aria-expanded") === "true";
    if (!isExpanded) {
        document.querySelector('.floatWindowPrimary').style.height = "63px";
    } else {
        document.querySelector('.floatWindowPrimary').style.height = "182px";
    }
};


const collapseEventTwo = (event) => {
    const btnCollapseTwo = document.getElementById("btnCollapseTwo");
    const isExpanded = btnCollapseTwo.getAttribute("aria-expanded") === "true";
    if (!isExpanded) {
        document.querySelector('.floatWindowPrimary').style.height = "150px";
        document.getElementById("headercollapseTwo").classList.add("d-block");
        document.getElementById("headercollapseTwo").classList.remove("d-none");
    } else {
        document.querySelector('.floatWindowPrimary').style.height = "504px";
        document.getElementById("headercollapseTwo").classList.add("d-none");
        document.getElementById("headercollapseTwo").classList.remove("d-block");
    }
};

const changeContentOne = () => {

    const btnToggle = document.getElementById("btnToggle");
    const div1 = document.getElementById("divWindosOne");
    const div2 = document.getElementById("divWindosTwo");
    const floatWindowPrimary = document.querySelector(".floatWindowPrimary");

    if (!btnToggle || !div1 || !div2 || !floatWindowPrimary) return;

    function adjustHeight() {
        const visibleDiv = div1.classList.contains("hidden") ? div2 : div1;
        floatWindowPrimary.style.height = visibleDiv.scrollHeight + "px";
    }

    const handleClick = () => {
        div1.classList.add("hidden");
        setTimeout(() => {
            div2.classList.add("visible");
            adjustHeight(); // Ajusta la altura después de mostrar el contenido
        }, 250);
    };

    btnToggle.addEventListener("click", handleClick);
    // Ajusta la altura inicial
    adjustHeight();

    // Cleanup
    return () => {
        btnToggle.removeEventListener("click", handleClick);
    };
}

const changeContentTwo = () => {
    const btnToggle = document.getElementById("btnToggle");
    const btnClose = document.querySelector(".btnClose");
    const div1 = document.getElementById("divWindosOne");
    const div2 = document.getElementById("divWindosTwo");
    const floatWindowPrimary = document.querySelector(".floatWindowPrimary");

    if (!btnToggle || !div1 || !div2 || !floatWindowPrimary) return;

    function adjustHeight() {
        const visibleDiv = div1.classList.contains("hidden") ? div2 : div1;
        floatWindowPrimary.style.height = visibleDiv.scrollHeight + "px";
    }

    // Mostrar div2 y ocultar div1
    btnToggle.addEventListener("click", function () {
        div1.classList.add("hidden");
        setTimeout(() => {
            div2.classList.add("visible");
            adjustHeight(); // Ajusta la altura después de mostrar el contenido
        }, 250);
    });

    // Mostrar div1 y ocultar div2
    btnClose.addEventListener("click", function () {
        div2.classList.remove("visible");
        setTimeout(() => {
            div1.classList.remove("hidden");
            adjustHeight(); // Ajusta la altura después de mostrar el contenido
        }, 250);
    });

    // Ajusta la altura inicial
    adjustHeight();

}
const SectionMain = ({
    translator,
    deviceName,
    device
}) => {

    useEffect(() => {
        changeContentOne();
        changeContentTwo();
    }, []);
    return (
        <>  
           {/* <ModalAuth show={true} handleClose={false} />*/}
            <div className="rounded-3 floatWindowPrimaryWhite floatWindowPrimary" >
       
                <DivWindosOne 
                    translator={translator}
                    collEventOne={collEventOne} 
                    menu={menu} 
                    menu_2={menu2} 
                    phoneBG={phoneBG} 
                    deviceName={deviceName}
                    device={device}
                />

                <DivWindosTwo 
                    translator={translator}
                    collapseEventTwo={collapseEventTwo} 
                    menu={menu} 
                    menu_2={menu2} 
                    phonePc={phonePc} 
                    volume={volume} 
                    volumeWhite={volumeWhite} 
                    unlock={unlock} 
                    unlockWhite={unlockWhite}                      
                    deviceName={deviceName}
                    device={device}
                />
                
            </div>
            <div className="position-fixed start-0 p-3" id="imgmapa" style={{display:'none'}}>
                <img src={iconoSectionBlack} width="70" alt="" />
            </div>
            <div className="position-fixed end-0 p-3" id="imgBrujula"  style={{display:'none'}}>
                <img src={brujula} width="40" height="40" alt="" />
            </div>
        </>
    )
};

export default SectionMain;