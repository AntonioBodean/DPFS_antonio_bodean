export default function LatestProductCard({ product }) {
    if (!product) {
        return (
            <section className="latest-product latest-product--empty" aria-labelledby="latest-product-title">
                <div className="latest-product__content">
                    <p className="latest-product__eyebrow">Último producto</p>
                    <h2 id="latest-product-title">Todavía no hay productos</h2>
                    <p>El producto más reciente aparecerá aquí cuando se agregue al catálogo.</p>
                </div>
            </section>
        );
    }

    const category = product.categories?.[0]?.name || 'Sin categoría';

    return (
        <section className="latest-product" aria-labelledby="latest-product-title">
            <div className="latest-product__image-wrap">
                <img
                    className="latest-product__image"
                    src={product.image}
                    alt={`Imagen de ${product.name}`}
                />
            </div>
            <div className="latest-product__content">
                <p className="latest-product__eyebrow">Último producto</p>
                <p className="latest-product__category">{category}</p>
                <h2 id="latest-product-title">{product.name}</h2>
                <p className="latest-product__description">{product.description}</p>
            </div>
        </section>
    );
}
