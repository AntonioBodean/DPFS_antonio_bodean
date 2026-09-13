import { getCategoryBreakdown } from '../utils/categories';

export default function CategoriesPanel({ countByCategory }) {
    const categories = getCategoryBreakdown(countByCategory);

    return (
        <section className="categories-panel" aria-labelledby="categories-title">
            <div className="categories-panel__heading">
                <div>
                    <p className="categories-panel__eyebrow">Distribución del catálogo</p>
                    <h2 id="categories-title">Productos por categoría</h2>
                </div>
                <p>{categories.length} {categories.length === 1 ? 'categoría' : 'categorías'}</p>
            </div>

            {categories.length === 0 ? (
                <p className="categories-panel__empty">Todavía no hay categorías para mostrar.</p>
            ) : (
                <ul className="categories-list">
                    {categories.map(category => (
                        <li className="category-row" key={category.name}>
                            <div className="category-row__summary">
                                <span>{category.name}</span>
                                <strong aria-label={`${category.count} productos`}>
                                    {category.count}
                                </strong>
                            </div>
                            <div className="category-row__track" aria-hidden="true">
                                <span style={{ '--category-share': category.share }} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
