import { API_BASE_URL } from '../config/api.js';

export function apiUrl(resource = '') {
    const normalizedResource = resource.startsWith('/') ? resource : `/${resource}`;
    return `${API_BASE_URL}${normalizedResource}`;
}
