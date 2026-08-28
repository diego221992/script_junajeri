import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router';
import { useData } from './context/UserContext';
import Index from './Index';
import Spinner from './Spinner';

function App() {
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">

      {/* 1. MIENTRAS LA DB RESPONDE */}
      {loading && (
        <>
          {/*<h1 className="text-xl" style={{ color: "cyan" }}>Sincronizando con el servidor...</h1>*/}
          <Spinner size={40} strokeWidth={3} />
        </>
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

      {/* 3. SI LA DB DIJO QUE NO O HUBO ERROR (Storage borrado) */}
      {!loading && isReady === false && (
        <div className="text-center">
          <h1 className="text-2xl" style={{ color: "red" }}></h1>
          <p className="mt-2 text-slate-400"></p>
        </div>
      )}

      {/* 4. ESTADO INICIAL */}
      {/* 4. ESTADO INICIAL (Capa superior, centrado total) */}
      {isReady === null && !loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
          <div className="flex flex-col items-center gap-4">
            {/* Si quieres que el Spinner sea el centro del universo, 
        asegúrate de que no haya otros elementos empujándolo. 
      */}
            <Spinner
              size={40} // Lo subí un poco de tamaño para que se vea mejor en pantalla completa
              strokeWidth={3}
              color={localStorage.getItem('darkMode') === 'true' ? '#ffffff' : '#cccccc'}
            />

            {/* Opcional: Si decides descomentar el texto, ya está alineado debajo del spinner */}
            {/* <h1 className="text-xl font-medium text-blue-500">Esperando código...</h1> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;