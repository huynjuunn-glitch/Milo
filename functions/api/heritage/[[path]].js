/**
 * Cloudflare Pages Function
 * Path: /functions/api/heritage/[[path]].js
 *
 * Proxies all /api/heritage/* requests to the KHS (국가유산청) Open API
 * server-side, bypassing browser CORS restrictions.
 */
export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);

    // Strip the /api/heritage prefix to get the actual API path
    const apiPath = url.pathname.replace('/api/heritage', '');

    // Preserve all original query parameters
    const targetUrl = `https://www.khs.go.kr/cha${apiPath}${url.search}`;

    try {
        const response = await fetch(targetUrl, {
            method: request.method,
            headers: {
                'Accept': 'application/xml, text/xml, */*',
                'User-Agent': 'DamaHeritageArchive/1.0',
            },
        });

        const body = await response.text();

        return new Response(body, {
            status: response.status,
            headers: {
                'Content-Type': 'application/xml; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Cache-Control': 'public, max-age=300', // 5min cache
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 502,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
