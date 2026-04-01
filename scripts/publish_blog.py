"""
네이버 블로그 자동 발행 스크립트
사용법: python3 scripts/publish_blog.py blog-drafts/01-플레이스-최적화.md [이미지폴더경로]

- blog-drafts/ 의 마크다운 파일을 읽어서 네이버 블로그에 자동으로 올려줌
- 제목: 파일 첫 줄 (# 제목)
- 본문: ## 소제목 → 인용구 블록, **볼드** 지원
- 이미지: 두 번째 인자로 폴더 경로 지정 (jpg/png 파일 전부 슬라이드로 삽입)
- 발행 버튼은 직접 누름 (에디터 열어두고 대기)
"""

import asyncio
import json
import re
import sys
from pathlib import Path

NAVER_ID = "saerounmarketing"
NAVER_PW = ""  # 여기 비번 입력 또는 브라우저 프로필로 로그인 유지

BASE_DIR = Path(__file__).resolve().parent.parent
PROFILE_DIR = BASE_DIR / "scripts" / "browser_profile"


def parse_markdown(md_text: str) -> dict:
    """마크다운 파싱 → title, lines, tags"""
    lines = md_text.strip().split("\n")
    title = ""
    body_lines = []

    for line in lines:
        if not title and line.startswith("# "):
            title = line[2:].strip()
            continue
        # 구분선 제거
        if re.match(r'^-{3,}$', line.strip()):
            continue
        body_lines.append(line)

    # **볼드** → @@볼드@@ 변환 (기존 프로젝트와 동일한 방식)
    content = "\n".join(body_lines)
    content = re.sub(r'\*\*(.+?)\*\*', r'@@\1@@', content, flags=re.DOTALL)
    content = content.replace('**', '')
    content = re.sub(r'@@(.+?)@@', lambda m: '@@' + m.group(1).replace('\n', ' ') + '@@', content, flags=re.DOTALL)

    # 태그: 제목에서 키워드 추출 (간단하게)
    tags = []
    if title:
        words = re.findall(r'동물병원[^\s,]+|[가-힣]{2,4}(?:마케팅|홍보|광고|블로그|플레이스|인스타)', title)
        tags = list(dict.fromkeys(words))[:5]
        if "동물병원" not in " ".join(tags):
            tags.insert(0, "동물병원 마케팅")

    return {"title": title, "content": content, "tags": tags}


async def publish(md_path: str, image_folder: str = None):
    from playwright.async_api import async_playwright

    parsed = parse_markdown(Path(md_path).read_text(encoding="utf-8"))
    title = parsed["title"]
    content = parsed["content"]
    tags = parsed["tags"]

    image_paths = []
    if image_folder:
        folder = Path(image_folder)
        if folder.exists():
            image_paths = sorted([
                str(p.resolve()) for p in folder.iterdir()
                if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
            ])
            print(f"[이미지] {len(image_paths)}장 발견: {[Path(p).name for p in image_paths]}")

    print(f"[발행 준비] 제목: {title}")
    print(f"[발행 준비] 태그: {tags}")

    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    # 브라우저 락 파일 제거
    for lock in PROFILE_DIR.glob("*.lock"):
        lock.unlink(missing_ok=True)
    for lock in PROFILE_DIR.glob("SingletonLock"):
        lock.unlink(missing_ok=True)

    async with async_playwright() as p:
        try:
            context = await p.chromium.launch_persistent_context(
                str(PROFILE_DIR),
                headless=False,
                locale="ko-KR",
                timezone_id="Asia/Seoul",
                args=[
                    "--disable-blink-features=AutomationControlled",
                    "--no-sandbox",
                    "--start-maximized",
                ],
            )
        except Exception as e:
            print(f"[오류] 브라우저 실행 실패: {e}")
            return

        page = await context.new_page()

        def _auto_accept_dialog(d):
            asyncio.ensure_future(d.accept())
        page.on("dialog", _auto_accept_dialog)

        # 1. 네이버 블로그 글쓰기 페이지 이동
        write_url = f"https://blog.naver.com/{NAVER_ID}/postwrite"
        print(f"[이동] {write_url}")
        await page.goto(write_url, wait_until="domcontentloaded", timeout=40000)
        await page.wait_for_timeout(5000)

        # 2. 로그인 필요 시 대기
        if "nid.naver.com" in page.url or "login" in page.url.lower():
            if NAVER_PW:
                # 자동 로그인 시도
                try:
                    await page.fill('#id', NAVER_ID)
                    await page.fill('#pw', NAVER_PW)
                    await page.click('.btn_login')
                    await page.wait_for_timeout(3000)
                    await page.goto(write_url, wait_until="domcontentloaded", timeout=40000)
                    await page.wait_for_timeout(5000)
                except Exception as e:
                    print(f"[로그인] 자동 로그인 실패: {e}")

            if "nid.naver.com" in page.url or "login" in page.url.lower():
                print("[로그인] 직접 로그인해주세요. 2분 대기 중...")
                try:
                    await page.wait_for_url(f"**/{NAVER_ID}**", timeout=120000)
                    await page.goto(write_url, wait_until="domcontentloaded", timeout=40000)
                    await page.wait_for_timeout(5000)
                except Exception:
                    print("[오류] 로그인 대기 초과")
                    return

        # 3. 임시저장 팝업 처리 (취소 = 새 글 시작)
        try:
            for sel in ['button.se-popup-button-cancel', 'button[data-value="cancel"]', '.se-popup button:first-child']:
                btn = page.locator(sel).first
                if await btn.count() > 0 and await btn.is_visible():
                    await btn.click()
                    await page.wait_for_timeout(1000)
                    print("[팝업] 임시저장 초안 취소 → 새 글 시작")
                    break
        except Exception:
            pass

        page.remove_listener("dialog", _auto_accept_dialog)

        # 4. 에디터 로딩 대기
        for sel in ['.se-main-container', '.se-content', 'div[contenteditable="true"]']:
            try:
                await page.wait_for_selector(sel, timeout=15000)
                print(f"[에디터] 로딩 확인: {sel}")
                break
            except Exception:
                pass

        target = page
        for frame in page.frames:
            if any(k in frame.url.lower() for k in ["smarteditor", "editor", "postwrite"]):
                target = frame
                break

        # 5. 가운데 정렬 적용
        async def apply_center_align():
            for sel in ['button[data-name="align-drop-down-with-justify"]', 'button[data-name="align"]', 'button.se-toolbar-button-align']:
                btn = await target.query_selector(sel)
                if btn:
                    await btn.click()
                    await page.wait_for_timeout(500)
                    for csel in ['button[data-value="center"]', 'button[data-align="center"]', 'li[data-value="center"] button']:
                        cb = await target.query_selector(csel)
                        if cb:
                            await cb.click()
                            await page.wait_for_timeout(300)
                            return
            await page.keyboard.press("Meta+e")
            await page.wait_for_timeout(200)

        # 6. 제목 입력
        if title:
            print(f"[제목] 입력 중: {title}")
            for sel in [
                '.se-title-text p[contenteditable="true"]',
                '.se-title-text .se-text-paragraph',
                '.se-title-text',
            ]:
                el = await target.query_selector(sel)
                if el:
                    await el.click()
                    await page.wait_for_timeout(500)
                    await page.evaluate(f"navigator.clipboard.writeText({json.dumps(title)})")
                    await page.keyboard.press("Meta+v")
                    await page.wait_for_timeout(500)
                    print(f"[제목] 입력 완료")
                    break
            await page.keyboard.press("End")
            await page.wait_for_timeout(300)
            await page.keyboard.press("Tab")
            await page.wait_for_timeout(700)

        # 7. 본문 클릭 및 가운데 정렬
        for sel in ['.se-component.se-text .se-text-paragraph', '.se-content .se-canvas', '.se-content']:
            el = await target.query_selector(sel)
            if el:
                box = await el.bounding_box()
                if box and box['width'] > 0:
                    await page.mouse.click(box['x'] + 10, box['y'] + min(20, box['height'] / 2))
                    await page.wait_for_timeout(500)
                    break

        await apply_center_align()

        # 8. 볼드 타이핑 함수
        async def type_with_bold(line: str):
            pattern = r'@@(.+?)@@'
            last_end = 0
            for match in re.finditer(pattern, line):
                if match.start() > last_end:
                    await page.keyboard.type(line[last_end:match.start()], delay=10)
                await page.keyboard.press("Meta+b")
                await page.wait_for_timeout(80)
                await page.keyboard.type(match.group(1), delay=10)
                await page.keyboard.press("Meta+b")
                await page.wait_for_timeout(80)
                last_end = match.end()
            if last_end < len(line):
                await page.keyboard.type(line[last_end:], delay=10)

        # 9. 인용구 블록 (## 소제목)
        async def insert_quote(text: str):
            quote_btn = None
            for sel in [
                'button.se-insert-quotation-default-toolbar-button',
                'li.se-toolbar-item-quotation button[data-type="icon-select"]',
                'button[data-name="quotation"][data-type="icon-select"]',
            ]:
                quote_btn = await target.query_selector(sel)
                if quote_btn:
                    break

            if quote_btn:
                await quote_btn.click()
                await page.wait_for_timeout(800)
                # 두 번째 스타일 (버티컬 라인)
                for sel in [
                    'li.se-popup-quotation-style-item:nth-child(2) button',
                    '.se-popup-content li:nth-child(2) button',
                    '.se-popup-content li:nth-child(2) input',
                ]:
                    sb = await target.query_selector(sel)
                    if sb:
                        await sb.click()
                        await page.wait_for_timeout(500)
                        break
                clean = re.sub(r'@@(.+?)@@', r'\1', text).replace('**', '')
                await page.keyboard.type(clean, delay=20)
                await page.wait_for_timeout(300)
                # 인용구 탈출
                try:
                    comps = await target.query_selector_all('div.se-component.se-quotation')
                    if comps:
                        box = await comps[-1].bounding_box()
                        if box:
                            await page.mouse.click(box['x'] + box['width'] / 2, box['y'] + box['height'] + 20)
                            await page.wait_for_timeout(500)
                except Exception:
                    for _ in range(3):
                        await page.keyboard.press("Enter")
                        await page.wait_for_timeout(200)
            else:
                await page.keyboard.type(f"[ {text} ]", delay=20)
                await page.keyboard.press("Enter")

        # 10. 섹션 파싱 및 타이핑
        lines = content.split("\n")
        sections = []
        current = None
        for line in lines:
            if line.startswith("## "):
                if current:
                    sections.append(current)
                current = {"type": "heading", "title": line[3:].strip(), "body": ""}
            else:
                if current is not None:
                    current["body"] += line + "\n"
                elif line.strip():
                    current = {"type": "body", "title": "", "body": line + "\n"}
        if current:
            sections.append(current)

        print(f"[본문] {len(sections)}개 섹션 입력 시작...")
        for i, section in enumerate(sections):
            body = section.get("body", "").strip()
            if section.get("title"):
                await insert_quote(section["title"])
                await page.wait_for_timeout(500)
                await apply_center_align()
            if body:
                for b_idx, b_line in enumerate(body.split("\n")):
                    if b_line:
                        await type_with_bold(b_line)
                    if b_idx < len(body.split("\n")) - 1:
                        await page.keyboard.press("Enter")
                        await page.wait_for_timeout(50)
                await page.keyboard.press("Enter")
                await page.wait_for_timeout(100)
                await page.keyboard.press("Enter")
                await page.wait_for_timeout(200)

        # 11. 이미지 슬라이드 삽입
        if image_paths:
            print(f"[이미지] {len(image_paths)}장 슬라이드 삽입 중...")
            try:
                async with page.expect_file_chooser(timeout=8000) as fc_info:
                    await target.click('button[data-name="image"]')
                fc = await fc_info.value
                await fc.set_files(image_paths)
                await page.wait_for_timeout(2500)
                # 슬라이드 레이아웃 선택
                items = await page.query_selector_all('li.se-image-type-item')
                for item in items:
                    txt = await item.inner_text()
                    if '슬라이드' in txt:
                        radio = await item.query_selector('input.se-image-type-radio')
                        if radio:
                            await radio.click()
                            await page.wait_for_timeout(1000)
                            print("[이미지] 슬라이드 레이아웃 선택 완료")
                            break
            except Exception as e:
                print(f"[이미지] 삽입 오류: {e}")

        # 12. 임시저장
        await page.wait_for_timeout(1000)
        for sel in ['button[data-name="save"]', 'button:has-text("임시저장")', 'button[title="임시저장"]']:
            try:
                btn = page.locator(sel).first
                if await btn.count() > 0 and await btn.is_visible():
                    await btn.click()
                    await page.wait_for_timeout(1500)
                    print("[저장] 임시저장 완료")
                    break
            except Exception:
                pass
        else:
            await page.keyboard.press("Meta+s")
            await page.wait_for_timeout(1500)

        # 13. 태그 입력
        if tags:
            print(f"[태그] {tags} 입력 중...")
            for tsel in ['input.se-tag-text', 'input[placeholder*="태그"]', '.se-tag-area input']:
                el = await page.query_selector(tsel)
                if el and await el.is_visible():
                    for tag in tags:
                        await el.click()
                        await page.wait_for_timeout(200)
                        await page.evaluate(f"navigator.clipboard.writeText({json.dumps(tag)})")
                        await page.keyboard.press("Meta+v")
                        await page.wait_for_timeout(200)
                        await page.keyboard.press("Enter")
                        await page.wait_for_timeout(300)
                    print(f"[태그] {len(tags)}개 입력 완료")
                    break

        print("\n✅ 초안 삽입 완료! 브라우저에서 확인 후 직접 [발행] 버튼 누르세요.")
        print("   (브라우저 창 닫으면 스크립트 종료됩니다)")

        # 브라우저 열어두고 대기
        try:
            await page.wait_for_event("close", timeout=0)
        except Exception:
            pass


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("사용법: python3 scripts/publish_blog.py blog-drafts/01-플레이스-최적화.md [이미지폴더]")
        sys.exit(1)

    md_file = sys.argv[1]
    img_folder = sys.argv[2] if len(sys.argv) > 2 else None

    if not Path(md_file).exists():
        print(f"파일 없음: {md_file}")
        sys.exit(1)

    asyncio.run(publish(md_file, img_folder))
