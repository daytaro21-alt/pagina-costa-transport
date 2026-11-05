import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import logoImg from '../assets/Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'nosotros', 'identidad', 'servicios', 'flota', 'seguridad', 'contacto'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', name: 'Inicio', href: '#inicio' },
    { id: 'nosotros', name: 'Nosotros', href: '#nosotros' },
    { id: 'identidad', name: 'Identidad', href: '#identidad' },
    { id: 'servicios', name: 'Servicios', href: '#servicios' },
    { id: 'flota', name: 'Flota y Galería', href: '#flota' },
    { id: 'seguridad', name: 'Política BASC', href: '#seguridad' },
    { id: 'contacto', name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="fixed w-full z-50 top-0 left-0 transition-all duration-300">
      {/* Top Bar Corporativa */}
      <div
        className={`bg-costa-navy text-slate-200 border-b border-white/10 transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0 border-none' : 'max-h-24 opacity-100 py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center text-xs gap-2">
          {/* Información de contacto */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin size={13} className="text-costa-redLight shrink-0" />
              <span className="hidden sm:inline">C.C. San Francisco de la Buena Esperanza Mz. H Lt. S/N,</span>
              <strong className="text-white font-semibold">Paita - Piura</strong>
            </span>

            <a
              href="mailto:gerencia@costatransport.com.pe"
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail size={13} className="text-[#4aa2c3] shrink-0" />
              gerencia@costatransport.com.pe
            </a>

            <span className="hidden lg:flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-[11px] text-emerald-300 font-medium">
              <ShieldCheck size={12} className="text-emerald-400" />
              Certificación BASC: PERLIM00726-1-2
            </span>
          </div>

          {/* Redes sociales */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px] hidden sm:inline">Síguenos en:</span>
              <a
                href="https://www.facebook.com/costatransportEIRL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Costa Transport"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-costa-blue text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/costa-transport-eirl/?originalSubdomain=pe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Costa Transport"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-costa-blue text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Navegación Principal */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/5 py-2.5'
            : 'bg-white/95 backdrop-blur-md shadow-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Oficial */}
            <a href="#inicio" className="flex-shrink-0 flex items-center group">
              <img
                className="h-11 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
                src={logoImg}
                alt="Costa Transport E.I.R.L. Logo"
              />
            </a>

            {/* Menú de Escritorio */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`relative px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'text-costa-blue bg-costa-blue/10'
                        : 'text-slate-700 hover:text-costa-blue hover:bg-slate-100/70'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-costa-red to-costa-blue rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Botones de Acción (WhatsApp + Cotizar) */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#contacto"
                className="hidden xl:inline-flex items-center gap-1.5 text-sm font-bold text-costa-blue hover:text-costa-blueDark px-4 py-2.5 rounded-xl border-2 border-costa-blue/20 hover:border-costa-blue/50 transition-all"
              >
                Cotizar
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=51977882764&text=Hola%20Costa%20Transport,%20deseo%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-costa-red to-costa-redLight hover:from-costa-redDark hover:to-costa-red text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-costa-red/25 hover:shadow-lg hover:shadow-costa-red/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone size={16} />
                <span>+51 977 882 764</span>
              </a>
            </div>

            {/* Botón Menú Móvil */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="https://api.whatsapp.com/send?phone=51977882764"
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden flex items-center gap-1.5 bg-costa-red text-white px-3 py-2 rounded-lg text-xs font-bold shadow-sm"
              >
                <Phone size={14} />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir menú"
                className="p-2 rounded-xl text-slate-700 hover:text-costa-blue hover:bg-slate-100 focus:outline-none transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl">
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                      isActive
                        ? 'bg-costa-blue text-white'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-costa-blue'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  </a>
                );
              })}

              <div className="pt-4 mt-4 border-t border-slate-100">
                <a
                  href="https://api.whatsapp.com/send?phone=51977882764&text=Hola%20Costa%20Transport,%20deseo%20solicitar%20una%20cotizaci%C3%B3n."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-costa-red to-costa-redLight text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md"
                >
                  <Phone size={18} />
                  WhatsApp Directo: +51 977 882 764
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
