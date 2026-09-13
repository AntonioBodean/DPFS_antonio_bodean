# Contrato de la API — ConstruMarket

## Convenciones generales

- La ruta base es `/api`.
- Todas las respuestas utilizan `Content-Type: application/json; charset=utf-8`.
- Las rutas canónicas no llevan `/` final, aunque Express admite ambas formas.
- Los identificadores son enteros positivos.
- Las fechas se representan como cadenas ISO 8601 en UTC.
- Los precios y conteos se representan como números, no como cadenas.
- Las propiedades `detail` e `image` contienen URLs absolutas construidas con el protocolo y host de la petición.
- Las colecciones vacías se representan con `[]`; los datos opcionales sin valor se representan con `null`.
- La API nunca devuelve contraseñas, hashes, `roleId`, roles ni categorías de usuario.

Ejemplo de origen durante el desarrollo:

```text
http://localhost:3000
```

## Formato de errores

Todos los errores de la API siguen esta estructura:

```json
{
  "error": {
    "status": 404,
    "code": "USER_NOT_FOUND",
    "message": "El usuario solicitado no existe."
  }
}
```

| Estado | Código | Uso |
|---:|---|---|
| 400 | `INVALID_ID` | El parámetro `id` no es un entero positivo. |
| 404 | `USER_NOT_FOUND` | No existe el usuario solicitado. |
| 404 | `PRODUCT_NOT_FOUND` | No existe el producto solicitado. |
| 404 | `API_ROUTE_NOT_FOUND` | La ruta solicitada no existe bajo `/api`. |
| 500 | `INTERNAL_SERVER_ERROR` | Ocurrió un error no esperado. No se exponen detalles internos. |

## Usuarios

### `GET /api/users`

Devuelve la colección completa de usuarios.

#### Respuesta exitosa — HTTP 200

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

#### Propiedades

| Propiedad | Tipo | Descripción |
|---|---|---|
| `count` | número entero | Total de usuarios almacenados, no solo la longitud del array. |
| `users` | array | Colección de usuarios ordenada por `id` ascendente. |
| `users[].id` | número entero | Identificador del usuario. |
| `users[].name` | cadena | Nombre completo formado por `firstName` y `lastName`. |
| `users[].email` | cadena | Correo electrónico del usuario. |
| `users[].detail` | cadena URL | Endpoint de detalle del usuario. |

Una base sin usuarios responde HTTP 200 con `count: 0` y `users: []`.

### `GET /api/users/:id`

Devuelve los datos públicos de un usuario.

#### Respuesta exitosa — HTTP 200

```json
{
  "id": 1,
  "firstName": "Ana",
  "lastName": "Pérez",
  "email": "ana@example.com",
  "phone": null,
  "image": "http://localhost:3000/images/construmarket-logo.png",
  "createdAt": "2026-09-11T12:00:00.000Z",
  "updatedAt": "2026-09-11T12:00:00.000Z"
}
```

#### Propiedades

| Propiedad | Tipo | Descripción |
|---|---|---|
| `id` | número entero | Identificador del usuario. |
| `firstName` | cadena | Nombre. |
| `lastName` | cadena | Apellido. |
| `email` | cadena | Correo electrónico. |
| `phone` | cadena o `null` | Teléfono opcional. |
| `image` | cadena URL | Imagen pública del perfil. |
| `createdAt` | cadena ISO 8601 | Fecha de creación. |
| `updatedAt` | cadena ISO 8601 | Fecha de última actualización. |

La respuesta excluye expresamente `password`, `roleId`, `role`, `category` y cualquier equivalente.

## Productos

### `GET /api/products`

Devuelve la colección completa de productos y los totales por categoría.

#### Respuesta exitosa — HTTP 200

```json
{
  "count": 7,
  "countByCategory": {
    "Materiales": 4,
    "Herramientas": 2,
    "Pinturas": 0,
    "Hierros": 1
  },
  "products": [
    {
      "id": 1,
      "name": "Cemento Portland 25 kg",
      "description": "Cemento Portland compuesto para trabajos de construcción.",
      "categories": [
        {
          "id": 1,
          "name": "Materiales"
        }
      ],
      "detail": "http://localhost:3000/api/products/1"
    }
  ]
}
```

#### Propiedades

| Propiedad | Tipo | Descripción |
|---|---|---|
| `count` | número entero | Total de productos almacenados, no solo la longitud del array. |
| `countByCategory` | objeto | Una propiedad por categoría con el total de productos. Incluye categorías con total `0`. |
| `products` | array | Colección de productos ordenada por `id` ascendente. |
| `products[].id` | número entero | Identificador del producto. |
| `products[].name` | cadena | Nombre del producto. |
| `products[].description` | cadena | Descripción, que puede estar vacía. |
| `products[].categories` | array | Categoría principal como colección de objetos `{ id, name }`. Actualmente contiene cero o un elemento. |
| `products[].detail` | cadena URL | Endpoint de detalle del producto. |

Una base sin productos responde HTTP 200 con `count: 0`, conserva todas las categorías con total `0` y devuelve `products: []`.

### `GET /api/products/:id`

Devuelve los datos públicos y las relaciones de un producto.

#### Respuesta exitosa — HTTP 200

```json
{
  "id": 3,
  "name": "Amoladora angular 850 W",
  "description": "Amoladora compacta y potente con disco de 115 mm.",
  "price": 84990,
  "stock": 7,
  "categoryId": 2,
  "brandId": 3,
  "image": "http://localhost:3000/images/amoladora.jpg",
  "createdAt": "2026-09-11T12:00:00.000Z",
  "updatedAt": "2026-09-11T12:00:00.000Z",
  "categories": [
    {
      "id": 2,
      "name": "Herramientas"
    }
  ],
  "brands": [
    {
      "id": 3,
      "name": "Nortool"
    }
  ],
  "colors": [
    {
      "id": 2,
      "name": "Amarillo"
    },
    {
      "id": 3,
      "name": "Negro"
    }
  ]
}
```

#### Propiedades

| Propiedad | Tipo | Descripción |
|---|---|---|
| `id` | número entero | Identificador del producto. |
| `name` | cadena | Nombre. |
| `description` | cadena | Descripción. |
| `price` | número | Precio. |
| `stock` | número entero | Unidades disponibles. |
| `categoryId` | número entero | Identificador de la categoría principal. |
| `brandId` | número entero | Identificador de la marca. |
| `image` | cadena URL | Imagen pública del producto. |
| `createdAt` | cadena ISO 8601 | Fecha de creación. |
| `updatedAt` | cadena ISO 8601 | Fecha de última actualización. |
| `categories` | array | Categoría principal como colección de objetos `{ id, name }`. |
| `brands` | array | Marca principal como colección de objetos `{ id, name }`. |
| `colors` | array | Colores asociados como colección de objetos `{ id, name }`. |

Las relaciones sin datos se representan con un array vacío.

## Decisiones de implementación

- El contrato utiliza nombres JavaScript (`firstName`, `createdAt`, `categoryId`) y no los nombres físicos `snake_case` de MySQL.
- Categorías y marcas se presentan como arrays para respetar la estructura solicitada para las relaciones y permitir ampliaciones sin cambiar el tipo de dato consumido por React.
- `countByCategory` usa el nombre de cada categoría como clave porque la consigna solicita una propiedad por categoría.
- El producto más reciente para el dashboard será el de mayor `id`. Aunque existen fechas de creación, esta regla evita ambigüedades con datos importados que comparten la misma fecha.
- La paginación no forma parte del contrato obligatorio. Si se implementa, agregará `next` y `previous` sin modificar la forma de cada recurso.
