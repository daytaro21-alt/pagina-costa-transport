import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ArrowRight } from 'lucide-react';
import FuegosArtificiales from './FuegosArtificiales';
import {
  debeMostrarAnuncioFiestas,
  marcarAnuncioFiestasVisto,
  obtenerAnioNuevoObjetivo,
  esVistaPreviaFiestas
} from '../config/fiestas';

/**
 * Modal de anuncio de Navidad y Año Nuevo.
 *
 * Muestra la pieza gráfica editable ubicada en `/anuncio-fiestas.svg`
 * (en el hosting: `/anuncio-fiestas.svg`), por lo que puede editarse en
 * Adobe Illustrator y reemplazarse directamente por FTP/FileZilla sin volver a compilar.
 */
const AnuncioFiestas = ({ disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const anioNuevo = obtenerAnioNuevoObjetivo();
  const isPreview = esVistaPreviaFiestas();

  useEffect(() => {
    if (disabled) return;
    if (!debeMostrarAnuncioFiestas()) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      marcarAnuncioFiestasVisto();
    }, 350);

    return () => window.clearTimeout(timer);
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen || disabled) return null;

  return (
    <div
      id="anuncio-fiestas-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Anuncio de Feliz Navidad y Próspero Año Nuevo ${anioNuevo} - Costa Transport E.I.R.L.`}
      onClick={handleClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-[#06131d]/80 backdrop-blur-sm animate-backdrop-in print:hidden"
    >
      {/* Fuegos artificiales y estrellas animados a los costados del anuncio */}
      <FuegosArtificiales />

      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 flex flex-col items-center w-full max-w-[520px] animate-modal-in focus:outline-none"
      >
        {/* Contenedor de la pieza SVG editable en Illustrator */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-[#0B2230] shadow-[0_28px_70px_-15px_rgba(7,23,34,0.75)] ring-1 ring-[#E6C27A]/35">
          {/* Botón cerrar siempre legible sobre cualquier fondo */}
          <button
            id="btn-cerrar-anuncio-fiestas-x"
            type="button"
            onClick={handleClose}
            aria-label="Cerrar anuncio de fiestas"
            className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-[#071722]/65 hover:bg-[#071722]/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D58D]"
          >
            <X size={18} />
          </button>

          <img
            src="/anuncio-fiestas.svg"
            alt={`Feliz Navidad y Próspero Año Nuevo ${anioNuevo} - Costa Transport E.I.R.L.`}
            className="block w-full h-auto max-h-[78vh] object-contain select-none"
          />
        </div>

        {/* Botón inferior discreto fuera del arte para no tapar el diseño */}
        <button
          id="btn-continuar-anuncio-fiestas"
          type="button"
          onClick={handleClose}
          className="mt-4 group inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F4D99B] text-costa-navy font-semibold text-sm px-7 py-2.5 rounded-full shadow-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D58D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06131d]"
        >
          <span>Continuar al sitio web</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>

        {isPreview && (
          <p className="mt-2.5 text-[11px] text-slate-300/80 text-center">
            Modo vista previa · Vigencia automática: 27 de noviembre al 6 de enero
          </p>
        )}
      </div>
    </div>
  );
};

export default AnuncioFiestas;
