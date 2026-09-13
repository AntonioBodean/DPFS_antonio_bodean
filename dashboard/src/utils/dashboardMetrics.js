export function getDashboardMetrics(users, products) {
    return [
        {
            id: 'products',
            label: 'Productos',
            value: products?.count ?? 0,
            detail: 'Artículos disponibles en el catálogo',
            tone: 'navy'
        },
        {
            id: 'users',
            label: 'Usuarios',
            value: users?.count ?? 0,
            detail: 'Cuentas registradas en ConstruMarket',
            tone: 'orange'
        },
        {
            id: 'categories',
            label: 'Categorías',
            value: Object.keys(products?.countByCategory ?? {}).length,
            detail: 'Rubros organizados en el catálogo',
            tone: 'slate'
        }
    ];
}
