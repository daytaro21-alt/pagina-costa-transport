import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Servicios from './components/Servicios';
import FlotaGaleria from './components/FlotaGaleria';
import PoliticaSeguridad from './components/PoliticaSeguridad';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import LibroReclamaciones from './components/LibroReclamaciones';
import AnuncioFiestas from './components/AnuncioFiestas';

function App() {
  const [isLibroOpen, setIsLibroOpen] = useState(
    () => typeof window !== 'undefined' && window.location.hash === '#libro-reclamaciones'
  );

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#libro-reclamaciones') {
        setIsLibroOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleCloseLibro = () => {
    setIsLibroOpen(false);
    if (window.location.hash === '#libro-reclamaciones') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 print:min-h-0 print:block print:bg-white">
      <div className={isLibroOpen ? 'min-h-screen flex flex-col print:hidden' : 'min-h-screen flex flex-col'}>
        <Navbar />

        <main className="flex-grow">
          <Hero />
          <Nosotros />
          <Servicios />
          <FlotaGaleria />
          <PoliticaSeguridad />
          <Contacto />
        </main>

        <Footer onOpenLibro={() => setIsLibroOpen(true)} />

        {/* Botón Flotante de WhatsApp con pulso sutil */}
        <a
          href="https://api.whatsapp.com/send?phone=51977882764&text=Hola%20Costa%20Transport,%20deseo%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 print:hidden"
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75 animate-ping" />
            <MessageCircle size={24} className="fill-white relative" />
          </span>
          <span className="hidden sm:inline font-bold text-sm tracking-wide">
            Cotizar por WhatsApp
          </span>
        </a>
      </div>

      <AnuncioFiestas disabled={isLibroOpen} />
      <LibroReclamaciones isOpen={isLibroOpen} onClose={handleCloseLibro} />
    </div>
  );
}

export default App;
