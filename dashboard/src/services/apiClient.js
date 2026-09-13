import { apiUrl } from './apiUrl.js';

export class ApiError extends Error {
    constructor(message, { status = 0, code = 'UNKNOWN_ERROR', cause } = {}) {
        super(message, { cause });
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
    }
}

export async function getJson(resource, { signal } = {}) {
    let response;

    try {
        response = await fetch(apiUrl(resource), {
            method: 'GET',
            headers: { Accept: 'application/json' },
            signal
        });
    } catch (error) {
        if (error.name === 'AbortError') throw error;
        throw new ApiError('No se pudo conectar con la API de ConstruMarket.', {
            code: 'NETWORK_ERROR',
            cause: error
        });
    }

    let payload;
    try {
        payload = await response.json();
    } catch (error) {
        throw new ApiError('La API devolvió una respuesta que no es JSON válido.', {
            status: response.status,
            code: 'INVALID_RESPONSE',
            cause: error
        });
    }

    if (!response.ok) {
        throw new ApiError(
            payload?.error?.message || 'La API no pudo completar la solicitud.',
            {
                status: response.status,
                code: payload?.error?.code || 'API_ERROR'
            }
        );
    }

    return payload;
}
