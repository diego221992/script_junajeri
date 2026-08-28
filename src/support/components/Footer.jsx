import React, { useEffect, useState } from 'react';

const Footer = ({ translate, lang, stylesApp}) => {

   const [resizeDevice, setSesizeDevice] = useState('');
   useEffect(() => {

      document.addEventListener('click', function (event) {
         const input = document.getElementById('floatingInput');
         const soporteBuscar = document.getElementById('soporte-buscar');
         const isClickInside = input.contains(event.target) || soporteBuscar.contains(event.target);

         if (!isClickInside) {
            const bsCollapse = new bootstrap.Collapse(soporteBuscar, {
               toggle: false
            });
            bsCollapse.hide();
         }
      });

      const handleResize = () => {

         if (window.innerWidth <= 568) {

            setSesizeDevice(true)
            //console.log('Si es movil');
         } else {

            setSesizeDevice(false)
            //console.log('No es movil');
         }
      };

      // Initial check
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup event listener on component unmount
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <>
         <footer className="container-fluid px-0 d-flex justify-content-center flex-column">
            <div className="container-fluid d-flex w-100 justify-content-center flex-column color-section">
               <div className={`${stylesApp.contenedorFooterDos}`}>
                  <div className={`ps-0 ${stylesApp.iconosFooter}`}>
                     <a className="opacity-75 link" href="/">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width={16}
                           height={16}
                           fill="currentColor"
                        >
                           <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                           <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                        </svg></a>

                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                     >
                        <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                     </svg>
                     <span className="opacity-75">{translate(lang, 'Soporte')}</span>

                  </div>

                  <div className={`${stylesApp.contenedorFooter}`}>


                     <div className={`${stylesApp.pFooterDos}`}>
                        <div className="p-footer">
                           <p className="mb-2 ">{translate(lang, 'Soporte de productos')}</p>
                           <p className="plus" data-bs-toggle="collapse" href="#collapseExample" role="button"
                              aria-expanded="false" aria-controls="collapseExample">+</p>
                        </div>

                        <ul className={` ${resizeDevice == false ? 'ul-footer collapse show' : 'ul-footer collapse'}`} id="collapseExample">
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'iPhone')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Mac')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'iPad')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Watch')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'AirPods')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Music')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'TV')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Mapa del sitio del Soporte técnico')}</a></li>
                        </ul>

                     </div>

                     <div className="p-footer-dos">
                        <div className="p-footer">
                           <p>{translate(lang, 'Servicio y reparación')}</p>
                           <p className="plus" data-bs-toggle="collapse" href="#collapseDos" role="button"
                              aria-expanded="false" aria-controls="collapseExample">+</p>
                        </div>
                        <ul className={` ${resizeDevice == false ? 'ul-footer collapse show' : 'ul-footer collapse'}`} id="collapseDos">
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Opciones de reparación de AppIe')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Información de servicio y reparación')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Productos AppIeCare')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Garantías de hardware')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Contratos de licencia de software')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Soporte de cortesía')}</a></li>
                        </ul>
                     </div>

                     <div className="p-footer-dos">
                        <div className="p-footer">
                           <p>{translate(lang, 'Recursos')}</p>
                           <p className="plus" data-bs-toggle="collapse" href="#collapseTres" role="button"
                              aria-expanded="false" aria-controls="collapseExample">+</p>
                        </div>
                        <ul className={` ${resizeDevice == false ? 'ul-footer collapse show' : 'ul-footer collapse'}`} id="collapseTres">
                           <li><a className="link" href="/">{translate(lang, 'Mi apoyo')}</a></li>
                           <li><a className="link" href="/">{translate(lang, 'Documentación del producto')}</a></li>
                           <li><a className="link" href="/">{translate(lang, 'Videos de soporte de AppIe')}</a></li>
                           <li><a className="link" href="/">{translate(lang, 'Accesibilidad')}</a></li>
                        </ul>
                     </div>

                     <div className="p-footer-dos">
                        <div className="p-footer">
                           <p>{translate(lang, 'Conéctate')}</p>
                           <p className="plus" data-bs-toggle="collapse" href="#collapseCuatro" role="button"
                              aria-expanded="false" aria-controls="collapseExample">+</p>
                        </div>
                        <ul className={` ${resizeDevice == false ? 'ul-footer collapse show' : 'ul-footer collapse'}`} id="collapseCuatro">
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Comunícate con nosotros')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'App Soporte de AppIe')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, 'Comunidades de AppIe')}</a></li>
                           <li className="mb-1"><a className="link" href="/">{translate(lang, '@AppIeSupport')}</a></li>
                        </ul>
                     </div>

                  </div>
               </div>
            </div>

            <div className="ultimo-seccion-uno-footer color-section">
               <div className="ultimo-seccion-footer">

                  <div className="texto-uno-footer">
                     <p className="opacity-50 mb-0">
                        {`Copyright © ${new Date().getFullYear()} ${translate(lang, 'AppIe Inc. Todos los derechos reservados.')}`}
                     </p>
                     <div>
                        <a className="link" href="/">{translate(lang, 'Política de privacidad')} <span className="m-2"> | </span> </a>
                        <a className="link" href="/"> {translate(lang, 'Ventas y reembolsos')} <span className="m-2"> | </span> </a>
                        <a className="link" href="/"> {translate(lang, 'Aviso Legal')} <span className="m-2"> | </span> </a>
                        <a className="link" href="/"> {translate(lang, 'Mapa del sitio')}</a>
                     </div>
                  </div>
                  <div className="texto-dos-footer"><a className="link" href="/">{translate(lang, 'Mexico')}</a></div>
               </div>
            </div>


         </footer>
      </>
   )
}

export default Footer;