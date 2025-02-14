This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Estructura de directorios de la aplicación
Estructura de directorios de la aplicación
```
Estructura de directorios de la aplicación
app/
├── global.css               # Estilos globales de la aplicación
├── layout.js                # Componente principal que envuelve los módulos y contiene los providers de React
├── page.js                  # Página de inicio/login de la aplicación
├── hooks/                   # Custom hooks para manejar el estado y la lógica de negocio
│   ├── useAddUser.js
│   ├── useEditUser.js
│   ├── useUser.js
│   ├── useLogginUser.js
│   └── useSelectedUser.js   # Context de React para compartir datos entre componentes sin pasarlos como props
├── modules/                 # Módulos de la aplicación, cada uno con su propio directorio
│   ├── layout.jsx           # Componente principal post-login que renderiza el header, sidebar y carga los módulos hijos
│   ├── page.jsx             # Página de bienvenida/home tras el login
│   ├── Security/            # Módulo de seguridad con menús/páginas de usuarios y perfiles
│   │   ├── Profile/         # Menú de perfiles con su interfaz de usuario
│   │   │   └── page.jsx     # Componente principal de la página de perfiles
│   │   ├── Users/           # Menú de usuarios con su interfaz de usuario
│   │   │   ├── page.jsx     # Componente principal de la página de usuarios
│   │   │   ├── components/  # Componentes adicionales de usuarios, como modales
│   │   │   │   ├── AddUser.jsx  # Modal para añadir usuarios
│   │   │   │   └── EditUser.jsx # Modal para editar un usuario
│   ├── Admin/               # Módulo de administración con menús/páginas correspondientes
│   │   ├── Users/           # Menú/página de usuarios
│   │   │   ├── page.jsx     # Componente principal de la página de usuarios
│   │   │   ├── [id]/        # Componente dinámico para mostrar detalles del usuario
│   │   │   │   └── page.jsx # Componente principal del componente dinámico
├── services/
│   └── userService.js       # Servicio de usuarios para la comunicación con la API/backend
├── utilities/               # Utilidades usadas en la aplicación, como formateadores
│   └── formatter.js         # Utilidad para formatear datos como nombres y rutas con 'ñ'
├── shared/                  # Componentes compartidos entre varios módulos, e.g., header, sidebar
│   ├── header.js            # Componente del header de la aplicación
│   └── sidebar.js           # Componente del sidebar de la aplicación
public/                      # Archivos estáticos de la aplicación, como logos y favicon
├── assets/
│   └── logo.png

```