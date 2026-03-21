# 새로운마케팅 Phase 2 업그레이드 플랜

## 현황 요약 (Phase 0 탐색 결과)

- **스택**: Next.js 16.1.6 (App Router), React 19, Tailwind CSS 4, TypeScript strict
- **구조**: 단일 LP + thank-you 페이지
- **MDX**: 미설치 (next-mdx-remote, gray-matter 없음)
- **배포**: Vercel 추정 (next.config.ts에 www 리다이렉트만 존재)
- **GA4**: G-BXZJX18Q1M 연동됨
- **이메일**: EmailJS (@emailjs/browser) 연동됨

---

## Phase 1: MDX 블로그 시스템 (오가닉 SEO)

### 목표
`/blog` 경로에 동물병원 마케팅 키워드를 타겟한 블로그 시스템 구축.
오가닉 유입 → 랜딩 페이지 전환 파이프라인.

### 패키지 설치

```bash
npm install next-mdx-remote gray-matter
npm install @types/mdx --save-dev
```

### 생성할 파일

#### 1. 콘텐츠 디렉토리: `content/blog/`

**포스트 1** `content/blog/agency-burning-your-money.mdx`
- slug: `agency-burning-your-money`
- title: `마케팅 대행사가 당신 병원을 망치고 있습니다`
- description: `수의학을 모르는 마케터가 쓴 블로그가 오히려 신뢰를 깎는 이유`
- keywords: 동물병원 마케팅, 동물병원 마케팅 대행사
- 어그로 카피 포인트: "수의학 모르는 마케터가 쓴 블로그 = 잘못된 정보 → 보호자 신뢰 하락 → 오히려 역효과"

**포스트 2** `content/blog/100-blogs-no-reservations.mdx`
- slug: `100-blogs-no-reservations`
- title: `블로그 100개 써도 예약이 안 차는 이유`
- description: `네이버 블로그 발행량보다 중요한 것: 콘텐츠의 전문성`
- keywords: 동물병원 블로그, 네이버 블로그 동물병원
- 어그로 카피 포인트: "발행량 ≠ 예약. 전문성 없는 콘텐츠는 구글/네이버가 신뢰 안 함"

**포스트 3** `content/blog/naver-place-trap.mdx`
- slug: `naver-place-trap`
- title: `네이버 플레이스 상위노출에 속지 마세요`
- description: `플레이스 1위도 전환이 안 되는 진짜 이유와 해결책`
- keywords: 네이버 플레이스 동물병원, 동물병원 플레이스 최적화
- 어그로 카피 포인트: "플레이스 1위 = 예약 보장 아님. 리뷰 질 + 상세설명 신뢰도가 전환 결정"

#### 2. 유틸리티: `src/lib/blog.ts`

```typescript
// gray-matter로 MDX 파일 파싱
// getAllPosts(): BlogPost[] 반환
// getPostBySlug(slug: string): BlogPost 반환
// BlogPost 타입: { slug, title, description, date, keywords, content }
```

#### 3. 블로그 목록 페이지: `src/app/blog/page.tsx`

```
레이아웃:
- 상단 헤드라인: "동물병원 원장님을 위한 마케팅 인사이트"
- 포스트 카드 리스트 (3열 그리드, 모바일 1열)
  - 제목, 설명, 날짜, 읽기 버튼
- 우측 사이드바 CTA: "무료 브랜딩 진단 신청하기"
  (모바일에서는 하단 배너로)
- SEO: generateMetadata() 구현
```

#### 4. 포스트 상세 페이지: `src/app/blog/[slug]/page.tsx`

```
레이아웃:
- 포스트 헤더 (제목, 날짜, 설명)
- MDX 렌더링 영역 (산문 스타일 타이포그래피)
- 중간 삽입 CTA 배너: "이 글이 도움됐다면, 무료 브랜딩 진단을 받아보세요"
- 하단 관련 포스트 링크 2개
- generateStaticParams() + generateMetadata() 구현
```

#### 5. 블로그 CTA 컴포넌트: `src/components/BlogCTA.tsx`

```
- 다크 배경 배너형
- "수의사가 직접 진단합니다 — 무료 브랜딩 진단 신청"
- 버튼 → Contact 섹션 또는 직접 카카오 채널 링크
```

### Metadata 전략 (각 포스트)

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  // title: `${post.title} | 새로운마케팅`
  // description: post.description
  // keywords: post.keywords
  // openGraph 포함
}
```

### 완료 기준

- [ ] `/blog` 접속 시 포스트 목록 렌더링
- [ ] `/blog/[slug]` 접속 시 MDX 내용 렌더링
- [ ] `next build` 통과 (generateStaticParams로 정적 생성)
- [ ] 각 포스트 페이지 OG 메타데이터 확인
- [ ] 모바일 반응형 확인

---

## Phase 2: CVR 향상

### 목표
현재 페이지의 전환율 직접 개선. 4가지 변경사항.

### 변경사항 1: 희소성 배너 컴포넌트

**파일**: `src/components/ScarcityBanner.tsx`

```
위치: Hero 섹션 바로 아래 (Story 위)
디자인: 얇은 가로 배너, bg-amber-500/10 border-amber-500/30
텍스트: "이번 달 신규 계약은 2자리만 남았습니다"
서브: "3월 기준 | 매월 선착순 마감"
```

**page.tsx 수정**: Hero 와 Story 사이에 `<ScarcityBanner />` 삽입

### 변경사항 2: Results 섹션 케이스 추가 + 수치 구체화

**파일**: `src/components/Results.tsx` 수정

현재 문제:
- `value: "증가"` — 구체적 수치 없음 → 신뢰도 하락
- 케이스 1개만 존재

개선:
```typescript
// 기존 케이스 수치 구체화
{ value: "+50%", label: "3개월 매출 성장" }
{ value: "+100%", label: "플레이스 노출 증가" }
{ value: "+40%", label: "소개·입소문 내원" }  // "증가" → 수치
{ value: "+60%", label: "블로그 기반 내원" }  // "증가" → 수치

// 케이스 2 추가: 일반 내과 동물병원
// "B 동물병원" — 블로그 콘텐츠 전략으로 지역 내 브랜드 구축
// 전략: 질환별 교육 콘텐츠 + 원장님 스토리 콘텐츠
// 성과: 블로그 내원 월 N건, 플레이스 리뷰 증가
```

### 변경사항 3: Services 섹션 가격 힌트

**파일**: `src/components/Services.tsx` 수정

현재: "상세한 서비스 구성 및 비용은 미팅을 통해 맞춤 안내드립니다"

개선:
```
가격 힌트 추가: "월 90만원~부터 시작합니다"
(구체적 패키지 가격은 미팅에서 → 하지만 최저가 힌트는 공개)
이유: 가격 검색("동물병원 마케팅 비용") 유입 전환
```

### 변경사항 4: FloatingCTA 카카오 버튼 추가

**파일**: `src/components/FloatingCTA.tsx` 수정

현재: 단일 "무료 진단 신청" 버튼

개선:
```
2개 버튼 세로 스택:
1. 카카오 채널 채팅 (bg-yellow-400, 카카오 아이콘 텍스트)
   → href="http://pf.kakao.com/_NVttn/chat"
2. 무료 진단 신청 (bg-blue-500, 기존)
   → scrollToContact()

카카오 버튼: 더 즉각적인 문의 경로 제공
(폼 작성 부담 없는 채팅 CTA)
```

### 완료 기준

- [ ] 희소성 배너가 Hero 아래 표시됨
- [ ] Results 수치가 모두 구체적 숫자로 표시됨
- [ ] Results에 케이스 2개 표시됨
- [ ] Services 섹션에 "월 90만원~" 가격 힌트 표시됨
- [ ] FloatingCTA에 카카오 + 진단신청 2개 버튼 표시됨
- [ ] `next build` 통과

---

## Phase 3: 카피 보완 (현재 페이지)

### 목표
현재 카피를 유지하되, 어그로가 약하거나 기회를 놓친 부분만 핀포인트 수정.

### 수정 1: Hero 서브텍스트 강화

현재:
```
"수의사가 직접 운영하는 마케팅 에이전시는 단어 하나부터 다릅니다."
```

개선 방향:
```
"전국에 동물병원 마케팅 대행사는 수백 곳.
수의사 면허를 가진 곳은 단 하나입니다."
```

이유: USP를 더 강하게 — "유일한"이라는 희소성 직접 언급

### 수정 2: Problem 섹션 헤드라인

현재:
```
"일반 마케팅 에이전시의 치명적 한계"
```

개선 방향:
```
"지금 당신이 쓰는 마케팅 대행사, 괜찮은 거 맞나요?"
```

이유: 독자에게 직접 질문 → 불편함 유발 → 더 읽게 만듦

### 수정 3: Solution 섹션 헤드라인

현재:
```
"수의사만이 가능한 마케팅"
```

개선 방향:
```
"수의학을 모르면, 마케팅도 없습니다"
```

이유: 역설적 주장 구조 — 이상한마케팅 스타일의 단호한 선언

### 수정 4: Story 인용구 강화

현재:
```
"전문성을 키우고 알리는 것. 이것이 유일한 생존 전략입니다."
```

현재도 나쁘지 않음 → 유지. 단 서브텍스트 "왜 수의사가 마케팅을 하나요?" 를:
```
"수의사가 왜 마케팅을 하냐고요?"
```
구어체로 바꿔서 더 자연스럽고 도발적으로.

### 완료 기준

- [ ] Hero 서브텍스트 수정 확인
- [ ] Problem 헤드라인 수정 확인
- [ ] Solution 헤드라인 수정 확인
- [ ] Story 서브텍스트 수정 확인
- [ ] 전체 흐름 자연스러운지 검토
- [ ] `next build` 통과

---

## 실행 순서 권장

```
Phase 3 (카피 — 빠름, 10분)
  → Phase 2 (CVR — 중간, 30분)
  → Phase 1 (블로그 — 오래 걸림, 2시간+)
```

Phase 3은 기존 파일만 수정, Phase 1은 패키지 설치 필요.

## 최종 검증

```bash
npm run build  # 타입 에러 + 빌드 에러 없어야 함
```

빌드 통과 후 배포.
