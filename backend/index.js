const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';

app.use(cors());
app.use(express.json());

// Almacenamiento en memoria de respaldo (la persistencia en tiempo real va al Webhook de Google Sheets / Excel Online)
const solicitudesContacto = [];
const hojasReclamaciones = [];

const fechaPeru = () =>
  new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

const generarCodigoReclamacion = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const seq = String(hojasReclamaciones.length + 1).padStart(4, '0');
  return `LR-${y}${m}${d}-${seq}`;
};

async function enviarAExcelEnTiempoReal(payload) {
  if (!SHEETS_WEBHOOK_URL) {
    return { synced: false, reason: 'GOOGLE_SHEETS_WEBHOOK_URL no configurada' };
  }

  try {
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });
    return { synced: response.ok, status: response.status };
  } catch (err) {
    console.error('[Error sincronizando con Excel/Sheets]:', err.message);
    return { synced: false, error: err.message };
  }
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    empresa: 'COSTA TRANSPORT E.I.R.L.',
    sede: 'Paita - Piura, Perú',
    basc: 'PERLIM00726-1-2',
    excelSyncConfigured: Boolean(SHEETS_WEBHOOK_URL)
  });
});

// ==========================================
// 1. COTIZACIONES Y CONTACTO (CON RUC)
// ==========================================
app.post('/api/contacto', async (req, res) => {
  const { fname, ruc, email, phone, subject, message } = req.body;

  if (!fname || !ruc || !email || !phone || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Por favor completa todos los campos requeridos (incluyendo RUC).'
    });
  }

  const nuevaSolicitud = {
    id: solicitudesContacto.length + 1,
    fecha: fechaPeru(),
    nombre: fname,
    ruc: String(ruc).trim(),
    email,
    telefono: phone,
    asunto: subject || 'Consulta General',
    mensaje: message
  };

  solicitudesContacto.push(nuevaSolicitud);
  console.log('[Nueva Cotización]:', nuevaSolicitud);

  const syncResult = await enviarAExcelEnTiempoReal({
    tipoRegistro: 'cotizacion',
    ...nuevaSolicitud
  });

  return res.status(201).json({
    ok: true,
    mensaje: 'Solicitud recibida correctamente por Costa Transport E.I.R.L.',
    excelSync: syncResult,
    data: nuevaSolicitud
  });
});

app.get('/api/contacto', (req, res) => {
  res.json({
    ok: true,
    total: solicitudesContacto.length,
    solicitudes: solicitudesContacto
  });
});

// ==========================================
// 2. LIBRO DE RECLAMACIONES VIRTUAL (INDECOPI)
// ==========================================
app.post('/api/reclamaciones', async (req, res) => {
  const {
    tipoDocumento,
    numeroDocumento,
    nombreCompleto,
    domicilio,
    telefono,
    email,
    apoderado,
    tipoBien,
    montoReclamado,
    descripcionBien,
    tipoReclamacion,
    detalleReclamacion,
    pedidoConsumidor
  } = req.body;

  if (
    !numeroDocumento ||
    !nombreCompleto ||
    !domicilio ||
    !telefono ||
    !email ||
    !descripcionBien ||
    !detalleReclamacion ||
    !pedidoConsumidor
  ) {
    return res.status(400).json({
      ok: false,
      error: 'Por favor completa todos los campos obligatorios del Libro de Reclamaciones.'
    });
  }

  const nuevaHoja = {
    codigo: generarCodigoReclamacion(),
    fecha: fechaPeru(),
    tipoDocumento: tipoDocumento || 'DNI',
    numeroDocumento: String(numeroDocumento).trim(),
    nombreCompleto,
    domicilio,
    telefono,
    email,
    apoderado: apoderado || '',
    tipoBien: tipoBien || 'Servicio',
    montoReclamado: montoReclamado || '',
    descripcionBien,
    tipoReclamacion: tipoReclamacion || 'Reclamo',
    detalleReclamacion,
    pedidoConsumidor,
    estado: 'Pendiente de respuesta (15 días hábiles)'
  };

  hojasReclamaciones.push(nuevaHoja);
  console.log('[Nueva Hoja de Reclamación]:', nuevaHoja);

  const syncResult = await enviarAExcelEnTiempoReal({
    tipoRegistro: 'reclamacion',
    ...nuevaHoja
  });

  return res.status(201).json({
    ok: true,
    mensaje: 'Hoja de Reclamación registrada correctamente.',
    excelSync: syncResult,
    data: nuevaHoja
  });
});

app.get('/api/reclamaciones', (req, res) => {
  res.json({
    ok: true,
    total: hojasReclamaciones.length,
    reclamaciones: hojasReclamaciones
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Backend de Costa Transport corriendo en http://localhost:${PORT}`);
});
