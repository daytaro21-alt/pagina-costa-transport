import React, { useState } from 'react';
import { X, MessageCircle, Bell } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Servicios from './components/Servicios';
import PoliticaSeguridad from './components/PoliticaSeguridad';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import avisoImg from './assets/aviso.jpg';

function App() {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar onOpenNotice={() => setShowNotice(true)} />

      <main className="flex-grow">
        <Hero />
        <Nosotros />
        <Servicios />
        <PoliticaSeguridad />
        <Contacto />
      </main>

      <Footer onOpenNotice={() => setShowNotice(true)} />

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

      {/* Modal de Comunicado Oficial (Rescatado del aviso flotante de la web antigua) */}
      {showNotice && (
        <div
          className="fixed inset-0 z-50 bg-costa-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowNotice(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/20 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-costa-navy text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Bell size={16} className="text-costa-redLight" />
                <span>Comunicado Oficial — Costa Transport E.I.R.L.</span>
              </div>
              <button
                onClick={() => setShowNotice(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-costa-red text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 bg-slate-100">
              <img
                src={avisoImg}
                alt="Comunicado Oficial Costa Transport"
                className="w-full h-auto rounded-2xl shadow-sm"
              />
            </div>
            <div className="px-6 py-4 bg-white flex items-center justify-between text-xs text-slate-600">
              <span>Consultas RRHH: rrhh@costatransport.com.pe</span>
              <button
                onClick={() => setShowNotice(false)}
                className="bg-costa-blue hover:bg-costa-blueDark text-white font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
