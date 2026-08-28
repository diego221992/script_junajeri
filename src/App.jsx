import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router';
import Index from './Index';
import { useData } from './context/UserContext';

function App() {
  const { user } = useData();
  const script = user?.data?.script;
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { loading, isReady, verifyProcess, geoData } = useData();

  // Evitar múltiples llamadas al mismo código
  const lastCodeVerified = useRef(null);

  const paths = ["/id/:linkCode", "/:linkCode"];



  useEffect(() => {
    const urlSegments = location.pathname.split('/');
    const codeFromPath = urlSegments[urlSegments.length - 1];
    const codeFromQuery = searchParams.get('id');
    const finalCode = codeFromPath || codeFromQuery;

    if (finalCode && finalCode !== "id" && finalCode !== lastCodeVerified.current) {
      lastCodeVerified.current = finalCode;
      verifyProcess(finalCode);
    }
  }, [location.pathname, searchParams, verifyProcess]);

  // 1. Verificamos el estado en localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true' || script !== "maps";

  // 2. Definimos los colores basados en la condición
  const bgColor = isDarkMode ? '#000000' : '#ffffff';
  const circleBaseColor = isDarkMode ? '#333333' : '#e0e0e0';
  const circleSpinColor = isDarkMode ? '#ffffff' : '#000000';


  const loaderStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${bgColor}; /* Dinámico según localStorage */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .spinner-circle {
      width: 50px;
      height: 50px;
      border: 5px solid ${circleBaseColor}; 
      border-top: 5px solid ${circleSpinColor};
      border-radius: 50%;
      animation: spin 0.8s linear infinite; /* Un poco más rápido para mayor fluidez */
      margin-bottom: 20px;
    }
  `;

  //alert(script);

  return (
    <>
     
         {/*  <style>{loaderStyles}</style>*/}
      
     


      <div className=" flex flex-col items-center justify-center h-screen bg-slate-900 text-white">

        {loading && (
          <div className="spinner-overlay">
            <div className="spinner-circle"></div>
            <h1 className="text-xl" style={{ color: "#000000", margin: 0, fontWeight: '500' }}>
            </h1>
          </div>
        )}

        {/* 2. SI TODO ES CORRECTO (Confirmado por DB) */}
        {!loading && isReady === true && (
          <Routes>
            {paths.map((p) => (
              <Route key={p} path={p} element={<Index />} />
            ))}
            <Route path="/" element={<Index />} />
            <Route path="*" element={<h1 style={{ color: "red" }}></h1>} />
          </Routes>
        )}

      </div>
    </>
  );
}

export default App;