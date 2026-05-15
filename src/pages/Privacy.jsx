import { Helmet } from 'react-helmet-async';

export default function Privacy() {
    return (
        <>
            <Helmet>
                <title>개인정보처리방침 - 담아</title>
                <meta name="description" content="담아 디지털 아카이브 개인정보처리방침입니다." />
            </Helmet>
            <div className="info-page">
                <div className="info-page__hero">
                    <div className="container--narrow">
                        <div className="section-label">법적</div>
                        <h1 className="info-page__title">개인정보처리방침</h1>
                        <p className="info-page__subtitle">최종 업데이트: 2024년 1월 1일</p>
                    </div>
                </div>
                <div className="info-page__body">
                    <div className="container--narrow prose">
                        <h2>제1조 (개인정보의 수집 및 이용 목적)</h2>
                        <p>담아 디지털 아카이브는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                        <ul>
                            <li>고객 문의 처리 및 응대: 이용자의 문의 사항 확인, 사실조사를 위한 연락·통지, 처리 결과 통보 등의 목적</li>
                            <li>서비스 개선 및 통계 분석: 이용자의 서비스 이용 기록, 접속 빈도 분석 등을 통한 서비스 최적화 및 맞춤형 콘텐츠 제공</li>
                        </ul>

                        <h2>제2조 (개인정보의 보유 및 이용기간)</h2>
                        <p>담아는 개인정보 수집·이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계 법령에서 정한 일정한 기간 동안 개인정보를 보관합니다.</p>
                        <ul>
                            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li>웹사이트 방문 기록: 3개월 (통신비밀보호법)</li>
                        </ul>

                        <h2>제3조 (개인정보의 제3자 제공)</h2>
                        <p>담아는 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한 범위 내에서 처리하며, 정보주체의 사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 다만, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>

                        <h2>제4조 (문의)</h2>
                        <p>개인정보처리방침에 관한 문의는 <a href="/contact" style={{ color: 'var(--color-primary)' }}>고객지원 페이지</a>로 연락 주시기 바랍니다.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
