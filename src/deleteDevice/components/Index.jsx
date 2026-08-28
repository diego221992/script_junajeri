import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import FaceID from "./FaceID"
import imgAppID from "../assets/img/imgAppID.png";
import translator from "../../api/translator";

const appleLogo = (
  <svg width="100" height="100" viewBox="0 0 80 80" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.7,21.2c-2.6,0-5.8-1.8-9.6-1.8c-3.9,0-7.1,1.7-9.6,1.7c-2.7,0-6.1-1.6-10.1-1.6c-5.2,0-10,3-12.7,7.7
      c-5.4,9.3-1.4,23.1,3.9,30.7c2.6,3.7,5.7,7.8,9.8,7.7c3.8-0.1,5.2-2.5,9.8-2.5c4.6,0,5.8,2.5,9.8,2.5c4.1,0,7-3.7,9.6-7.4
      c2.6-3.8,3.7-7.5,3.7-7.7c-0.1-0.1-7.1-2.7-7.2-10.7c-0.1-6.7,5.5-9.9,5.7-10C60.1,25.2,56.7,21.2,53.7,21.2z"/>
    <path d="M49.7,13.7c1.8-2.2,3-5.3,2.7-8.4c-2.6,0.1-5.8,1.7-7.7,3.9c-1.7,2-3.2,5.1-2.6,8.1C45.1,17.6,47.9,15.9,49.7,13.7z" />
  </svg>
);

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showFaceID, setShowFaceID] = useState(false);

  const [lang, setLang] = useState('es');
  const [translations, setTranslations] = useState(null);

  const detectLanguage = () => {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const shortLang = browserLang.split('-')[0];
    return shortLang;
  };


  useEffect(() => {
    const fetchTranslations = async () => {
      const detectedLang = detectLanguage();
      setLang(detectedLang);
      const loaded = await translator.loadTranslations('/translatorDeleteDevice.json');
      setTranslations(loaded);
    };
    fetchTranslations();
  }, []);

  const translate = (text) => {
    if (!translations) return text;
    if (!translations[lang]) return text;
    return translations[lang][text] || text;
  };


  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 4), 30);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setShowFaceID(true);
      }, 1000);
    }
  }, [progress]);

  if (showFaceID) {
    return <FaceID 
      translator={translate}
    />;
  }

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Centra verticalmente
      }}
    >
      <div style={{ marginBottom: 25, marginTop: -40 }}>
        <img src={imgAppID} alt="App ID" width="auto" height={80} />
      </div>
      <div style={{ width: 250 }}>
        <ProgressBar
          now={progress}
          style={{
            height: 8,
            backgroundColor: "#222",
            borderRadius: 10,
          }}
          variant="light"
          animated
        />
      </div>
    </div>
  );
};

export default LoadingScreen;