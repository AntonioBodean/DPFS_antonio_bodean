const statusContent = {
    loading: {
        eyebrow: 'Sincronizando',
        title: 'Consultando ConstruMarket',
        detail: 'Estamos obteniendo la información más reciente.'
    },
    empty: {
        eyebrow: 'Sin registros',
        title: 'La base todavía está vacía',
        detail: 'Los indicadores aparecerán cuando existan usuarios o productos.'
    }
};

export default function ConnectionStatus({ status, users, products, error, onRetry }) {
    if (status === 'success') {
        return (
            <section className="connection-card connection-card--success" aria-live="polite">
                <p className="connection-card__eyebrow">Datos sincronizados</p>
                <h2>La API está conectada</h2>
                <p>
                    Recibimos {users.count} usuarios y {products.count} productos. Ya podemos construir
                    los indicadores del negocio.
                </p>
            </section>
        );
    }

    if (status === 'error') {
        return (
            <section className="connection-card connection-card--error" role="alert">
                <p className="connection-card__eyebrow">Conexión interrumpida</p>
                <h2>No pudimos actualizar los datos</h2>
                <p>{error?.message || 'Revisá que la API esté disponible e intentá nuevamente.'}</p>
                <button type="button" onClick={onRetry}>Reintentar</button>
            </section>
        );
    }

    const content = statusContent[status] || statusContent.loading;
    return (
        <section
            className={`connection-card connection-card--${status}`}
            aria-live="polite"
            aria-busy={status === 'loading'}
        >
            <p className="connection-card__eyebrow">{content.eyebrow}</p>
            <h2>{content.title}</h2>
            <p>{content.detail}</p>
        </section>
    );
}
