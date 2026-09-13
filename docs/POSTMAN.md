# Probar la API con Postman

## Preparación

1. Confirmar que el servicio MySQL esté activo y que `.env` contenga las credenciales correctas.
2. Desde la raíz del proyecto, verificar la base:

   ```bash
   node scripts/verify_database.js
   ```

3. Iniciar ConstruMarket:

   ```bash
   node src/app.js
   ```

4. Comprobar que la aplicación informe que está disponible en `http://localhost:3000`.

## Importar y ejecutar la colección

1. Abrir Postman y seleccionar **Import**.
2. Elegir el archivo `docs/postman/ConstruMarket-Sprint8.postman_collection.json`.
3. Abrir la carpeta **Usuarios** de la colección.
4. Ejecutar primero **Listar usuarios**. Esta petición guarda automáticamente el primer ID en la variable `userId`.
5. Ejecutar **Detalle de usuario**, **Rechazar ID inválido** y **Usuario inexistente**.

En la carpeta **Productos**, ejecutar primero **Listar productos** para guardar automáticamente un `productId` válido. Luego ejecutar **Detalle de producto**, **Rechazar ID de producto inválido** y **Producto inexistente**.

Cada petición incluye pruebas en la pestaña **Tests**. También se puede ejecutar la carpeta completa con **Run folder**; todos los resultados deben quedar en verde.

## Variables

| Variable | Valor inicial | Uso |
|---|---|---|
| `baseUrl` | `http://localhost:3000` | Origen de la aplicación Express. |
| `userId` | `1` | Usuario consultado en el detalle; el listado la actualiza automáticamente. |
| `productId` | `1` | Producto obtenido desde el listado para consultar su detalle. |

Si el servidor utiliza otro puerto, solo hay que cambiar `baseUrl` en las variables de la colección.
