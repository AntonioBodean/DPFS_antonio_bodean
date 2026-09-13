export default function ProductCard({ product }) {
    const category = product.categories?.[0]?.name || 'Sin categoría';

    return (
        <article className="product-card">
            <div className="product-card__meta">
                <span>{category}</span>
                <span>#{product.id}</span>
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <a
                className="product-card__link"
                href={product.detail}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ver detalle de ${product.name} en la API`}
            >
                Ver detalle en la API
                <span aria-hidden="true">↗</span>
            </a>
        </article>
    );
}
