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

Durante los ocho sprints se implementaron:

- Página de inicio responsive.
- Listado y página de detalle generados desde datos JSON.
- Carrito de compras.
- Formularios de registro e inicio de sesión.
- Creación, edición y eliminación persistente de productos.
- Carga de imágenes para productos mediante Multer.
- Simulación de los métodos PUT y DELETE mediante Method Override.
- Persistencia relacional MySQL mediante Sequelize.
- Modelos asociados para usuarios, roles, productos, categorías, marcas y colores.
- Búsqueda de productos y administración de usuarios.
- Rutas y controladores separados por dominio.
- Componentes reutilizables mediante parciales de EJS.
- Archivos CSS e imágenes servidos desde la carpeta `public`.
- Registro con avatar y contraseñas cifradas mediante bcryptjs.
- Login, perfil, logout, sesiones y opción «Recordarme».
- Middlewares para rutas exclusivas de huéspedes y usuarios autenticados.
- Validaciones de back-end con Express Validator para registro, login y productos.
- Validaciones de front-end con feedback inmediato y mensajes por campo.
- Acciones y rutas de administración de productos restringidas al rol `Admin`.
- Listado y CRUD administrativo de usuarios restringidos al rol `Admin`.
- API REST pública de usuarios y productos con respuestas JSON y errores normalizados.
- URLs absolutas para recursos de detalle e imágenes.
- Dashboard independiente en React y Vite conectado a la API Express.
- Indicadores de productos, usuarios y categorías, último producto, distribución por categoría y catálogo.
- Estados de carga, error y datos vacíos, diseño responsive y componentes reutilizables.
- CORS configurable y colección de Postman para comprobar los endpoints obligatorios.

Los JSON de `src/data` se conservan únicamente como referencia histórica. La aplicación consulta y modifica la base de datos MySQL mediante Sequelize.

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

### Sprint 4

- Persistencia mediante archivos JSON
- CRUD completo de productos
- Métodos HTTP GET, POST, PUT y DELETE
- Multer para carga de imágenes
- Method Override para formularios HTML

### Sprint 5

- bcryptjs
- Express Session
- Cookie Parser
- Middlewares de aplicación y de ruta

### Sprint 6

- MySQL
- Sequelize y sequelize-cli
- Modelo relacional normalizado
- Scripts SQL de estructura y datos

### Sprint 7

- Express Validator
- Validaciones custom con JavaScript
- Feedback accesible por campo y conservación de datos inválidos

### Sprint 8

- API REST con Express, Sequelize y CORS
- React 19 y Vite 7
- Dashboard de métricas y catálogo responsive
- Fetch API, `AbortController` y manejo centralizado de errores
- Colección de Postman para verificar la API

### Herramientas

- Git
- GitHub
- GitHub Projects

---

## Estructura resumida del proyecto

```text
ConstruMarket/
├── dashboard/                 # Aplicación React + Vite
│   ├── public/
│   └── src/
│       ├── components/
│       ├── config/
│       ├── hooks/
│       ├── services/
│       ├── styles/
│       └── utils/
├── docs/
│   ├── API.md                 # Contrato completo de la API
│   ├── POSTMAN.md             # Guía de pruebas manuales
│   ├── VALIDACION.md          # Resultado de validación integral
│   └── postman/
├── scripts/
│   └── verify_database.js
├── public/
│   ├── css/
│   │   ├── variables.css
│   │   ├── style.css
│   │   └── responsive.css
│   └── images/
├── database/
│   ├── config/
│   ├── migrations/
│   ├── models/
│   ├── seeders/
│   ├── structure.sql
│   └── data.sql
├── drawio/pdf/construmarket-der.pdf
├── src/
│   ├── app.js
│   ├── controllers/
│   │   └── api/
│   ├── data/ (referencia histórica)
│   ├── middlewares/
│   ├── routes/
│   │   └── api/
│   ├── utils/
│   └── views/
├── package.json
└── README.md
```

La carpeta `views/` ubicada en la raíz conserva las maquetas estáticas del Sprint 2 como referencia. Las vistas utilizadas actualmente por Express se encuentran en `src/views/`.

---

## Rutas principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Página de inicio |
| GET | `/products` | Listado de productos |
| GET | `/products/create` | Formulario de creación |
| GET | `/products/:id` | Detalle de un producto |
| POST | `/products` | Creación de un producto |
| GET | `/products/:id/edit` | Formulario de edición |
| PUT | `/products/:id` | Actualización de un producto |
| DELETE | `/products/:id` | Eliminación de un producto |
| GET | `/products?q=texto` | Búsqueda de productos |
| GET | `/products/cart` | Carrito de compras |
| GET | `/users/login` | Inicio de sesión |
| GET | `/users/register` | Registro de usuario |
| POST | `/users/register` | Creación de la cuenta del visitante |
| POST | `/users/login` | Autenticación de usuario |
| GET | `/users/profile` | Perfil (requiere login) |
| POST | `/users/logout` | Cierre de sesión |
| GET | `/users` | Listado y búsqueda de usuarios |
| GET | `/users/create` | Formulario administrativo de creación |
| POST | `/users` | Creación administrativa sin cambiar la sesión activa |
| GET | `/users/:id` | Detalle de usuario |
| GET | `/users/:id/edit` | Edición de usuario |
| PUT | `/users/:id` | Actualización de usuario |
| DELETE | `/users/:id` | Eliminación de usuario |

El contrato completo se encuentra en [docs/API.md](docs/API.md) y la guía de pruebas manuales en [docs/POSTMAN.md](docs/POSTMAN.md).

| Método | Endpoint de API | Estado |
|---|---|---|
| GET | `/api/users` | Disponible |
| GET | `/api/users/:id` | Disponible |
| GET | `/api/products` | Disponible |
| GET | `/api/products/:id` | Disponible |

### Ejemplos de respuesta

`GET /api/users`

```json
{
  "count": 10,
  "users": [
    {
      "id": 1,
      "name": "Ana Pérez",
      "email": "ana@example.com",
      "detail": "http://localhost:3000/api/users/1"
    }
  ]
}
```

`GET /api/users/1`

```json
{
  "id": 1,
  "firstName": "Ana",
  "lastName": "Pérez",
  "email": "ana@example.com",
  "phone": null,
  "image": "http://localhost:3000/images/default-user.png",
  "createdAt": "2026-09-11T12:00:00.000Z",
  "updatedAt": "2026-09-11T12:00:00.000Z"
}
```

`GET /api/products`

```json
{
  "count": 9,
  "countByCategory": {
    "Materiales": 5,
    "Herramientas": 2,
    "Pinturas": 1,
    "Hierros": 1
  },
  "products": [
    {
      "id": 1,
      "name": "Cemento Portland 25 kg",
      "description": "Cemento para trabajos de construcción.",
      "categories": [{ "id": 1, "name": "Materiales" }],
      "detail": "http://localhost:3000/api/products/1"
    }
  ]
}
```

`GET /api/products/1`

```json
{
  "id": 1,
  "name": "Cemento Portland 25 kg",
  "description": "Cemento para trabajos de construcción.",
  "price": 12500,
  "stock": 20,
  "categoryId": 1,
  "brandId": 1,
  "image": "http://localhost:3000/images/cemento.jpg",
  "createdAt": "2026-09-11T12:00:00.000Z",
  "updatedAt": "2026-09-11T12:00:00.000Z",
  "categories": [{ "id": 1, "name": "Materiales" }],
  "brands": [{ "id": 1, "name": "Loma Negra" }],
  "colors": []
}
```

La API devuelve errores en un formato JSON uniforme y nunca expone contraseñas, hashes ni roles de usuario. Consultar [docs/API.md](docs/API.md) para ver propiedades, errores y casos vacíos.

---

## Instalación y ejecución

### Requisitos

- Node.js 20 o superior y npm
- MySQL 8 o compatible
- Git, únicamente si se clonará el repositorio

### 1. Dependencias y variables de entorno

Desde la raíz del proyecto:

```bash
npm install
npm --prefix dashboard install
```

Crear `.env` a partir de `.env.example` y completar las credenciales de MySQL. `SESSION_SECRET` y `COOKIE_SECRET` deben cambiarse por valores privados.

El dashboard funciona con `/api` mediante el proxy de Vite. Si la API se ejecuta en otro origen, crear `dashboard/.env` desde `dashboard/.env.example` y definir `VITE_API_BASE_URL`.

### 2. Base de datos

Crear la estructura y cargar los datos iniciales:

```bash
mysql -u root -p < database/structure.sql
mysql -u root -p construmarket < database/data.sql
```

Comprobar conexión, relaciones e imágenes:

```bash
npm run db:verify
```

### 3. API y aplicación Express

```bash
npm start
```

La tienda queda disponible en `http://localhost:3000` y la API bajo `http://localhost:3000/api`.

### 4. Dashboard React

Sin cerrar Express, abrir otra terminal en la raíz y ejecutar:

```bash
npm run dashboard:dev
```

Abrir `http://127.0.0.1:5173`. Si el puerto está ocupado, detener el proceso anterior con `Ctrl + C` antes de volver a iniciar Vite.

### 5. Verificación y build de entrega

```bash
npm run dashboard:build
```

El build generado queda en `dashboard/dist`. La validación completa más reciente está documentada en [docs/VALIDACION.md](docs/VALIDACION.md).

### Pruebas manuales con Postman

Importar la colección:

```text
docs/postman/ConstruMarket-Sprint8.postman_collection.json
```

La colección configura `http://localhost:3000` como `baseUrl` y contiene pruebas para listados, detalles, identificadores inválidos y recursos inexistentes. Consultar [docs/POSTMAN.md](docs/POSTMAN.md) para el procedimiento completo.

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

### Sprint 2

El seguimiento del Sprint 2 se encuentra en el [tablero de GitHub Projects](https://github.com/users/AntonioBodean/projects/1).

### Sprint 3

El seguimiento del Sprint 3 se encuentra en el [tablero de GitHub Projects](https://github.com/users/AntonioBodean/projects/2).

### Sprint 4

El seguimiento del Sprint 4 se encuentra en el [tablero de GitHub Projects](https://github.com/users/AntonioBodean/projects/3).

### Sprint 5

El seguimiento del Sprint 5 se encuentra en el [tablero de GitHub Projects](https://github.com/users/AntonioBodean/projects/4)

### Sprint 6

El seguimiento del Sprint 6 se encuentra en el [tablero de GitHub Projects](https://github.com/users/AntonioBodean/projects/5)

### Sprint 7

El seguimiento del Sprint 7 se encuentra en el [tablero de GitHub Projects](https://github.com/users/AntonioBodean/projects/6)

### Sprint 8

El seguimiento en GitHub se encuentra en el [tablero de GitHub Projects](https://github.com/users/AntonioBodean/projects/7).

Los resultados y aprendizajes del cierre se encuentran en [retro.md](retro.md#retrospectiva-sprint-8).

---

## Estado del proyecto

Sprint 1 implementado.

Sprint 2 implementado.

Sprint 3 implementado.

Sprint 4 implementado: productos y usuarios definidos en JSON, contenido dinámico y administración completa de productos con listado, detalle, creación, edición y eliminación.

Sprint 5 implementado: registro, login, perfil, logout, sesiones, cookie «Recordarme» y protección de rutas por estado de autenticación.

Sprint 6 implementado: DER, scripts SQL, configuración y modelos Sequelize con relaciones, CRUD y búsqueda de productos, y administración de usuarios sobre MySQL.

Sprint 7 implementado: validaciones de back-end con Express Validator y validaciones inmediatas de front-end para registro, login y formularios de productos.

Sprint 8 implementado: base de datos verificada, API REST de usuarios y productos, dashboard React responsive, integración mediante CORS, colección de Postman y validación integral.
