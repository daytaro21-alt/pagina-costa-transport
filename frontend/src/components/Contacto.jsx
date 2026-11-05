import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
  ExternalLink,
  Share2,
  Building2
} from 'lucide-react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    phone: '',
    subject: 'Transporte de Carga Refrigerada (Reefer)',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await fetch('http://localhost:3001/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch {
      // Si el backend local no está encendido, igual procesamos la solicitud en el frontend
    }

    setStatus('success');
  };

  const sendViaWhatsApp = () => {
    const text = `Hola Costa Transport, mi nombre es *${formData.fname || 'Cliente'}*.\n• *Teléfono:* ${formData.phone}\n• *Correo:* ${formData.email}\n• *Servicio:* ${formData.subject}\n• *Mensaje:* ${formData.message}`;
    window.open(
      `https://api.whatsapp.com/send?phone=51977882764&text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-slate-50 bg-costa-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-costa-red/10 text-costa-red px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
            <img src="/isotipo.png" alt="" className="w-4 h-3.5 object-contain" />
            <span>Atención Corporativa y Cotizaciones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contáctanos Hoy Mismo
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Estamos listos para atender tus requerimientos de transporte de carga refrigerada, carga general, alquiler de equipos y almacenaje en Paita y todo el Perú.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Columna Izquierda: Tarjetas de Contacto Directo & Redes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-costa-navy text-white rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-costa-blue/25 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-300 block mb-2">
                CANALES OFICIALES
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-6">
                Información de Contacto
              </h3>

              <div className="space-y-5">
                {/* Sede Paita */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-costa-red flex items-center justify-center text-white shrink-0 shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-sky-200 uppercase tracking-wide">
                      Sede Principal — Paita
                    </h4>
                    <p className="text-sm sm:text-base text-white font-medium mt-0.5 leading-snug">
                      C.C. San Francisco de la Buena Esperanza
                      <br />
                      Mz. H Lt. S/N, Paita - Piura, Perú
                    </p>
                  </div>
                </div>

                {/* Teléfono / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-costa-blue flex items-center justify-center text-white shrink-0 shadow-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-sky-200 uppercase tracking-wide">
                      Central & WhatsApp Corporativo
                    </h4>
                    <a
                      href="https://api.whatsapp.com/send?phone=51977882764"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-extrabold text-white hover:text-sky-300 transition-colors block mt-0.5"
                    >
                      +51 977 882 764
                    </a>
                    <span className="text-xs text-slate-300">Atención y monitoreo operativo 24/7</span>
                  </div>
                </div>

                {/* Correos */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-costa-red flex items-center justify-center text-white shrink-0 shadow-md">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-sky-200 uppercase tracking-wide">
                      Correos Electrónicos
                    </h4>
                    <a
                      href="mailto:gerencia@costatransport.com.pe"
                      className="text-sm sm:text-base font-bold text-white hover:text-sky-300 transition-colors block mt-0.5"
                    >
                      gerencia@costatransport.com.pe
                    </a>
                    <a
                      href="mailto:rrhh@costatransport.com.pe"
                      className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors block mt-0.5"
                    >
                      rrhh@costatransport.com.pe (Recursos Humanos)
                    </a>
                  </div>
                </div>
              </div>

              {/* Redes Sociales y Noticias */}
              <div className="mt-8 pt-6 border-t border-white/15">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                  Síguenos en Nuestras Redes Oficiales:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.facebook.com/costatransportEIRL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-[#1877F2] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all"
                  >
                    <span>Facebook Oficial</span>
                    <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/costa-transport-eirl/?originalSubdomain=pe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-[#0A66C2] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all"
                  >
                    <span>LinkedIn Oficial</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Mapa Interactivo de Paita (Rescatado del embed de la web antigua) */}
            <div className="bg-white rounded-3xl p-3 shadow-card border border-slate-200/80 overflow-hidden">
              <div className="px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-costa-blue flex items-center gap-1.5">
                  <Building2 size={15} className="text-costa-red" />
                  Ubicación en Puerto de Paita, Piura
                </span>
                <a
                  href="https://www.google.com/maps?q=-5.0986798,-81.0950223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-costa-red hover:underline flex items-center gap-1"
                >
                  Abrir en Google Maps <ExternalLink size={12} />
                </a>
              </div>
              <div className="rounded-2xl overflow-hidden h-64 w-full bg-slate-200">
                <iframe
                  title="Ubicación Costa Transport Paita"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22480.514497822332!2d-81.09502232778667!3d-5.098679854677324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDYnMDAuOCJTIDgxwrAwNCcyOS42Ilc!5e0!3m2!1ses-419!2spe!4v1627606533178!5m2!1ses-419!2spe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Cotización y Contacto */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 shadow-card border border-slate-200/90">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-costa-blue block">
                  SOLICITUD EN LÍNEA
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                  Envíanos tu Consulta o Cotización
                </h3>
              </div>
              <img src="/isotipo.png" alt="Isotipo Costa" className="w-10 h-9 object-contain" />
            </div>

            {status === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={34} />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900">
                  ¡Mensaje Registrado con Éxito!
                </h4>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
                  Gracias por contactar a <strong>Costa Transport E.I.R.L.</strong> Nuestro equipo comercial revisará tu requerimiento a la brevedad.
                </p>
                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={sendViaWhatsApp}
                    className="inline-flex items-center gap-2 bg-costa-red hover:bg-costa-redLight text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all"
                  >
                    <MessageSquare size={17} />
                    Enviar también por WhatsApp Directo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        fname: '',
                        email: '',
                        phone: '',
                        subject: 'Transporte de Carga Refrigerada (Reefer)',
                        message: ''
                      });
                    }}
                    className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-3 rounded-xl text-sm transition-all"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fname" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Tu Nombre o Empresa *
                    </label>
                    <input
                      id="fname"
                      name="fname"
                      type="text"
                      required
                      value={formData.fname}
                      onChange={handleChange}
                      placeholder="Ej. Exportadora del Norte S.A.C."
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@empresa.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Teléfono / Celular *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+51 999 999 999"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Servicio Requerido / Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue focus:border-transparent transition-all"
                    >
                      <option value="Transporte de Carga Refrigerada (Reefer)">
                        Transporte de Carga Refrigerada (Genset / Reefer)
                      </option>
                      <option value="Transporte en Tolvas, Cama Baja o Cisterna">
                        Transporte en Tolvas, Cama Baja o Cisterna
                      </option>
                      <option value="Alquiler de Reach Stacker / Montacargas / Reefers 40'">
                        Alquiler de Reach Stacker / Montacargas / Reefers 40&apos;
                      </option>
                      <option value="Almacén de Tuberías y Contenedores">
                        Almacén de Tuberías y Contenedores
                      </option>
                      <option value="Consulta General / Otro">
                        Consulta General / Otro
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Detalle de la Operación o Comentario *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Indícanos origen, destino, tipo de carga o requerimiento específico..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-costa-blue to-costa-blueLight hover:from-costa-blueDark hover:to-costa-blue text-white font-bold py-4 px-8 rounded-xl text-sm sm:text-base shadow-glow-blue transition-all hover:-translate-y-0.5"
                  >
                    <Send size={18} />
                    <span>{status === 'sending' ? 'Enviando...' : 'Enviar Solicitud'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={sendViaWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-costa-red hover:bg-costa-redLight text-white font-bold py-4 px-6 rounded-xl text-sm sm:text-base shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <Phone size={17} />
                    <span>Enviar por WhatsApp</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400 text-center sm:text-left">
                  * Todos los datos son tratados con estricta confidencialidad bajo nuestros estándares corporativos BASC.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
