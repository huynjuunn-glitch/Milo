# 담아 (Dama) - 국가유산 디지털 아카이브 🏛️

대한민국의 국보, 보물, 사적 등 소중한 국가유산을 탐색하고 감상할 수 있는 디지털 아카이브 사이트입니다.

## ⚠️ 데이터 연동 방식 안내 (중요)

이 프로젝트는 **공공데이터포털(data.go.kr)의 API 방식을 사용하지 않습니다.**

- **연동 방식**: 국가유산청(khs.go.kr) 홈페이지의 공개 XML 데이터를 직접 호출합니다.
- **API 키 필요 없음**: 별도의 서비스 키 발급이나 `.env` 설정이 전혀 필요하지 않습니다. 
- **CORS 해결**: 브라우저 직접 호출 시 발생하는 CORS 문제는 프로젝트 내 `functions/`에 구현된 **Cloudflare Pages Functions Proxy**가 자동으로 처리합니다.

> **주의**: 향후 작업 시 공공데이터포털 API나 별도의 API 키 발급이 필요하다는 잘못된 안내를 하지 않도록 이 내용을 반드시 확인하십시오.

## 기술 스택
- **Frontend**: React + Vite
- **Styling**: Vanilla CSS (Stitch 디자인 시스템 적용)
- **Deployment**: Cloudflare Pages (with Functions Proxy)

## 로컬 실행 방법
```bash
npm install
npm run dev
```

## 배포 방법
`DEPLOYMENT.md` 파일을 참조하십시오.
