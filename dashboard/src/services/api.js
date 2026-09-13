import { getJson } from './apiClient.js';

export function getUsers(options) {
    return getJson('/users', options);
}

export function getUser(id, options) {
    return getJson(`/users/${id}`, options);
}

export function getProducts(options) {
    return getJson('/products', options);
}

export function getProduct(id, options) {
    return getJson(`/products/${id}`, options);
}
