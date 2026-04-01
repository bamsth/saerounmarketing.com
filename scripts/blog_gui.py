"""
새로운마케팅 블로그 관리 GUI
실행: python3 scripts/blog_gui.py
접속: http://localhost:5050
"""
import asyncio
import json
import os
import subprocess
import sys
import threading
from pathlib import Path

from flask import Flask, jsonify, render_template_string, request

BASE_DIR = Path(__file__).resolve().parent.parent
DRAFTS_DIR = BASE_DIR / "blog-drafts"
PUBLISH_SCRIPT = BASE_DIR / "scripts" / "publish_blog.py"

app = Flask(__name__)

HTML = """
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>새로운마케팅 블로그 관리</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Apple SD Gothic Neo', sans-serif; background: #0f0f0f; color: #e0e0e0; min-height: 100vh; }

  .header { background: #1a1a1a; border-bottom: 1px solid #2a2a2a; padding: 16px 24px; display: flex; align-items: center; gap: 12px; }
  .header h1 { font-size: 18px; font-weight: 600; color: #fff; }
  .header .badge { background: #22c55e22; color: #22c55e; border: 1px solid #22c55e44; border-radius: 6px; padding: 2px 10px; font-size: 12px; }

  .layout { display: grid; grid-template-columns: 320px 1fr; height: calc(100vh - 57px); }

  /* 사이드바 */
  .sidebar { background: #141414; border-right: 1px solid #2a2a2a; overflow-y: auto; }
  .sidebar-header { padding: 16px; border-bottom: 1px solid #2a2a2a; display: flex; justify-content: space-between; align-items: center; }
  .sidebar-header span { font-size: 12px; color: #666; }
  .btn-new { background: #22c55e; color: #000; border: none; border-radius: 6px; padding: 6px 14px; font-size: 12px; font-weight: 600; cursor: pointer; }
  .btn-new:hover { background: #16a34a; }

  .draft-item { padding: 14px 16px; border-bottom: 1px solid #1e1e1e; cursor: pointer; transition: background 0.15s; }
  .draft-item:hover { background: #1e1e1e; }
  .draft-item.active { background: #1e1e1e; border-left: 3px solid #22c55e; }
  .draft-title { font-size: 13px; color: #e0e0e0; line-height: 1.4; margin-bottom: 6px; }
  .draft-meta { display: flex; gap: 8px; align-items: center; }
  .char-count { font-size: 11px; color: #555; }
  .char-badge { font-size: 11px; padding: 1px 6px; border-radius: 4px; }
  .char-badge.short { background: #ef444422; color: #ef4444; }
  .char-badge.ok { background: #22c55e22; color: #22c55e; }
  .char-badge.great { background: #3b82f622; color: #3b82f6; }

  /* 에디터 */
  .editor-area { display: flex; flex-direction: column; }
  .editor-toolbar { background: #1a1a1a; border-bottom: 1px solid #2a2a2a; padding: 12px 20px; display: flex; gap: 10px; align-items: center; }
  .btn { border: none; border-radius: 6px; padding: 7px 16px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
  .btn-publish { background: #3b82f6; color: #fff; }
  .btn-publish:hover { background: #2563eb; }
  .btn-publish:disabled { background: #1e3a5f; color: #4a6fa5; cursor: not-allowed; }
  .btn-save { background: #2a2a2a; color: #ccc; border: 1px solid #333; }
  .btn-save:hover { background: #333; }
  .btn-longer { background: #7c3aed22; color: #a78bfa; border: 1px solid #7c3aed44; }
  .btn-longer:hover { background: #7c3aed33; }
  .btn-longer:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-revise { background: #f59e0b22; color: #fbbf24; border: 1px solid #f59e0b44; }
  .btn-revise:hover { background: #f59e0b33; }
  .btn-revise:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-feedback { background: #06b6d422; color: #67e8f9; border: 1px solid #06b6d444; }
  .btn-feedback:hover { background: #06b6d433; }
  .btn-feedback:disabled { opacity: 0.4; cursor: not-allowed; }

  /* 지시사항 패널 */
  .context-panel { display: none; background: #141414; border-top: 1px solid #2a2a2a; padding: 16px 20px; gap: 10px; flex-direction: column; }
  .context-panel.open { display: flex; }
  .context-panel label { font-size: 12px; color: #888; }
  .context-panel textarea { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 8px; color: #ddd; font-size: 13px; line-height: 1.7; padding: 12px; resize: vertical; min-height: 100px; outline: none; font-family: inherit; }
  .context-panel textarea:focus { border-color: #7c3aed66; }
  .context-panel-btns { display: flex; gap: 8px; }
  .btn-run { background: #7c3aed; color: #fff; }
  .btn-run:hover { background: #6d28d9; }
  .btn-run:disabled { background: #3b1f6e; color: #7c5cb0; cursor: not-allowed; }
  .btn-cancel-ctx { background: #2a2a2a; color: #888; border: 1px solid #333; }

  /* 수정하기 패널 */
  .revise-panel { display: none; background: #141414; border-top: 1px solid #2a2a2a; padding: 16px 20px; gap: 10px; flex-direction: column; }
  .revise-panel.open { display: flex; }
  .revise-panel label { font-size: 12px; color: #888; }
  .revise-panel textarea { background: #1e1e1e; border: 1px solid #f59e0b22; border-radius: 8px; color: #ddd; font-size: 13px; line-height: 1.7; padding: 12px; resize: vertical; min-height: 80px; outline: none; font-family: inherit; }
  .revise-panel textarea:focus { border-color: #f59e0b66; }
  .revise-panel-btns { display: flex; gap: 8px; }
  .btn-run-revise { background: #f59e0b; color: #000; font-weight: 600; }
  .btn-run-revise:hover { background: #d97706; }
  .btn-run-revise:disabled { background: #78350f; color: #92400e; cursor: not-allowed; }

  /* 선택 수정 팝업 */
  .selection-popup { display: none; position: fixed; z-index: 200; background: #1e1e1e; border: 1px solid #f59e0b66; border-radius: 8px; padding: 10px 14px; box-shadow: 0 4px 24px #000c; min-width: 200px; }
  .selection-popup-trigger { display: flex; align-items: center; gap: 8px; }
  .btn-sel-trigger { background: #f59e0b; color: #000; border: none; border-radius: 5px; padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; }
  .btn-sel-close { background: none; border: none; color: #555; font-size: 14px; cursor: pointer; padding: 2px 6px; }
  .btn-sel-close:hover { color: #999; }
  .selection-popup-input { display: none; margin-top: 8px; flex-direction: column; gap: 6px; }
  .selection-popup-input.open { display: flex; }
  .selection-popup-input input { background: #141414; border: 1px solid #333; border-radius: 5px; color: #ddd; font-size: 12px; padding: 6px 10px; outline: none; width: 260px; }
  .selection-popup-input input:focus { border-color: #f59e0b66; }
  .sel-popup-btns { display: flex; gap: 6px; }
  .btn-sel-run { background: #f59e0b; color: #000; border: none; border-radius: 5px; padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer; }
  .btn-sel-run:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-sel-cancel { background: #2a2a2a; color: #888; border: 1px solid #333; border-radius: 5px; padding: 5px 10px; font-size: 12px; cursor: pointer; }

  /* 피드백 모달 */
  .feedback-modal { display: none; position: fixed; inset: 0; background: #000000aa; z-index: 150; }
  .feedback-modal.show { display: block; }
  .feedback-panel { position: absolute; right: 0; top: 0; bottom: 0; width: 420px; background: #141414; border-left: 1px solid #2a2a2a; display: flex; flex-direction: column; }
  .feedback-header { padding: 16px 20px; border-bottom: 1px solid #2a2a2a; display: flex; justify-content: space-between; align-items: center; background: #1a1a1a; flex-shrink: 0; }
  .feedback-header h2 { font-size: 14px; color: #67e8f9; font-weight: 600; }
  .btn-close-feedback { background: none; border: none; color: #555; font-size: 18px; cursor: pointer; line-height: 1; }
  .btn-close-feedback:hover { color: #ccc; }
  .feedback-body { padding: 20px; flex: 1; overflow-y: auto; font-size: 13px; line-height: 1.9; color: #bbb; white-space: pre-wrap; word-break: break-word; }
  .feedback-loading { color: #444; text-align: center; padding-top: 60px; }
  .char-live { margin-left: auto; font-size: 12px; color: #555; }
  .char-live span { color: #e0e0e0; font-weight: 600; }

  .editor-wrap { flex: 1; display: flex; flex-direction: column; }
  .editor-title-wrap { padding: 20px 24px 0; }
  .editor-title { width: 100%; background: transparent; border: none; color: #fff; font-size: 20px; font-weight: 700; outline: none; border-bottom: 1px solid #2a2a2a; padding-bottom: 12px; margin-bottom: 0; }
  .editor-body { flex: 1; padding: 16px 24px; }
  .editor-body textarea { width: 100%; height: 100%; background: transparent; border: none; color: #ccc; font-size: 14px; line-height: 1.8; outline: none; resize: none; font-family: inherit; }

  .status-bar { background: #1a1a1a; border-top: 1px solid #2a2a2a; padding: 8px 20px; font-size: 12px; color: #555; display: flex; gap: 16px; }
  .status-bar .status-msg { color: #22c55e; }
  .status-bar .status-err { color: #ef4444; }

  .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #333; gap: 8px; }
  .empty-state p { font-size: 14px; }

  .publishing-overlay { display: none; position: fixed; inset: 0; background: #000000aa; z-index: 100; align-items: center; justify-content: center; flex-direction: column; gap: 16px; }
  .publishing-overlay.show { display: flex; }
  .publishing-overlay p { color: #fff; font-size: 15px; }
  .spinner { width: 36px; height: 36px; border: 3px solid #333; border-top-color: #3b82f6; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>

<div class="header">
  <h1>새로운마케팅 블로그</h1>
  <span class="badge">blog-drafts</span>
</div>

<div class="layout">
  <!-- 사이드바 -->
  <div class="sidebar">
    <div class="sidebar-header">
      <span id="draft-count">로딩 중...</span>
      <button class="btn-new" onclick="newDraft()">+ 새 글</button>
    </div>
    <div id="draft-list"></div>
  </div>

  <!-- 에디터 -->
  <div class="editor-area" id="editor-area">
    <div class="empty-state">
      <p>왼쪽에서 글을 선택하세요</p>
    </div>
  </div>
</div>

<div class="publishing-overlay" id="publishing-overlay">
  <div class="spinner"></div>
  <p>네이버 블로그 에디터 열리는 중...</p>
  <p style="color:#666;font-size:12px">에디터에서 확인 후 직접 [발행] 누르세요</p>
</div>

<!-- 선택 수정 팝업 -->
<div class="selection-popup" id="selection-popup">
  <div class="selection-popup-trigger">
    <button class="btn-sel-trigger" onclick="showSelectionInput()">✎ 이 부분 수정</button>
    <button class="btn-sel-close" onclick="closeSelectionPopup()">✕</button>
  </div>
  <div class="selection-popup-input" id="sel-input-panel">
    <input id="sel-instruction" placeholder="어떻게 수정? (예: 더 강하게, 짧게, 톤 부드럽게)" onkeydown="if(event.key==='Enter')reviseSelection()">
    <div class="sel-popup-btns">
      <button class="btn-sel-run" id="btn-sel-run" onclick="reviseSelection()">수정</button>
      <button class="btn-sel-cancel" onclick="closeSelectionPopup()">취소</button>
    </div>
  </div>
</div>

<!-- 피드백 모달 -->
<div class="feedback-modal" id="feedback-modal" onclick="if(event.target===this)closeFeedback()">
  <div class="feedback-panel">
    <div class="feedback-header">
      <h2>◎ 피드백 리뷰</h2>
      <button class="btn-close-feedback" onclick="closeFeedback()">✕</button>
    </div>
    <div class="feedback-body" id="feedback-body"><div class="feedback-loading">분석 중...</div></div>
  </div>
</div>

<script>
let drafts = [];
let currentFile = null;
let saveTimer = null;

async function loadDrafts() {
  const res = await fetch('/api/drafts');
  drafts = await res.json();
  renderList();
}

function renderList() {
  const el = document.getElementById('draft-list');
  document.getElementById('draft-count').textContent = `${drafts.length}개 초안`;
  el.innerHTML = drafts.map(d => {
    const chars = d.chars;
    let badgeClass = 'short', badgeText = chars + '자 ⚠️';
    if (chars >= 3000) { badgeClass = 'great'; badgeText = chars + '자 ✓'; }
    else if (chars >= 2000) { badgeClass = 'ok'; badgeText = chars + '자'; }
    return `<div class="draft-item ${currentFile === d.filename ? 'active' : ''}" onclick="openDraft('${d.filename}')">
      <div class="draft-title">${d.title || d.filename}</div>
      <div class="draft-meta">
        <span class="char-badge ${badgeClass}">${badgeText}</span>
      </div>
    </div>`;
  }).join('');
}

async function openDraft(filename) {
  const res = await fetch(`/api/draft/${encodeURIComponent(filename)}`);
  const data = await res.json();
  currentFile = filename;
  renderEditor(data);
  renderList();
}

function renderEditor(data) {
  const lines = data.content.split('\\n');
  const titleLine = lines[0].startsWith('# ') ? lines[0].slice(2) : lines[0];
  const body = lines.slice(1).join('\\n').replace(/^\\n+/, '');

  document.getElementById('editor-area').innerHTML = `
    <div class="editor-toolbar">
      <button class="btn btn-save" onclick="saveDraft()">저장</button>
      <button class="btn btn-longer" id="btn-longer" onclick="toggleContextPanel()">✦ 글 늘리기</button>
      <button class="btn btn-revise" id="btn-revise" onclick="toggleRevisePanel()">✎ 수정하기</button>
      <button class="btn btn-feedback" id="btn-feedback" onclick="getFeedback()">◎ 피드백</button>
      <button class="btn btn-publish" id="btn-publish" onclick="publishDraft()">네이버 발행 →</button>
      <span class="char-live">총 <span id="char-count">${data.chars}</span>자</span>
    </div>
    <div class="context-panel" id="context-panel">
      <label>실제 케이스 / 추가 지시사항 (없으면 비워도 됩니다)</label>
      <textarea id="context-input" placeholder="예시:
- 실제로 플레이스 최적화 후 A 병원은 3개월 만에 예약이 2배 늘었음
- 영업시간 오류로 보호자 항의 받은 케이스 넣어줘
- 마지막에 무료 상담 CTA 더 강하게
- 3,500자 이상으로 늘려줘"></textarea>
      <div class="context-panel-btns">
        <button class="btn btn-run" id="btn-run" onclick="makeLonger()">✦ 생성하기</button>
        <button class="btn btn-cancel-ctx" onclick="toggleContextPanel()">닫기</button>
      </div>
    </div>
    <div class="revise-panel" id="revise-panel">
      <label>수정 지시사항 — 초안에 없는 사례/수치는 지어내지 않습니다</label>
      <textarea id="revise-input" placeholder="어떻게 수정할까요? 예:
- 도입부를 더 강하게 바꿔줘
- 마지막 CTA에 무료상담 연락처 추가해줘
- 2번 소제목 삭제하고 1번에 합쳐줘
- 전체 톤을 좀 더 친근하게"></textarea>
      <div class="revise-panel-btns">
        <button class="btn btn-run-revise" id="btn-run-revise" onclick="makeRevision()">✦ 수정하기</button>
        <button class="btn btn-cancel-ctx" onclick="toggleRevisePanel()">닫기</button>
      </div>
    </div>
    <div class="editor-wrap">
      <div class="editor-title-wrap">
        <input class="editor-title" id="editor-title" value="${escHtml(titleLine)}" placeholder="제목" oninput="updateCharCount()">
      </div>
      <div class="editor-body">
        <textarea id="editor-body" oninput="updateCharCount()" onmouseup="handleTextSelection(event)" placeholder="본문 내용...">${escHtml(body)}</textarea>
      </div>
    </div>
    <div class="status-bar">
      <span id="status-msg">준비</span>
      <span>저장: Ctrl+S</span>
    </div>
  `;
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); saveDraft(); }
  });
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function updateCharCount() {
  const title = document.getElementById('editor-title')?.value || '';
  const body = document.getElementById('editor-body')?.value || '';
  const total = (title + body).replace(/\\s/g, '').length;
  const el = document.getElementById('char-count');
  if (el) el.textContent = total;
}

async function saveDraft() {
  if (!currentFile) return;
  const title = document.getElementById('editor-title').value;
  const body = document.getElementById('editor-body').value;
  const content = `# ${title}\\n\\n${body}`;
  const res = await fetch(`/api/draft/${encodeURIComponent(currentFile)}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ content })
  });
  const data = await res.json();
  setStatus(data.ok ? '저장 완료' : '저장 실패', !data.ok);
  await loadDrafts();
}

function toggleContextPanel() {
  const panel = document.getElementById('context-panel');
  document.getElementById('revise-panel')?.classList.remove('open');
  if (panel) panel.classList.toggle('open');
}

function toggleRevisePanel() {
  const panel = document.getElementById('revise-panel');
  document.getElementById('context-panel')?.classList.remove('open');
  if (panel) panel.classList.toggle('open');
}

// ===== 수정하기 =====
async function makeRevision() {
  if (!currentFile) return;
  const instructions = document.getElementById('revise-input')?.value?.trim();
  if (!instructions) { setStatus('수정 지시사항을 입력하세요', true); return; }
  const btn = document.getElementById('btn-run-revise');
  if (btn) { btn.disabled = true; btn.textContent = '수정 중...'; }
  setStatus('Claude가 글을 수정하는 중...', false);
  const title = document.getElementById('editor-title').value;
  const body = document.getElementById('editor-body').value;
  const content = `# ${title}\\n\\n${body}`;
  const res = await fetch('/api/revise', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ content, instructions })
  });
  const data = await res.json();
  if (data.ok) {
    document.getElementById('editor-body').value = data.body;
    updateCharCount();
    setStatus('수정 완료! 확인 후 저장하세요', false);
    document.getElementById('revise-panel')?.classList.remove('open');
  } else {
    setStatus('수정 실패: ' + data.error, true);
  }
  if (btn) { btn.disabled = false; btn.textContent = '✦ 수정하기'; }
}

// ===== 선택 부분 수정 =====
let selectedText = '';
let selStart = -1;
let selEnd = -1;

function handleTextSelection(e) {
  const ta = document.getElementById('editor-body');
  if (!ta) return;
  setTimeout(() => {
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const popup = document.getElementById('selection-popup');
    if (!popup) return;
    if (start !== end && end - start > 3) {
      selectedText = ta.value.substring(start, end);
      selStart = start;
      selEnd = end;
      const x = Math.min(e.clientX - 80, window.innerWidth - 340);
      const y = Math.max(e.clientY - 55, 10);
      popup.style.left = x + 'px';
      popup.style.top = y + 'px';
      popup.style.display = 'block';
      document.getElementById('sel-input-panel')?.classList.remove('open');
      const inp = document.getElementById('sel-instruction');
      if (inp) inp.value = '';
    } else {
      popup.style.display = 'none';
    }
  }, 10);
}

function showSelectionInput() {
  document.getElementById('sel-input-panel')?.classList.add('open');
  setTimeout(() => document.getElementById('sel-instruction')?.focus(), 50);
}

async function reviseSelection() {
  if (!selectedText) return;
  const instructions = document.getElementById('sel-instruction')?.value?.trim();
  if (!instructions) return;
  const btn = document.getElementById('btn-sel-run');
  if (btn) { btn.disabled = true; btn.textContent = '수정 중...'; }
  setStatus('선택 부분 수정 중...', false);
  const ta = document.getElementById('editor-body');
  const fullContent = ta.value;
  const ctx = fullContent.substring(Math.max(0, selStart - 300), Math.min(fullContent.length, selEnd + 300));
  const res = await fetch('/api/revise-selection', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ selected: selectedText, instructions, context: ctx })
  });
  const data = await res.json();
  if (data.ok) {
    ta.value = fullContent.substring(0, selStart) + data.revised + fullContent.substring(selEnd);
    updateCharCount();
    setStatus('선택 부분 수정 완료! 확인 후 저장하세요', false);
    document.getElementById('selection-popup').style.display = 'none';
  } else {
    setStatus('선택 수정 실패: ' + data.error, true);
    if (btn) { btn.disabled = false; btn.textContent = '수정'; }
  }
}

function closeSelectionPopup() {
  const popup = document.getElementById('selection-popup');
  if (popup) popup.style.display = 'none';
}

// ===== 피드백 =====
async function getFeedback() {
  const modal = document.getElementById('feedback-modal');
  const bodyEl = document.getElementById('feedback-body');
  modal.classList.add('show');
  bodyEl.innerHTML = '<div class="feedback-loading">AI가 글을 분석하는 중...</div>';
  const title = document.getElementById('editor-title').value;
  const body = document.getElementById('editor-body').value;
  const content = `# ${title}\\n\\n${body}`;
  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ content })
  });
  const data = await res.json();
  bodyEl.textContent = data.ok ? data.feedback : ('피드백 실패: ' + data.error);
}

function closeFeedback() {
  document.getElementById('feedback-modal')?.classList.remove('show');
}

async function makeLonger() {
  if (!currentFile) return;
  const btn = document.getElementById('btn-run');
  if (btn) { btn.disabled = true; btn.textContent = '생성 중...'; }
  setStatus('Claude가 글을 늘리는 중...', false);

  const title = document.getElementById('editor-title').value;
  const body = document.getElementById('editor-body').value;
  const context = document.getElementById('context-input')?.value || '';
  const content = `# ${title}\\n\\n${body}`;

  const res = await fetch('/api/make-longer', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ filename: currentFile, content, context })
  });
  const data = await res.json();
  if (data.ok) {
    document.getElementById('editor-body').value = data.body;
    updateCharCount();
    setStatus('글 늘리기 완료! 확인 후 저장하세요', false);
    // 패널 닫기
    document.getElementById('context-panel')?.classList.remove('open');
  } else {
    setStatus('글 늘리기 실패: ' + data.error, true);
  }
  if (btn) { btn.disabled = false; btn.textContent = '✦ 생성하기'; }
}

async function publishDraft() {
  if (!currentFile) return;
  await saveDraft();
  const overlay = document.getElementById('publishing-overlay');
  overlay.classList.add('show');
  const btn = document.getElementById('btn-publish');
  btn.disabled = true;

  const res = await fetch('/api/publish', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ filename: currentFile })
  });
  const data = await res.json();
  overlay.classList.remove('show');
  btn.disabled = false;
  if (data.ok) {
    setStatus('에디터 열림! 브라우저에서 [발행] 누르세요', false);
  } else {
    setStatus('발행 실패: ' + data.error, true);
  }
}

async function newDraft() {
  const title = prompt('새 글 제목:');
  if (!title) return;
  const filename = title.replace(/[^가-힣a-zA-Z0-9]/g, '-').slice(0, 30) + '.md';
  const res = await fetch('/api/draft/new', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ filename, title })
  });
  const data = await res.json();
  if (data.ok) { await loadDrafts(); openDraft(data.filename); }
}

function setStatus(msg, isErr) {
  const el = document.getElementById('status-msg');
  if (!el) return;
  el.textContent = msg;
  el.className = isErr ? 'status-err' : 'status-msg';
}

loadDrafts();
</script>
</body>
</html>
"""


@app.route("/")
def index():
    return render_template_string(HTML)


@app.route("/api/drafts")
def list_drafts():
    DRAFTS_DIR.mkdir(exist_ok=True)
    result = []
    for f in sorted(DRAFTS_DIR.glob("*.md")):
        text = f.read_text(encoding="utf-8")
        lines = text.split("\n")
        title = lines[0].lstrip("# ").strip() if lines else f.name
        chars = len(text.replace(" ", "").replace("\n", ""))
        result.append({"filename": f.name, "title": title, "chars": chars})
    return jsonify(result)


@app.route("/api/draft/<filename>", methods=["GET"])
def get_draft(filename):
    path = DRAFTS_DIR / filename
    if not path.exists():
        return jsonify({"error": "없음"}), 404
    text = path.read_text(encoding="utf-8")
    chars = len(text.replace(" ", "").replace("\n", ""))
    return jsonify({"filename": filename, "content": text, "chars": chars})


@app.route("/api/draft/<filename>", methods=["POST"])
def save_draft(filename):
    path = DRAFTS_DIR / filename
    data = request.json
    try:
        path.write_text(data["content"], encoding="utf-8")
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})


@app.route("/api/draft/new", methods=["POST"])
def new_draft():
    data = request.json
    filename = data.get("filename", "new-draft.md")
    title = data.get("title", "새 글")
    path = DRAFTS_DIR / filename
    path.write_text(f"# {title}\n\n본문을 작성하세요.\n", encoding="utf-8")
    return jsonify({"ok": True, "filename": filename})


@app.route("/api/make-longer", methods=["POST"])
def make_longer():
    data = request.json
    content = data.get("content", "")
    context = data.get("context", "").strip()
    try:
        context_block = ""
        if context:
            context_block = f"\n[추가 지시사항 / 실제 케이스]\n아래 내용을 반드시 반영해서 글을 써줘:\n{context}\n"
        user_prompt = f"""아래 블로그 초안을 3,000자 이상의 완성된 글로 다시 써줘.

기존 구조와 핵심 내용은 유지하되, 시스템 프롬프트의 모든 규칙을 적용해서 완전히 새로운 수준으로 업그레이드해줘.
{context_block}
초안:
{content}"""
        body = _run_claude(user_prompt, WRITING_SYSTEM_PROMPT)
        lines = body.split("\n")
        if lines and lines[0].startswith("# "):
            lines = lines[1:]
        return jsonify({"ok": True, "body": "\n".join(lines).lstrip("\n")})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})


def _run_claude(user_prompt, system_prompt=None, timeout=300):
    env = os.environ.copy()
    env.pop("CLAUDECODE", None)
    cmd = ["claude", "-p", "--model", "sonnet"]
    if system_prompt:
        cmd += ["--system-prompt", system_prompt]
    result = subprocess.run(cmd, input=user_prompt, capture_output=True, text=True, timeout=timeout, env=env)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "Claude CLI 오류")
    return result.stdout.strip()


WRITING_SYSTEM_PROMPT = """너는 수의사 출신으로 동물병원 마케팅 전문 회사(새로운마케팅)를 운영하는 대표가 직접 쓰는 블로그 원고 작가다.

## 독자
동물병원 원장님. 마케팅을 어떻게 해야 할지 막막한 사람들.

## 핵심 목표
원장님이 읽다가 "어 이거 내 얘기인데?" 하게 만드는 것.
정보 전달이 아니라, 진료실에서 선배가 후배한테 직접 말 거는 느낌.

## 문장/호흡 규칙
- 한 문장 50자 이상이면 즉시 2~3문장으로 분할
- 1~3문장마다 줄바꿈. 여백 크게.
- 기본 톤: ~해요 (30%) + ~입니다 (70%) 혼합
- ~이다/~다 체 사용 금지

## 절대 금지: 사실 날조
- 초안에 없는 구체적 사례(지역명, 수치, 원장님 에피소드 등)를 절대 지어내지 마라
- 통계/수치도 초안에 있는 것만 사용. 없으면 쓰지 마라"""


@app.route("/api/revise", methods=["POST"])
def revise():
    data = request.json
    content = data.get("content", "")
    instructions = data.get("instructions", "").strip()
    try:
        user_prompt = f"""아래 블로그 글을 지시사항에 따라 수정해줘.

지시사항:
{instructions}

규칙:
- 지시한 부분만 수정하고 나머지는 원문 최대한 유지
- 분량을 억지로 늘리거나 줄이지 마라
- 초안에 없는 사례/수치를 절대 지어내지 마라

글:
{content}"""
        body = _run_claude(user_prompt, WRITING_SYSTEM_PROMPT)
        lines = body.split("\n")
        if lines and lines[0].startswith("# "):
            lines = lines[1:]
        return jsonify({"ok": True, "body": "\n".join(lines).lstrip("\n")})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})


@app.route("/api/revise-selection", methods=["POST"])
def revise_selection():
    data = request.json
    selected = data.get("selected", "")
    instructions = data.get("instructions", "").strip()
    context = data.get("context", "")
    try:
        user_prompt = f"""블로그 글의 특정 부분을 수정해야 해.

[주변 문맥 — 참고만]
{context}

[수정할 부분]
{selected}

[지시사항]
{instructions}

위 "수정할 부분"만 지시사항에 따라 다시 써줘.
수정된 텍스트만 출력하고, 설명이나 따옴표 없이 바로 본문만 출력해."""
        revised = _run_claude(user_prompt, timeout=120)
        return jsonify({"ok": True, "revised": revised})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})


@app.route("/api/feedback", methods=["POST"])
def feedback():
    data = request.json
    content = data.get("content", "")
    try:
        user_prompt = f"""아래 동물병원 마케팅 블로그 글을 읽고 구체적인 피드백을 줘.
글을 직접 수정하지 말고, 개선할 점만 번호 매겨서 알려줘.

각 항목마다:
1. 문제가 뭔지
2. 어떻게 고치면 좋은지 (짧은 예시 포함)

피드백 항목:
1. 제목 — 더 강하게 만들 수 있는지
2. 도입부 — 독자를 충분히 끌어당기는지
3. 본론 흐름 — 불안→설명→확신 감정 흐름이 되는지
4. 직접 말 걸기 — 원장님에게 충분히 말 거는지
5. 사실 날조 여부 — 근거 없는 수치/사례가 있는지
6. CTA — 마무리가 행동으로 이어지는지
7. 기타 고치면 좋을 표현

글:
{content}"""
        fb = _run_claude(user_prompt)
        return jsonify({"ok": True, "feedback": fb})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})


@app.route("/api/publish", methods=["POST"])
def publish():
    data = request.json
    filename = data.get("filename")
    if not filename:
        return jsonify({"ok": False, "error": "파일명 없음"})
    path = DRAFTS_DIR / filename
    if not path.exists():
        return jsonify({"ok": False, "error": "파일 없음"})

    def run():
        subprocess.Popen(
            [sys.executable, str(PUBLISH_SCRIPT), str(path)],
            cwd=str(BASE_DIR)
        )

    threading.Thread(target=run, daemon=True).start()
    return jsonify({"ok": True})


if __name__ == "__main__":
    import webbrowser
    print("🚀 새로운마케팅 블로그 GUI 시작")
    print("📍 http://localhost:5050")
    threading.Timer(1.0, lambda: webbrowser.open("http://localhost:5050")).start()
    app.run(port=5050, debug=False)
