// ==UserScript==
// @name         ChatGPT Easy Delete Chat
// @homepageURL  https://raw.githubusercontent.com/nisc/chatgpt-userscripts/
// @namespace    nisc
// @version      1.2
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

  const findButtonByText = (regex) => Array.from(document.querySelectorAll('button')).find(b => regex.test(b.textContent || ''));

  const isChatPage = () => window.location.pathname.startsWith('/c/') && !window.location.hash.startsWith('#settings');

  document.addEventListener('keydown', e => {
    if (!isChatPage()) return;
    const tgt = document.activeElement;
    if (['INPUT', 'TEXTAREA'].includes(tgt.tagName) || tgt.isContentEditable) return;

    if (
      e.key === 'Delete' &&
      e[META] &&
      e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      const btn = findButtonByText(/delete chat/i);
      if (btn) btn.click();
      else console.warn('[ChatGPT Delete] button not found');
    }
  });

  new MutationObserver(() => {
    if (!isChatPage()) return;
    const confirmBtn = findButtonByText(/^delete$/i);
    if (confirmBtn) confirmBtn.click();
  }).observe(document.body, { childList: true, subtree: true });
})();
