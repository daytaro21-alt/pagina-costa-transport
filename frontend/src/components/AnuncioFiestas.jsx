import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ArrowRight } from 'lucide-react';
import logoImg from '../assets/Logo.png';
import {
  debeMostrarAnuncioFiestas,
  marcarAnuncioFiestasVisto,
  obtenerAnioNuevoObjetivo,
  esVistaPreviaFiestas
} from '../config/fiestas';

const ESTRELLAS_DECORATIVAS = [
  { top: '14%', left: '10%', size: 14, delay: '0s', opacity: 0.75 },
  { top: '26%', left: '18%', size: 8, delay: '1.1s', opacity: 0.45 },
  { top: '18%', right: '14%', size: 12, delay: '0.6s', opacity: 0.65 },
  { top: '34%', right: '10%', size: 9, delay: '1.8s', opacity: 0.45 },
  { top: '62%', left: '8%', size: 10, delay: '1.4s', opacity: 0.4 },
  { top: '68%', right: '12%', size: 11, delay: '0.4s', opacity: 0.5 }
];

const StarMotif = ({ size = 12, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    style={style}
  >
    <path d="M12 1.5L14.3 9.7L22.5 12L14.3 14.3L12 22.5L9.7 14.3L1.5 12L9.7 9.7L12 1.5Z" />
  </svg>
);

const AnuncioFiestas = ({ disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const anioNuevo = obtenerAnioNuevoObjetivo();
  const isPreview = esVistaPreviaFiestas();

  useEffect(() => {
    if (disabled) return;
    if (!debeMostrarAnuncioFiestas()) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      marcarAnuncioFiestasVisto();
    }, 350);

    return () => window.clearTimeout(timer);
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen || disabled) return null;

  return (
    <div
      id="anuncio-fiestas-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="anuncio-fiestas-titulo"
      aria-describedby="anuncio-fiestas-mensaje"
      onClick={handleClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-[#06131d]/75 backdrop-blur-sm animate-backdrop-in print:hidden"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[540px] max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-[0_28px_70px_-15px_rgba(7,23,34,0.65)] ring-1 ring-[#E6C27A]/35 animate-modal-in focus:outline-none"
      >
        {/* Cabecera festiva corporativa */}
        <div
          className="relative overflow-hidden px-6 sm:px-9 pt-8 pb-8 text-center"
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(141, 24, 36, 0.44) 0%, transparent 52%), radial-gradient(circle at 85% 15%, rgba(41, 115, 146, 0.36) 0%, transparent 50%), linear-gradient(155deg, #071722 0%, #0B2230 55%, #123244 100%)'
          }}
        >
          {/* Halo dorado sutil en la parte superior */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-44 rounded-full bg-[#E6C27A]/15 blur-3xl"
          />

          {/* Arcos geométricos finos estilo tarjeta ejecutiva */}
          <svg
            aria-hidden="true"
            viewBox="0 0 540 240"
            fill="none"
            className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
            preserveAspectRatio="none"
          >
            <circle cx="270" cy="-40" r="210" stroke="#E6C27A" strokeWidth="0.75" />
            <circle cx="270" cy="-40" r="245" stroke="#E6C27A" strokeWidth="0.5" strokeDasharray="3 6" />
          </svg>

          {/* Estrellas doradas sutiles */}
          {ESTRELLAS_DECORATIVAS.map((estrella, index) => (
            <StarMotif
              key={index}
              size={estrella.size}
              className="pointer-events-none absolute text-[#F3D58D] animate-twinkle"
              style={{
                top: estrella.top,
                left: estrella.left,
                right: estrella.right,
                opacity: estrella.opacity,
                animationDelay: estrella.delay
              }}
            />
          ))}

          {/* Botón cerrar */}
          <button
            id="btn-cerrar-anuncio-fiestas-x"
            type="button"
            onClick={handleClose}
            aria-label="Cerrar anuncio de fiestas"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/85 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D58D]"
          >
            <X size={18} />
          </button>

          {/* Logo corporativo */}
          <div className="relative z-10 flex justify-center mb-6">
            <div className="inline-flex items-center justify-center bg-white px-5 py-2.5 rounded-2xl shadow-lg shadow-black/25">
              <img
                src={logoImg}
                alt="Costa Transport E.I.R.L."
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
          </div>

          {/* Separador ornamental dorado */}
          <div className="relative z-10 flex items-center justify-center gap-3 mb-3.5">
            <span className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-[#E6C27A]/70" />
            <StarMotif size={11} className="text-[#F3D58D] shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#F3D58D]">
              Saludo de Fiestas
            </span>
            <StarMotif size={11} className="text-[#F3D58D] shrink-0" />
            <span className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-[#E6C27A]/70" />
          </div>

          {/* Título principal */}
          <h2
            id="anuncio-fiestas-titulo"
            className="relative z-10 font-display text-3xl sm:text-[2.2rem] font-extrabold tracking-tight text-white leading-[1.15]"
          >
            Feliz Navidad
            <span className="block mt-1.5 text-xl sm:text-2xl font-semibold text-[#F4D99B] tracking-normal">
              y Próspero Año Nuevo {anioNuevo}
            </span>
          </h2>
        </div>

        {/* Franja fina de acento corporativo y dorado */}
        <div
          aria-hidden="true"
          className="h-[3px] w-full bg-gradient-to-r from-costa-red via-[#E6C27A] to-costa-blue"
        />

        {/* Cuerpo del saludo */}
        <div className="px-6 sm:px-9 pt-7 pb-7 text-center bg-gradient-to-b from-white to-[#F8FAFC]">
          <div
            id="anuncio-fiestas-mensaje"
            className="space-y-3.5 text-slate-600 text-[15px] leading-relaxed"
          >
            <p>
              En estas fechas especiales, agradecemos sinceramente a nuestros clientes, aliados estratégicos y colaboradores por la confianza brindada a lo largo del año.
            </p>
            <p>
              Les deseamos una Navidad llena de paz, salud y unión familiar, y un{' '}
              <strong className="font-semibold text-costa-navy">{anioNuevo}</strong> colmado de éxitos y nuevos caminos por recorrer juntos.
            </p>
          </div>

          {/* Firma institucional */}
          <div className="my-5 flex flex-col items-center">
            <span className="w-12 h-px bg-[#D9B66B]/60 mb-3.5" aria-hidden="true" />
            <p className="font-display font-bold text-costa-navy text-sm tracking-wide">
              Familia Costa Transport E.I.R.L.
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Paita, Piura · Perú
            </p>
          </div>

          {/* Acción principal */}
          <div className="pt-1 flex flex-col items-center">
            <button
              id="btn-continuar-anuncio-fiestas"
              type="button"
              onClick={handleClose}
              className="group inline-flex items-center justify-center gap-2 bg-costa-navy hover:bg-costa-blue text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-costa-blue focus-visible:ring-offset-2"
            >
              <span>Continuar al sitio web</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            {isPreview && (
              <p className="mt-3 text-[11px] text-slate-400">
                Modo vista previa · Vigencia automática: 27 de noviembre al 6 de enero
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnuncioFiestas;
