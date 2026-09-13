export default function MetricCard({ label, value, detail, tone }) {
    return (
        <article className={`metric-card metric-card--${tone}`}>
            <p className="metric-card__label">{label}</p>
            <strong className="metric-card__value">{value.toLocaleString('es-AR')}</strong>
            <p className="metric-card__detail">{detail}</p>
        </article>
    );
}
