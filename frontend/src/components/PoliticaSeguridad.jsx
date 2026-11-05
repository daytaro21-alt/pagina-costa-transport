import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Globe2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import logoImg from '../assets/Logo.png';
import bascLogo from '../assets/basc.png';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Prevención de Riesgos e Ilícitos',
    description:
      'Control, mitigación y eliminación de riesgos de contaminación de carga, contrabando, lavado de activos, terrorismo, corrupción y soborno.'
  },
  {
    icon: Lock,
    title: 'Integridad en la Cadena de Suministro',
    description:
      'Procedimientos rigurosos antes, durante y después de cada operación con personal idóneo, confiable y auditado permanentemente.'
  },
  {
    icon: FileCheck2,
    title: 'Cumplimiento Norma BASC V6-2022',
    description:
      'Sistema de Gestión en Control y Seguridad alineado a la legislación peruana, tratados internacionales y ciberseguridad.'
  },
  {
    icon: Globe2,
    title: 'Comercio Exterior Seguro',
    description:
      'Promovemos activamente prácticas seguras junto a nuestros asociados de negocio en todas las sedes y rutas a nivel nacional.'
  }
];

const PoliticaSeguridad = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="seguridad" className="py-20 lg:py-28 bg-costa-mesh text-white relative overflow-hidden">
      {/* Resplandor decorativo */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-costa-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-costa-red/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sky-300 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4">
            <ShieldCheck size={15} className="text-emerald-400" />
            <span>Sistema de Gestión en Control y Seguridad • BASC V6-2022</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Política de Seguridad Corporativa
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Nuestro compromiso inquebrantable con la integridad, trazabilidad y seguridad en cada eslabón de la cadena logística nacional e internacional.
          </p>
        </div>

        {/* 4 Pilares de Seguridad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-costa-blue to-costa-blueLight flex items-center justify-center text-white mb-4 shadow-lg">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Documento Oficial de Política de Seguridad (Rescatado íntegramente de la web antigua) */}
        <div className="bg-white text-slate-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20">
          {/* Cabecera del Documento Oficial */}
          <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 sm:px-10 py-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={logoImg} alt="Costa Transport Logo" className="h-10 sm:h-12 w-auto object-contain" />
              <div className="hidden sm:block h-10 w-px bg-slate-200" />
              <div className="hidden sm:block">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-costa-blue block">
                  DECLARACIÓN OFICIAL DE GERENCIA
                </span>
                <span className="text-sm font-bold text-slate-700">
                  Certificación Internacional BASC • Código PERLIM00726-1-2
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <img src={bascLogo} alt="BASC Logo" className="h-14 w-auto object-contain" />
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-costa-blue bg-costa-blue/10 hover:bg-costa-blue/20 px-3.5 py-2 rounded-xl transition-colors"
              >
                <span>{expanded ? 'Contraer Documento' : 'Leer Documento Completo'}</span>
                {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>
          </div>

          {/* Cuerpo del Documento */}
          {expanded && (
            <div className="p-6 sm:p-10 lg:p-12 bg-white relative">
              {/* Marca de agua sutil */}
              <img
                src="/isotipo.png"
                alt=""
                className="w-72 h-72 object-contain opacity-[0.03] absolute right-10 bottom-10 pointer-events-none"
              />

              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <span className="inline-block px-3 py-1 rounded-md bg-costa-red/10 text-costa-red text-xs font-extrabold uppercase tracking-widest mb-2">
                    NORMA INTERNACIONAL BASC V6-2022
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    POLÍTICA DE SEGURIDAD
                  </h3>
                </div>

                <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
                  <p>
                    “En <strong className="text-slate-900 font-bold">COSTA TRANSPORT E.I.R.L.</strong>, brindamos el servicio de transporte de carga por carretera a nivel nacional, y como parte integrante de la cadena de suministro, tenemos como prioridad gestionar nuestros procesos de manera eficaz para garantizar el control, mitigación o eliminación de los riesgos en seguridad, tales como{' '}
                    <strong className="text-costa-red font-semibold">
                      lavado de activos, contrabando, contaminación de la carga, terrorismo, corrupción y soborno
                    </strong>
                    , que se puedan presentar antes, durante y después de nuestras operaciones.
                  </p>

                  <p>
                    Para ello, contamos con personal idóneo y confiable dispuesto a satisfacer los requerimientos de los clientes, aplicando en todos los procedimientos controles necesarios para gestionar los riesgos que puedan afectar la integridad de los procesos y las relaciones con las partes interesadas; para esto se desarrolló medidas de seguridad que brindan un mejoramiento continuo dentro de la cadena de suministro, asignando para ello todos los recursos necesarios; promoviendo a la vez el comercio seguro en todos los sitios donde se desarrolle la gestión operativa de{' '}
                    <strong className="text-slate-900 font-bold">COSTA TRANSPORT E.I.R.L.</strong>
                  </p>

                  <p>
                    Propendemos por el desarrollo gradual del Sistema de Gestión en Control y Seguridad, bajo el cumplimiento de los requisitos legales y reglamentarios, la legislación peruana y Tratados Internacionales que le sean aplicables.
                  </p>

                  <p>
                    Asimismo, promovemos la seguridad en el buen uso de las tecnologías de la información y buenas prácticas que van en contra de la financiación del terrorismo, lavado de activos, la corrupción, el soborno y cualquier otra acción ilícita que afecte la cadena de suministro mediante la implementación de la{' '}
                    <strong className="text-costa-blue font-bold">Norma BASC V6-2022</strong>.”
                  </p>
                </div>

                {/* Pie de Firma Oficial */}
                <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 font-medium">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    <span>Paita, Perú • Sistema de Gestión en Control y Seguridad Vigente</span>
                  </div>

                  <div className="text-center sm:text-right bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200/80">
                    <div className="text-base sm:text-lg font-extrabold text-slate-900">
                      Julio Jerry Costa de la Cruz
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-costa-blue mt-0.5">
                      Gerente General • COSTA TRANSPORT E.I.R.L.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PoliticaSeguridad;
