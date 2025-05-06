'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CharacterCard from '../components/CharacterCard';
import CharacterModal from '../components/CharacterModal';
import { Character } from '../components/types';


/**
 * Componente principal de la aplicación.
 * 
 * Este componente:
 * - Muestra la barra de navegación superior
 * - Obtiene personajes desde la API de Rick and Morty
 * - Renderiza tarjetas individuales para cada personaje
 * - Abre un modal con más detalles al hacer clic en "Ver más"
 */
export default function HomePage() {
  // Lista de personajes obtenidos de la API
  const [characters, setCharacters] = useState<Character[]>([]);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Personaje actualmente seleccionado para mostrar en el modal
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  /**
   * Carga inicial de personajes desde la API pública
   */
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json();
        setCharacters(data.results);
      } catch (err) {
        console.error('Error al cargar personajes', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  /**
   * Abre el modal con información del personaje seleccionado
   */
  const handleInfoClick = (character: Character) => {
    setSelectedCharacter(character);
    document.body.style.overflow = 'hidden'; // Bloquear scroll al abrir modal
  };

  /**
   * Cierra el modal y restaura el scroll
   */
  const handleCloseModal = () => {
    setSelectedCharacter(null);
    document.body.style.overflow = 'auto'; // Restaurar scroll
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white">
      {/* Barra de navegación superior */}
      <Navbar />

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Título con gradiente animado */}
        <h2 className="text-center text-5xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Explora el Multiverso
        </h2>

        {/* Estado de carga o renderizado de tarjetas */}
        {loading ? (
          // Spinner personalizado con temática Rick and Morty
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-t-green-400 border-r-blue-400 border-b-purple-400 border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black rounded-full"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        ) : characters.length > 0 ? (
          // Renderizado de tarjetas de personajes en un grid responsive
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                onInfoClick={() => handleInfoClick(char)}
              />
            ))}
          </div>
        ) : (
          // Mensaje si no se obtuvieron personajes
          <p className="text-center text-zinc-400 text-xl">
            No se encontraron personajes en esta dimensión.
          </p>
        )}
      </main>

      {/* Modal de personaje (condicional) */}
      {selectedCharacter && (
        <CharacterModal 
          character={selectedCharacter} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
