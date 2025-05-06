🌌 Rick and Morty — Multiverso Interactivo
Este proyecto es una SPA desarrollada con Next.js 14 que consume la API pública de Rick and Morty, permitiéndote explorar personajes, episodios y detalles en una interfaz moderna, estilizada y responsiva.

🚀 Tecnologías utilizadas
Next.js 14 – Framework de React para SSR y generación de páginas.
TypeScript – Tipado estático para mayor robustez del código.
Tailwind CSS – Utilidad de clases para diseño rápido y responsivo.
Framer Motion – Librería de animaciones para UI dinámicas.
HeroIcons – Iconografía moderna para React.
next/font – Optimización automática de fuentes (Geist Sans y Mono).
API Rick and Morty – Datos oficiales públicos para personajes y episodios.
⚙️ Cómo iniciar el proyecto
1. Clona el repositorio
git clone https://github.com/isaac12odin/Examen_SIAC.git
cd Examen_SIAC

2. Instala las dependencias

npm install
# o
yarn install
3. Ejecuta el servidor de desarrollo
npm run dev
# o
yarn dev
4. Abre el navegador
Visita http://localhost:3000 para ver el proyecto en ejecución.

🧠 Estructura del proyecto

.
├── app/                # Rutas y vistas (Next.js App Router)
│   ├── login/          # Página de login
│   ├── home/           # Página principal con los personajes
│   ├── layout.tsx      # Layout global
│   └── page.tsx        # Redirección por defecto a /login
├── components/         # Componentes reutilizables (Navbar, Modals, Cards)
├── styles/             # Archivos de estilo global (Tailwind)
├── public/             # Imágenes y recursos públicos
├── package.json        # Dependencias y scripts
└── README.md
🔐 Acceso de prueba
Puedes ingresar al panel con las siguientes credenciales fijas (modo demo):

Usuario: Test123

Contraseña: password@2

Estas credenciales son temporales y están codificadas directamente. En producción se recomienda implementar autenticación segura con backend.

📦 Despliegue
Puedes desplegar este proyecto fácilmente con Vercel (creadores de Next.js):

Haz login en vercel.com

Importa este repositorio desde GitHub

Vercel detectará automáticamente que es una app de Next.js

¡Listo! Deploy en la nube.

📚 Recursos útiles
Documentación de Next.js

Tailwind CSS

Framer Motion

Rick and Morty API

✨ Autor
Isaac Serrano
Frontend Developer & UX Enthusiast
GitHub: @isaac12odin

📄 Licencia
MIT — Puedes usar este código con fines educativos y personales.