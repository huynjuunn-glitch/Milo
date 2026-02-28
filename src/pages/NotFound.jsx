import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>404 - 페이지를 찾을 수 없습니다 | Milo</title>
            </Helmet>
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                textAlign: 'center',
                padding: '0 2rem',
                paddingTop: '68px',
            }}>
                <div style={{ fontSize: '4rem' }}>🏛</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '6rem', fontWeight: 300, color: 'var(--color-border-light)', lineHeight: 1 }}>
                    404
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-text-primary)' }}>
                    페이지를 찾을 수 없습니다
                </h1>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px' }}>
                    요청하신 페이지가 존재하지 않거나 이동되었습니다.
                </p>
                <Link to="/" className="btn-primary">홈으로 돌아가기</Link>
            </div>
        </>
    );
}
