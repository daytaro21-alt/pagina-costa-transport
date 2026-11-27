# Conexión en Tiempo Real con Excel / Google Sheets

La página web y el backend (`backend/index.js`) ya están preparados para registrar **cada Cotización** (con RUC) y **cada Hoja del Libro de Reclamaciones** en una hoja de cálculo en tiempo real.

## Opción 1 (Recomendada y 100% Gratuita): Google Sheets + Exportación Excel (.xlsx)

Ventajas:
- **Tiempo real**: Cada envío aparece al instante como una fila nueva en las pestañas **`Cotizaciones`** y **`Libro_de_Reclamaciones`**.
- **0 costo mensual** y nunca pierde datos (a diferencia del disco local de Render gratuito).
- **Descarga en Excel (`.xlsx`)** con un clic desde `Archivo > Descargar > Microsoft Excel (.xlsx)`.
- **Alertas automáticas por correo**: Avisa a `gerencia@costatransport.com.pe` y `operaciones@costatransport.com.pe` (Cotizaciones) y a `legal@costatransport.com.pe` (Libro de Reclamaciones), además de enviar copia legal automática al consumidor que registró su reclamación.

### Pasos de configuración (toma 3 minutos):
1. Entra a [Google Sheets](https://sheets.google.com) con la cuenta de Google de Costa Transport y crea un libro nuevo llamado **`Registros Web - Costa Transport`**.
2. En el menú superior ve a **Extensiones > Apps Script**.
3. Borra el contenido que aparece por defecto y pega todo el código del archivo `integracion-excel/google-apps-script.js`.
4. Haz clic en **Guardar** (ícono de disquete).
5. Haz clic en el botón azul **Implementar > Nueva implementación**.
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
6. Acepta los permisos y **copia la URL de la aplicación web** (termina en `/exec`).
7. Pega esa URL en la variable de entorno de **Render** (`costa-transport-api`):
   - Nombre: `GOOGLE_SHEETS_WEBHOOK_URL`
   - Valor: `https://script.google.com/macros/s/TU_ID_AQUI/exec`
8. (Opcional) Si también quieres envío directo sin depender de Render, pásame esa URL para compilar el frontend con `VITE_SHEETS_WEBHOOK_URL` antes de subir por FTP.

---

## Opción 2 (Si la empresa ya paga Microsoft 365 / Office 365): Excel Online en OneDrive / SharePoint

Si Costa Transport usa cuentas corporativas de Microsoft 365 y quiere que caiga directamente en un archivo `.xlsx` dentro de su **OneDrive/SharePoint**:
1. Crea un archivo Excel en OneDrive con dos tablas (`Cotizaciones` y `Libro_de_Reclamaciones`).
2. En **Microsoft Power Automate**, crea un flujo con disparador **"Cuando se recibe una solicitud HTTP"**.
3. Agrega una condición según `tipoRegistro` (`cotizacion` vs `reclamacion`) y usa la acción **"Agregar una fila a una tabla" (Excel Online Business)**.
4. Copia la URL HTTP generada por Power Automate y colócala exactamente en la misma variable `GOOGLE_SHEETS_WEBHOOK_URL` en Render (no requiere cambiar una sola línea de código).
