import DashboardShell from './components/DashboardShell';
import CategoriesPanel from './components/CategoriesPanel';
import ConnectionStatus from './components/ConnectionStatus';
import LatestProductCard from './components/LatestProductCard';
import MetricsGrid from './components/MetricsGrid';
import ProductsList from './components/ProductsList';
import useDashboardData from './hooks/useDashboardData';

export default function App() {
    const { status, users, products, latestProduct, error, retry } = useDashboardData();
    const hasData = Boolean(users && products);

    return (
        <DashboardShell>
            <section className="dashboard-heading" aria-labelledby="dashboard-title">
                <div>
                    <p className="eyebrow">Estado del negocio</p>
                    <h1 id="dashboard-title">Resumen general</h1>
                </div>
                <p className={`dashboard-heading__status dashboard-heading__status--${status}`}>
                    <span aria-hidden="true" />
                    {status === 'success' ? 'API conectada' : 'Estado de la API'}
                </p>
            </section>

            {status !== 'success' && (
                <ConnectionStatus
                    status={status}
                    users={users}
                    products={products}
                    error={error}
                    onRetry={retry}
                />
            )}

            {hasData && (
                <>
                    <MetricsGrid users={users} products={products} />
                    <div className="dashboard-insights">
                        <LatestProductCard product={latestProduct} />
                        <CategoriesPanel countByCategory={products.countByCategory} />
                    </div>
                    <ProductsList products={products.products} />
                </>
            )}
        </DashboardShell>
    );
}
