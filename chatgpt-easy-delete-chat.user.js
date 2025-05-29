// ==UserScript==
// @name         ChatGPT Easy Delete Chat
// @homepageURL  https://raw.githubusercontent.com/nisc/chatgpt-userscripts/refs/heads/main/chatgpt-easy-delete-chat.user.js
// @namespace    nisc
// @version      1.1
// @description  Delete ChatGPT chat with only Cmd/Ctrl+Shift+Delete, auto-confirms popup.
// @author       nisc
// @match        https://chatgpt.com/*
// @icon         https://chatgpt.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const IS_MAC = navigator.platform.includes('Mac');
  const META = IS_MAC ? 'metaKey' : 'ctrlKey';

  document.addEventListener('keydown', e => {
    if (window.location.hash.startsWith('#settings')) return;
    const tgt = document.activeElement;
    if (['INPUT','TEXTAREA'].includes(tgt.tagName) || tgt.isContentEditable) return;

    if (
      e.key === 'Delete' &&
      e[META] &&
      e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      const btn = Array.from(document.querySelectorAll('button'))
        .find(b => /delete chat/i.test(b.textContent || ''));
      if (btn) btn.click();
      else console.warn('[ChatGPT Delete] button not found');
    }
  });

  new MutationObserver(() => {
    if (window.location.hash.startsWith('#settings')) return;
    const confirmBtn = Array.from(document.querySelectorAll('button'))
      .find(b => /^delete$/i.test((b.textContent||'').trim()));
    if (confirmBtn) confirmBtn.click();
  }).observe(document.body, { childList: true, subtree: true });
})();
