import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { SectionHeader } from '../components';

export default function Blog() {
    return (
        <>
            <Helmet>
                <title>유산 이야기 - 담아 국가유산 디지털 아카이브</title>
                <meta name="description" content="대한민국 국가유산에 담긴 깊은 이야기를 만나보세요. 큐레이터가 들려주는 역사와 문화 이야기입니다." />
                <meta property="og:title" content="유산 이야기 | 담아" />
            </Helmet>

            <div className="archive-page">
                <div className="archive-hero-bar">
                    <div className="container">
                        <SectionHeader 
                            label="유산 이야기" 
                            title="전통의 숨결을 기록하다" 
                            desc="단순한 정보를 넘어, 우리 유산에 깃든 역사와 문화를 깊이 있게 탐구합니다." 
                        />
                    </div>
                </div>

                <div className="archive-body">
                    <div className="container">
                        <div className="blog-grid">
                            {BLOG_POSTS.map(post => (
                                <article key={post.id} className="blog-card">
                                    <Link to={`/blog/${post.slug}`} className="blog-card__image-link">
                                        <div className="blog-card__image-wrap">
                                            <img src={post.image} alt={post.title} />
                                            <span className="blog-card__category">{post.category}</span>
                                        </div>
                                    </Link>
                                    <div className="blog-card__body">
                                        <div className="blog-card__meta">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.author}</span>
                                        </div>
                                        <h2 className="blog-card__title">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h2>
                                        <p className="blog-card__excerpt">{post.excerpt}</p>
                                        <Link to={`/blog/${post.slug}`} className="blog-card__more">
                                            자세히 보기 →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
