import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../data/blogData';
import NotFound from './NotFound';

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) return <NotFound />;

    return (
        <>
            <Helmet>
                <title>{post.title} - 담아 유산 이야기</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
            </Helmet>

            <div className="detail-page">
                {/* Hero */}
                <div className="detail-hero">
                    <img className="detail-hero__img" src={post.image} alt={post.title} />
                    <div className="detail-hero__overlay" />
                </div>

                <div className="detail-container">
                    <button className="back-btn" onClick={() => navigate('/blog')}>
                        ← 이야기 목록으로
                    </button>

                    <header className="detail-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                        <div className="detail-badge-row">
                            <span className="badge badge--primary">{post.category}</span>
                            <span className="badge badge--gray">{post.date}</span>
                        </div>
                        <h1 className="detail-title">{post.title}</h1>
                        <div style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            작성자: {post.author}
                        </div>
                    </header>

                    <div className="blog-post-content prose" style={{ maxWidth: '800px', margin: '3rem auto 5rem' }}>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        
                        <div className="blog-post-footer" style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>다른 이야기 읽어보기</h3>
                            <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(p => (
                                    <Link key={p.id} to={`/blog/${p.slug}`} className="blog-card" style={{ fontSize: '0.9rem' }}>
                                        <div className="blog-card__image-wrap" style={{ aspectRatio: '16/9' }}>
                                            <img src={p.image} alt={p.title} />
                                        </div>
                                        <div className="blog-card__body" style={{ padding: '1rem' }}>
                                            <h4 style={{ margin: 0 }}>{p.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
