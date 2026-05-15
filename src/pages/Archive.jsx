import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchHeritageList, buildHeritageId, REGION_CODES, HERITAGE_TYPES } from '../api/heritageApi';
import { HeritageCard, LoadingScreen, ErrorScreen, Pagination } from '../components';

const REGIONS = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
const TYPES = ['전체', ...Object.keys(HERITAGE_TYPES)];
const PAGE_SIZE = 12;

export default function Archive() {
    const [searchParams] = useSearchParams();
    const initialQ = searchParams.get('q') || '';

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(initialQ);
    const [regionFilter, setRegionFilter] = useState('전체');
    const [typeFilter, setTypeFilter] = useState('전체');

    useEffect(() => { loadData(); }, [page, regionFilter, typeFilter]);

    function applyRegion(r) { setRegionFilter(r); setPage(1); }
    function applyType(t) { setTypeFilter(t); setPage(1); }

    async function loadData() {
        try {
            setLoading(true); setError(null);
            const ccbaCtcd = REGION_CODES[regionFilter] || '';
            const ccbaKdcd = typeFilter !== '전체' ? HERITAGE_TYPES[typeFilter]?.ccbaKdcd || '' : '';
            const { items: data, total: t } = await fetchHeritageList({ pageIndex: page, pageUnit: PAGE_SIZE, ccbaKdcd, ccbaCtcd });
            setItems(data);
            setTotal(t);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        if (!search.trim()) return items;
        const q = search.trim().toLowerCase();
        return items.filter(item =>
            item.ccbaMnm1?.toLowerCase().includes(q) ||
            item.ccbaLcad?.toLowerCase().includes(q) ||
            item.ccbaCtcdNm?.toLowerCase().includes(q)
        );
    }, [items, search]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <>
            <Helmet>
                <title>유산 라이브러리 - 담아 국가유산 디지털 아카이브</title>
                <meta name="description" content="종류별, 지역별로 분류된 대한민국의 모든 국가유산을 탐색하세요. 국보, 보물 등 수천 건의 상세 정보와 고해상도 이미지를 제공합니다." />
                <meta property="og:title" content="유산 라이브러리 | 담아" />
                <meta property="og:description" content="대한민국의 모든 국가유산을 한눈에. 종류별, 지역별 정밀 검색 서비스를 이용해 보세요." />
            </Helmet>

            <div className="archive-page">
                {/* ─── Archive hero bar ─── */}
                <div className="archive-hero-bar">
                    <div className="container">
                        <h1 className="archive-hero-title">유산 라이브러리</h1>
                        <p className="archive-hero-desc">
                            엄선된 국보와 사적의 디지털 컬렉션을 통해 한국 역사의 흐름을 탐구해보세요.
                        </p>
                    </div>
                </div>

                <div className="archive-body">
                    <div className="container">
                        <div className="archive-layout">

                            {/* ─── Sidebar ─── */}
                            <aside className="archive-sidebar">
                                {/* Region filter */}
                                <div className="sidebar-section">
                                    <div className="sidebar-title">지역별</div>
                                    <div className="sidebar-filter-list">
                                        {REGIONS.map(r => (
                                            <button
                                                key={r}
                                                className={`sidebar-filter-item${regionFilter === r ? ' active' : ''}`}
                                                onClick={() => applyRegion(r)}
                                            >
                                                <span className="sidebar-filter-label">
                                                    <span className="sidebar-filter-dot" />
                                                    {r}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Type filter */}
                                <div className="sidebar-section">
                                    <div className="sidebar-title">종류별</div>
                                    <div className="sidebar-filter-list">
                                        {TYPES.map(t => (
                                            <button
                                                key={t}
                                                className={`sidebar-filter-item${typeFilter === t ? ' active' : ''}`}
                                                onClick={() => applyType(t)}
                                            >
                                                <span className="sidebar-filter-label">
                                                    <span className="sidebar-filter-dot" />
                                                    {t}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </aside>

                            {/* ─── Main ─── */}
                            <div className="archive-main">
                                <div className="archive-toolbar">
                                    <span className="archive-count">
                                        총 <strong>{total.toLocaleString()}</strong>건
                                        {search && ` 중 "${search}" 검색 결과 ${filtered.length}건`}
                                    </span>

                                    {/* Inline search */}
                                    <div className="search-bar" style={{ maxWidth: '280px' }}>
                                        <span className="search-bar__icon">🔍</span>
                                        <input
                                            type="text"
                                            className="search-bar__input"
                                            placeholder="검색..."
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {loading && <LoadingScreen message="유산 목록을 불러오는 중..." />}
                                {error && <ErrorScreen message={error} onRetry={loadData} />}

                                {!loading && !error && (
                                    <>
                                        {filtered.length === 0 ? (
                                            <div className="error-screen" style={{ minHeight: '30vh' }}>
                                                <div className="error-icon">🔍</div>
                                                <h2 className="error-title">검색 결과 없음</h2>
                                                <p className="error-desc">다른 검색어나 필터를 시도해 보세요.</p>
                                            </div>
                                        ) : (
                                            <div className="archive-grid">
                                                {filtered.map(item => (
                                                    <HeritageCard key={buildHeritageId(item)} item={item} />
                                                ))}
                                            </div>
                                        )}

                                        {totalPages > 1 && !search && (
                                            <Pagination
                                                current={page}
                                                total={totalPages}
                                                onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            />
                                        )}
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
