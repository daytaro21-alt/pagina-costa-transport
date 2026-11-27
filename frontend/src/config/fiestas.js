/**
 * Configuración del anuncio corporativo de Navidad y Año Nuevo.
 *
 * Se activa automáticamente durante la temporada festiva según la fecha
 * oficial de Perú (America/Lima) y se muestra una sola vez por sesión.
 *
 * Para previsualizar fuera de temporada, abre la web con: ?preview=fiestas
 */
export const FIESTAS_CONFIG = {
  activo: true,
  // Rango automático inclusivo (mes 1-12, día 1-31): 27 de noviembre al 6 de enero
  inicio: { mes: 11, dia: 27 },
  fin: { mes: 1, dia: 6 },
  storageKeyPrefix: 'costa_anuncio_fiestas_visto',
  previewParam: 'preview',
  previewValue: 'fiestas'
};

/**
 * Obtiene año, mes (1-12) y día (1-31) actuales en zona horaria de Perú.
 */
export function obtenerFechaPeru(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day)
  };
}

/**
 * Verifica si la fecha indicada cae dentro de la temporada festiva configurada.
 * Soporta rangos que cruzan de diciembre a enero.
 */
export function estaEnTemporadaFiestas(date = new Date(), config = FIESTAS_CONFIG) {
  if (!config.activo) return false;

  const { month, day } = obtenerFechaPeru(date);
  const actual = month * 100 + day;
  const inicio = config.inicio.mes * 100 + config.inicio.dia;
  const fin = config.fin.mes * 100 + config.fin.dia;

  if (inicio <= fin) {
    return actual >= inicio && actual <= fin;
  }
  return actual >= inicio || actual <= fin;
}

/**
 * Calcula automáticamente el Año Nuevo que se celebra (ej. en dic 2026 o ene 2027 -> 2027).
 */
export function obtenerAnioNuevoObjetivo(date = new Date()) {
  const { year, month } = obtenerFechaPeru(date);
  return month >= 7 ? year + 1 : year;
}

/**
 * Detecta si la URL incluye ?preview=fiestas para pruebas fuera de fecha.
 */
export function esVistaPreviaFiestas() {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get(FIESTAS_CONFIG.previewParam) === FIESTAS_CONFIG.previewValue;
  } catch {
    return false;
  }
}

function obtenerStorageKey(date = new Date()) {
  return `${FIESTAS_CONFIG.storageKeyPrefix}_${obtenerAnioNuevoObjetivo(date)}`;
}

/**
 * Determina si el anuncio debe abrirse al ingresar a la página.
 */
export function debeMostrarAnuncioFiestas(date = new Date()) {
  if (esVistaPreviaFiestas()) return true;
  if (!estaEnTemporadaFiestas(date)) return false;

  try {
    return window.sessionStorage.getItem(obtenerStorageKey(date)) !== '1';
  } catch {
    return true;
  }
}

/**
 * Registra que el visitante ya vio el anuncio en la sesión actual.
 */
export function marcarAnuncioFiestasVisto(date = new Date()) {
  if (esVistaPreviaFiestas()) return;
  try {
    window.sessionStorage.setItem(obtenerStorageKey(date), '1');
  } catch {
    // Ignorar errores en navegadores con almacenamiento restringido
  }
}
