import { Helmet } from 'react-helmet-async';
import { SectionHeader } from '../components';

export default function About() {
    return (
        <>
            <Helmet>
                <title>아카이브 소개 | 담아(Dama)</title>
                <meta name="description" content="담아(Dama)는 국가유산청 공공데이터를 기반으로 대한민국의 소중한 문화유산을 디지털로 기록하고 보존하는 플랫폼입니다. 우리의 사명과 서비스를 확인하세요." />
                <meta property="og:title" content="아카이브 소개 | 담아" />
            </Helmet>

            <div className="info-page">
                <div className="info-page__hero">
                    <div className="container--narrow">
                        <div className="section-label">소개</div>
                        <h1 className="info-page__title">담아(Dama) 디지털 아카이브</h1>
                        <p className="info-page__subtitle">
                            대한민국의 국보급 문화유산을 고해상도 디지털 아카이브로 보존하고 공유합니다.
                            국가유산청 공식 데이터베이스와 연동하여 신뢰할 수 있는 정보를 제공합니다.
                        </p>
                    </div>
                </div>

                <div className="info-page__body">
                    <div className="container--narrow prose">
                        <h2>우리의 사명</h2>
                        <p>
                            담아(Dama)는 대한민국의 소중한 문화유산을 디지털 혁신을 통해 보존하고,
                            누구나 쉽게 접근할 수 있는 열린 아카이브를 구축하는 것을 사명으로 합니다.
                            수천 년에 걸쳐 쌓인 한국의 역사와 문화는 우리 모두의 공동 유산이며, 이를 기록하고 공유하는 것은 미래 세대를 위한 우리의 책임입니다.
                        </p>
                        <p>
                            우리는 단순한 정보 전달을 넘어, 각 유산이 지닌 역사적 맥락과 예술적 가치를 깊이 있게 탐구합니다.
                            국가유산청이 공개한 공식 Open API를 통해 국보, 보물, 사적, 명승,
                            천연기념물을 포함한 모든 유형의 국가유산 데이터를 실시간으로 제공하며, 이를 통해 사용자들에게 가장 정확하고 신뢰할 수 있는 정보를 전달합니다.
                        </p>

                        <h2>제공 서비스</h2>
                        <ul>
                            <li>국가유산청 공식 데이터에 기반한 유산 정보 검색 및 열람</li>
                            <li>지역별·종류별 필터링을 통한 정밀한 유산 탐색</li>
                            <li>고해상도 이미지 갤러리 및 상세 설명 제공</li>
                            <li>국가유산청 포털 연동을 통한 심층 정보 접근</li>
                        </ul>

                        <h2>데이터 출처</h2>
                        <p>
                            본 서비스에서 제공하는 모든 국가유산 데이터는
                            <strong>국가유산청(Korea Heritage Service)</strong> 공개 API를 통해 제공됩니다.
                            데이터의 정확성 및 최신성은 국가유산청 공식 데이터베이스를 따릅니다.
                        </p>

                        <h2>문의</h2>
                        <p>
                            서비스 이용 중 문의 사항은 <a href="/contact" style={{ color: 'var(--color-primary)' }}>고객지원 페이지</a>를 통해 연락해 주세요.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
