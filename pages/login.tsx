'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiShieldCheck,
} from 'react-icons/hi';

/**
 * LoginPage
 * 
 * Página de inicio de sesión simple con validación local.
 * Permite ingresar con usuario y contraseña y redirige al usuario a `/tarjetas` si las credenciales son correctas.
 * 
 * Características:
 * - Íconos de HeroIcons
 * - Mostrar/ocultar contraseña
 * - Validación de usuario/contraseña fija (Test123 / password@2)
 */
export default function LoginPage() {
  const router = useRouter();

  // Estado para usuario y contraseña
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  // Mostrar u ocultar contraseña
  const [showPass, setShowPass] = useState(false);

  // Mensaje de error
  const [error, setError] = useState('');

  /**
   * Manejador del formulario de inicio de sesión.
   * Si las credenciales son correctas, navega a `/home`, de lo contrario muestra error.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (user === 'Test123' && pass === 'password@2') {

      localStorage.setItem('auth', 'ok');
  
      router.push('/tarjetas');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800 px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_0_30px_#00000050] p-8 transition-all">

        {/* Ícono decorativo */}
        <div className="flex justify-center mb-6 text-white">
          <HiShieldCheck className="text-5xl drop-shadow-lg" />
        </div>

        {/* Encabezado */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-1 tracking-tight">
          Panel Seguro
        </h1>
        <p className="text-zinc-400 text-center mb-8 text-sm">
          Ingresa con tus credenciales para continuar
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Campo: Usuario */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-1 transition-opacity group-focus-within:opacity-100 opacity-70">
              Usuario
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <HiOutlineUser className="text-white/70 text-xl" />
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
                placeholder="Escribe tu usuario"
              />
            </div>
          </div>

          {/* Campo: Contraseña */}
          <div className="group">
            <label className="block text-sm font-medium text-white mb-1 transition-opacity group-focus-within:opacity-100 opacity-70">
              Contraseña
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <HiOutlineLockClosed className="text-white/70 text-xl" />
              <input
                type={showPass ? 'text' : 'password'}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
                placeholder="••••••••"
              />
              {/* Botón para mostrar/ocultar contraseña */}
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="text-white/70 hover:text-white transition"
              >
                {showPass ? (
                  <HiOutlineEyeOff className="text-xl" />
                ) : (
                  <HiOutlineEye className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Mensaje de error si las credenciales son incorrectas */}
          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold text-lg hover:bg-zinc-100 transition-all shadow-md hover:shadow-xl"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
