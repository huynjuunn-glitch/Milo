import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchHeritageList, buildHeritageId } from '../api/heritageApi';
import { HeritageCard, LoadingScreen, ErrorScreen, SectionHeader } from '../components';

// Korean palace hero image (public domain / Pixabay)
const HERO_BG = 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=1920&q=80&auto=format&fit=crop';

export default function Home() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQ, setSearchQ] = useState('');
    const navigate = useNavigate();
    const observerRef = useRef(null);

    useEffect(() => { loadFeatured(); }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        document.querySelectorAll('.fade-in').forEach(el => observerRef.current.observe(el));
        return () => observerRef.current?.disconnect();
    }, [featured]);

    async function loadFeatured() {
        try {
            setLoading(true);
            setError(null);
            const { items } = await fetchHeritageList({ pageIndex: 1, pageUnit: 9, ccbaKdcd: '11' });
            setFeatured(items);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchQ.trim()) navigate(`/archive?q=${encodeURIComponent(searchQ.trim())}`);
        else navigate('/archive');
    }

    return (
        <>
            <Helmet>
                <title>담아(Dama) - 대한민국 국가유산 디지털 아카이브</title>
                <meta name="description" content="대한민국의 국보, 보물, 사적 등 소중한 국가유산을 고해상도 디지털 아카이브로 만나보세요. 국가유산청 공식 데이터를 기반으로 신뢰할 수 있는 정보를 제공합니다." />
                <meta property="og:title" content="담아(Dama) - 국가유산 디지털 아카이브" />
                <meta property="og:description" content="대한민국의 소중한 국가유산을 디지털로 담아내다. 고해상도 이미지와 깊이 있는 이야기를 만나보세요." />
            </Helmet>

            {/* ─── HERO ─── */}
            <section className="hero">
                <img
                    className="hero__bg-img"
                    src={HERO_BG}
                    alt="한국 전통 궁궐"
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.background = '#1a1507'; }}
                />
                <div className="hero__overlay" />
                <div className="hero__content">
                    <h1 className="hero__title">
                        세월이 빚은 가치,<br />
                        담아(Dama)에서 다시 태어나다
                    </h1>
                    <p className="hero__subtitle">
                        대한민국의 국보급 문화유산을 고해상도 디지털 아카이브로 만나보세요.<br />
                        과거와 현재가 공존하는 특별한 경험을 선사합니다.
                    </p>

                    {/* Search bar */}
                    <form className="hero__search" onSubmit={handleSearch}>
                        <span className="hero__search-icon">🔍</span>
                        <input
                            className="hero__search-input"
                            type="text"
                            placeholder="찾고 싶은 유산을 검색해 주세요"
                            value={searchQ}
                            onChange={e => setSearchQ(e.target.value)}
                        />
                        <button type="submit" className="hero__search-btn">→</button>
                    </form>
                </div>
            </section>

            {/* ─── FEATURED SECTION ─── */}
            <section className="featured-section">
                <div className="container">
                    <div className="featured-section__header">
                        <div>
                            <span className="section-label">오늘의 주목할 유산</span>
                            <h2 className="section-title">큐레이터가 엄선한 한국의 아름다움</h2>
                            <p className="section-desc">국가유산청 공식 데이터베이스에서 엄선된 국보 유산을 만나보세요.</p>
                        </div>
                        <Link to="/archive" className="view-all-link">전체 보기 →</Link>
                    </div>

                    {loading && <LoadingScreen message="유산 데이터를 불러오는 중..." />}
                    {error && <ErrorScreen message={error} onRetry={loadFeatured} />}

                    {!loading && !error && (
                        <div className="featured-grid">
                            {featured.map((item, i) => (
                                <div key={buildHeritageId(item)} className="fade-in" style={{ transitionDelay: `${i * 0.06}s` }}>
                                    <HeritageCard item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ─── FEATURE CARDS (About mini) ─── */}
            <section className="about-mini">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                        <span className="section-label">담아 소개</span>
                        <h2 className="section-title">대한민국의 유산을 디지털로</h2>
                    </div>
                    <div className="about-mini-grid">
                        {[
                            { icon: '🏛', title: '공식 데이터베이스 연동', desc: '국가유산청 공개 API를 통해 실시간으로 최신 유산 정보를 제공합니다.' },
                            { icon: '🔍', title: '정밀한 검색 필터', desc: '지역, 종류별로 원하는 유산을 정확하게 찾아볼 수 있습니다.' },
                            { icon: '📖', title: '상세한 유산 기록', desc: '각 유산의 역사적 배경, 소재지, 지정일 등 심층 정보를 제공합니다.' },
                        ].map(f => (
                            <div key={f.title} className="about-feature-card">
                                <div className="about-feature-card__icon">{f.icon}</div>
                                <div className="about-feature-card__title">{f.title}</div>
                                <div className="about-feature-card__desc">{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
