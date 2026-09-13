# Dashboard de ConstruMarket

Aplicación React del Sprint 8. Consume la API Express de ConstruMarket y se ejecuta como un proyecto Vite independiente.

## Funcionalidades

- Totales de productos, usuarios y categorías.
- Último producto determinado por el mayor identificador.
- Distribución de productos por categoría.
- Grilla completa de productos con enlaces a sus recursos de detalle.
- Estados de carga, error y datos vacíos.
- Diseño responsive para escritorio, tablet y móvil.

## Desarrollo

1. Iniciar MySQL y la aplicación Express desde la raíz del repositorio:

   ```bash
   npm start
   ```

2. En otra terminal, instalar las dependencias del dashboard y ejecutarlo:

   ```bash
   npm --prefix dashboard install
   npm --prefix dashboard run dev
   ```

3. Abrir `http://127.0.0.1:5173`.

El servidor de desarrollo redirige las solicitudes `/api` a `http://127.0.0.1:3000`.

## Configuración

`VITE_API_BASE_URL` permite cambiar la ruta base de la API. En desarrollo su valor predeterminado es `/api`, que Vite redirige a Express. Para usar otro origen, copiar `.env.example` como `.env` dentro de `dashboard` y cambiar el valor.

## Consumo de datos

- `src/services/apiClient.js` centraliza las peticiones JSON y normaliza errores HTTP, de red y de formato.
- `src/services/api.js` expone las consultas de usuarios y productos.
- `src/hooks/useDashboardData.js` coordina carga, éxito, datos vacíos, error, cancelación y reintento.
- `src/components` contiene los paneles y tarjetas reutilizables.
- `src/utils` concentra el cálculo de métricas, categorías y último producto.

## Build de producción

Desde la raíz del repositorio:

```bash
npm run dashboard:build
```

El informe integral se encuentra en [`docs/S8-17_VALIDACION.md`](../docs/S8-17_VALIDACION.md).

## Producción

```bash
npm --prefix dashboard run build
```

Los archivos generados quedan en `dashboard/dist`.
