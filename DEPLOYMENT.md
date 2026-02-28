# Deployment Guide for Milo

## Cloudflare Pages

Build command: `npm run build`
Build output directory: `dist`
Node.js version: 18+

## Environment Variables

Set the following environment variables in Cloudflare Pages dashboard:

| Variable | Description |
|--------|-------------|
| `VITE_HERITAGE_API_KEY` | 국가유산청 open API service key (from data.go.kr) |

## How to Deploy

1. Push this repository to GitHub
2. Connect the GitHub repo to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_HERITAGE_API_KEY`
6. Deploy

## Getting the API Key

1. Visit https://www.data.go.kr
2. Search for "국가유산청 국가유산 정보 서비스"
3. Apply for API access
4. After approval, copy the service key
5. Add to Cloudflare Pages environment variables as `VITE_HERITAGE_API_KEY`
