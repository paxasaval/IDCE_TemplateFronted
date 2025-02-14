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

```
app/
├── global.css              --------> (Aquí van los estilos globales de la aplicación)
├── layout.js               --------> (Este es el componente principal de la aplicación, se encarga de envolver los módulos de la aplicación. Aquí se suelen colocar los providers de React)
├── page.js                 --------> (Esta es una página de inicio/login de la aplicación)
├── Hooks/                  --------> (Aquí van los custom hooks usados para manejar el estado de la aplicación y la lógica de negocio)
│   ├── useAddUser.js
│   ├── useEditUser.js
│   ├── useUser.js
│   ├── useLogginUser.js    
│   └── useSelectedUser.js  --------> (Este es un context de React, se usa para compartir datos entre componentes sin tener que pasarlos como props)
├── Modules/                --------> (Aquí van los módulos de la aplicación, cada uno tiene su propio directorio)
│   ├── layout.jsx          --------> (Este es el componente principal de la aplicación una vez logueado, renderiza el header y sidebar, y carga todos los módulos como hijos/children)
│   ├── page.jsx            --------> (Esta es una página de bienvenida/home después de loguearse en la aplicación)
│   ├── Security/           --------> (Este es el módulo de seguridad, contiene los menús/páginas de usuarios y perfiles)
│   │   ├── Profile/        --------> (Este es el menú de perfiles, contiene la UI del menú perfiles)
│   │   │   └── page.jsx    --------> (Este es el componente principal del menú/página de perfiles)
│   │   ├── Users/          --------> (Este es el menú de usuarios, contiene la UI del menú usuarios)
│   │   │   ├── page.jsx    --------> (Este es el componente principal del menú/página de usuarios)
│   │   │   ├── components/ --------> (Aquí van los componentes adicionales de usuarios, como el modal de añadir usuarios)
│   │   │   │   ├── AddUser.jsx   --------> (Este es el componente modal de añadir usuarios)
│   │   │   │   └── EditUser.jsx  --------> (Este es el componente modal de editar un usuario)
│   ├── Admin/              --------> (Este es el módulo de administración, contiene los menús/páginas de administración)
│   │   ├── Administracion/ --------> (Funcionalidades administrativas generales)
│   │   │   ├── Catalogos/          --------> (Gestión de catálogos específicos)
│   │   │   │   ├── Compania/       --------> (Información relacionada con la compañía)
│   │   │   │   ├── Modulo-Menu/    --------> (Gestión de módulos y menús)
│   │   │   │   ├── Oficinas/       --------> (Administración de oficinas)
│   │   │   │   ├── Productos/      --------> (Gestión de productos)
│   │   │   │   └── Seguridades/    --------> (Configuración de opciones de seguridad)
│   │   │   ├── Auditoria/ 
│   │   │   │   └── AuditoriaSistema/ --------> (Auditoría del sistema)
│   │   │   │       └── page.jsx    --------> (Componente principal de la auditoría)
│   │   │   └── Usuarios/           --------> (Gestión de usuarios)
│   │   │       ├── Funcionarios/   --------> (Información de los funcionarios)
│   │   │       ├── Perfiles/       --------> (Gestión de perfiles de usuario)
│   │   │       └── Usuarios/       --------> (Administración de usuarios)
│   │   │           ├── page.jsx    --------> (Componente principal de la página de usuarios)
│   │   │           └── components/ --------> (Componentes reutilizables en usuarios)
│   │   │               └── AddUser.jsx     --------> (Modal para añadir usuarios)
│   │   ├── layout.jsx              --------> (Componente principal del layout del módulo)
│   │   └── page.jsx                --------> (Componente de la página principal del módulo)
├── Services/              --------> (Aquí van los servicios que manejan la comunicación con APIs o backend)
│   └── userService.js     --------> (Este es el servicio de usuarios, se encarga de realizar la conexión/comunicación con la API/backend)
├── Utilities/             --------> (Aquí van las utilidades que se usan en la aplicación, como el formatter)
│   └── formatter.js       --------> (Esta utilidad sirve para formatear datos de la aplicación, como nombres y rutas con ñ)
├── Shared/                --------> (Aquí van los componentes que se usan en varios módulos de la aplicación, ej: header, sidebar, etc.)
│   ├── header.js          --------> (Este es el componente de header, se encarga de renderizar el header de la aplicación)
│   └── sidebar.js         --------> (Este es el componente de sidebar, se encarga de renderizar el sidebar de la aplicación)
public/                    --------> (Aquí van los archivos estáticos de la aplicación, como el logo, favicon, etc)
├── assets/
│   └── logo.png

```