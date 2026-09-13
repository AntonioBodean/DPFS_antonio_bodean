import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '../services/apiClient';
import { getProduct, getProducts, getUsers } from '../services/api';
import { getLatestProductReference } from '../utils/products';

const initialState = {
    status: 'loading',
    users: null,
    products: null,
    latestProduct: null,
    error: null
};

function validateCollection(payload, collectionName) {
    if (!Number.isInteger(payload?.count) || !Array.isArray(payload?.[collectionName])) {
        throw new ApiError('La API devolvió datos incompletos.', {
            code: 'INVALID_RESPONSE'
        });
    }
}

export default function useDashboardData() {
    const [state, setState] = useState(initialState);
    const [requestVersion, setRequestVersion] = useState(0);

    const retry = useCallback(() => {
        setRequestVersion(version => version + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function loadDashboardData() {
            setState(current => ({ ...current, status: 'loading', error: null }));

            try {
                const [users, products] = await Promise.all([
                    getUsers({ signal: controller.signal }),
                    getProducts({ signal: controller.signal })
                ]);

                validateCollection(users, 'users');
                validateCollection(products, 'products');

                const latestProductReference = getLatestProductReference(products.products);
                const latestProduct = latestProductReference
                    ? await getProduct(latestProductReference.id, { signal: controller.signal })
                    : null;

                setState({
                    status: users.count === 0 && products.count === 0 ? 'empty' : 'success',
                    users,
                    products,
                    latestProduct,
                    error: null
                });
            } catch (error) {
                if (error.name === 'AbortError') return;
                setState(current => ({
                    ...current,
                    status: 'error',
                    error: error instanceof ApiError
                        ? error
                        : new ApiError('Ocurrió un error inesperado al cargar el dashboard.')
                }));
            }
        }

        loadDashboardData();
        return () => controller.abort();
    }, [requestVersion]);

    return { ...state, retry };
}
