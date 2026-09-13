# Retrospectiva Sprint 1

## Comenzar a hacer

- Planificar las tareas antes de comenzar.
- Mantener una estructura de carpetas consistente.
- Realizar commits más frecuentes.

## Hacer más

- Investigar referencias de diseño.
- Documentar las decisiones del proyecto.

## Continuar haciendo

- Organizar el trabajo por etapas.
- Mantener actualizado el repositorio.

## Hacer menos

- Modificar diseños una vez definidos.
- Cambiar constantemente la temática del proyecto.

## Dejar de hacer

- Comenzar a desarrollar sin una planificación previa.
- Posponer la documentación del proyecto.

---

# Retrospectiva Sprint 2

## Qué hice bien

- Avancé con la maquetación de las páginas y escribí una gran cantidad de código HTML y CSS.
- Utilicé Copilot como herramienta de apoyo para escribir código con mayor rapidez.
- Aprendí a organizar el diseño comenzando por componentes comunes, como el header y el footer, para luego reutilizarlos en las demás páginas.

## Qué dificultades tuve

- El diseño con CSS fue una de las partes más difíciles del sprint.
- En algunos momentos me costó planificar y diseñar una página completa.
- La repetición de código HTML y CSS hizo que el desarrollo fuera más extenso y difícil de mantener.

## Qué debería empezar a hacer

- Dividir el diseño de cada página en secciones más pequeñas antes de comenzar a programar.
- Diseñar primero los elementos compartidos, como el header y el footer.
- Planificar qué componentes se pueden reutilizar en varias páginas.

## Qué debería continuar haciendo

- Utilizar herramientas de inteligencia artificial como apoyo para aprender y trabajar con mayor rapidez.
- Practicar HTML y CSS para mejorar la maquetación y el diseño responsive.

## Qué debería dejar de hacer

- Intentar diseñar una página completa de una sola vez.
- Repetir código cuando una sección puede convertirse en un componente reutilizable.

---

# Retrospectiva Sprint 5

## Qué hice bien

- Separé la persistencia, los controladores y los middlewares de usuarios.
- Reutilicé el estado de sesión desde un middleware de aplicación para personalizar todas las vistas.
- Verifiqué manualmente los recorridos principales de autenticación.

## Qué dificultades tuve

- Coordinar sesiones y cookies para que la opción «Recordarme» funcione sin exponer la contraseña.
- Mantener los datos ingresados y mostrar errores claros cuando falla el registro o el login.

## Qué debería continuar haciendo

- Probar tanto los casos exitosos como los errores y accesos no autorizados.
- Guardar secretos configurables mediante variables de entorno.
- Mantener responsabilidades pequeñas y bien separadas.

## Qué debería mejorar

- Incorporar una base de datos para evitar escrituras concurrentes sobre archivos JSON.
- Usar un almacén persistente de sesiones antes de llevar la aplicación a producción.

---

# Retrospectiva Sprint 8

## Logros

- Implementé los cuatro endpoints obligatorios para listar y consultar usuarios y productos desde MySQL mediante Sequelize.
- Definí respuestas JSON consistentes, URLs absolutas para imágenes y detalles, y errores normalizados para identificadores inválidos o recursos inexistentes.
- Protegí la información de usuarios para que la API no exponga contraseñas, roles ni otros datos sensibles.
- Construí un dashboard independiente con React y Vite que muestra totales, último producto, productos por categoría y el catálogo completo.
- Organicé la interfaz en componentes reutilizables con estados de carga, error y datos vacíos, además de un diseño responsive y accesible.
- Incorporé CORS configurable, una colección de Postman y documentación suficiente para evaluar el proyecto desde cero.

## Dificultades

- Coordinar Express y Vite como procesos separados exigió configurar correctamente CORS, el proxy de desarrollo y los orígenes `localhost` y `127.0.0.1`.
- El puerto 5173 quedó ocupado durante la ejecución del dashboard y fue necesario identificar el proceso correcto sin interrumpir otros servidores.
- Para mostrar el último producto con su imagen fue necesario combinar el listado con una segunda consulta al endpoint de detalle.
- Mantener una presentación legible con nombres y descripciones extensas requirió revisar la interfaz en diferentes anchos de pantalla.

## Aprendizajes

- Un contrato de API definido antes de construir el dashboard simplifica el consumo de datos y evita acoplar React a los modelos internos de Sequelize.
- Centralizar la configuración, las peticiones y los errores reduce duplicación y permite manejar cancelaciones y reintentos de forma coherente.
- Los componentes pequeños y reutilizables facilitan mantener una identidad visual consistente y adaptar la grilla a escritorio, tablet y móvil.
- Las verificaciones deben centrarse en reglas y estructuras, sin depender innecesariamente de cantidades o estados cambiantes de los datos.
- Validar base de datos, endpoints, build, consola y diseño responsive ofrece más confianza que comprobar cada capa de manera aislada.

## Mejoras futuras

- Agregar paginación a los listados de usuarios y productos para preparar la API para catálogos más grandes.
- Ampliar la colección de Postman si se agregan nuevos endpoints.
- Automatizar la verificación de la base y el build antes de cada entrega.
- Configurar orígenes CORS y URLs de API específicos para desarrollo, evaluación y producción.
- Evaluar métricas de pedidos y ventas cuando el dominio incorpore esas entidades a la base de datos.

## Qué debería continuar haciendo

- Trabajar con un tablero de historias pequeñas y criterios de aceptación verificables.
- Registrar decisiones técnicas y evidencias a medida que se completa cada tarea.
- Probar casos exitosos, errores, datos vacíos y distintos tamaños de pantalla antes de cerrar un sprint.
