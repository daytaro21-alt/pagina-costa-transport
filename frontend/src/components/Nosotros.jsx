import React, { useRef, useState } from 'react';
import {
  Rocket,
  Eye,
  Target,
  Gem,
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  FileText,
  Truck,
  MapPin,
  Satellite,
  Users
} from 'lucide-react';
import costaFleetImg from '../assets/COSTA-1.png';
import bascLogo from '../assets/basc.png';
import premioLogo from '../assets/premio-empresa.jpg';
import gpsImg from '../assets/servicio-gps.jpg';
import slide1Img from '../assets/slide-1.jpg';
import slide2Img from '../assets/slide-2.jpg';

// Sub-componente para las tarjetas interactivas del equipo (con soporte de imagen + video en hover)
const TeamCard = ({ area, title, description, image, videoSrc, badge }) => {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current && videoReady) {
      videoRef.current.play().catch(() => {});
      videoRef.current.style.opacity = 1;
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && videoReady) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.style.opacity = 0;
    }
  };

  return (
    <div
      className="relative w-full h-96 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover group cursor-pointer border border-slate-200/80"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Imagen base de alta calidad */}
      <img
        src={image}
        alt={area}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Video opcional que se revela en el hover si el archivo existe */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
        />
      )}

      {/* Gradiente corporativo superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-t from-costa-navy via-costa-navy/55 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

      {/* Badge superior */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <span className="inline-flex items-center gap-1.5 bg-costa-red/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          {area}
        </span>
        <span className="bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
          {badge}
        </span>
      </div>

      {/* Contenido inferior */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
        <div className="w-10 h-1 bg-gradient-to-r from-costa-red to-[#4aa2c3] rounded-full mb-3 transition-all duration-300 group-hover:w-20" />
        <h3 className="text-white text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-slate-200 text-sm mt-2 leading-relaxed">
          {description}
        </p>
        <p className="text-sky-300 text-xs font-semibold italic mt-3 pt-3 border-t border-white/15 flex items-center justify-between">
          <span>“El respaldo humano detrás de cada kilómetro.”</span>
        </p>
      </div>
    </div>
  );
};

const Nosotros = () => {
  const highlights = [
    'Líderes en traslado de contenedores refrigerados (Reefers) y carga general en el Puerto de Paita.',
    'Más de 40 unidades propias monitoreadas por GPS Satelital en tiempo real.',
    'Servicio especializado para productos hidrobiológicos, agroexportación, carga seca, cama baja y cisterna.',
    'Estricto control bajo Norma Internacional BASC V6-2022 con cero contaminación en toda la cadena.'
  ];

  return (
    <>
      {/* SECCIÓN 1: QUIÉNES SOMOS / HISTORIA */}
      <section id="nosotros" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Columna Izquierda: Composición Visual con Foto Real de la Flota */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
                <img
                  src={costaFleetImg}
                  alt="Flota de Camiones Costa Transport E.I.R.L."
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Marco decorativo con los colores del logo */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-costa-red rounded-2xl -z-0 opacity-90" />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-costa-blue rounded-3xl -z-0 opacity-90" />

              {/* Tarjeta flotante de trayectoria */}
              <div className="mt-6 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-6 z-20 bg-costa-navy text-white p-5 rounded-2xl shadow-xl border border-white/15 flex items-center gap-4 max-w-xs">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-costa-red to-costa-redLight flex items-center justify-center font-extrabold text-2xl shrink-0 shadow-md">
                  20+
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-sky-300 font-bold block">
                    Trayectoria Sólida
                  </span>
                  <p className="text-sm font-bold text-white leading-snug">
                    Años impulsando el Comercio Exterior desde Paita, Piura
                  </p>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Información Corporativa */}
            <div className="lg:col-span-6">
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
                  monitoreadas con GPS Satelital las 24 horas para el transporte de productos congelados, carga seca, traslado de materiales, así como unidades especializadas para el servicio de{' '}
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
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: IDENTIDAD CORPORATIVA (Misión, Visión, Objetivos, Valores + Documentos Oficiales) */}
      <section id="identidad" className="py-20 lg:py-24 bg-slate-50 bg-costa-pattern relative border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado */}
          <div className="text-center max-w-3xl mx-auto mb-16">
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
          </div>

          {/* Grid de 4 Tarjetas: Misión, Visión, Objetivos y Valores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {/* Tarjeta 1: Misión */}
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5">
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

            {/* Tarjeta 2: Visión */}
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5">
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

            {/* Tarjeta 3: Objetivos */}
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5">
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

            {/* Tarjeta 4: Valores Corporativos + Documentos Oficiales */}
            <div className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5">
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

                {/* Enlaces rescatados de la web antigua a Google Drive */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Normativa y Transparencia:
                  </span>
                  <a
                    href="https://drive.google.com/file/d/1xh8b4A2a5EjEXkEVFL4aYrLmXEVNjkk3/view?usp=sharing"
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
                    href="https://drive.google.com/file/d/1xV-kvyRbSxrsWshCHskYyR8hxBXRFOu-/view?usp=sharing"
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
          </div>

          {/* Sub-sección: El Equipo y Áreas de Respaldo (Mantenida y mejorada de tu avance) */}
          <div className="mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-costa-blue block mb-1">
                  ORGANIZACIÓN Y TALENTO HUMANO
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Áreas que Impulsan Cada Operación
                </h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-md">
                Personal altamente calificado, comprometido con la trazabilidad, transparencia administrativa y seguridad vial en cada ruta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TeamCard
                area="Operaciones"
                badge="Torre de Control"
                title="Monitoreo Satelital 24/7"
                description="Supervisión continua de rutas, control de temperatura en contenedores Reefer y comunicación constante con cada unidad."
                image={gpsImg}
                videoSrc="/assets/video-operaciones.mp4"
              />
              <TeamCard
                area="Contabilidad y Gestión"
                badge="Administración"
                title="Procesos Transparentes"
                description="Facturación ágil, liquidación documentaria oportuna y cumplimiento riguroso de normativas tributarias y comerciales."
                image={slide2Img}
                videoSrc="/assets/video-contabilidad.mp4"
              />
              <TeamCard
                area="Recursos Humanos"
                badge="Talento BASC"
                title="Personal Calificado"
                description="Conductores profesionales y equipo técnico en constante capacitación bajo estándares de seguridad vial y norma BASC."
                image={slide1Img}
                videoSrc="/assets/video-rrhh.mp4"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nosotros;
