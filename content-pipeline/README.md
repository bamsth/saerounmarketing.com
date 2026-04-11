# 콘텐츠 파이프라인

새로운마케팅 자동 콘텐츠 생성 시스템.

## 구조

- `prompts/question-generator.md` — /schedule 태스크 #1 프롬프트 (주 2회, 질문 생성)
- `prompts/content-generator.md` — /schedule 태스크 #2 프롬프트 (매일, 콘텐츠 생성+평가)
- `config.json` — Notion DB ID 등 설정값

## 워크플로우

1. /schedule이 question-generator 실행 → Notion에 질문 저장
2. 사용자가 Notion 모바일에서 답변 작성
3. /schedule이 content-generator 실행 → 답변 읽기 → 초안 생성 → 평가 → Notion 저장
4. 사용자가 Notion에서 초안 확인 후 발행

## /schedule 등록 명령어

```bash
# 질문 생성 (월/목 오전 9시)
/schedule "$(cat /Users/gimbeomsu/projects/saerounmarketing/content-pipeline/prompts/question-generator.md)" --cron "0 9 * * 1,4"

# 콘텐츠 생성 (매일 오전 10시)
/schedule "$(cat /Users/gimbeomsu/projects/saerounmarketing/content-pipeline/prompts/content-generator.md)" --cron "0 10 * * *"
```
