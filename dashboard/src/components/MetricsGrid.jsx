import MetricCard from './MetricCard';
import { getDashboardMetrics } from '../utils/dashboardMetrics';

export default function MetricsGrid({ users, products }) {
    const metrics = getDashboardMetrics(users, products);

    return (
        <section className="metrics-section" aria-labelledby="metrics-title">
            <h2 className="sr-only" id="metrics-title">Totales de ConstruMarket</h2>
            <div className="metrics-grid">
                {metrics.map(metric => (
                    <MetricCard key={metric.id} {...metric} />
                ))}
            </div>
        </section>
    );
}
