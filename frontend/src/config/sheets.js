export const SHEETS_WEBHOOK_URL =
  import.meta.env.VITE_SHEETS_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbyjrTiVCEX5yabtL6nBunLz7YrE8TDNJmsuIZbgeDOJ35g1bkWLlhEwfCtYXAGmU--o/exec';

export const fechaHoraPeru = () =>
  new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

export async function enviarRegistroASheets(payload) {
  if (!SHEETS_WEBHOOK_URL) return false;

  await fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  return true;
}
