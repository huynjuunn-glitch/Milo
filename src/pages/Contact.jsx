import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    function handleChange(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // In production, connect to a backend or formspree
        setSent(true);
    }

    return (
        <>
            <Helmet>
                <title>고객지원 - 담아 국가유산 디지털 아카이브</title>
                <meta name="description" content="담아 디지털 아카이브에 대한 문의 사항을 남겨주세요. 서비스 개선 요청이나 오류 신고는 고객지원 페이지를 통해 연락하세요." />
            </Helmet>

            <div className="info-page">
                <div className="info-page__hero">
                    <div className="container--narrow">
                        <div className="section-label">고객지원</div>
                        <h1 className="info-page__title">문의하기</h1>
                        <p className="info-page__subtitle">
                            서비스 이용 중 불편한 점이나 개선 제안이 있으시면 아래 양식을 통해 알려주세요.
                        </p>
                    </div>
                </div>

                <div className="info-page__body">
                    <div className="container--narrow">
                        {sent ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                                    문의가 접수되었습니다
                                </h2>
                                <p style={{ color: 'var(--color-text-muted)' }}>
                                    빠른 시일 내에 답변 드리겠습니다.
                                </p>
                            </div>
                        ) : (
                            <div className="contact-grid">
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
                                        연락처 안내
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {[
                                            { icon: '📧', label: '이메일', value: 'support@dama-archive.kr' },
                                            { icon: '📞', label: '전화', value: '02-0000-0000' },
                                            { icon: '🕐', label: '운영시간', value: '평일 09:00 - 18:00 (주말·공휴일 제외)' },
                                        ].map(c => (
                                            <div key={c.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                                                <span style={{ fontSize: '1.2rem' }}>{c.icon}</span>
                                                <div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>{c.label}</div>
                                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{c.value}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name">이름</label>
                                        <input id="name" name="name" required className="form-input" placeholder="홍길동" value={form.name} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">이메일</label>
                                        <input id="email" name="email" type="email" required className="form-input" placeholder="example@email.com" value={form.email} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="subject">제목</label>
                                        <input id="subject" name="subject" required className="form-input" placeholder="문의 제목을 입력해주세요" value={form.subject} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="message">내용</label>
                                        <textarea id="message" name="message" required className="form-textarea" placeholder="문의 내용을 자세히 작성해 주세요" value={form.message} onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                                        문의 제출하기
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
