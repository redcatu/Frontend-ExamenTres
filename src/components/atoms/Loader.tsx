import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
            <p style={{ color: 'var(--text-secondary)' }} className="animate-pulse">Cargando reporte...</p>
        </div>
    );
};
