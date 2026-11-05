import React, { useState } from 'react';
import {
  Snowflake,
  Truck,
  Container,
  Warehouse,
  Satellite,
  ShieldCheck,
  Droplets,
  Layers,
  ArrowUpRight,
  Check,
  PhoneCall
} from 'lucide-react';
import imgReefer from '../assets/galeria/costa-reefer-genset.jpg';
import imgTolva from '../assets/galeria/costa-tolva.jpg';
import imgCisterna from '../assets/galeria/costa-cisterna.jpg';
import imgCamaBaja from '../assets/servicio-camabaja.png';
import imgStacker from '../assets/galeria/costa-stacker.jpg';
import imgAlmacen from '../assets/servicio-almacen.jpg';
import imgGps from '../assets/galeria/costa-gps-flota.jpg';
import imgSeguro from '../assets/galeria/costa-seguros-flota.jpg';

const serviciosData = [
  {
    id: 'reefer',
    category: 'transporte',
    icon: Snowflake,
    badge: 'Cadena de Frío Garantizada',
    title: 'Transporte de Carga Refrigerada (Underslung, Genset y Clip-On)',
    description:
      'Usamos la más alta tecnología en equipos generadores Underslung, Genset y Clip-On para mantener la carga hidrobiológica y agroindustrial a la temperatura exacta.',
    image: imgReefer,
    features: ['Generadores Underslung, Genset y Clip-On', 'Control térmico continuo', 'Especialistas en exportación Paita'],
    accent: 'costa-blue'
  },
  {
    id: 'cisterna',
    category: 'transporte',
    icon: Droplets,
    badge: 'Carga Líquida y Granel',
    title: 'Transporte de Carga Pesada, a Granel y Líquida en Cisternas',
    description:
      'Contamos con unidades cisterna modernas y certificadas para el transporte seguro de carga líquida e insumos industriales cumpliendo los más altos estándares.',
    image: imgCisterna,
    features: ['Unidades Cisterna equipadas', 'Transporte de carga líquida y granel', 'Protocolos estrictos de seguridad'],
    accent: 'costa-red'
  },
  {
    id: 'tolvas',
    category: 'transporte',
    icon: Layers,
    badge: 'Agregados y Materiales',
    title: 'Servicio de Transporte de Agregados y Carga en Tolvas',
    description:
      'Flota de tractocamiones con tolvas de gran capacidad para el traslado eficiente de agregados, minerales, graneles y materiales de construcción.',
    image: imgTolva,
    features: ['Tolvas de alto tonelaje', 'Transporte de agregados y materiales', 'Operación puntual y segura'],
    accent: 'costa-blue'
  },
  {
    id: 'camabaja',
    category: 'transporte',
    icon: Truck,
    badge: 'Maquinaria y Sobredimensionados',
    title: 'Transporte Especializado en Plataformas y Cama Baja',
    description:
      'Unidades robustas para el traslado de maquinaria pesada, estructuras, contenedores de 20 y 40 pies y carga general en rutas locales y nacionales.',
    image: imgCamaBaja,
    features: ['Unidades Cama Baja y Plataformas', 'Traslado de maquinaria y carga seca', 'Cobertura en todo el Perú'],
    accent: 'costa-red'
  },
  {
    id: 'alquiler',
    category: 'equipos',
    icon: Container,
    badge: 'Maquinaria & Reefers 40 Pies',
    title: 'Alquiler de Contenedores Refrigerados (Reefers) de 40 Pies y Montacargas',
    description:
      'Soluciones operativas de izaje y conservación con maquinaria Terex Reach Stacker, montacargas industriales y alquiler de contenedores Reefer de 40 pies.',
    image: imgStacker,
    features: ['Reach Stacker Terex de alta capacidad', 'Alquiler de Reefers de 40 pies', 'Montacargas para maniobras'],
    accent: 'costa-blue'
  },
  {
    id: 'almacen',
    category: 'equipos',
    icon: Warehouse,
    badge: 'Infraestructura en Paita',
    title: 'Almacén para Tuberías y Contenedores',
    description:
      'Amplios patios y almacenes acondicionados estratégicamente en Paita para el acopio, custodia y manejo seguro de tuberías industriales y contenedores.',
    image: imgAlmacen,
    features: ['Amplia capacidad de almacenaje', 'Seguridad perimetral 24/7', 'Ubicación estratégica en Paita'],
    accent: 'costa-red'
  },
  {
    id: 'gps',
    category: 'seguridad',
    icon: Satellite,
    badge: 'Plataforma Propia',
    title: 'Tecnología de Monitoreo Satelital GPS 24/7',
    description:
      'Todas nuestras unidades son monitoreadas por GPS a través de nuestra propia plataforma, donde nuestros clientes pueden ver el traslado de su carga en tiempo real.',
    image: imgGps,
    features: ['Acceso directo para clientes', 'Rastreo satelital en tiempo real', 'Control de ruta ininterrumpido 24/7'],
    accent: 'costa-blue'
  },
  {
    id: 'seguros',
    category: 'seguridad',
    icon: ShieldCheck,
    badge: 'Respaldo Total',
    title: 'Seguro de Carga, Contenedores y Responsabilidad Civil',
    description:
      'Protegemos el valor de su mercancía y operaciones de principio a fin con pólizas de alta cobertura que garantizan respaldo total en cada kilómetro.',
    image: imgSeguro,
    features: ['Seguro de Carga', 'Seguro de Contenedores', 'Seguro de Responsabilidad Civil'],
    accent: 'costa-red'
  }
];

const categories = [
  { id: 'todos', label: 'Todos los Servicios (8)' },
  { id: 'transporte', label: 'Transporte Terrestre' },
  { id: 'equipos', label: 'Equipos y Almacén' },
  { id: 'seguridad', label: 'Monitoreo y Seguros' },
];

const Servicios = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const filteredServices =
    selectedCategory === 'todos'
      ? serviciosData
      : serviciosData.filter((s) => s.category === selectedCategory);

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-costa-blue/10 text-costa-blue px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
              <img src="/isotipo.png" alt="" className="w-4 h-3.5 object-contain" />
              <span>Soluciones Logísticas Integrales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Nuestros <span className="text-costa-blue">Servicios</span> Especializados
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Equipos propios de última generación, infraestructura portuaria en Paita y monitoreo satelital permanente para proteger su cadena de suministro.
            </p>
          </div>

          {/* Filtros de categoría */}
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl self-start lg:self-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-costa-blue text-white shadow-md'
                    : 'text-slate-600 hover:text-costa-blue hover:bg-white/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredServices.map((servicio, index) => {
            const Icon = servicio.icon;
            const isRed = servicio.accent === 'costa-red';
            return (
              <div
                key={servicio.id}
                className="group bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Imagen del servicio */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={servicio.image}
                    alt={servicio.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-costa-navy/90 via-costa-navy/20 to-transparent" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md ${
                        isRed ? 'bg-costa-red/95' : 'bg-costa-blue/95'
                      }`}
                    >
                      {servicio.badge}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-extrabold flex items-center justify-center">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-5 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${
                        isRed
                          ? 'bg-gradient-to-br from-costa-red to-costa-redLight'
                          : 'bg-gradient-to-br from-costa-blue to-costa-blueLight'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                  </div>
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-costa-blue transition-colors leading-snug mb-2.5">
                      {servicio.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {servicio.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      {servicio.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              isRed ? 'bg-costa-red/10 text-costa-red' : 'bg-costa-blue/10 text-costa-blue'
                            }`}
                          >
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100">
                    <a
                      href={`https://api.whatsapp.com/send?phone=51977882764&text=${encodeURIComponent(
                        `Hola Costa Transport, me interesa cotizar el servicio de: ${servicio.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isRed
                          ? 'bg-costa-red/5 hover:bg-costa-red text-costa-red hover:text-white'
                          : 'bg-costa-blue/5 hover:bg-costa-blue text-costa-blue hover:text-white'
                      }`}
                    >
                      <span>Cotizar servicio</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA intermedio */}
        <div className="mt-16 rounded-3xl bg-costa-mesh p-8 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-sky-300 mb-2">
                ATENCIÓN CORPORATIVA INMEDIATA
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                ¿Necesita trasladar contenedores refrigerados, carga líquida o carga especial desde Paita?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Nuestro equipo de operaciones diseña planes logísticos a medida con unidades propias, Genset y monitoreo GPS 24/7.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 shrink-0">
              <a
                href="https://api.whatsapp.com/send?phone=51977882764&text=Hola%20Costa%20Transport,%20deseo%20cotizar%20una%20operaci%C3%B3n%20log%C3%ADstica."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-costa-red hover:bg-costa-redLight text-white font-bold px-7 py-4 rounded-xl shadow-glow-red transition-all hover:-translate-y-0.5"
              >
                <PhoneCall size={18} />
                <span>Hablar con Operaciones</span>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-7 py-4 rounded-xl transition-all"
              >
                <span>Formulario de Cotización</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicios;
