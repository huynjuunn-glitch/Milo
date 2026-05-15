import { Helmet } from 'react-helmet-async';

export default function Terms() {
    return (
        <>
            <Helmet>
                <title>이용약관 - 담아</title>
                <meta name="description" content="담아 디지털 아카이브 이용약관입니다." />
            </Helmet>
            <div className="info-page">
                <div className="info-page__hero">
                    <div className="container--narrow">
                        <div className="section-label">법적</div>
                        <h1 className="info-page__title">이용약관</h1>
                        <p className="info-page__subtitle">최종 업데이트: 2026년 5월 15일</p>
                    </div>
                </div>
                <div className="info-page__body">
                    <div className="container--narrow prose">
                        <h2>제1조 (목적)</h2>
                        <p>이 약관은 담아 디지털 아카이브(이하 "서비스")의 이용과 관련하여 서비스를 제공하는 담아(이하 "회사")와 이를 이용하는 이용자(이하 "이용자") 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>

                        <h2>제2조 (정의)</h2>
                        <ul>
                            <li>"서비스"란 회사가 제공하는 국가유산 디지털 아카이브 플랫폼을 의미합니다.</li>
                            <li>"이용자"란 본 약관에 따라 서비스를 이용하는 모든 사람을 의미합니다.</li>
                            <li>"콘텐츠"란 서비스 내에서 제공되는 국가유산 정보, 이미지 등 일체를 의미합니다.</li>
                        </ul>

                        <h2>제3조 (서비스 내용)</h2>
                        <p>서비스는 국가유산청 공개 API를 통해 대한민국 국가유산 정보를 제공합니다. 콘텐츠의 정확성 및 최신성은 국가유산청 공식 데이터를 따르며, 회사는 데이터 오류에 대한 책임을 지지 않습니다.</p>

                        <h2>제4조 (저작권)</h2>
                        <p>서비스 내 국가유산 이미지 및 데이터의 저작권은 국가유산청에 귀속됩니다. 무단 복제 및 상업적 이용을 금합니다.</p>

                        <h2>제5조 (면책사항)</h2>
                        <p>회사는 이용자가 서비스를 이용하여 얻은 정보로 인하여 발생한 손해에 대해 책임을 지지 않습니다.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
