import React from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Servicios from './components/Servicios';
import FlotaGaleria from './components/FlotaGaleria';
import PoliticaSeguridad from './components/PoliticaSeguridad';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <Nosotros />
        <Servicios />
        <FlotaGaleria />
        <PoliticaSeguridad />
        <Contacto />
      </main>

      <Footer />

      {/* Botón Flotante de WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=51977882764&text=Hola%20Costa%20Transport,%20deseo%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <MessageCircle size={24} className="fill-white" />
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          Cotizar por WhatsApp
        </span>
      </a>
    </div>
  );
}

export default App;
