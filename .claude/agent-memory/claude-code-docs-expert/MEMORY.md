# Claude Code 문서 전문가 메모리

## 핵심 문서 URL 구조
- 공식 문서 기본 URL: https://code.claude.com/docs/en/ (anthropic URL에서 리디렉트됨)
- 전체 문서 인덱스: https://code.claude.com/docs/llms.txt

## 주요 기능 문서 경로
- 에이전트 팀: /en/agent-teams
- 서브에이전트: /en/sub-agents
- 공통 워크플로우: /en/common-workflows
- 설정: /en/settings
- Hooks: /en/hooks
- MCP: /en/mcp
- Skills: /en/skills
- 비용: /en/costs

## 에이전트 팀 핵심 정보 (2026-03 기준)
- 실험적 기능, 기본 비활성화 상태
- 활성화: settings.json에 CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 설정 필요
- 서브에이전트와의 차이: 팀메이트끼리 직접 메시지 가능, 공유 태스크 리스트 사용
- 3-5명 팀메이트가 대부분 워크플로우에 적합
- 토큰 비용이 단일 세션 대비 현저히 높음
- Git worktree와 조합하면 파일 충돌 방지 가능

## 서브에이전트 핵심 정보
- 안정적 기능 (정식 지원)
- 서브에이전트는 다른 서브에이전트를 스폰할 수 없음
- 내장 서브에이전트: Explore(Haiku), Plan(읽기 전용), General-purpose
- 파일 위치: .claude/agents/ (프로젝트), ~/.claude/agents/ (사용자)
- /agents 명령어로 관리

## 자주 묻는 패턴
- 에이전트 팀 vs 서브에이전트 선택 기준: 팀메이트 간 소통 필요 여부
- 웹앱 개발 병렬화: 프론트엔드/백엔드/테스트 팀메이트 분리
