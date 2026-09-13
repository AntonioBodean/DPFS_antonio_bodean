export default function DashboardShell({ children }) {
    return (
        <div className="app-shell">
            <a className="skip-link" href="#dashboard-content">Saltar al contenido</a>
            <header className="app-header">
                <a className="brand" href="/" aria-label="ConstruMarket dashboard">
                    <span className="brand__mark" aria-hidden="true">CM</span>
                    <span>
                        <strong>ConstruMarket</strong>
                        <small>Panel de gestión</small>
                    </span>
                </a>
                <span className="app-header__sprint">Sprint 8</span>
            </header>
            <main className="app-main" id="dashboard-content">{children}</main>
            <footer className="app-footer">
                <span>ConstruMarket</span>
                <span>Dashboard conectado a la API</span>
            </footer>
        </div>
    );
}
