import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ArrowRight } from 'lucide-react';
import logoImg from '../assets/Logo.png';
import FuegosArtificiales from './FuegosArtificiales';
import {
  debeMostrarAnuncioFiestas,
  marcarAnuncioFiestasVisto,
  obtenerAnioNuevoObjetivo,
  esVistaPreviaFiestas
} from '../config/fiestas';

const ESTRELLAS_DECORATIVAS = [
  { top: '14%', left: '9%', size: 14, delay: '0s', opacity: 0.8 },
  { top: '28%', left: '17%', size: 8, delay: '1.1s', opacity: 0.5 },
  { top: '18%', right: '15%', size: 12, delay: '0.6s', opacity: 0.7 },
  { top: '36%', right: '9%', size: 9, delay: '1.8s', opacity: 0.5 },
  { top: '76%', left: '12%', size: 10, delay: '1.4s', opacity: 0.55 },
  { top: '78%', right: '13%', size: 11, delay: '0.4s', opacity: 0.6 }
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

const FireworkMotif = ({ size = 64, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    aria-hidden="true"
    className={className}
    style={style}
  >
    {/* Rayos principales */}
    <g stroke="#F5D78E" strokeWidth="1.5" strokeLinecap="round">
      <line x1="40" y1="7" x2="40" y2="23" />
      <line x1="40" y1="57" x2="40" y2="73" />
      <line x1="7" y1="40" x2="23" y2="40" />
      <line x1="57" y1="40" x2="73" y2="40" />
      <line x1="16.5" y1="16.5" x2="28" y2="28" />
      <line x1="52" y1="52" x2="63.5" y2="63.5" />
      <line x1="63.5" y1="16.5" x2="52" y2="28" />
      <line x1="28" y1="52" x2="16.5" y2="63.5" />
    </g>
    {/* Rayos secundarios */}
    <g stroke="#F8E7BA" strokeWidth="1.1" strokeLinecap="round" opacity="0.85">
      <line x1="27" y1="10.5" x2="32.5" y2="23.5" />
      <line x1="53" y1="10.5" x2="47.5" y2="23.5" />
      <line x1="69.5" y1="27" x2="56.5" y2="32.5" />
      <line x1="69.5" y1="53" x2="56.5" y2="47.5" />
      <line x1="53" y1="69.5" x2="47.5" y2="56.5" />
      <line x1="27" y1="69.5" x2="32.5" y2="56.5" />
      <line x1="10.5" y1="53" x2="23.5" y2="47.5" />
      <line x1="10.5" y1="27" x2="23.5" y2="32.5" />
    </g>
    {/* Destellos en las puntas */}
    <g fill="#FFF7DF">
      <circle cx="40" cy="4" r="1.8" />
      <circle cx="40" cy="76" r="1.8" />
      <circle cx="4" cy="40" r="1.8" />
      <circle cx="76" cy="40" r="1.8" />
      <circle cx="14" cy="14" r="1.5" />
      <circle cx="66" cy="14" r="1.5" />
      <circle cx="14" cy="66" r="1.5" />
      <circle cx="66" cy="66" r="1.5" />
    </g>
    {/* Estrella central */}
    <path
      d="M40 31.5L41.8 38.2L48.5 40L41.8 41.8L40 48.5L38.2 41.8L31.5 40L38.2 38.2L40 31.5Z"
      fill="#F5D78E"
    />
  </svg>
);

const LUCES_GUIRNALDA = [
  { cx: 34, cy: 17, color: '#FFE184', delay: '0s' },
  { cx: 82, cy: 24, color: '#F25767', delay: '0.45s' },
  { cx: 132, cy: 27, color: '#FFF6D8', delay: '0.9s' },
  { cx: 182, cy: 24, color: '#8EE0F5', delay: '1.35s' },
  { cx: 228, cy: 19, color: '#FFE184', delay: '0.3s' },
  { cx: 270, cy: 16, color: '#FFF6D8', delay: '1.1s' },
  { cx: 312, cy: 19, color: '#F25767', delay: '0.7s' },
  { cx: 358, cy: 24, color: '#FFE184', delay: '1.5s' },
  { cx: 408, cy: 27, color: '#8EE0F5', delay: '0.2s' },
  { cx: 458, cy: 24, color: '#FFF6D8', delay: '1.0s' },
  { cx: 506, cy: 17, color: '#FFE184', delay: '0.6s' }
];

const GuirnaldaLuces = () => (
  <svg
    viewBox="0 0 540 48"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="none"
    className="pointer-events-none absolute top-0 inset-x-0 w-full h-11 sm:h-12 z-10"
  >
    <defs>
      <filter id="costa-bulb-blur" x="-120%" y="-120%" width="340%" height="340%">
        <feGaussianBlur stdDeviation="3.2" />
      </filter>
    </defs>

    {/* Cable curvo superior */}
    <path
      d="M-6 6 Q 132 31 270 13 Q 408 31 546 6"
      stroke="#D9B66B"
      strokeOpacity="0.45"
      strokeWidth="1.2"
    />

    {/* Lucecitas colgantes con halo cálido */}
    {LUCES_GUIRNALDA.map((luz, idx) => (
      <g
        key={idx}
        className="animate-bulb-glow"
        style={{ animationDelay: luz.delay }}
      >
        <line
          x1={luz.cx}
          y1={luz.cy - 3.5}
          x2={luz.cx}
          y2={luz.cy}
          stroke="#D9B66B"
          strokeOpacity="0.65"
          strokeWidth="1.2"
        />
        <circle
          cx={luz.cx}
          cy={luz.cy + 3.5}
          r="7"
          fill={luz.color}
          opacity="0.48"
          filter="url(#costa-bulb-blur)"
        />
        <ellipse
          cx={luz.cx}
          cy={luz.cy + 3.5}
          rx="2.6"
          ry="3.6"
          fill={luz.color}
        />
        <circle cx={luz.cx - 0.6} cy={luz.cy + 2.3} r="0.9" fill="#FFFFFF" opacity="0.9" />
      </g>
    ))}
  </svg>
);

const LUCES_ARBOL = [
  { cx: 48, cy: 38, color: '#FFE184', delay: '0.1s' },
  { cx: 41, cy: 52, color: '#F25767', delay: '0.7s' },
  { cx: 56, cy: 54, color: '#FFF6D8', delay: '1.2s' },
  { cx: 34, cy: 69, color: '#8EE0F5', delay: '0.4s' },
  { cx: 49, cy: 67, color: '#FFE184', delay: '1.5s' },
  { cx: 63, cy: 71, color: '#F25767', delay: '0.9s' },
  { cx: 30, cy: 85, color: '#FFF6D8', delay: '1.3s' },
  { cx: 46, cy: 84, color: '#FFE184', delay: '0.25s' },
  { cx: 65, cy: 85, color: '#8EE0F5', delay: '0.85s' }
];

const ArbolNavidad = ({ className = '' }) => (
  <svg
    viewBox="0 0 96 112"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <defs>
      <linearGradient id="costa-tree-grad" x1="48" y1="20" x2="48" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2E9A7B" />
        <stop offset="55%" stopColor="#1A6E58" />
        <stop offset="100%" stopColor="#0E4438" />
      </linearGradient>
      <radialGradient id="costa-star-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE694" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#FFE694" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Halo de la estrella superior */}
    <circle cx="48" cy="14" r="14" fill="url(#costa-star-glow)" className="animate-bulb-glow" />

    {/* Tronco */}
    <rect x="42.5" y="91" width="11" height="13" rx="2.5" fill="#8C5932" />
    <rect x="37" y="102" width="22" height="3.5" rx="1.75" fill="#D9B66B" opacity="0.65" />

    {/* Nivel inferior del árbol */}
    <path
      d="M48 54L79 92.5C80.1 93.8 79.2 95.5 77.5 95.5H18.5C16.8 95.5 15.9 93.8 17 92.5L48 54Z"
      fill="url(#costa-tree-grad)"
      stroke="#E6C27A"
      strokeOpacity="0.45"
      strokeWidth="1"
    />

    {/* Nivel medio del árbol */}
    <path
      d="M48 36L72 71.5C73 72.9 72 74.5 70.3 74.5H25.7C24 74.5 23 72.9 24 71.5L48 36Z"
      fill="url(#costa-tree-grad)"
      stroke="#E6C27A"
      strokeOpacity="0.5"
      strokeWidth="1"
    />

    {/* Nivel superior del árbol */}
    <path
      d="M48 20L64.5 49.5C65.3 50.9 64.3 52.5 62.7 52.5H33.3C31.7 52.5 30.7 50.9 31.5 49.5L48 20Z"
      fill="url(#costa-tree-grad)"
      stroke="#E6C27A"
      strokeOpacity="0.6"
      strokeWidth="1"
    />

    {/* Guirnaldas doradas finas sobre el pino */}
    <path
      d="M36 45 Q 48 52 60 44"
      stroke="#F5D78E"
      strokeOpacity="0.7"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M29 66 Q 48 75 67 65"
      stroke="#F5D78E"
      strokeOpacity="0.7"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M23 86 Q 48 95 73 85"
      stroke="#F5D78E"
      strokeOpacity="0.65"
      strokeWidth="1.3"
      strokeLinecap="round"
    />

    {/* Estrella dorada en la cima */}
    <path
      d="M48 4.5L50.6 11.4L58 11.8L52.2 16.4L54.1 23.5L48 19.4L41.9 23.5L43.8 16.4L38 11.8L45.4 11.4L48 4.5Z"
      fill="#FBE294"
      stroke="#FFF7DF"
      strokeWidth="0.6"
    />

    {/* Lucecitas titilantes en el arbolito */}
    {LUCES_ARBOL.map((luz, idx) => (
      <g
        key={idx}
        className="animate-bulb-glow"
        style={{ animationDelay: luz.delay }}
      >
        <circle cx={luz.cx} cy={luz.cy} r="4.6" fill={luz.color} opacity="0.32" />
        <circle cx={luz.cx} cy={luz.cy} r="2.2" fill={luz.color} />
        <circle cx={luz.cx - 0.5} cy={luz.cy - 0.5} r="0.75" fill="#FFFFFF" />
      </g>
    ))}
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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-[#06131d]/78 backdrop-blur-sm animate-backdrop-in print:hidden"
    >
      {/* Fuegos artificiales y estrellas animados a los costados del anuncio */}
      <FuegosArtificiales />

      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 w-full max-w-[540px] max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-[0_28px_70px_-15px_rgba(7,23,34,0.65)] ring-1 ring-[#E6C27A]/35 animate-modal-in focus:outline-none"
      >
        {/* Cabecera festiva corporativa */}
        <div
          className="relative overflow-hidden px-6 sm:px-9 pt-10 pb-7 text-center"
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(141, 24, 36, 0.44) 0%, transparent 52%), radial-gradient(circle at 85% 15%, rgba(41, 115, 146, 0.36) 0%, transparent 50%), linear-gradient(155deg, #071722 0%, #0B2230 55%, #123244 100%)'
          }}
        >
          {/* Guirnalda de lucecitas navideñas en el borde superior */}
          <GuirnaldaLuces />

          {/* Halo dorado sutil en la parte superior */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-44 rounded-full bg-[#E6C27A]/15 blur-3xl"
          />

          {/* Arcos geométricos finos estilo tarjeta ejecutiva */}
          <svg
            aria-hidden="true"
            viewBox="0 0 540 280"
            fill="none"
            className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
            preserveAspectRatio="none"
          >
            <circle cx="270" cy="-40" r="220" stroke="#E6C27A" strokeWidth="0.75" />
            <circle cx="270" cy="-40" r="258" stroke="#E6C27A" strokeWidth="0.5" strokeDasharray="3 6" />
          </svg>

          {/* Destellos tipo fuegos artificiales a los costados del saludo */}
          <FireworkMotif
            size={76}
            className="pointer-events-none absolute -left-2 top-24 w-14 h-14 sm:w-[76px] sm:h-[76px] sm:left-4 sm:top-auto sm:bottom-4 animate-firework-bloom"
            style={{ animationDelay: '0s' }}
          />
          <FireworkMotif
            size={68}
            className="pointer-events-none absolute -right-2 top-28 w-12 h-12 sm:w-[68px] sm:h-[68px] sm:right-4 sm:top-auto sm:bottom-5 animate-firework-bloom"
            style={{ animationDelay: '1.7s' }}
          />

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
            className="absolute top-6 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/85 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D58D]"
          >
            <X size={18} />
          </button>

          {/* Logo corporativo */}
          <div className="relative z-10 flex justify-center mb-3.5">
            <div className="inline-flex items-center justify-center bg-white px-4 py-2 rounded-2xl shadow-lg shadow-black/25">
              <img
                src={logoImg}
                alt="Costa Transport E.I.R.L."
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
          </div>

          {/* Arbolito de Navidad iluminado */}
          <div className="relative z-10 flex justify-center mb-2.5">
            <ArbolNavidad className="w-16 h-[74px] sm:w-[74px] sm:h-[86px] drop-shadow-[0_6px_18px_rgba(246,220,151,0.28)]" />
          </div>

          {/* Separador ornamental dorado */}
          <div className="relative z-10 flex items-center justify-center gap-3 mb-2.5">
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
            className="relative z-10 font-display text-3xl sm:text-[2.15rem] font-extrabold tracking-tight text-white leading-[1.15]"
          >
            Feliz Navidad
            <span className="block mt-1 text-xl sm:text-2xl font-semibold text-[#F4D99B] tracking-normal">
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
        <div className="px-6 sm:px-9 pt-6 pb-6 text-center bg-gradient-to-b from-white to-[#F8FAFC]">
          <div
            id="anuncio-fiestas-mensaje"
            className="space-y-3 text-slate-600 text-[15px] leading-relaxed"
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
          <div className="my-4 flex flex-col items-center">
            <span className="w-12 h-px bg-[#D9B66B]/60 mb-3" aria-hidden="true" />
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
