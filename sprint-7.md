# Sprint 7 - Tablero de trabajo

| Estado | Tarea | Dependencia | Dificultad | Responsable |
|---|---|---|---|---|
| Hecho | Relevar formularios y validaciones existentes | Sprint 6 | Media | Antonio |
| Hecho | Incorporar Express Validator | Relevamiento | Baja | Antonio |
| Hecho | Validar registro y unicidad del correo en back-end | Dependencia instalada | Alta | Antonio |
| Hecho | Validar login y credenciales contra la base | Dependencia instalada | Alta | Antonio |
| Hecho | Validar alta y edición de productos en back-end | Dependencia instalada | Alta | Antonio |
| Hecho | Validar formatos de imagen y limpiar cargas rechazadas | Validaciones back-end | Media | Antonio |
| Hecho | Conservar datos y mostrar errores junto a cada campo | Validaciones back-end | Media | Antonio |
| Hecho | Implementar validaciones inmediatas en front-end | Vistas con feedback | Alta | Antonio |
| Hecho | Verificar categorías contra la base de datos | Modelo Category | Media | Antonio |
| Hecho | Agregar pruebas automatizadas del sprint | Implementación completa | Media | Antonio |
| Hecho | Restringir el CRUD de productos al rol administrador | Sesiones y roles | Media | Antonio |
| Hecho | Restringir la administración de usuarios al rol administrador | Sesiones y roles | Media | Antonio |
| Hecho | Actualizar documentación | Verificación | Baja | Antonio |

## Criterio de cierre

El registro, el login y la creación y modificación de productos rechazan datos inválidos antes de escribir en MySQL. Los mismos formularios ofrecen feedback inmediato en el navegador, pero el servidor conserva toda la autoridad sobre las reglas y vuelve a validarlas aunque JavaScript esté deshabilitado.

## Validaciones implementadas

- Usuarios: nombre y apellido obligatorios con 2 caracteres como mínimo, correo válido y único, contraseña de al menos 8 caracteres, confirmación, aceptación de términos e imagen JPG/JPEG/PNG/GIF.
- Login: correo obligatorio, válido y existente; contraseña obligatoria y coincidente con el hash almacenado.
- Productos: nombre obligatorio de 5 caracteres como mínimo, descripción de 20 caracteres como mínimo, categoría existente, marca obligatoria, precio y stock no negativos e imagen JPG/JPEG/PNG/GIF.
