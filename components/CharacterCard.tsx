'use client';

import { useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Character } from './types';

interface Props {
  character: Character;
  onInfoClick: () => void;
}

/**
 * Componente visual para mostrar una tarjeta animada con información
 * de un personaje, incluyendo imagen, nombre, especie y un botón de acción.
 * 
 * @param character Objeto con datos del personaje (nombre, imagen, estado, especie, etc.)
 * @param onInfoClick Función que se ejecuta al hacer clic en el botón "Ver más"
 */
export default function CharacterCard({ character, onInfoClick }: Props) {
  // Referencia al div principal para animaciones imperativas
  const cardRef = useRef<HTMLDivElement>(null);
  
  /**
   * Maneja la animación al hacer clic en "Ver más", y luego dispara el callback `onInfoClick`
   */
  const handleViewMoreClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Animación de clic
    await animate(cardRef.current!, { scale: 0.95 }, { duration: 0.1 });
    await animate(cardRef.current!, { scale: 1 }, { duration: 0.2 });
    onInfoClick();
  };

  // Asigna un gradiente diferente según el estado del personaje
  const statusColor = {
    'Alive': 'from-green-500/30 to-green-700/10',
    'Dead': 'from-red-500/30 to-red-700/10',
    'unknown': 'from-yellow-500/30 to-yellow-700/10'
  }[character.status] || 'from-blue-500/30 to-blue-700/10';

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-lg border border-white/10 h-64"
      whileHover={{
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Fondo difuminado con gradiente según estado */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `url(${character.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(12px)'
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${statusColor}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="relative h-full flex flex-col p-4">
        {/* Imagen de personaje en formato circular */}
        <div className="flex justify-center mb-3">
          <motion.div 
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 3 }}
          >
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Nombre y especie del personaje */}
        <div className="text-center flex-grow">
          <h3 className="text-xl font-bold text-white mb-1 truncate">
            {character.name}
          </h3>
          <p className="text-sm text-green-300 mb-4">
            {character.species}
          </p>
        </div>

        {/* Botón "Ver más" con animación */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleViewMoreClick}
            className="px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg shadow-lg overflow-hidden"
            whileHover={{
              scale: 1.05,
              backgroundImage: 'linear-gradient(to right, #22c55e, #3b82f6, #22c55e)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              transition: { duration: 0.8, repeat: Infinity, repeatType: 'mirror' }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Ver más
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
