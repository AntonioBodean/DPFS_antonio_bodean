# ConstruMarket

## Descripción del proyecto

ConstruMarket es un marketplace especializado en la comercialización de materiales de construcción, herramientas, ferretería e insumos para obras y remodelaciones.

La plataforma está proyectada para permitir a los usuarios explorar productos organizados por categorías, consultar información detallada, agregar artículos al carrito de compras y gestionar sus pedidos de forma rápida y sencilla.

El objetivo principal es brindar una experiencia de compra moderna y accesible tanto para profesionales de la construcción como para particulares que buscan materiales para sus proyectos.

---

## Público objetivo

ConstruMarket está dirigido a:

* Albañiles y trabajadores de la construcción.
* Contratistas y empresas constructoras.
* Arquitectos e ingenieros.
* Comercios y profesionales de mantenimiento.
* Personas que realizan remodelaciones o mejoras en sus hogares.

La propuesta busca ofrecer una amplia variedad de productos, precios competitivos y una experiencia de compra intuitiva desde cualquier dispositivo.

---

## Sobre mí

Mi nombre es Antonio Bodean y soy desarrollador Full Stack.

Me encuentro cursando la carrera Full Stack en Digital House, donde desarrollo proyectos utilizando tecnologías como HTML, CSS, JavaScript, Node.js, Express, React y bases de datos SQL/MYSQL/PostgreSQL.

Este proyecto forma parte del desafío profesional integrador de la carrera y tiene como objetivo aplicar los conocimientos adquiridos durante la formación para construir una solución completa de comercio electrónico.

---

## Sitios de referencia

### 1. Easy

https://www.easy.com.ar/

Elegido por su organización de categorías, presentación de productos y experiencia de navegación enfocada en el hogar y la construcción.

### 2. Sodimac

https://www.sodimac.com.ar/

Referencia por la amplitud de catálogo, filtros avanzados y estructura general del marketplace.

### 3. Mercado Libre

https://www.mercadolibre.com.ar/

Tomado como referencia por su experiencia de usuario, carrito de compras y páginas de detalle de producto.

### 4. Construmart

https://www.construmart.cl/

Inspiración por tratarse de un comercio especializado en materiales para construcción y obras.

### 5. Familia Bercomat

https://catalogo.familiabercomat.com/

Tomado como referencia por su catálogo especializado en materiales para la construcción, la organización de productos por categorías y su diseño simple e intuitivo orientado a facilitar la experiencia de compra.

---

## Funcionalidades implementadas

Durante los primeros tres sprints se implementaron:

- Página de inicio responsive.
- Listado dinámico de productos.
- Página de detalle de producto.
- Carrito de compras.
- Formularios de registro e inicio de sesión.
- Formulario de creación de productos.
- Formulario de edición con datos precargados.
- Rutas y controladores separados por dominio.
- Componentes reutilizables mediante parciales de EJS.
- Archivos CSS e imágenes servidos desde la carpeta `public`.

Los formularios todavía no guardan información de manera permanente. La persistencia de datos y el procesamiento completo se implementarán en próximos sprints.

---

## Tecnologías

### Sprint 2

- HTML5
- CSS3
- Diseño responsive

### Sprint 3

- Node.js
- Express.js
- EJS
- Arquitectura basada en rutas, controladores y vistas

### Herramientas

- Git
- GitHub
- GitHub Projects

---

## Estructura del proyecto

```text
ConstruMarket/
├── public/
│   ├── css/
│   │   ├── variables.css
│   │   ├── style.css
│   │   └── responsive.css
│   └── images/
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── mainController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── mainRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   └── views/
│       ├── index.ejs
│       ├── partials/
│       │   ├── head.ejs
│       │   ├── header.ejs
│       │   ├── newsletter.ejs
│       │   └── footer.ejs
│       ├── products/
│       │   ├── list.ejs
│       │   ├── detail.ejs
│       │   ├── cart.ejs
│       │   ├── create.ejs
│       │   └── edit.ejs
│       └── users/
│           ├── login.ejs
│           └── register.ejs
├── views/
├── retro.md
├── package.json
└── README.md
```

La carpeta `views/` ubicada en la raíz conserva las maquetas estáticas del Sprint 2 como referencia. Las vistas utilizadas actualmente por Express se encuentran en `src/views/`.

---

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/products` | Listado de productos |
| `/products/detail` | Detalle de producto |
| `/products/cart` | Carrito de compras |
| `/products/create` | Formulario de creación |
| `/products/edit/:id` | Formulario de edición |
| `/users/login` | Inicio de sesión |
| `/users/register` | Registro de usuario |

---

## Instalación y ejecución

### Requisitos

- Node.js
- npm

### Pasos

1. Clonar o descargar el repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar la aplicación:

```bash
npm start
```

5. Abrir en el navegador:

```text
http://localhost:3000
```

Para detener el servidor, presionar `Ctrl + C`.

---

## Wireframes

Los wireframes se encuentran en la carpeta `wireframe/` e incluyen:

- Inicio.
- Detalle de producto.
- Carrito.
- Registro.
- Login.
- Versiones para escritorio y teléfono.

---

## Diseño visual

Los recursos de diseño se encuentran en `design/`:

- Logo.
- Paleta de colores.
- Tipografías.

Los recursos utilizados por la aplicación se encuentran en `public/images/`.

---

## Tablero de trabajo

El seguimiento del Sprint 3 se encuentra en el [tablero de GitHub Projects](https://github.com/users/AntonioBodean/projects/2/views/1).

---

## Estado del proyecto

Sprint 3 completado: aplicación migrada a Node.js, Express y EJS, con rutas, controladores, vistas organizadas, contenido dinámico, parciales reutilizables y formularios de administración de productos.