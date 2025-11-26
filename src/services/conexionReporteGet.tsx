import { useState } from "react";

export interface Factura {
  id: number;
  cliente: number;
  fecha: string;
  montoOriginal: number;
}

export interface EstadoDeCuenta {
  totalPagado: number;
  saldoRestante: number;
  estado: string;
  banderaPagadaEnOrigen: boolean;
}

export interface Pago {
  id: number;
  fecha: string;
  monto: number; // Asumido, ajustar si el JSON tiene otro nombre
}

export interface ReporteData {
  factura: Factura;
  estadoDeCuenta: EstadoDeCuenta;
  detallePagos: Pago[];
  metadata: {
    exito: boolean;
    errores: string[];
  };
}

/**
 * Hook personalizado para consumir el endpoint orquestador de contabilidad.
 */
export function useReporteContabilidad() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reporte, setReporte] = useState<ReporteData | null>(null);

  /**
   * Realiza la llamada GET al microservicio orquestador.
   * @param {string | number} codigoFactura El código de la factura a buscar.
   */
  const fetchReporte = async (codigoFactura: string | number) => {
    // 1. Validar entrada
    if (!codigoFactura) {
      setError("Debe proporcionar un código de factura válido.");
      setReporte(null);
      return;
    }

    setLoading(true);
    setError(null);
    setReporte(null);

    // Usamos path relativo para que pase por el proxy de Vite
    const endpoint = `/api/Contabilidades/Reporte/${codigoFactura}`;

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 2. Manejo de errores HTTP
      if (res.status === 404) {
        let errorMsg = `Factura ${codigoFactura} no encontrada.`;
        try {
          const errorData = await res.json();
          if (errorData.Mensaje) errorMsg = errorData.Mensaje;
        } catch (e) {
          // Si no es JSON, usamos el texto por defecto
        }
        setError(errorMsg);
        setReporte(null);
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Error en el servicio: ${res.status} ${res.statusText
          }. Detalle: ${errorText.substring(0, 100)}...`
        );
      }

      // 3. Procesar y almacenar la respuesta
      const data: ReporteData = await res.json();

      if (!data.metadata.exito) {
        setError(data.metadata.errores.join(", ") || "Error en la operación");
      } else if (data.metadata.errores && data.metadata.errores.length > 0) {
        setError(
          "ADVERTENCIA: " + data.metadata.errores.join(", ")
        );
      } else {
        setError(null);
      }

      setReporte(data);
    } catch (err: any) {
      console.error("Fallo al consumir la API:", err);
      setError(err.message || "Error desconocido al obtener el reporte.");
      setReporte(null);
    } finally {
      setLoading(false);
    }
  };

  return { fetchReporte, reporte, loading, error };
}
