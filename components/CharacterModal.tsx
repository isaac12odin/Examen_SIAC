'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from './types';

interface Props {
  character: Character;
  onClose: () => void;
}

/**
 * Componente decorativo de "portal" animado al estilo Rick and Morty,
 * compuesto de anillos rotatorios y partículas verdes que simulan
 * un portal interdimensional.
 */
const Portal = () => (
  <motion.div 
    className="absolute inset-0 z-0 flex items-center justify-center"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1.2, 1], opacity: [0, 0.8, 1] }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative w-[140%] h-[140%]">
      {/* Anillos concéntricos con rotación y efecto glowing */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-4 border-green-400"
          style={{ 
            boxShadow: `0 0 ${10 + i * 5}px ${3 + i}px rgba(74, 222, 128, 0.6)`,
            scale: 1 - i * 0.05
          }}
          animate={{ 
            rotate: i % 2 === 0 ? 360 : -360,
            scale: [1 - i * 0.05, 1 - i * 0.05 + 0.02, 1 - i * 0.05]
          }}
          transition={{ 
            rotate: { duration: 8 + i, ease: "linear", repeat: Infinity },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        />
      ))}

      {/* Partículas flotantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-green-300"
          style={{ 
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.7, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  </motion.div>
);

/**
 * Devuelve estilos específicos según el estado del personaje
 */
const getStatusStyle = (status: string) => {
  const base = "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2";
  switch (status.toLowerCase()) {
    case 'alive':
      return `${base} bg-green-500/20 text-green-300 border border-green-500/30`;
    case 'dead':
      return `${base} bg-red-500/20 text-red-300 border border-red-500/30`;
    default:
      return `${base} bg-purple-500/20 text-purple-300 border border-purple-500/30`;
  }
};

/**
 * Modal que muestra la información detallada de un personaje con animaciones,
 * fondo de portal y sección informativa dividida en atributos clave.
 * 
 * @param character Datos del personaje a mostrar
 * @param onClose Función para cerrar el modal
 */
export default function CharacterModal({ character, onClose }: Props) {
  // Cerrar el modal al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Fondo con blur */}
        <motion.div
          className="absolute inset-0 backdrop-blur-lg bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Efecto visual de portal */}
        <Portal />

        {/* Tarjeta del personaje */}
        <motion.div
          className="relative z-10 bg-zinc-900 rounded-2xl overflow-hidden max-w-2xl w-full shadow-[0_0_40px_rgba(74,222,128,0.4)]"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0, rotate: '-5deg', y: 100 }}
          animate={{ scale: 1, rotate: '0deg', y: 0 }}
          exit={{ scale: 0, rotate: '5deg', y: 100 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.2 }}
        >
          {/* Imagen con partículas */}
          <div className="relative h-56 overflow-hidden">
            <motion.img 
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
              initial={{ scale: .5 }}
              animate={{ scale: 1}}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-green-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: '0 0 8px 2px rgba(74, 222, 128, 0.8)',
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
                />
              ))}
            </div>

            {/* Estado del personaje */}
            <div className="absolute top-4 right-4">
              <div className={getStatusStyle(character.status)}>
                <motion.span 
                  className="w-2 h-2 rounded-full bg-current"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {character.status}
              </div>
            </div>

            {/* Botón de cerrar */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Información del personaje */}
          <div className="p-6">
            <motion.h2 
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {character.name}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primera columna */}
              <motion.div className="space-y-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <InfoItem label="Especie" value={character.species} icon="🧬" delay={0.1} />
                <InfoItem label="Género" value={character.gender} icon="⚥" delay={0.2} />
                {character.type && <InfoItem label="Tipo" value={character.type} icon="🔬" delay={0.3} />}
              </motion.div>

              {/* Segunda columna */}
              <motion.div className="space-y-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <InfoItem label="Origen" value={character.origin.name} icon="🌍" delay={0.1} />
                <InfoItem label="Ubicación" value={character.location.name} icon="📍" delay={0.2} />
                <InfoItem label="Apariciones" value={`${character.episode.length} episodio${character.episode.length !== 1 ? 's' : ''}`} icon="📺" delay={0.3} />
              </motion.div>
            </div>

            {/* Fecha de creación */}
            <motion.div className="mt-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <p className="text-sm text-zinc-400">
                Creado el {new Date(character.created).toLocaleDateString('es-ES', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </p>
            </motion.div>

            {/* Botón para cerrar el modal */}
            <motion.div className="mt-6 flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <motion.button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-medium shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(74, 222, 128, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar portal
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Componente reutilizable que muestra una etiqueta con valor e ícono.
 */
function InfoItem({
  label,
  value,
  icon,
  delay = 0
}: {
  label: string;
  value: string;
  icon: string;
  delay?: number;
}) {
  return (
    <motion.div 
      className="flex items-center p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50 overflow-hidden relative group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + delay }}
      whileHover={{ 
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgba(34, 197, 94, 0.3)' 
      }}
    >
      <div className="flex-shrink-0 text-xl mr-3">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-zinc-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
