import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Truck,
  Satellite,
  Award,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import slidePanoramica from '../assets/galeria/flota-panoramica.jpg';
import slideMackReefer from '../assets/galeria/flota-mack-reefer.jpg';
import slideStacker from '../assets/galeria/costa-stacker.jpg';
import slideCisterna from '../assets/galeria/costa-cisterna.jpg';
import slideEquipo from '../assets/galeria/equipo-completo.jpg';
import bascLogo from '../assets/basc.png';
import premioLogo from '../assets/premio-empresa.jpg';

const slides = [
  {
    id: 1,
    image: slidePanoramica,
    tag: 'FLOTA MODERNA PROPIA • +40 UNIDADES',
    title: 'Líderes en Transporte de Carga Pesada y',
    highlight: 'Contenedores Refrigerados',
    description:
      'Más de 20 años moviendo el Comercio Exterior desde el Puerto de Paita hacia todo el Perú con unidades Freightliner, Mack y Volvo monitoreadas por GPS Satelital 24/7.',
    pills: ['+40 Unidades Operativas', 'Plataforma GPS Propia', 'Cobertura Nacional']
  },
  {
    id: 2,
    image: slideMackReefer,
    tag: 'CADENA DE FRÍO GARANTIZADA',
    title: 'Especialistas en Carga Refrigerada con',
    highlight: 'Equipos Genset y Clip-On',
    description:
      'Transportamos contenedores refrigerados (Reefers) de 40 pies con generadores Underslung, Genset y Clip-On de última tecnología para conservar la temperatura exacta.',
    pills: ['Equipos Genset & Underslung', 'Control Térmico Continuo', 'Exportación Hidrobiológica y Agro']
  },
  {
    id: 3,
    image: slideStacker,
    tag: 'MAQUINARIA PORTUARIA Y ALMACENAJE',
    title: 'Alquiler de Reach Stacker, Montacargas y',
    highlight: 'Almacén en Paita',
    description:
      'Disponibilidad inmediata de maquinaria Terex Reach Stacker, contenedores Reefer de 40 pies y amplios almacenes acondicionados para tuberías y contenedores.',
    pills: ['Reach Stacker Terex', 'Alquiler de Reefers 40 Pies', 'Almacén de Tuberías y Contenedores']
  },
  {
    id: 4,
    image: slideCisterna,
    tag: 'DIVERSIDAD OPERATIVA DE ALTO TONELAJE',
    title: 'Transporte en Tolvas, Cama Baja,',
    highlight: 'Granel y Carga Líquida',
    description:
      'Soluciones logísticas especializadas con unidades de cama baja, tolvas para agregados y camiones cisterna con Seguro de Carga, Contenedores y Responsabilidad Civil.',
    pills: ['Tolvas y Cama Baja', 'Unidades Cisterna', 'Triple Cobertura de Seguros']
  },
  {
    id: 5,
    image: slideEquipo,
    tag: 'SEGURIDAD Y CAPITAL HUMANO • NORMA BASC V6-2022',
    title: 'Un Equipo Calificado Comprometido con tu',
    highlight: 'Seguridad Logística',
    description:
      'Conductores profesionales y personal administrativo altamente capacitado bajo estándares internacionales BASC y reconocidos con el Premio Empresa Peruana del Año.',
    pills: ['Certificación BASC Vigente', 'Personal Calificado', 'Premio Empresa Peruana del Año']
  }
];

const stats = [
  {
    icon: Award,
    value: '+20 Años',
    label: 'Liderando el transporte en Paita y todo el Perú',
    accent: 'from-costa-red to-costa-redLight'
  },
  {
    icon: Truck,
    value: '+40 Unidades',
    label: 'Flota moderna para Reefers, tolvas, cisterna y cama baja',
    accent: 'from-costa-blue to-costa-blueLight'
  },
  {
    icon: Satellite,
    value: 'GPS 24/7',
    label: 'Plataforma propia de rastreo satelital para clientes',
    accent: 'from-costa-blue to-emerald-500'
  },
  {
    icon: ShieldCheck,
    value: 'BASC V6',
    label: 'Control estricto y comercio internacional seguro',
    accent: 'from-costa-red to-amber-500'
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const activeSlide = slides[current];

  return (
    <section id="inicio" className="relative w-full min-h-screen flex flex-col justify-between bg-costa-navy overflow-hidden pt-28 pb-12 lg:pt-36">
      {/* Imágenes del Carrusel con transición suave */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transitionProperty: 'opacity, transform', transitionDuration: '1200ms, 7000ms' }}
        >
          <img
            src={slide.image}
            alt={slide.tag}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06151f]/95 via-[#0B2230]/80 to-[#297392]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06151f] via-transparent to-[#06151f]/60" />
        </div>
      ))}

      {/* Elementos decorativos de marca */}
      <div className="absolute -right-24 top-1/4 w-96 h-96 bg-costa-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 bottom-1/4 w-96 h-96 bg-costa-red/20 rounded-full blur-3xl pointer-events-none" />

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Columna Izquierda: Texto e Interacción */}
          <div className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-6 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-costa-red animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-costa-red -ml-5" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-200">
                {activeSlide.tag}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight mb-6 drop-shadow-sm">
              {activeSlide.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5ec2eb] via-sky-200 to-white">
                {activeSlide.highlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-200/95 mb-8 max-w-2xl leading-relaxed font-normal">
              {activeSlide.description}
            </p>

            {/* Pills de atributos del slide actual */}
            <div className="flex flex-wrap gap-2.5 mb-9">
              {activeSlide.pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-costa-blue/30 backdrop-blur-sm border border-costa-blueLight/40 px-3.5 py-1.5 rounded-lg"
                >
                  <CheckCircle2 size={15} className="text-[#5ec2eb]" />
                  {pill}
                </span>
              ))}
            </div>

            {/* Botones de Acción (CTAs) */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#servicios"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-costa-red to-costa-redLight hover:from-costa-redDark hover:to-costa-red text-white font-bold py-4 px-8 rounded-xl text-base transition-all duration-300 shadow-glow-red hover:-translate-y-0.5"
              >
                <span>Nuestros Servicios</span>
                <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#flota"
                className="inline-flex items-center gap-2.5 bg-costa-blue/80 hover:bg-costa-blue backdrop-blur-md text-white border border-sky-300/30 font-bold py-4 px-7 rounded-xl text-base transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Ver Galería de Flota</span>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=51977882764&text=Hola%20Costa%20Transport,%20quisiera%20cotizar%20un%20servicio%20de%20transporte%20de%20carga."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 font-bold py-4 px-6 rounded-xl text-base transition-all duration-300 hover:-translate-y-0.5"
              >
                <PhoneCall size={18} className="text-[#5ec2eb]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Flotante de Certificaciones Reales + Miniaturas */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl text-white">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-sky-300 font-bold block">
                    Respaldo & Garantía
                  </span>
                  <h2 className="text-lg font-bold text-white">Certificaciones Oficiales</h2>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                  100% Verificado
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center gap-4 bg-white/95 text-slate-900 p-3 rounded-xl shadow-md">
                  <img
                    src={bascLogo}
                    alt="Certificación Internacional BASC"
                    className="w-12 h-12 object-contain shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-costa-blue block">
                      Norma BASC V6-2022
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      Business Alliance for Secure Commerce
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                      Código: PERLIM00726-1-2 • Paita
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/95 text-slate-900 p-3 rounded-xl shadow-md">
                  <img
                    src={premioLogo}
                    alt="Premio Empresa Peruana del Año"
                    className="w-12 h-12 object-contain rounded-full shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-costa-red block">
                      Galardón Nacional
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      Premio Empresa Peruana del Año
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                      Reconocimiento consecutivo a la excelencia
                    </p>
                  </div>
                </div>
              </div>

              {/* Miniaturas interactivas del carrusel */}
              <div className="mt-5 pt-4 border-t border-white/15">
                <div className="grid grid-cols-5 gap-1.5 mb-3">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrent(idx)}
                      className={`relative h-11 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === current
                          ? 'border-costa-redLight scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={s.image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-semibold">
                     Vista {current + 1} de {slides.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      aria-label="Anterior slide"
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-costa-blue text-white transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextSlide}
                      aria-label="Siguiente slide"
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-costa-blue text-white transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinta de Indicadores Clave (KPIs) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white tracking-tight">
                    {item.value}
                  </div>
                  <p className="text-xs text-slate-300 leading-snug mt-0.5">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
