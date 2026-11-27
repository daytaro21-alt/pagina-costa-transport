import React, { useEffect, useState } from 'react';
import {
  Rocket,
  Eye,
  Target,
  Gem,
  CheckCircle2,
  ExternalLink,
  FileText,
  Play,
  X,
  Film
} from 'lucide-react';
import costaFleetImg from '../assets/galeria/editada-03-patio-reefer-alto.jpg';
import equipoCompletoImg from '../assets/galeria/equipo-completo.jpg';
import equipoConductoresImg from '../assets/galeria/equipo-conductores.jpg';
import equipoAdminImg from '../assets/galeria/equipo-administrativo.jpg';
import flotaMackImg from '../assets/galeria/editada-04-mack-plataforma.jpg';
import bascLogo from '../assets/basc.png';
import premioLogo from '../assets/premio-empresa.jpg';
import Reveal from './Reveal';

const teamAreas = [
  {
    id: 'operaciones',
    area: 'Operaciones y Flota',
    badge: 'Conductores Calificados',
    title: 'Excelencia en Ruta y Monitoreo 24/7',
    description:
      'Conductores profesionales y supervisores operativos dedicados al traslado seguro y control satelital continuo de cada unidad.',
    image: equipoConductoresImg,
    videoSrc: '/videos/video-operaciones.mp4'
  },
  {
    id: 'contabilidad',
    area: 'Administración y Contabilidad',
    badge: 'Gestión Corporativa',
    title: 'Procesos Transparentes y Ágiles',
    description:
      'Nuestro equipo administrativo y contable acompaña a cada cliente con atención personalizada, trazabilidad documentaria y eficiencia.',
    image: equipoAdminImg,
    videoSrc: '/videos/video-contabilidad.mp4'
  },
  {
    id: 'rrhh',
    area: 'Capital Humano BASC',
    badge: 'Familia Costa Transport',
    title: 'Personal Capacitado y Comprometido',
    description:
      'Un equipo unido y en constante formación en seguridad vial, prevención de riesgos y cumplimiento de la Norma BASC V6-2022.',
    image: equipoCompletoImg,
    videoSrc: '/videos/video-rrhh.mp4'
  }
];

// Sub-componente para las tarjetas interactivas con reproducción de video al hacer clic
const TeamCard = ({ item, onSelectVideo }) => {
  const { area, title, description, image, badge } = item;

  return (
    <button
      type="button"
      onClick={() => onSelectVideo(item)}
      className="relative w-full h-96 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover group cursor-pointer border border-slate-200/80 text-left focus:outline-none focus:ring-2 focus:ring-costa-blue focus:ring-offset-2"
    >
      {/* Imagen real de alta calidad del equipo */}
      <img
        src={image}
        alt={area}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradiente corporativo superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-t from-costa-navy via-costa-navy/50 to-costa-navy/15 opacity-90 group-hover:opacity-95 transition-opacity" />

      {/* Badge superior */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
        <span className="inline-flex items-center gap-1.5 bg-costa-red/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md leading-tight">
          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
          {area}
        </span>
        <span className="bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0">
          {badge}
        </span>
      </div>

      {/* Botón central de Play al pasar el cursor / indicador visible */}
      <div className="absolute inset-0 flex items-center justify-center pb-24 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-costa-red backdrop-blur-md border-2 border-white/60 group-hover:border-white flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110">
          <Play size={22} className="fill-white ml-0.5" />
        </div>
      </div>

      {/* Contenido inferior */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
        <div className="w-10 h-1 bg-gradient-to-r from-costa-red to-[#4aa2c3] rounded-full mb-3 transition-all duration-300 group-hover:w-20" />
        <h3 className="text-white text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-slate-200 text-sm mt-2 leading-relaxed">
          {description}
        </p>
        <div className="text-sky-300 text-xs font-semibold mt-3 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
          <span className="italic">“El respaldo humano detrás de cada kilómetro.”</span>
          <span className="inline-flex items-center gap-1 text-white bg-white/15 group-hover:bg-costa-blue px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-colors">
            <Play size={10} className="fill-current" />
            Ver video
          </span>
        </div>
      </div>
    </button>
  );
};

// Modal reproductor de video del área (con vista previa elegante mientras se suben los MP4)
const VideoAreaModal = ({ item, onClose }) => {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-costa-navy/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video institucional: ${item.area}`}
    >
      <div
        className="w-full max-w-4xl bg-costa-navy rounded-3xl overflow-hidden shadow-2xl border border-white/15 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="px-6 py-4 bg-costa-navy border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-costa-red text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
              {item.area}
            </span>
            <h4 className="text-white font-bold text-sm sm:text-base hidden sm:block">
              {item.title}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar video"
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-costa-red text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Reproductor o pantalla de próximamente */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden">
          {!videoError ? (
            <video
              key={item.videoSrc}
              src={item.videoSrc}
              poster={item.image}
              controls
              autoPlay
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={item.image}
                alt={item.area}
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-costa-navy via-costa-navy/75 to-costa-navy/50" />
              <div className="relative z-10 text-center px-6 max-w-lg space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-costa-blue/30 border border-sky-300/40 text-sky-300 flex items-center justify-center mx-auto shadow-lg">
                  <Film size={30} />
                </div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-costa-red/90 text-white text-xs font-extrabold uppercase tracking-widest">
                  Video Institucional Próximamente
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {item.area} — Costa Transport E.I.R.L.
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Estamos produciendo el video institucional de esta área para mostrarte de cerca nuestras operaciones y equipo en Paita. Muy pronto estará disponible aquí.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pie informativo */}
        <div className="px-6 py-4 bg-[#071722] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <p>{item.description}</p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-costa-blue text-white font-bold transition-colors shrink-0 self-end sm:self-auto"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const Nosotros = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const highlights = [
    'Líderes en traslado de contenedores refrigerados (Reefers) y carga general en el Puerto de Paita.',
    'Más de 40 unidades propias monitoreadas por GPS Satelital en tiempo real.',
    'Servicio especializado para productos congelados, carga seca, agregados en tolvas, cama baja y cisterna.',
    'Estricto control bajo Norma Internacional BASC V6-2022 con cero contaminación en toda la cadena.'
  ];

  return (
    <>
      {/* SECCIÓN 1: QUIÉNES SOMOS / HISTORIA CON MOSAICO REAL */}
      <section id="nosotros" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Columna Izquierda: Composición Mosaico de Fotos Reales */}
            <Reveal direction="left" className="lg:col-span-6 relative">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10">
                  <img
                    src={costaFleetImg}
                    alt="Flota de Camiones Costa Transport E.I.R.L."
                    className="w-full h-64 sm:h-72 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="col-span-6 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative z-10">
                  <img
                    src={equipoCompletoImg}
                    alt="Equipo de Colaboradores Costa Transport"
                    className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="col-span-6 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative z-10">
                  <img
                    src={flotaMackImg}
                    alt="Tractocamión Mack Costa Transport E.I.R.L."
                    className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Marco decorativo con los colores del logo */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-costa-red rounded-2xl -z-0 opacity-90" />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-costa-blue rounded-3xl -z-0 opacity-90" />
            </Reveal>

            {/* Columna Derecha: Información Corporativa */}
            <Reveal direction="right" delay={120} className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 bg-costa-blue/10 text-costa-blue px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4">
                <img src="/isotipo.png" alt="" className="w-4 h-3.5 object-contain" />
                <span>Sobre Costa Transport E.I.R.L.</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                Líderes en Transporte de{' '}
                <span className="text-costa-blue">Carga Pesada</span> y{' '}
                <span className="text-costa-red">Refrigerada</span>
              </h2>

              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Somos una empresa de transportes de carga pesada líder en el traslado de{' '}
                  <strong className="text-slate-900 font-semibold">
                    contenedores refrigerados y carga general
                  </strong>{' '}
                  en el estratégico Puerto de Paita, Piura, hacia todo el Perú, con más de{' '}
                  <strong className="text-costa-blue font-bold">20 años de experiencia</strong> en el sector logístico.
                </p>
                <p>
                  Actualmente contamos con{' '}
                  <strong className="text-slate-900 font-semibold">
                    más de 40 unidades modernas
                  </strong>{' '}
                  monitoreadas con GPS Satelital las 24 horas para el transporte de productos congelados, carga seca, traslado de materiales y agregados en tolvas, así como unidades especializadas para el servicio de{' '}
                  <strong className="text-slate-900 font-semibold">cama baja y cisterna</strong>.
                </p>
                <p>
                  Contamos con la{' '}
                  <strong className="text-costa-blue font-bold">
                    Certificación Internacional BASC
                  </strong>
                  , con la cual confirmamos el estricto control que llevamos en el traslado de la carga y garantizamos que no existe posibilidad de contaminación en ninguna etapa del proceso.
                </p>
              </div>

              {/* Lista de puntos clave */}
              <div className="mt-6 space-y-2.5">
                {highlights.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-costa-red shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              {/* Sellos de Reconocimiento Reales */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3.5 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200/80">
                  <img src={bascLogo} alt="BASC" className="h-14 w-auto object-contain" />
                  <div>
                    <div className="text-xs font-extrabold text-costa-blue uppercase">
                      Certificación BASC
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Comercio Exterior Seguro
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200/80">
                  <img
                    src={premioLogo}
                    alt="Empresa Peruana del Año"
                    className="h-14 w-14 rounded-full object-contain"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-costa-red uppercase">
                      Empresa Peruana del Año
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Reconocimiento Consecutivo
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: IDENTIDAD CORPORATIVA + EQUIPO REAL */}
      <section id="identidad" className="py-20 lg:py-24 bg-slate-50 bg-costa-pattern relative border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-costa-red/10 text-costa-red px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
              <img src="/isotipo.png" alt="" className="w-4 h-3.5 object-contain" />
              <span>Pilares Institucionales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nuestra Identidad Corporativa
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Guiados por la excelencia operativa, la ética empresarial y el firme compromiso con cada cliente en toda la cadena logística.
            </p>
          </Reveal>

          {/* Grid de 4 Tarjetas: Misión, Visión, Objetivos y Valores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {/* Tarjeta 1: Misión */}
            <Reveal direction="up" delay={0} className="flex">
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200/80 overflow-hidden flex flex-col w-full transition-all duration-300 hover:-translate-y-1.5">
              <div className="bg-gradient-to-br from-costa-red to-costa-redDark group-hover:from-costa-blue group-hover:to-costa-blueDark transition-colors duration-500 p-6 text-white relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Rocket size={24} className="text-white" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-white/75 font-bold block">
                  01 • Propósito
                </span>
                <h3 className="text-xl font-extrabold tracking-wide mt-0.5">MISIÓN</h3>
                <img
                  src="/isotipo.png"
                  alt=""
                  className="w-20 h-20 object-contain absolute -right-4 -bottom-4 opacity-15 brightness-200"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-slate-600 text-sm leading-relaxed">
                  El compromiso de <strong className="text-slate-900">COSTA TRANSPORT E.I.R.L.</strong> es la satisfacción de las necesidades y expectativas del cliente, brindando soluciones integrales de transporte en el traslado de contenedores refrigerados y carga general.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-costa-blue">
                  <img src="/isotipo.png" alt="" className="w-3.5 h-3" />
                  <span>Soluciones Integrales Reefers & Carga</span>
                </div>
              </div>
            </div>
            </Reveal>

            {/* Tarjeta 2: Visión */}
            <Reveal direction="up" delay={90} className="flex">
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200/80 overflow-hidden flex flex-col w-full transition-all duration-300 hover:-translate-y-1.5">
              <div className="bg-gradient-to-br from-costa-blue to-costa-blueDark group-hover:from-costa-red group-hover:to-costa-redDark transition-colors duration-500 p-6 text-white relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Eye size={24} className="text-white" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-white/75 font-bold block">
                  02 • Proyección
                </span>
                <h3 className="text-xl font-extrabold tracking-wide mt-0.5">VISIÓN</h3>
                <img
                  src="/isotipo.png"
                  alt=""
                  className="w-20 h-20 object-contain absolute -right-4 -bottom-4 opacity-15 brightness-200"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Ser la empresa líder del transporte en el traslado de contenedores refrigerados y carga en general a <strong className="text-slate-900">nivel nacional</strong>, respaldados por la confianza de nuestros clientes y el compromiso de nuestro personal, ofreciendo un servicio de calidad y mejora continua.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-costa-red">
                  <img src="/isotipo.png" alt="" className="w-3.5 h-3" />
                  <span>Liderazgo Nacional y Mejora Continua</span>
                </div>
              </div>
            </div>
            </Reveal>

            {/* Tarjeta 3: Objetivos */}
            <Reveal direction="up" delay={180} className="flex">
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200/80 overflow-hidden flex flex-col w-full transition-all duration-300 hover:-translate-y-1.5">
              <div className="bg-gradient-to-br from-costa-red to-costa-redDark group-hover:from-costa-blue group-hover:to-costa-blueDark transition-colors duration-500 p-6 text-white relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Target size={24} className="text-white" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-white/75 font-bold block">
                  03 • Metas Estratégicas
                </span>
                <h3 className="text-xl font-extrabold tracking-wide mt-0.5">OBJETIVOS</h3>
                <img
                  src="/isotipo.png"
                  alt=""
                  className="w-20 h-20 object-contain absolute -right-4 -bottom-4 opacity-15 brightness-200"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <ul className="space-y-3 text-slate-600 text-sm leading-snug">
                  <li className="flex items-start gap-2.5">
                    <img src="/isotipo.png" alt="" className="w-3.5 h-3 mt-1 shrink-0" />
                    <span>Satisfacer las necesidades de los clientes con los más altos estándares del mercado.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <img src="/isotipo.png" alt="" className="w-3.5 h-3 mt-1 shrink-0" />
                    <span>Mantener el liderazgo en el transporte de carga pesada y acrecentar las alianzas con los asociados de negocios.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <img src="/isotipo.png" alt="" className="w-3.5 h-3 mt-1 shrink-0" />
                    <span>Establecer nuevas alianzas corporativas e incrementar nuestras operaciones de servicio.</span>
                  </li>
                </ul>
              </div>
            </div>
            </Reveal>

            {/* Tarjeta 4: Valores Corporativos + Documentos Oficiales */}
            <Reveal direction="up" delay={270} className="flex">
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200/80 overflow-hidden flex flex-col w-full transition-all duration-300 hover:-translate-y-1.5">
              <div className="bg-gradient-to-br from-costa-blue to-costa-blueDark group-hover:from-costa-red group-hover:to-costa-redDark transition-colors duration-500 p-6 text-white relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Gem size={24} className="text-white" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-white/75 font-bold block">
                  04 • Cultura & Ética
                </span>
                <h3 className="text-xl font-extrabold tracking-wide mt-0.5">VALORES CORPORATIVOS</h3>
                <img
                  src="/isotipo.png"
                  alt=""
                  className="w-20 h-20 object-contain absolute -right-4 -bottom-4 opacity-15 brightness-200"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Puntualidad', 'Responsabilidad', 'Respeto', 'Integridad', 'Seguridad'].map((val) => (
                    <span
                      key={val}
                      className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1 rounded-lg text-xs font-bold"
                    >
                      <img src="/isotipo.png" alt="" className="w-3 h-2.5" />
                      {val}
                    </span>
                  ))}
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Normativa y Transparencia:
                  </span>
                  <a
                    href="https://drive.google.com/file/d/1v1HHVrEXAbwdQefIX-SEzjdLdY7WBZVc/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-costa-blue/5 hover:bg-costa-blue text-costa-blue hover:text-white text-xs font-bold transition-colors border border-costa-blue/15"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={15} />
                      Código de Ética Empresarial
                    </span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href="https://drive.google.com/file/d/1KXi9Yv3ruA6cLOV8pEVhrW1m4m10AAPK/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-costa-red/5 hover:bg-costa-red text-costa-red hover:text-white text-xs font-bold transition-colors border border-costa-red/15"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={15} />
                      Política de Responsabilidad Social
                    </span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
            </Reveal>
          </div>

          {/* Sub-sección: El Equipo y Áreas de Respaldo con Fotos Reales del Equipo */}
          <div className="mt-20">
            <Reveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-costa-blue block mb-1">
                  ORGANIZACIÓN Y TALENTO HUMANO
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Nuestro Equipo de Colaboradores y Conductores
                </h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-md">
                Personal altamente calificado y capacitado bajo estándares internacionales BASC, comprometido con la seguridad de cada operación.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamAreas.map((item, idx) => (
                <Reveal key={item.id} direction="up" delay={idx * 120}>
                  <TeamCard item={item} onSelectVideo={setActiveVideo} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoAreaModal
          key={activeVideo.id}
          item={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
};

export default Nosotros;
