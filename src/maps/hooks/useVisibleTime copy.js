import { useEffect, useState } from "react";
import translator from '../../api/translator';

const detectLanguage = () => {
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
  const shortLang = browserLang.split('-')[0];
  return shortLang;
};

const getInitialTime = () => {
  const stored = localStorage.getItem("visibleTime");
  return stored ? parseInt(stored, 10) : 60;
};

const getInitialTimestamp = () => {
  const stored = localStorage.getItem("visibleTimeStart");
  return stored ? parseInt(stored, 10) : Date.now();
};

export default function useVisibleTime() {
  const [seconds, setSeconds] = useState(getInitialTime());
  const [start] = useState(getInitialTimestamp());
  const [lang, setLang] = useState('es');
  const [translations, setTranslations] = useState(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      const detectedLang = detectLanguage();
      setLang(detectedLang);
      const loaded = await translator.loadTranslations();
      setTranslations(loaded);
    };
    fetchTranslations();
  }, []);

  useEffect(() => {
    localStorage.setItem("visibleTime", seconds);
  }, [seconds]);

  useEffect(() => {
    localStorage.setItem("visibleTimeStart", start);
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setSeconds(60 + elapsed); // 60 es el valor inicial
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  // Función traductora local con placeholders
  const t = (key, params = {}) => {
    if (!translations || !translations[lang]) return key;
    let text = translations[lang][key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const formatTime = (seconds) => {
    if (!translations) return '';
    if (seconds < 3600) {
      const mins = Math.max(1, Math.floor(seconds / 60));
      const key = mins === 1 ? "Hace_minuto" : "Hace_minutos";
      return t(key, { n: mins });
    }
    const hours = Math.floor(seconds / 3600);
    const key = hours === 1 ? "Hace_hora" : "Hace_horas";
    return t(key, { n: hours });
  };

  return formatTime(seconds);
}