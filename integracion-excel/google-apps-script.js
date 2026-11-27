/**
 * COSTA TRANSPORT E.I.R.L. — Integración en Tiempo Real con Google Sheets / Excel
 * -------------------------------------------------------------------------------
 * Pega este código en Extensiones > Apps Script dentro de tu Hoja de Cálculo de Google.
 * Crea automáticamente 2 pestañas:
 *   1. "Cotizaciones"
 *   2. "Libro_de_Reclamaciones"
 *
 * Además envía notificación automática por correo electrónico al registrar cada formulario.
 */

const CORREO_COTIZACIONES = 'gerencia@costatransport.com.pe, operaciones@costatransport.com.pe';
const CORREO_RECLAMACIONES = 'legal@costatransport.com.pe';
const ENVIAR_CORREOS = true; // Pon en false si solo deseas guardar en la hoja sin alertas por email

const primerCorreo = (lista) => String(lista || '').split(',')[0].trim();

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.tipoRegistro === 'reclamacion') {
      const sheet = obtenerOCrearHoja(ss, 'Libro_de_Reclamaciones', [
        'Código Hoja',
        'Fecha y Hora (Perú)',
        'Tipo Doc.',
        'N° Documento',
        'Consumidor / Razón Social',
        'Domicilio',
        'Teléfono',
        'Correo Electrónico',
        'Padre/Madre (Menor)',
        'Tipo Bien',
        'Monto Reclamado',
        'Descripción del Servicio/Bien',
        'Tipo (Reclamo/Queja)',
        'Detalle de la Reclamación',
        'Pedido del Consumidor',
        'Estado'
      ]);

      sheet.appendRow([
        data.codigo || '',
        data.fecha || new Date().toLocaleString('es-PE'),
        data.tipoDocumento || 'DNI',
        data.numeroDocumento || '',
        data.nombreCompleto || '',
        data.domicilio || '',
        data.telefono || '',
        data.email || '',
        data.apoderado || '',
        data.tipoBien || 'Servicio',
        data.montoReclamado || '',
        data.descripcionBien || '',
        data.tipoReclamacion || 'Reclamo',
        data.detalleReclamacion || '',
        data.pedidoConsumidor || '',
        data.estado || 'Pendiente (15 días hábiles)'
      ]);

      if (ENVIAR_CORREOS) {
        MailApp.sendEmail({
          to: CORREO_RECLAMACIONES,
          replyTo: data.email || primerCorreo(CORREO_RECLAMACIONES),
          subject: `[Libro de Reclamaciones] ${data.tipoReclamacion} - ${data.codigo}`,
          body:
            `Se ha registrado una nueva hoja en el Libro de Reclamaciones Virtual:\n\n` +
            `Código: ${data.codigo}\n` +
            `Fecha: ${data.fecha}\n` +
            `Consumidor: ${data.nombreCompleto} (${data.tipoDocumento} ${data.numeroDocumento})\n` +
            `Domicilio: ${data.domicilio}\n` +
            `Teléfono: ${data.telefono} | Correo: ${data.email}\n` +
            `Bien Contratado: ${data.tipoBien} — ${data.descripcionBien}\n` +
            `Monto Reclamado: ${data.montoReclamado || 'No especificado'}\n` +
            `Tipo: ${data.tipoReclamacion}\n` +
            `Detalle: ${data.detalleReclamacion}\n` +
            `Pedido: ${data.pedidoConsumidor}\n\n` +
            `Recordatorio legal: Plazo máximo de respuesta 15 días hábiles (Ley N° 31435).`
        });

        // Copia automática de constancia al consumidor
        if (data.email) {
          MailApp.sendEmail({
            to: data.email,
            replyTo: primerCorreo(CORREO_RECLAMACIONES),
            subject: `Constancia Libro de Reclamaciones ${data.codigo} - COSTA TRANSPORT E.I.R.L.`,
            body:
              `Estimado(a) ${data.nombreCompleto},\n\n` +
              `Confirmamos el registro de su ${data.tipoReclamacion} en el Libro de Reclamaciones Virtual de COSTA TRANSPORT E.I.R.L.\n\n` +
              `Código de Hoja: ${data.codigo}\n` +
              `Fecha: ${data.fecha}\n` +
              `Detalle: ${data.detalleReclamacion}\n` +
              `Pedido: ${data.pedidoConsumidor}\n\n` +
              `Daremos respuesta a su solicitud en un plazo no mayor a 15 días hábiles.\n\n` +
              `Atentamente,\nÁrea Legal — COSTA TRANSPORT E.I.R.L. (Paita, Perú)`
          });
        }
      }
    } else {
      // Cotización / Contacto
      const sheet = obtenerOCrearHoja(ss, 'Cotizaciones', [
        'Fecha y Hora (Perú)',
        'Nombre o Empresa',
        'RUC',
        'Correo Electrónico',
        'Teléfono / Celular',
        'Servicio Requerido',
        'Detalle / Mensaje',
        'Estado'
      ]);

      sheet.appendRow([
        data.fecha || new Date().toLocaleString('es-PE'),
        data.nombre || data.fname || '',
        data.ruc || '',
        data.email || '',
        data.telefono || data.phone || '',
        data.asunto || data.subject || '',
        data.mensaje || data.message || '',
        'Nueva'
      ]);

      if (ENVIAR_CORREOS) {
        MailApp.sendEmail({
          to: CORREO_COTIZACIONES,
          replyTo: data.email || primerCorreo(CORREO_COTIZACIONES),
          subject: `[Nueva Cotización Web] ${data.nombre || data.fname} - RUC ${data.ruc}`,
          body:
            `Has recibido una nueva solicitud de cotización desde la web:\n\n` +
            `Fecha: ${data.fecha}\n` +
            `Empresa/Cliente: ${data.nombre || data.fname}\n` +
            `RUC: ${data.ruc}\n` +
            `Correo: ${data.email}\n` +
            `Teléfono: ${data.telefono || data.phone}\n` +
            `Servicio: ${data.asunto || data.subject}\n` +
            `Detalle:\n${data.mensaje || data.message}\n`
        });
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function obtenerOCrearHoja(ss, nombreHoja, encabezados) {
  let sheet = ss.getSheetByName(nombreHoja);
  if (!sheet) {
    sheet = ss.insertSheet(nombreHoja);
    sheet.appendRow(encabezados);
    const headerRange = sheet.getRange(1, 1, 1, encabezados.length);
    headerRange.setBackground('#0B2230');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
