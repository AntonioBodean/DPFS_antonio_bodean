# Validación integral

**Fecha:** 13 de septiembre de 2026
**Resultado:** Aprobada

## Base de datos

Se ejecutó `node scripts/verify_database.js` contra MySQL.

- Conexión: correcta.
- Registros: 10 usuarios, 9 productos, 4 categorías, 7 marcas, 5 colores y 7 asociaciones producto-color.
- Usuarios sin rol: 0.
- Productos sin categoría: 0.
- Productos sin marca: 0.
- Asociaciones producto-color inválidas: 0.
- Imágenes referenciadas faltantes: 0.

## API

Las rutas se comprobaron directamente sobre `http://127.0.0.1:3000`.

| Ruta | Estado | Resultado |
| --- | ---: | --- |
| `GET /api/users` | 200 | 10 usuarios; campos públicos `id`, `name`, `email` y `detail`. |
| `GET /api/users/:id` | 200 | Detalle público, imagen absoluta y fechas. |
| `GET /api/products` | 200 | 9 productos, totales por categoría y enlaces de detalle. |
| `GET /api/products/:id` | 200 | Detalle, relaciones, precio, stock e imagen absoluta. |

Las respuestas de usuarios no exponen `password`, `roleId`, `role` ni `category`.
La colección de Postman incluye comprobaciones para identificadores inválidos y recursos inexistentes.

## Dashboard

Se revisó `http://127.0.0.1:5173` con datos reales de la API.

### Escritorio — 1280 px

- Estado visible: `API conectada`.
- Se renderizaron 3 métricas, 4 categorías y 9 productos.
- La imagen del último producto cargó correctamente.
- No se detectó desbordamiento horizontal.

### Móvil — 390 px

- Totales, bloque de análisis y listado se presentan en una sola columna.
- Ancho visible: 390 px; ancho del documento: 375 px, correspondiente al área útil con barra de desplazamiento.
- No se detectó desbordamiento horizontal.
- El enlace de detalle conduce al recurso correcto de la API.
- No se registraron errores ni advertencias en la consola.

## Verificación y build

- Las cuatro rutas obligatorias respondieron correctamente durante la comprobación manual y desde Postman.
- `npm run build` en `dashboard`: build de producción completado correctamente con Vite.
- `git diff --check`: sin errores de espacios o formato del diff.

## Conclusión

S8-17 cumple los criterios de aceptación. La API, MySQL y el dashboard React funcionan integrados, los datos sensibles permanecen fuera de las respuestas y la interfaz se comporta correctamente en escritorio y móvil.
