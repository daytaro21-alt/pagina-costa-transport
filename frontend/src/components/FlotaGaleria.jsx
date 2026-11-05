import React, { useState } from 'react';
import { Truck, Users, ShieldCheck, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

import flotaPanoramica from '../assets/galeria/flota-panoramica.jpg';
import flotaMackReefer from '../assets/galeria/flota-mack-reefer.jpg';
import flotaMackFrontal from '../assets/galeria/flota-mack-frontal.jpg';
import flotaPatioPaita from '../assets/galeria/flota-patio-paita.jpg';
import flotaAlineada1 from '../assets/galeria/flota-alineada-1.jpg';
import flotaAlineada2 from '../assets/galeria/flota-alineada-2.jpg';
import flotaColumbia from '../assets/galeria/flota-columbia.jpg';
import costaVolvoFlota from '../assets/galeria/costa-volvo-flota.jpg';
import costaVolvoBasc from '../assets/galeria/costa-volvo-basc.jpg';
import costaPremioFlota from '../assets/galeria/costa-premio-flota.jpg';

import costaStacker from '../assets/galeria/costa-stacker.jpg';
import costaReeferGenset from '../assets/galeria/costa-reefer-genset.jpg';
import costaCisterna from '../assets/galeria/costa-cisterna.jpg';
import costaTolva from '../assets/galeria/costa-tolva.jpg';
import costaGpsFlota from '../assets/galeria/costa-gps-flota.jpg';
import costaSegurosFlota from '../assets/galeria/costa-seguros-flota.jpg';

import equipoCompleto from '../assets/galeria/equipo-completo.jpg';
import equipoConductores from '../assets/galeria/equipo-conductores.jpg';
import equipoAdministrativo from '../assets/galeria/equipo-administrativo.jpg';
import costaEquipo1 from '../assets/galeria/costa-equipo-1.jpg';
import costaEquipoBanner from '../assets/galeria/costa-equipo-banner.jpg';

const categories = [
  { id: 'todos', label: 'Toda la Galería', icon: Sparkles },
  { id: 'flota', label: 'Flota de Tractocamiones', icon: Truck },
  { id: 'operaciones', label: 'Equipos y Operaciones', icon: ShieldCheck },
  { id: 'equipo', label: 'Nuestro Equipo Humano', icon: Users },
];

const galleryItems = [
  {
    id: 1,
    src: flotaPanoramica,
    title: 'Flota propia en patio operativo de Paita',
    subtitle: 'Tractocamiones americanos listos para despacho nacional',
    category: 'flota',
    featured: true,
  },
  {
    id: 2,
    src: flotaMackReefer,
    title: 'Tractocamión Mack con Contenedor Reefer 40\'',
    subtitle: 'Especialistas en cadena de frío y exportación portuaria',
    category: 'flota',
    featured: true,
  },
  {
    id: 3,
    src: costaStacker,
    title: 'Maniobras con Reach Stacker en Terminal',
    subtitle: 'Operaciones ágiles de apilamiento y despacho de contenedores',
    category: 'operaciones',
  },
  {
    id: 4,
    src: equipoCompleto,
    title: 'Gran Familia Costa Transport E.I.R.L.',
    subtitle: 'Personal operativo, conductores y plana administrativa en Paita',
    category: 'equipo',
    featured: true,
  },
  {
    id: 5,
    src: costaReeferGenset,
    title: 'Transporte Refrigerado con Generador Underslung',
    subtitle: 'Suministro eléctrico continuo para contenedores Reefer',
    category: 'operaciones',
  },
  {
    id: 6,
    src: costaCisterna,
    title: 'Unidades Cisterna de Gran Capacidad',
    subtitle: 'Transporte especializado de líquidos bajo estrictos protocolos de seguridad',
    category: 'operaciones',
  },
  {
    id: 7,
    src: flotaPatioPaita,
    title: 'Unidades Freightliner y Mack en Base Paita',
    subtitle: 'Mantenimiento preventivo riguroso y disponibilidad 24/7',
    category: 'flota',
  },
  {
    id: 8,
    src: costaTolva,
    title: 'Semirremolques Tolva para Carga a Granel',
    subtitle: 'Soluciones eficientes para el sector agroindustrial, minero y construcción',
    category: 'operaciones',
  },
  {
    id: 9,
    src: equipoConductores,
    title: 'Plana de Conductores Profesionales',
    subtitle: 'Capacitación continua en manejo defensivo, seguridad vial y normativa BASC',
    category: 'equipo',
  },
  {
    id: 10,
    src: equipoAdministrativo,
    title: 'Equipo de Gestión, Operaciones y Atención al Cliente',
    subtitle: 'Coordinación logística permanente en Paita y Lima',
    category: 'equipo',
  },
  {
    id: 11,
    src: flotaAlineada1,
    title: 'Línea de Tractocamiones Freightliner Columbia',
    subtitle: 'Potencia y confiabilidad en rutas de costa, sierra y selva',
    category: 'flota',
  },
  {
    id: 12,
    src: flotaMackFrontal,
    title: 'Unidad Mack — Transporte de Contenedores',
    subtitle: 'Equipamiento moderno para operaciones de comercio exterior',
    category: 'flota',
  },
  {
    id: 13,
    src: costaVolvoFlota,
    title: 'Flota Volvo FH y Freightliner en Ruta',
    subtitle: 'Más de 18 años transportando el progreso del Perú',
    category: 'flota',
  },
  {
    id: 14,
    src: costaVolvoBasc,
    title: 'Operaciones Certificadas con Estándares BASC',
    subtitle: 'Trazabilidad y control de seguridad en toda la cadena logística',
    category: 'operaciones',
  },
  {
    id: 15,
    src: flotaAlineada2,
    title: 'Patio de Maniobras Zona Industrial II — Paita',
    subtitle: 'Infraestructura propia de 5,000 m² cercana al Puerto de Paita',
    category: 'flota',
  },
  {
    id: 16,
    src: costaGpsFlota,
    title: 'Monitoreo Satelital GPS en Tiempo Real',
    subtitle: 'Control de ruta, velocidad y geocercas las 24 horas del día',
    category: 'operaciones',
  },
  {
    id: 17,
    src: flotaColumbia,
    title: 'Unidades Listas para Embarque',
    subtitle: 'Inspección pre-operativa antes de cada servicio nacional',
    category: 'flota',
  },
  {
    id: 18,
    src: costaPremioFlota,
    title: 'Reconocimiento a la Excelencia Operativa',
    subtitle: 'Empresa Peruana del Año en el sector transporte de carga',
    category: 'flota',
  },
  {
    id: 19,
    src: costaSegurosFlota,
    title: 'Cobertura Integral de Seguros',
    subtitle: 'Pólizas de carga y responsabilidad civil para total respaldo del cliente',
    category: 'operaciones',
  },
  {
    id: 20,
    src: costaEquipo1,
    title: 'Compromiso y Vocación de Servicio',
    subtitle: 'Un equipo humano unido por la seguridad y la puntualidad',
    category: 'equipo',
  },
  {
    id: 21,
    src: costaEquipoBanner,
    title: 'Liderazgo Logístico en el Norte del País',
    subtitle: 'Atención personalizada desde nuestras sedes de Paita y Lima',
    category: 'equipo',
  },
];

const FlotaGaleria = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems =
    activeCategory === 'todos'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="flota" className="py-24 bg-costa-navy text-white relative overflow-hidden">
      {/* Background decorative accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-costa-blue/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-costa-red/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-costa-light text-xs font-bold uppercase tracking-widest mb-3">
            <Truck size={14} className="text-costa-red" /> Respaldo Real y Propio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight mb-4">
            Nuestra Flota, Operaciones y <span className="text-costa-light">Equipo Humano</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Conoce de cerca nuestras unidades tractocamión, equipos especializados en operación portuaria y el equipo de profesionales que garantiza cada entrega en todo el Perú.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setLightboxIndex(null);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-costa-red text-white shadow-lg shadow-costa-red/30 scale-[1.02]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg hover:shadow-2xl hover:border-costa-blue/60 transition-all duration-300 cursor-pointer h-72"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-costa-navy/95 via-costa-navy/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-costa-navy/80 text-costa-light border border-white/15 backdrop-blur-sm">
                  {item.category === 'flota'
                    ? 'Flota Propia'
                    : item.category === 'operaciones'
                    ? 'Operaciones'
                    : 'Equipo Costa'}
                </span>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-costa-red group-hover:border-costa-red">
                <ZoomIn size={16} />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <h3 className="text-base font-bold text-white font-heading leading-snug mb-1 group-hover:text-costa-light transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-costa-red text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            aria-label="Cerrar imagen"
          >
            <X size={22} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-costa-blue text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={26} />
          </button>

          <div
            className="max-w-5xl w-full bg-costa-navy border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black flex items-center justify-center max-h-[75vh]">
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-costa-navy">
              <div>
                <h4 className="text-lg font-bold text-white font-heading">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-sm text-slate-300 mt-0.5">
                  {filteredItems[lightboxIndex].subtitle}
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 shrink-0">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-costa-blue text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </section>
  );
};

export default FlotaGaleria;
