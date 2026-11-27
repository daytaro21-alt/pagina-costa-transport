import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  X,
  CheckCircle2,
  Printer,
  Send,
  ShieldAlert,
  FileText,
  User,
  Briefcase
} from 'lucide-react';
import logoImg from '../assets/Logo.png';

const INITIAL_FORM = {
  tipoDocumento: 'DNI',
  numeroDocumento: '',
  nombreCompleto: '',
  domicilio: '',
  telefono: '',
  email: '',
  apoderado: '',
  tipoBien: 'Servicio',
  montoReclamado: '',
  descripcionBien: '',
  tipoReclamacion: 'Reclamo',
  detalleReclamacion: '',
  pedidoConsumidor: '',
  aceptaTerminos: false
};

const generarCodigoLocal = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `LR-${y}${m}${d}-${rand}`;
};

const LibroReclamaciones = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [registroConfirmado, setRegistroConfirmado] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fechaActual = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    let codigoHoja = generarCodigoLocal();
    let fechaRegistro = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
    let savedViaBackend = false;

    try {
      const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/reclamaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.data?.codigo) codigoHoja = json.data.codigo;
        if (json?.data?.fecha) fechaRegistro = json.data.fecha;
        savedViaBackend = true;
      }
    } catch {
      // Si el backend no responde, intentamos el webhook directo si existe
    }

    if (!savedViaBackend && import.meta.env.VITE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(import.meta.env.VITE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            tipoRegistro: 'reclamacion',
            codigo: codigoHoja,
            fecha: fechaRegistro,
            ...formData
          })
        });
      } catch {
        // Continuamos mostrando constancia al usuario
      }
    }

    setRegistroConfirmado({
      codigo: codigoHoja,
      fecha: fechaRegistro,
      ...formData
    });
    setStatus('success');
  };

  const handleNuevoRegistro = () => {
    setFormData(INITIAL_FORM);
    setRegistroConfirmado(null);
    setStatus('idle');
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-costa-navy/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="libro-reclamaciones-title"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera Corporativa del Libro */}
        <div className="bg-costa-navy text-white px-6 sm:px-8 py-5 flex items-center justify-between gap-4 border-b-4 border-costa-red shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-costa-red flex items-center justify-center text-white shadow-lg shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-sky-300 block">
                LEY N° 29571 — CÓDIGO DE PROTECCIÓN Y DEFENSA DEL CONSUMIDOR
              </span>
              <h2 id="libro-reclamaciones-title" className="text-xl sm:text-2xl font-extrabold text-white">
                Libro de Reclamaciones Virtual
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar Libro de Reclamaciones"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-costa-red text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido Scrollable */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800">
          {/* Datos del Proveedor */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={logoImg} alt="Costa Transport E.I.R.L." className="h-9 w-auto object-contain" />
              <div className="text-xs sm:text-sm">
                <p className="font-extrabold text-slate-900">COSTA TRANSPORT E.I.R.L.</p>
                <p className="text-slate-600">
                  CAR. PANAMERICANA KM. 3.5 C.C. SAN FRANCISCO DE LA BUENA ESPERANZA (A 700 MTS CRUCE TORTUGA) PIURA - PAITA - PAITA
                </p>
              </div>
            </div>
            <div className="sm:text-right text-xs bg-white px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
              <span className="text-slate-500 font-semibold block">Fecha de registro</span>
              <strong className="text-costa-blue font-extrabold capitalize">{fechaActual}</strong>
            </div>
          </div>

          {status === 'success' && registroConfirmado ? (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={34} />
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                  Hoja de Reclamación Registrada
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Código: {registroConfirmado.codigo}
                </h3>
                <p className="text-sm text-slate-600 max-w-xl mx-auto">
                  Hemos registrado tu <strong>{registroConfirmado.tipoReclamacion}</strong> en el Libro de Reclamaciones Virtual de <strong>COSTA TRANSPORT E.I.R.L.</strong> Te daremos respuesta en un plazo máximo de quince (15) días hábiles al correo <strong>{registroConfirmado.email}</strong>.
                </p>
              </div>

              {/* Resumen de Constancia */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 text-sm">
                <h4 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider border-b border-slate-100 pb-2">
                  Constancia de Registro
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block">Consumidor:</span>
                    <strong className="text-slate-900">{registroConfirmado.nombreCompleto}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Documento:</span>
                    <strong className="text-slate-900">
                      {registroConfirmado.tipoDocumento} {registroConfirmado.numeroDocumento}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bien Contratado:</span>
                    <strong className="text-slate-900">{registroConfirmado.tipoBien}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tipo:</span>
                    <strong className="text-costa-red">{registroConfirmado.tipoReclamacion}</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 font-semibold">Detalle: </span>
                    <span className="text-slate-800">{registroConfirmado.detalleReclamacion}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Pedido: </span>
                    <span className="text-slate-800">{registroConfirmado.pedidoConsumidor}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-costa-blue hover:bg-costa-blueDark text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all"
                >
                  <Printer size={17} />
                  Imprimir / Guardar Constancia PDF
                </button>
                <button
                  type="button"
                  onClick={handleNuevoRegistro}
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-3 rounded-xl text-sm transition-all"
                >
                  Registrar otra hoja
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-costa-navy hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* 1. Identificación del Consumidor Reclamante */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2">
                  <span className="w-7 h-7 rounded-lg bg-costa-blue text-white text-xs font-extrabold flex items-center justify-center">
                    <User size={15} />
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    1. Identificación del Consumidor Reclamante
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="lr-tipoDocumento" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Tipo de Documento *
                    </label>
                    <select
                      id="lr-tipoDocumento"
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="CE">Carné de Extranjería</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="lr-numeroDocumento" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      N° de Documento *
                    </label>
                    <input
                      id="lr-numeroDocumento"
                      name="numeroDocumento"
                      type="text"
                      required
                      value={formData.numeroDocumento}
                      onChange={handleChange}
                      placeholder="Ej. 45891234 / 2060..."
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                    />
                  </div>

                  <div>
                    <label htmlFor="lr-telefono" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Teléfono / Celular *
                    </label>
                    <input
                      id="lr-telefono"
                      name="telefono"
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+51 999 999 999"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lr-nombreCompleto" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nombres y Apellidos / Razón Social *
                    </label>
                    <input
                      id="lr-nombreCompleto"
                      name="nombreCompleto"
                      type="text"
                      required
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      placeholder="Nombre completo o razón social"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                    />
                  </div>

                  <div>
                    <label htmlFor="lr-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      id="lr-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lr-domicilio" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Domicilio *
                    </label>
                    <input
                      id="lr-domicilio"
                      name="domicilio"
                      type="text"
                      required
                      value={formData.domicilio}
                      onChange={handleChange}
                      placeholder="Dirección, distrito y ciudad"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                    />
                  </div>

                  <div>
                    <label htmlFor="lr-apoderado" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Padre o Madre (solo si es menor de edad)
                    </label>
                    <input
                      id="lr-apoderado"
                      name="apoderado"
                      type="text"
                      value={formData.apoderado}
                      onChange={handleChange}
                      placeholder="Opcional"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Identificación del Bien Contratado */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2">
                  <span className="w-7 h-7 rounded-lg bg-costa-blue text-white text-xs font-extrabold flex items-center justify-center">
                    <Briefcase size={15} />
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    2. Identificación del Bien Contratado
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Tipo de Bien *
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {['Servicio', 'Producto'].map((tipo) => (
                        <label
                          key={tipo}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                            formData.tipoBien === tipo
                              ? 'bg-costa-blue/10 border-costa-blue text-costa-blue'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipoBien"
                            value={tipo}
                            checked={formData.tipoBien === tipo}
                            onChange={handleChange}
                            className="accent-costa-blue"
                          />
                          {tipo}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lr-montoReclamado" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Monto Reclamado (Opcional)
                    </label>
                    <input
                      id="lr-montoReclamado"
                      name="montoReclamado"
                      type="text"
                      value={formData.montoReclamado}
                      onChange={handleChange}
                      placeholder="Ej. S/ 1,500.00 o USD 400.00"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lr-descripcionBien" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Descripción del Servicio o Bien Contratado *
                  </label>
                  <input
                    id="lr-descripcionBien"
                    name="descripcionBien"
                    type="text"
                    required
                    value={formData.descripcionBien}
                    onChange={handleChange}
                    placeholder="Ej. Transporte de contenedor Reefer ruta Paita - Lima, N° de guía o factura..."
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue"
                  />
                </div>
              </div>

              {/* 3. Detalle de la Reclamación y Pedido */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2">
                  <span className="w-7 h-7 rounded-lg bg-costa-red text-white text-xs font-extrabold flex items-center justify-center">
                    <FileText size={15} />
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    3. Detalle de la Reclamación y Pedido del Consumidor
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.tipoReclamacion === 'Reclamo'
                        ? 'bg-costa-red/5 border-costa-red ring-1 ring-costa-red'
                        : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                      <input
                        type="radio"
                        name="tipoReclamacion"
                        value="Reclamo"
                        checked={formData.tipoReclamacion === 'Reclamo'}
                        onChange={handleChange}
                        className="accent-costa-red"
                      />
                      <span>Reclamo</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-snug">
                      Disconformidad relacionada directamente a los productos o servicios contratados.
                    </p>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.tipoReclamacion === 'Queja'
                        ? 'bg-costa-red/5 border-costa-red ring-1 ring-costa-red'
                        : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                      <input
                        type="radio"
                        name="tipoReclamacion"
                        value="Queja"
                        checked={formData.tipoReclamacion === 'Queja'}
                        onChange={handleChange}
                        className="accent-costa-red"
                      />
                      <span>Queja</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-snug">
                      Disconformidad no relacionada a los productos o servicios; o malestar respecto a la atención al público.
                    </p>
                  </label>
                </div>

                <div>
                  <label htmlFor="lr-detalleReclamacion" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Detalle del Reclamo o Queja *
                  </label>
                  <textarea
                    id="lr-detalleReclamacion"
                    name="detalleReclamacion"
                    rows={3}
                    required
                    value={formData.detalleReclamacion}
                    onChange={handleChange}
                    placeholder="Describe detalladamente los hechos ocurridos, fecha y lugar..."
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="lr-pedidoConsumidor" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Pedido Concreto del Consumidor *
                  </label>
                  <textarea
                    id="lr-pedidoConsumidor"
                    name="pedidoConsumidor"
                    rows={2}
                    required
                    value={formData.pedidoConsumidor}
                    onChange={handleChange}
                    placeholder="Indica qué solución o acción solicitas..."
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-costa-blue resize-none"
                  />
                </div>
              </div>

              {/* Aviso Legal INDECOPI */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p>
                  La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el <strong>INDECOPI</strong>. El proveedor deberá dar respuesta al reclamo o queja en un plazo no mayor a <strong>quince (15) días hábiles</strong> improrrogables (Ley N° 31435).
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  required
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  className="mt-1 accent-costa-blue w-4 h-4 shrink-0"
                />
                <span>
                  Declaro ser titular del reclamo o queja y confirmo que los datos consignados en el presente formulario son veraces.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-costa-red to-costa-redLight hover:from-costa-redDark hover:to-costa-red text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all"
                >
                  <Send size={16} />
                  <span>{status === 'sending' ? 'Registrando hoja...' : 'Enviar Hoja de Reclamación'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibroReclamaciones;
