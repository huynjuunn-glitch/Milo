import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchHeritageDetail, fetchHeritageImages, parseHeritageId, fetchHeritageList, buildHeritageId } from '../api/heritageApi';
import { LoadingScreen, ErrorScreen, HeritageCard } from '../components';

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [images, setImages] = useState([]);
    const [related, setRelated] = useState([]);
    const [activeImg, setActiveImg] = useState(0);
    const [imgErr, setImgErr] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { if (id) loadDetail(); }, [id]);

    async function loadDetail() {
        try {
            setLoading(true); setError(null);
            setImgErr(false); setActiveImg(0);

            const params = parseHeritageId(id);
            const [detail, imgs, rel] = await Promise.allSettled([
                fetchHeritageDetail(params),
                fetchHeritageImages(params),
                fetchHeritageList({ pageIndex: 1, pageUnit: 4, ccbaKdcd: params.ccbaKdcd }),
            ]);

            if (detail.status === 'fulfilled' && detail.value) {
                setItem(detail.value);
            } else {
                throw new Error('유산 정보를 찾을 수 없습니다.');
            }

            if (imgs.status === 'fulfilled') setImages(imgs.value);
            if (rel.status === 'fulfilled') {
                setRelated(rel.value.items.filter(r => buildHeritageId(r) !== id).slice(0, 3));
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className="detail-page" style={{ paddingTop: 'calc(60px + 4rem)' }}><LoadingScreen message="유산 정보를 불러오는 중..." /></div>;
    if (error) return <div className="detail-page" style={{ paddingTop: 'calc(60px + 4rem)' }}><ErrorScreen message={error} onRetry={loadDetail} /></div>;
    if (!item) return null;

    const allImages = [
        ...(item.imageUrl ? [{ imageUrl: item.imageUrl, ccimDesc: item.ccbaMnm1 }] : []),
        ...images,
    ];

    const currentImage = allImages[activeImg]?.imageUrl;
    const descParagraphs = (item.ccbaAbmi || '').split('\n').filter(Boolean);
    const metaDesc = descParagraphs[0]?.slice(0, 155) || `${item.ccbaMnm1} - 대한민국 ${item.ccbaKdcdNm}`;

    return (
        <>
            <Helmet>
                <title>{item.ccbaMnm1} - 담아 국가유산 디지털 아카이브</title>
                <meta name="description" content={metaDesc} />
                <meta property="og:title" content={`${item.ccbaMnm1} - 담아`} />
                <meta property="og:description" content={metaDesc} />
                {currentImage && <meta property="og:image" content={currentImage} />}
            </Helmet>

            <div className="detail-page">
                {/* ─── Hero image ─── */}
                <div className="detail-hero">
                    {currentImage && !imgErr ? (
                        <img className="detail-hero__img" src={currentImage} alt={item.ccbaMnm1} onError={() => setImgErr(true)} />
                    ) : (
                        <div className="detail-hero__placeholder">🏛</div>
                    )}
                    <div className="detail-hero__overlay" />
                </div>

                <div className="detail-container">
                    {/* Back button */}
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ← 목록으로 돌아가기
                    </button>

                    {/* Header */}
                    <div className="detail-header">
                        <div className="detail-badge-row">
                            {item.ccbaKdcdNm && <span className="badge badge--primary">{item.ccbaKdcdNm}</span>}
                            {item.ccbaCtcdNm && <span className="badge badge--gray">📍 {item.ccbaCtcdNm}</span>}
                        </div>
                        <h1 className="detail-title">{item.ccbaMnm1}</h1>
                        {item.ccbaMnm2 && <p className="detail-subtitle">{item.ccbaMnm2}</p>}
                    </div>

                    {/* Content */}
                    <div className="detail-content">
                        <div>
                            {/* Image thumbnails */}
                            {allImages.length > 1 && (
                                <div className="detail-thumbnails">
                                    {allImages.map((img, i) => (
                                        <button
                                            key={i}
                                            className={`detail-thumb${i === activeImg ? ' active' : ''}`}
                                            onClick={() => { setActiveImg(i); setImgErr(false); }}
                                        >
                                            <img src={img.imageUrl} alt={img.ccimDesc || ''} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            <div className="detail-desc">
                                {descParagraphs.length > 0 ? (
                                    descParagraphs.map((p, i) => <p key={i}>{p}</p>)
                                ) : (
                                    <p style={{ color: 'var(--color-text-muted)' }}>상세 설명이 제공되지 않습니다.</p>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="detail-sidebar">
                            <div className="detail-sidebar__heading">유산 정보</div>

                            {[
                                { label: '지정 종류', value: item.ccbaKdcdNm },
                                { label: '소재지', value: item.ccbaLcad },
                                { label: '시·도', value: item.ccbaCtcdNm },
                                { label: '지정일', value: item.ccbaAsdt },
                                { label: '지정 번호', value: item.ccbaAsno ? `제${item.ccbaAsno}호` : null },
                            ].filter(m => m.value).map(m => (
                                <div key={m.label} className="detail-meta-item">
                                    <span className="detail-meta-label">{m.label}</span>
                                    <span className="detail-meta-value">{m.value}</span>
                                </div>
                            ))}

                            <a
                                href={`https://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaKdcd=${item.ccbaKdcd}&ccbaAsno=${item.ccbaAsno}&ccbaCtcd=${item.ccbaCtcd}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline-portal"
                            >
                                국가유산포털에서 보기 ↗
                            </a>
                        </aside>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <div className="related-section">
                            <h2 className="related-title">관련 유산</h2>
                            <div className="related-grid">
                                {related.map(r => (
                                    <HeritageCard key={buildHeritageId(r)} item={r} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
