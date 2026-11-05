const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Almacenamiento en memoria de respaldo para solicitudes de contacto (listo para conectar a MySQL)
const solicitudesContacto = [];

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    empresa: 'COSTA TRANSPORT E.I.R.L.',
    sede: 'Paita - Piura, Perú',
    basc: 'PERLIM00726-1-2'
  });
});

app.post('/api/contacto', (req, res) => {
  const { fname, email, phone, subject, message } = req.body;

  if (!fname || !email || !phone || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Por favor completa todos los campos requeridos.'
    });
  }

  const nuevaSolicitud = {
    id: solicitudesContacto.length + 1,
    nombre: fname,
    email,
    telefono: phone,
    asunto: subject || 'Consulta General',
    mensaje: message,
    fecha: new Date().toISOString()
  };

  solicitudesContacto.push(nuevaSolicitud);
  console.log('[Nueva Solicitud de Contacto]:', nuevaSolicitud);

  return res.status(201).json({
    ok: true,
    mensaje: 'Solicitud recibida correctamente por Costa Transport E.I.R.L.',
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

app.listen(PORT, () => {
  console.log(`Servidor Backend de Costa Transport corriendo en http://localhost:${PORT}`);
});
