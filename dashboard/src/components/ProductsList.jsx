import ProductCard from './ProductCard';

export default function ProductsList({ products = [] }) {
    return (
        <section className="products-panel" aria-labelledby="products-title">
            <div className="products-panel__heading">
                <div>
                    <p className="products-panel__eyebrow">Catálogo</p>
                    <h2 id="products-title">Listado de productos</h2>
                </div>
                <p>{products.length} {products.length === 1 ? 'producto' : 'productos'}</p>
            </div>

            {products.length === 0 ? (
                <div className="products-panel__empty">
                    <h3>No hay productos para mostrar</h3>
                    <p>Los nuevos artículos aparecerán aquí cuando se incorporen al catálogo.</p>
                </div>
            ) : (
                <ul className="products-grid">
                    {products.map(product => (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
