import React from 'react';
import type { Factura, Pago, EstadoDeCuenta } from '../../services/conexionReporteGet';

interface ReportCardProps {
    factura: Factura;
    estadoDeCuenta: EstadoDeCuenta;
    pagos: Pago[];
}

export const ReportCard: React.FC<ReportCardProps> = ({ factura, estadoDeCuenta, pagos }) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        if (dateString.startsWith('0001')) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="report-container animate-fadeIn">
            {/* Factura Header */}
            <div className="card">
                <div className="card-header">
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>Factura #{factura.id}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Cliente ID: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{factura.cliente}</span></p>
                    </div>
                    <div className={`status-badge ${estadoDeCuenta.estado === 'Pagada' ? 'status-paid' : 'status-pending'}`}>
                        {estadoDeCuenta.estado}
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-box">
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Monto Original</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>{formatCurrency(factura.montoOriginal)}</p>
                    </div>
                    <div className="stat-box">
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Pagado</p>
                        <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(estadoDeCuenta.totalPagado)}</p>
                    </div>
                    <div className="stat-box">
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Saldo Restante</p>
                        <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(estadoDeCuenta.saldoRestante)}</p>
                    </div>
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <span>Pagada en Origen: {estadoDeCuenta.banderaPagadaEnOrigen ? 'Sí' : 'No'}</span>
                    <span>Fecha: {formatDate(factura.fecha)}</span>
                </div>
            </div>

            {/* Pagos Section */}
            <div className="card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#4ade80' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Historial de Pagos
                </h3>

                {pagos && pagos.length > 0 ? (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID Pago</th>
                                    <th>Fecha</th>
                                    <th className="text-right">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagos.map((pago) => (
                                    <tr key={pago.id}>
                                        <td>#{pago.id}</td>
                                        <td>{formatDate(pago.fecha)}</td>
                                        <td className="text-right text-green">
                                            {formatCurrency(pago.monto)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '0.5rem' }}>
                        No hay pagos registrados para esta factura.
                    </div>
                )}
            </div>
        </div>
    );
};
