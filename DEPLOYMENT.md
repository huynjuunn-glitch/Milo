# Deployment Guide for 담아 (Dama)

이 프로젝트는 **Cloudflare Pages**를 사용하여 배포하도록 최적화되어 있습니다.

## 배포 설정 요약
- **Framework Preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version**: 18 이상 권장

## ⚠️ 환경 변수 설정 불필요
이 프로젝트는 국가유산청 홈페이지 데이터를 직접 호출하므로, **공공데이터포털 API 키(VITE_HERITAGE_API_KEY)를 설정할 필요가 없습니다.** 대시보드의 Environment Variables 설정을 비워두셔도 정상 작동합니다.

## 배포 단계
1. 현재 소스코드를 GitHub 저장소에 푸시합니다.
2. [Cloudflare Pages](https://pages.cloudflare.com/) 대시보드에 접속합니다.
3. **Create a project** -> **Connect to Git**을 선택합니다.
4. 해당 GitHub 저장소를 연결합니다.
5. 위에서 설명한 빌드 명령(`npm run build`)과 출력 디렉토리(`dist`)를 확인합니다.
6. **Save and Deploy**를 클릭하여 배포를 완료합니다.

## CORS 프록시
배포 시 `functions/` 폴더 내의 프록시 로직이 Cloudflare Pages Functions로 자동 배포되어, 국가유산청 데이터 호출 시 발생하는 CORS 문제를 자동으로 해결합니다.
