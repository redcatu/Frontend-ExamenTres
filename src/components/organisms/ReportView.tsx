import React from 'react';
import { useReporteContabilidad } from '../../services/conexionReporteGet';
import { SearchForm } from '../molecules/SearchForm';
import { ReportCard } from '../molecules/ReportCard';
import { Loader } from '../atoms/Loader';
import { ErrorMessage } from '../atoms/ErrorMessage';

export const ReportView: React.FC = () => {
    const { fetchReporte, reporte, loading, error } = useReporteContabilidad();

    const handleSearch = (codigo: string) => {
        fetchReporte(codigo);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
                    Consulta de Reportes
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Ingrese el código de la factura para ver el detalle y pagos asociados.
                </p>
            </div>

            <SearchForm onSearch={handleSearch} isLoading={loading} />

            <div style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {loading && <Loader />}

                {error && (
                    <div style={{ width: '100%', maxWidth: '36rem' }}>
                        <ErrorMessage message={error} />
                    </div>
                )}

                {!loading && !error && reporte && (
                    <ReportCard
                        factura={reporte.factura}
                        estadoDeCuenta={reporte.estadoDeCuenta}
                        pagos={reporte.detallePagos}
                    />
                )}

                {!loading && !error && !reporte && (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem' }}>
                        <svg style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem', opacity: 0.2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>Ingrese un código para comenzar la búsqueda</p>
                    </div>
                )}
            </div>
        </div>
    );
};
