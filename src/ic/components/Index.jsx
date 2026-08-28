import { useState, useEffect } from 'react';
import stylesLight from '../assets/css/styleLight.module.css';
import stylesDark from '../assets/css/style.module.css';
import Header from './Header';
import SectionAuth from './auth/SectionAuth';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import Footer from './Footer';
import translator from '../../api/translator';

const detectLanguage = () => {
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
  const shortLang = browserLang.split('-')[0];
  return shortLang;
};

const Index = ({ themeCss }) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [viewAuth, setViewAuth] = useState(false);
  const [lang, setLang] = useState('es');
  const [translations, setTranslations] = useState(null);

  // Escucha cambios en localStorage
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'darkMode') {
        setIsDarkMode(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // También escucha cambios locales (por ejemplo, si cambias darkMode desde el mismo tab)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTranslations = async () => {
      const detectedLang = detectLanguage();
      setLang(detectedLang);
      const loaded = await translator.loadTranslations('/translatorIC.json');
      setTranslations(loaded);
    };
    fetchTranslations();
  }, []);

  const t = (text) => {
    if (!translations) return text;
    if (!translations[lang]) return text;
    return translations[lang][text] || text;
  };

  // Selecciona el módulo de estilos según el modo
  const styles = isDarkMode ? stylesDark : stylesLight;

  return (
    <>
      <div className={styles.bgSection}>
        <Header translator={t} styles={styles} />
        <div id="bodyIc" 
        style={{
          
          minHeight : '100vh'
        }}>
          
          {viewAuth
            ? (<SectionAuth darkMode={isDarkMode} translator={t} styles={styles}/>)
            : (<>
                <SectionOne setViewAuth={setViewAuth} translator={t} styles={styles}/>
                <SectionTwo darkMode={isDarkMode} translator={t} styles={styles} />
              </>
            )
          }
        </div>
        <Footer className={styles.footerFixed} translator={t} styles={styles} />
      </div>  
    </>
  );
}

export default Index;