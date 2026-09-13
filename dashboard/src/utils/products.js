export function getLatestProductReference(products = []) {
    if (!Array.isArray(products) || products.length === 0) return null;

    return products.reduce((latest, product) => (
        !latest || product.id > latest.id ? product : latest
    ), null);
}
