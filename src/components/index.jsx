import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { fetchFirstImage } from '../api/heritageApi';

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar">
                <div className="navbar__inner">
                    <Link to="/" className="navbar__logo">
                        {/* Temple icon in primary red */}
                        <svg className="navbar__logo-icon" viewBox="0 0 28 28" fill="none">
                            <path d="M4 12L14 4L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12V22H22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 22V17H18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="navbar__logo-text">Dama</span>
                    </Link>

                    <div className="navbar__nav">
                        <NavLink to="/" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`} end>홈</NavLink>
                        <NavLink to="/archive" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>유산 라이브러리</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>아카이브 소개</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>고객지원</NavLink>
                    </div>

                    {/* Search button (navigates to archive) */}
                    <button
                        className="navbar__search-btn"
                        onClick={() => navigate('/archive')}
                    >
                        <span>🔍</span>
                        <span>검색</span>
                    </button>

                    <button
                        className="navbar__menu-btn"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="메뉴 열기"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                <NavLink to="/" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>홈</NavLink>
                <NavLink to="/archive" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>유산 라이브러리</NavLink>
                <NavLink to="/about" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>아카이브 소개</NavLink>
                <NavLink to="/contact" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>고객지원</NavLink>
            </div>
        </>
    );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__top">
                    <div>
                        <div className="footer__brand-logo">
                            <svg className="footer__brand-icon" viewBox="0 0 28 28" fill="none">
                                <path d="M4 12L14 4L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 12V22H22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 22V17H18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span className="footer__brand-name">Dama</span>
                        </div>
                        <p className="footer__brand-desc">
                            담아: 대한민국의 가치를 기록하는<br />
                            디지털 아카이브
                        </p>
                    </div>
                    <div>
                        <div className="footer__col-title">탐색</div>
                        <div className="footer__col-links">
                            <Link to="/" className="footer__col-link">홈</Link>
                            <Link to="/archive" className="footer__col-link">유산 라이브러리</Link>
                            <Link to="/about" className="footer__col-link">아카이브 소개</Link>
                        </div>
                    </div>
                    <div>
                        <div className="footer__col-title">지원</div>
                        <div className="footer__col-links">
                            <Link to="/contact" className="footer__col-link">고객지원</Link>
                            <Link to="/contact" className="footer__col-link">문의하기</Link>
                        </div>
                    </div>
                    <div>
                        <div className="footer__col-title">법적</div>
                        <div className="footer__col-links">
                            <Link to="/privacy" className="footer__col-link">개인정보처리방침</Link>
                            <Link to="/terms" className="footer__col-link">이용약관</Link>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <span className="footer__copy">© 2024 Dama Heritage Archive. All rights reserved.</span>
                    <div className="footer__bottom-links">
                        <Link to="/privacy" className="footer__bottom-link">개인정보처리방침</Link>
                        <Link to="/terms" className="footer__bottom-link">이용약관</Link>
                        <Link to="/contact" className="footer__bottom-link">고객지원</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ─── HeritageCard ─────────────────────────────────────────────────────────────
export function HeritageCard({ item }) {
    const [fetchedImg, setFetchedImg] = useState(null);
    const [imgErr, setImgErr] = useState(false);
    const [loading, setLoading] = useState(!item.imageUrl);

    const id = `${item.ccbaKdcd}-${item.ccbaAsno}-${item.ccbaCtcd}`;
    const displayImage = item.imageUrl || fetchedImg;
    const hasImage = displayImage && !imgErr;

    useEffect(() => {
        if (!item.imageUrl) {
            setLoading(true);
            fetchFirstImage({
                ccbaKdcd: item.ccbaKdcd,
                ccbaAsno: item.ccbaAsno,
                ccbaCtcd: item.ccbaCtcd
            }).then(url => {
                setFetchedImg(url);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        }
    }, [item.ccbaKdcd, item.ccbaAsno, item.ccbaCtcd, item.imageUrl]);

    // Badge color: 국보 → dark, others → red
    const badgeDark = item.ccbaKdcdNm === '국보';

    return (
        <Link to={`/archive/${id}`} className="heritage-card">
            <div className="heritage-card__image-wrap">
                {hasImage ? (
                    <img src={displayImage} alt={item.ccbaMnm1} onError={() => setImgErr(true)} loading="lazy" />
                ) : (
                    <div className="heritage-card__placeholder">
                        {loading ? <div className="spinner-mini" /> : '🏛'}
                    </div>
                )}
                {item.ccbaKdcdNm && (
                    <span className={`heritage-card__badge${badgeDark ? ' heritage-card__badge--dark' : ''}`}>
                        {item.ccbaKdcdNm}
                    </span>
                )}
            </div>
            <div className="heritage-card__body">
                <div className="heritage-card__name">{item.ccbaMnm1}</div>
                {item.ccbaCtcdNm && (
                    <div className="heritage-card__region">
                        📍 {item.ccbaCtcdNm}
                        {item.ccbaLcad && <span> · {item.ccbaLcad.slice(0, 20)}{item.ccbaLcad.length > 20 ? '…' : ''}</span>}
                    </div>
                )}
                <div className="heritage-card__footer">
                    {item.ccbaAsdt && <span className="heritage-card__tag">{item.ccbaAsdt}</span>}
                </div>
            </div>
        </Link>
    );
}

// ─── LoadingScreen ────────────────────────────────────────────────────────────
export function LoadingScreen({ message = '데이터를 불러오는 중...' }) {
    return (
        <div className="loading-screen">
            <div className="loading-spinner" />
            <span className="loading-text">{message}</span>
        </div>
    );
}

// ─── ErrorScreen ──────────────────────────────────────────────────────────────
export function ErrorScreen({ message, onRetry }) {
    return (
        <div className="error-screen">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">불러오기 실패</h2>
            <p className="error-desc">{message}</p>
            {onRetry && (
                <button className="btn-primary" onClick={onRetry} style={{ marginTop: '1rem' }}>
                    다시 시도
                </button>
            )}
        </div>
    );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export function Pagination({ current, total, onChange }) {
    const maxVisible = 7;
    const pages = Array.from({ length: total }, (_, i) => i + 1);
    let visible = pages;
    if (total > maxVisible) {
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(current - half, 1);
        let end = start + maxVisible - 1;
        if (end > total) { end = total; start = Math.max(end - maxVisible + 1, 1); }
        visible = pages.slice(start - 1, end);
    }

    return (
        <div className="pagination">
            <button className="pagination__btn" onClick={() => onChange(current - 1)} disabled={current === 1}>‹</button>
            {visible[0] > 1 && (
                <>
                    <button className="pagination__btn" onClick={() => onChange(1)}>1</button>
                    {visible[0] > 2 && <span style={{ color: 'var(--color-text-muted)', padding: '0 2px' }}>…</span>}
                </>
            )}
            {visible.map(p => (
                <button key={p} className={`pagination__btn${p === current ? ' active' : ''}`} onClick={() => onChange(p)}>{p}</button>
            ))}
            {visible[visible.length - 1] < total && (
                <>
                    {visible[visible.length - 1] < total - 1 && <span style={{ color: 'var(--color-text-muted)', padding: '0 2px' }}>…</span>}
                    <button className="pagination__btn" onClick={() => onChange(total)}>{total}</button>
                </>
            )}
            <button className="pagination__btn" onClick={() => onChange(current + 1)} disabled={current === total}>›</button>
        </div>
    );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({ label, title, desc }) {
    return (
        <div className="section-header">
            {label && <span className="section-label">{label}</span>}
            <h2 className="section-title">{title}</h2>
            {desc && <p className="section-desc">{desc}</p>}
        </div>
    );
}
