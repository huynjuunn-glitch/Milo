// Heritage Open API service
// 국가유산청 API: www.khs.go.kr
// In production: routes through Cloudflare Pages Function (/api/heritage/*) for CORS safety
// In development: routes through Vite proxy (/api/heritage -> https://www.khs.go.kr/cha)
import axios from 'axios';

// Direct API call since KHS supports CORS natively (Access-Control-Allow-Origin: *)
const API_BASE = 'https://www.khs.go.kr/cha';

// API key: CF Function injects server-side in prod; dev uses .env.local
const API_KEY = import.meta.env.VITE_HERITAGE_API_KEY || 'sample';

// Region code mapping
export const REGION_CODES = {
    '전체': '',
    '서울': '11',
    '부산': '21',
    '대구': '22',
    '인천': '23',
    '광주': '24',
    '대전': '25',
    '울산': '26',
    '세종': '29',
    '경기': '31',
    '강원': '32',
    '충북': '33',
    '충남': '34',
    '전북': '35',
    '전남': '36',
    '경북': '37',
    '경남': '38',
    '제주': '50',
};

// Heritage type codes
export const HERITAGE_TYPES = {
    '국보': { ccbaKdcd: '11', ccbaCpno: '' },
    '보물': { ccbaKdcd: '12', ccbaCpno: '' },
    '사적': { ccbaKdcd: '13', ccbaCpno: '' },
    '명승': { ccbaKdcd: '14', ccbaCpno: '' },
    '천연기념물': { ccbaKdcd: '15', ccbaCpno: '' },
    '국가무형': { ccbaKdcd: '16', ccbaCpno: '' },
    '국가민속': { ccbaKdcd: '17', ccbaCpno: '' },
};

/**
 * Fetch heritage list from KHS Open API
 */
export async function fetchHeritageList({ pageIndex = 1, pageUnit = 100, ccbaKdcd = '', ccbaCtcd = '' } = {}) {
    try {
        const params = {
            pageIndex,
            pageUnit,
            serviceKey: API_KEY,
        };
        if (ccbaKdcd) params.ccbaKdcd = ccbaKdcd;
        if (ccbaCtcd) params.ccbaCtcd = ccbaCtcd;

        const res = await axios.get(`${API_BASE}/SearchKindOpenapiList.do`, {
            params,
            timeout: 30000,
        });

        // Parse XML response
        return parseListXML(res.data);
    } catch (err) {
        console.error('Heritage list fetch error:', err);
        throw new Error('유산 목록을 불러오는 데 실패했습니다.');
    }
}

/**
 * Fetch detail for a specific heritage item
 */
export async function fetchHeritageDetail({ ccbaKdcd, ccbaAsno, ccbaCtcd }) {
    try {
        const res = await axios.get(`${API_BASE}/SearchKindOpenapiDt.do`, {
            params: {
                ccbaKdcd,
                ccbaAsno,
                ccbaCtcd,
                serviceKey: API_KEY,
            },
            timeout: 30000,
        });
        return parseDetailXML(res.data);
    } catch (err) {
        console.error('Heritage detail fetch error:', err);
        throw new Error('유산 상세 정보를 불러오는 데 실패했습니다.');
    }
}

/**
 * Fetch images for a specific heritage item
 */
export async function fetchHeritageImages({ ccbaKdcd, ccbaAsno, ccbaCtcd }) {
    try {
        const res = await axios.get(`${API_BASE}/SearchImageOpenapi.do`, {
            params: {
                ccbaKdcd,
                ccbaAsno,
                ccbaCtcd,
                serviceKey: API_KEY,
            },
            timeout: 30000,
        });
        return parseImageXML(res.data);
    } catch (err) {
        console.warn('Heritage image fetch warning:', err);
        return [];
    }
}

/**
 * Fetch just the first image for list thumbnails
 */
const thumbnailCache = new Map();
export async function fetchFirstImage({ ccbaKdcd, ccbaAsno, ccbaCtcd }) {
    const key = `${ccbaKdcd}-${ccbaAsno}-${ccbaCtcd}`;
    if (thumbnailCache.has(key)) return thumbnailCache.get(key);

    const images = await fetchHeritageImages({ ccbaKdcd, ccbaAsno, ccbaCtcd });
    const first = images.length > 0 ? images[0].imageUrl : null;
    thumbnailCache.set(key, first);
    return first;
}

// ─── XML Parsers ──────────────────────────────────────────────────────────────

function parseListXML(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    const items = doc.querySelectorAll('item');
    const total = parseInt(doc.querySelector('totalCnt')?.textContent || '0', 10);

    const data = Array.from(items).map(item => ({
        ccbaKdcd: getText(item, 'ccbaKdcd'),
        ccbaAsno: getText(item, 'ccbaAsno'),
        ccbaCtcd: getText(item, 'ccbaCtcd'),
        ccbaMnm1: getText(item, 'ccbaMnm1'),   // 국문 명칭
        ccbaMnm2: getText(item, 'ccbaMnm2'),   // 한자 명칭
        ccbaLcad: getText(item, 'ccbaLcad'),   // 소재지
        ccbaCtcdNm: getText(item, 'ccbaCtcdNm'), // 시·도
        ccbaKdcdNm: getText(item, 'ccbaKdcdNm'), // 종류
        ccbaAsdt: getText(item, 'ccbaAsdt'),   // 지정일
        imageUrl: getText(item, 'imageUrl') || '',
        longitude: getText(item, 'longitude'),
        latitude: getText(item, 'latitude'),
    }));

    return { items: data, total };
}

function parseDetailXML(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    const item = doc.querySelector('item');
    if (!item) return null;

    // KHS uses either 'content' or 'ccbaAbmi' for description
    const description = getText(item, 'content') || getText(item, 'ccbaAbmi');

    return {
        ccbaKdcd: getText(item, 'ccbaKdcd'),
        ccbaAsno: getText(item, 'ccbaAsno'),
        ccbaCtcd: getText(item, 'ccbaCtcd'),
        ccbaMnm1: getText(item, 'ccbaMnm1'),
        ccbaMnm2: getText(item, 'ccbaMnm2'),
        ccbaAbmi: cleanHtml(description),  // 설명
        ccbaLcad: getText(item, 'ccbaLcad'),
        ccbaCtcdNm: getText(item, 'ccbaCtcdNm'),
        ccbaKdcdNm: getText(item, 'ccbaKdcdNm'),
        ccbaAsdt: formatDate(getText(item, 'ccbaAsdt')),
        ccbaCncl: getText(item, 'ccbaCncl'),
        imageUrl: getText(item, 'imageUrl') || '',
    };
}

function parseImageXML(xmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    const items = doc.querySelectorAll('item');

    return Array.from(items).map(item => ({
        imageUrl: getText(item, 'imageUrl'),
        ccimDesc: getText(item, 'ccimDesc'),
        sCcimType: getText(item, 'sCcimType'),
    })).filter(img => img.imageUrl);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getText(el, tag) {
    return el.querySelector(tag)?.textContent?.trim() || '';
}

function cleanHtml(str) {
    return str
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .trim();
}

function formatDate(dateStr) {
    if (!dateStr || dateStr.length < 8) return dateStr;
    const y = dateStr.slice(0, 4);
    const m = dateStr.slice(4, 6);
    const d = dateStr.slice(6, 8);
    return `${y}년 ${m}월 ${d}일`;
}

/**
 * Build a unique ID string for routing
 */
export function buildHeritageId(item) {
    return `${item.ccbaKdcd}-${item.ccbaAsno}-${item.ccbaCtcd}`;
}

/**
 * Parse route ID back to API params
 */
export function parseHeritageId(id) {
    const parts = id.split('-');
    return {
        ccbaKdcd: parts[0],
        ccbaAsno: parts[1],
        ccbaCtcd: parts[2],
    };
}
