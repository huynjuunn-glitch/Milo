/**
 * Cloudflare Pages Function: API Proxy for 국가유산청 (KHS) Open API
 * Path: /api/heritage/*
 * 
 * This proxy resolves CORS issues when calling the KHS API from the browser.
 */
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    // Extract the path after /api/heritage/
    const pathname = url.pathname.replace('/api/heritage/', '');

    // Build target URL
    const targetUrl = new URL(`https://www.khs.go.kr/cha/${pathname}`);

    // Copy query params and inject API key
    url.searchParams.forEach((value, key) => {
        targetUrl.searchParams.set(key, value);
    });

    // Inject service key from environment
    if (env.HERITAGE_API_KEY) {
        targetUrl.searchParams.set('serviceKey', env.HERITAGE_API_KEY);
    }

    try {
        const response = await fetch(targetUrl.toString(), {
            headers: {
                'Accept': 'application/xml, text/xml, */*',
                'User-Agent': 'Milo-Heritage-Archive/1.0',
            },
        });

        const body = await response.text();

        return new Response(body, {
            status: response.status,
            headers: {
                'Content-Type': 'application/xml; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Cache-Control': 'public, max-age=300', // 5 min cache
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
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
