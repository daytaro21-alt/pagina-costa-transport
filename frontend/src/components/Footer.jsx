import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  ArrowUp
} from 'lucide-react';
import logoImg from '../assets/Logo.png';
import bascLogo from '../assets/basc.png';
import premioLogo from '../assets/premio-empresa.jpg';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-costa-navy text-slate-300 relative overflow-hidden border-t-4 border-costa-red">
      {/* Franja superior decorativa */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Columna 1: Marca y Certificaciones */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-block bg-white px-5 py-3 rounded-2xl shadow-md">
              <img src={logoImg} alt="Costa Transport Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Más de 20 años líderes en el transporte terrestre de carga pesada, contenedores refrigerados (Reefers), cama baja y almacenaje portuario desde Paita, Piura hacia todo el Perú.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <img
                src={bascLogo}
                alt="Certificación BASC"
                className="h-12 w-auto bg-white p-1.5 rounded-xl object-contain"
              />
              <img
                src={premioLogo}
                alt="Empresa Peruana del Año"
                className="h-12 w-12 bg-white p-1 rounded-full object-contain"
              />
              <div className="text-xs text-slate-300 leading-tight">
                <strong className="text-white block">Comercio Exterior Seguro</strong>
                Norma BASC V6-2022
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Nosotros', href: '#nosotros' },
                { label: 'Identidad Corporativa', href: '#identidad' },
                { label: 'Nuestros Servicios', href: '#servicios' },
                { label: 'Flota y Galería', href: '#flota' },
                { label: 'Política BASC', href: '#seguridad' },
                { label: 'Contáctanos', href: '#contacto' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-300 hover:text-sky-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-costa-red" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Servicios Principales */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Servicios Logísticos
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>• Carga Refrigerada (Genset / Clip-On)</li>
              <li>• Transporte en Tolvas y Cama Baja</li>
              <li>• Servicio de Cisterna y Carga Seca</li>
              <li>• Alquiler de Reach Stacker y Reefers 40&apos;</li>
              <li>• Almacén de Tuberías y Contenedores</li>
              <li>• Monitoreo Satelital GPS 24/7</li>
            </ul>
          </div>

          {/* Columna 4: Sede Paita & Contacto */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Oficina Principal — Paita
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={17} className="text-costa-redLight shrink-0 mt-0.5" />
                <span>
                  C.C. San Francisco de la Buena Esperanza Mz. H Lt. S/N, Paita - Piura
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={17} className="text-[#4aa2c3] shrink-0" />
                <a
                  href="https://api.whatsapp.com/send?phone=51977882764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-sky-300 transition-colors"
                >
                  +51 977 882 764
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={17} className="text-costa-redLight shrink-0" />
                <a
                  href="mailto:gerencia@costatransport.com.pe"
                  className="hover:text-white transition-colors break-all"
                >
                  gerencia@costatransport.com.pe
                </a>
              </div>
            </div>

            {/* Enlaces a Documentos de Ética y Responsabilidad Social */}
            <div className="pt-2 space-y-1.5 text-xs">
              <a
                href="https://drive.google.com/file/d/1xh8b4A2a5EjEXkEVFL4aYrLmXEVNjkk3/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 hover:underline flex items-center gap-1"
              >
                Código de Ética Empresarial <ExternalLink size={11} />
              </a>
              <a
                href="https://drive.google.com/file/d/1xV-kvyRbSxrsWshCHskYyR8hxBXRFOu-/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 hover:underline flex items-center gap-1"
              >
                Política de Responsabilidad Social <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior de Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">COSTA TRANSPORT E.I.R.L.</strong> Todos los derechos reservados. Paita - Piura, Perú.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-costa-blue text-white px-4 py-2 rounded-xl font-bold transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
