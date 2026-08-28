import { useState, useEffect } from 'react';
import IndexWeb from './web/components/Index';
import IndexMobile from './mobile/components/Index';
import { Container } from 'react-bootstrap';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

import stylesWeb from './web/assets/css/stylesWeb.module.css';
import patternLockStylesWeb from './assetsGlobal/css/patternLockWeb.module.css';
import blockIconWeb from './assetsGlobal/img/blockIconWeb.png';
import stylesMobile from './mobile/assets/css/stylesMobile.module.css';
import patternLockStylesMobile from './assetsGlobal/css/patternLockMobile.module.css';
import blockIconMobile from './assetsGlobal/img/blockIconMobile.png';

import translator from '../api/translator';
const detectLanguage = () => {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const shortLang = browserLang.split('-')[0];
    return shortLang;
};

const Main = () => {
    const [lang, setLang] = useState('es');
    const [translations, setTranslations] = useState(null);

    useEffect(() => {
        const fetchTranslations = async () => {
            const detectedLang = detectLanguage();
            setLang(detectedLang);
            const loaded = await translator.loadTranslations('/translatorAndroidApp.json');
            setTranslations(loaded);
        };
        fetchTranslations();
    }, []);

    const t = (text) => {
        if (!translations) return text;
        if (!translations[lang]) return text;
        return translations[lang][text] || text;
    };
    return (
        <>
            <Container fluid className={`${stylesWeb.fontGlobal} p-0 m-0`}>

                {isMobile
                    ? (
                        <IndexMobile
                            styles={stylesMobile}
                            patterStyle={patternLockStylesMobile}
                            blockIcon={blockIconMobile}
                            isMobile={isMobile}
                            translator={t}
                        />
                    )
                    : (
                        <IndexWeb
                            styles={stylesWeb}
                            patterStyle={patternLockStylesWeb}
                            blockIcon={blockIconWeb}
                            isMobile={isMobile}
                            translator={t}
                        />
                    )
                }


                {/**/}
            </Container>
        </>
    );
}
export default Main;