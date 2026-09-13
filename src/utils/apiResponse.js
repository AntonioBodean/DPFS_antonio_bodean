function sendApiError(res, status, code, message) {
    return res.status(status).json({
        error: { status, code, message }
    });
}

function isApiRequest(req) {
    const pathname = (req.originalUrl || req.url || '').split('?')[0];
    return pathname === '/api' || pathname.startsWith('/api/');
}

function buildAbsoluteUrl(req, pathname) {
    return new URL(pathname, `${req.protocol}://${req.get('host')}`).toString();
}

function parsePositiveInteger(value) {
    if (!/^[1-9]\d*$/.test(value)) return null;
    const number = Number(value);
    return Number.isSafeInteger(number) ? number : null;
}

module.exports = { sendApiError, isApiRequest, buildAbsoluteUrl, parsePositiveInteger };
