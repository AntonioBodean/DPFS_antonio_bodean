# Sprint 6 - Tablero de trabajo

| Estado | Tarea | Dependencia | Dificultad | Responsable |
|---|---|---|---|---|
| Hecho | Relevar los JSON y CRUD existentes | - | Media | Antonio |
| Hecho | Diseñar entidades, restricciones y relaciones | Relevamiento | Alta | Antonio |
| Hecho | Crear y revisar el DER en PDF | Diseño | Media | Antonio |
| Hecho | Crear `structure.sql` | Diseño | Alta | Antonio |
| Hecho | Crear `data.sql` desde los datos existentes | Estructura | Media | Antonio |
| Hecho | Configurar Sequelize CLI y variables de entorno | Estructura | Media | Antonio |
| Hecho | Crear modelos y asociaciones | Configuración | Alta | Antonio |
| Hecho | Migrar CRUD y búsqueda de productos | Modelos | Alta | Antonio |
| Hecho | Migrar autenticación y CRUD de usuarios | Modelos | Alta | Antonio |
| Hecho | Actualizar vistas y navegación | Controladores | Media | Antonio |
| Hecho | Corregir el diseño de los buscadores de productos y usuarios | Vistas | Baja | Antonio |
| Hecho | Separar el alta administrativa de usuarios del registro público | CRUD de usuarios | Media | Antonio |
| Hecho | Verificar sintaxis, modelos, SQL y PDF | Todo lo anterior | Media | Antonio |
| Hecho | Ejecutar scripts e integración sobre MySQL | MySQL en ejecución | Baja | Antonio |

## Criterio de cierre

El código ya no consulta ni modifica archivos JSON; esos archivos permanecen únicamente como referencia histórica de los sprints anteriores. La aplicación utiliza Sequelize para acceder a MySQL y el alta administrativa de usuarios funciona mediante rutas protegidas, sin reemplazar la sesión activa.

## Verificación final

- Conexión con MySQL: correcta.
- Registros comprobados: 10 usuarios, 7 productos, 4 categorías, 5 marcas y 4 colores.
- Pruebas automatizadas: 4 aprobadas y 2 históricas omitidas, sin fallos.
- DER final disponible en `drawio/pdf/construmarket-der.pdf`.

## Observación antes del commit

Queda registrada una diferencia no bloqueante: `products.price` es `UNSIGNED` en `structure.sql`, mientras que el modelo Sequelize impide valores negativos mediante la validación `min: 0`. No se modificó porque la corrección solicitada correspondía únicamente al flujo de alta administrativa de usuarios.
