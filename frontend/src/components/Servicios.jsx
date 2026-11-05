import React, { useState } from 'react';
import {
  Snowflake,
  Truck,
  Container,
  Warehouse,
  Satellite,
  ShieldCheck,
  ArrowUpRight,
  Check,
  PhoneCall
} from 'lucide-react';
import imgReefer from '../assets/servicio-reefer.png';
import imgCamaBaja from '../assets/servicio-camabaja.png';
import imgStacker from '../assets/servicio-stacker.png';
import imgAlmacen from '../assets/servicio-almacen.jpg';
import imgGps from '../assets/servicio-gps.jpg';
import imgSeguro from '../assets/servicio-seguro.jpg';

const serviciosData = [
  {
    id: 'reefer',
    category: 'transporte',
    icon: Snowflake,
    badge: 'Cadena de Frío Garantizada',
    title: 'Transporte de Carga Refrigerada (Genset, Underslung y Clip-On)',
    description:
      'Usamos la más alta tecnología en equipos generadores para mantener su carga hidrobiológica y agroindustrial a la temperatura adecuada e ininterrumpida desde planta hasta el puerto.',
    image: imgReefer,
    features: ['Equipos Genset Underslung & Clip-On', 'Control térmico continuo', 'Especialistas en exportación Paita'],
    accent: 'costa-blue'
  },
  {
    id: 'camabaja',
    category: 'transporte',
    icon: Truck,
    badge: 'Carga Pesada y Especial',
    title: 'Transporte de Carga en Tolvas, Cama Baja y Cisterna',
    description:
      'Flota robusta de tractocamiones y plataformas para el traslado seguro de maquinaria, materiales de construcción, carga seca y graneles en todo el territorio nacional.',
    image: imgCamaBaja,
    features: ['Unidades Cama Baja y Tolvas', 'Servicio de Cisterna y Carga Seca', 'Cobertura en todo el Perú'],
    accent: 'costa-red'
  },
  {
    id: 'alquiler',
    category: 'equipos',
    icon: Container,
    badge: 'Maquinaria & Contenedores',
    title: 'Alquiler de Reach Stacker, Montacargas y Reefers de 40 Pies',
    description:
      'Soluciones operativas de izaje y conservación con maquinaria Terex Reach Stacker, montacargas industriales y contenedores refrigerados (Reefers) de 40 pies listos para operar.',
    image: imgStacker,
    features: ['Reach Stacker Terex de alta capacidad', 'Contenedores Reefer de 40 pies', 'Montacargas para maniobras'],
    accent: 'costa-blue'
  },
  {
    id: 'almacen',
    category: 'equipos',
    icon: Warehouse,
    badge: 'Infraestructura Logística',
    title: 'Almacén de Tuberías y Contenedores',
    description:
      'Patios y almacenes acondicionados estratégicamente en Paita para el acopio, custodia y manejo seguro de tuberías industriales, contenedores y materiales de proyectos.',
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
      'Contamos con nuestra propia plataforma de GPS satelital mediante la cual nuestros clientes pueden supervisar en tiempo real el traslado, rutas y trazabilidad de su carga.',
    image: imgGps,
    features: ['Acceso directo para clientes', 'Rastreo satelital en tiempo real', 'Alertas y control de ruta 24/7'],
    accent: 'costa-blue'
  },
  {
    id: 'seguros',
    category: 'seguridad',
    icon: ShieldCheck,
    badge: 'Respaldo Total',
    title: 'Alta Cobertura de Seguros en Toda Operación',
    description:
      'Protegemos el valor de su mercancía y operaciones de principio a fin con pólizas integrales que garantizan tranquilidad financiera y operativa en cada kilómetro.',
    image: imgSeguro,
    features: ['Seguro de Carga', 'Seguro de Contenedores', 'Seguro de Responsabilidad Civil'],
    accent: 'costa-red'
  }
];

const categories = [
  { id: 'todos', label: 'Todos los Servicios' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((servicio, index) => {
            const Icon = servicio.icon;
            const isRed = servicio.accent === 'costa-red';
            return (
              <div
                key={servicio.id}
                className="group bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Imagen del servicio */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={servicio.image}
                    alt={servicio.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-costa-navy/90 via-costa-navy/25 to-transparent" />

                  {/* Número de orden y categoría */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                        isRed ? 'bg-costa-red/95' : 'bg-costa-blue/95'
                      }`}
                    >
                      {servicio.badge}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-extrabold flex items-center justify-center">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Ícono flotante inferior */}
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg ${
                        isRed
                          ? 'bg-gradient-to-br from-costa-red to-costa-redLight'
                          : 'bg-gradient-to-br from-costa-blue to-costa-blueLight'
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                  </div>
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-costa-blue transition-colors leading-snug mb-3">
                      {servicio.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      {servicio.description}
                    </p>

                    {/* Características */}
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      {servicio.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              isRed ? 'bg-costa-red/10 text-costa-red' : 'bg-costa-blue/10 text-costa-blue'
                            }`}
                          >
                            <Check size={11} strokeWidth={3} />
                          </span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botón de cotización directa del servicio */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={`https://api.whatsapp.com/send?phone=51977882764&text=${encodeURIComponent(
                        `Hola Costa Transport, me interesa cotizar el servicio de: ${servicio.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isRed
                          ? 'bg-costa-red/5 hover:bg-costa-red text-costa-red hover:text-white'
                          : 'bg-costa-blue/5 hover:bg-costa-blue text-costa-blue hover:text-white'
                      }`}
                    >
                      <span>Cotizar este servicio</span>
                      <ArrowUpRight size={17} />
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
                ¿Necesita trasladar contenedores refrigerados o carga especial desde Paita?
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
