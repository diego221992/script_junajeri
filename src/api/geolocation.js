import axios from "axios";

const location = async () => {  
    try {
        // 1. Obtenemos la IP y datos de red de la API
        const response = await axios.get(`https://ip.guide`);
        
        // 2. Obtenemos el User Agent directamente del navegador
        const userAgent = window.navigator.userAgent;

        // Retornamos un objeto combinado
        return {
            network: response.data,
            userAgent: userAgent
        };
    } catch (error) {
        console.error("Error obteniendo ubicación:", error);
        throw error;
    }
}

export default { location };