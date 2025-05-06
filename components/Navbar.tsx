'use client';

/**
 * Navbar
 * 
 * Barra de navegación superior para la aplicación.
 * Incluye:
 *  - Logo con iniciales animadas
 *  - Nombre del proyecto con subtítulo
 *  - Enlaces a secciones principales (Inicio, Personajes, Episodios)
 *  - Botón de cerrar sesión
 * 
 * Estilos:
 * - Fondo con gradiente oscuro
 * - Sombras verdes sutiles para destacar el branding
 */
export default function Navbar() {
  /**
   * Redirige al usuario a la página de login.
   * Simula el cierre de sesión.
   */
  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-green-500/20 shadow-lg shadow-green-500/5">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* ---------- Branding (logo + título) ---------- */}
        <div className="flex items-center space-x-2">
          {/* Logo circular con sombra verde */}
          <div className="h-8 w-8 rounded-full bg-green-500 shadow-lg shadow-green-500/50 flex items-center justify-center">
            <span className="text-zinc-900 font-bold text-lg">IS</span>
          </div>

          {/* Título del proyecto y subtítulo */}
          <h1 className="text-white font-bold text-xl tracking-wider relative">
            Examen Isaac Serrano
            {/* Subtítulo animado */}
            <span className="text-green-400 font-light absolute -bottom-3 right-0 text-xs tracking-widest">
              Front-end developer
            </span>
            {/* Píxel animado como “online” */}
            <span className="absolute -top-1 -right-3 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          </h1>
        </div>

        {/* ---------- Menú de navegación + botón ---------- */}
        <div className="flex items-center space-x-4">
          
          {/* Enlaces (solo visibles en desktop) */}
          <div className="hidden md:flex space-x-6 mr-6">
            {[
              { label: 'Inicio', href: '/' },
              { label: 'Personajes', href: '/characters' },
              { label: 'Episodios', href: '/episodes' }
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-gray-300 hover:text-green-400 font-medium text-sm relative group"
              >
                {label}
                {/* Subrayado animado */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Botón de cerrar sesión */}
          <button
            onClick={handleLogout}
            className="text-sm bg-zinc-800 text-green-400 font-medium px-5 py-2 rounded-md border border-green-500/30 hover:border-green-500/70 hover:shadow-md hover:shadow-green-500/20 transition-all duration-300"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
