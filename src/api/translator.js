import axios from 'axios';

let translationsCache = {};

// El archivo JSON es obligatorio como parámetro
export const loadTranslations = async (jsonFile) => {
  if (!jsonFile) throw new Error("Se requiere el nombre del archivo de traducción.");
  if (translationsCache[jsonFile]) return translationsCache[jsonFile];
  const response = await axios.get(jsonFile);
  translationsCache[jsonFile] = response.data;
  return translationsCache[jsonFile];
};

// El archivo JSON es obligatorio como parámetro
export const translate = async (lang, key, params = {}) => {
  if (!jsonFile) throw new Error("Se requiere el nombre del archivo de traducción.");
  const translations = await loadTranslations(jsonFile);
  if (!translations[lang]) lang = 'en';
  let text = translations[lang][key] || key;

  // Si hay variables, reemplázalas
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });

  return text;
};

export default { translate, loadTranslations };