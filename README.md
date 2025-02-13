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
app/
├── hooks/--------> (aqui van los custom hooks usados para manejar el estado de la aplicación y la logica de negocio)
│   ├── useAddUser.js
│   ├── useEditUser.js
│   ├── useUser.js
│   ├── useLogginUser.js    
│   └── useSelectedUser.js  --------> (Este es un context de React, se usa para compartir datos entre componentes sin tener que pasarlos como props)
├── Modules/ --------> (Aqui van los Modulos de la aplicacion, cada uno de ellos tiene su propio directorio)
│   ├── layout.jsx --------> (Este es el componente principal de la aplicacion una vez estas logeado, se encarga de renderizar el header y el sidebar y cargar todos los modulos como sus hijos/children)
│   ├── page.jsx --------> (Esta es una pagina de bienvenida/home de cuando has logeado en la aplicacion)
│   ├── Security/ --------> (Este es el modulo de seguridad, contiene los Menus/Paginas de usuarios y perfiles)
│   │   ├── Profile/ --------> (Este es el Menu de perfiles, contiene la ui del menu perfiles)
│   │   │   └── page.jsx --------> (Este es el componente principal del menu/pagina de perfiles)
│   │   ├── Users/ --------> (Este es el Menu de usuarios, contiene la ui del menu usuarios)
│   │   │   ├── page.jsx --------> (Este es el componente principal del menu/pagina de Usuarios)
│   │   │   ├── components/ --------> (Aqui van los componentes (adicionales) de usuarios, como el modal de añadir usuarios)
│   │   │   │   ├── AddUser.jsx --------> (Este es el componente modal de añadir usuarios)
│   │   │   │   └── EditUser.jsx --------> (Este es el componente modal de editar un usuario)
│   ├── Admin/ --------> (Este es el modulo de Administracion, contiene los Menus/Paginas de Administracion)
│   │   ├── Users/ --------> (Este es el menu/pagina de Usuarios)
│   │   │   ├── page.jsx --------> (Este es el componente principal del menu/pagina de usuarios)
│   │   │   ├── [id]/ --------> (Este es un componente dinamico que muestra los detalles del usuario)
│   │   │   │   └── page.jsx --------> (Este es el componente principal del componente dinamico)
├── services/
│   └── userService.js --------> (Este es el servicio de usuarios, se encarga de realizar la conexion/comunicacion con la api/backend )
├── utilities/ --------> (Aqui van las utilidades que se usan en la aplicacion, como el formatter)
│   └── formatter.js 
├── shared/ --------> (Aqui van los componente que se usan en varios modulos de la aplicacion ejej: header, sidebar, etc)
│   ├── header.js --------> (Este es el componente de header, se encarga de renderizar el header de la aplicacion)
│   └── sidebar.js --------> (Este es el componente de sidebar, se encarga de renderizar el sidebar de la aplicacion)
public/ --------> (Aqui van los archivos estáticos de la aplicacion, como el logo, favicon, etc)
├── assets/
│   └── logo.png
```