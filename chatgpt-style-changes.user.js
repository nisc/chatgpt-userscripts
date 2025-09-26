// ==UserScript==
// @name         ChatGPT Style Changes
// @namespace    nisc
// @version      2025.09.25-B
// @description  Various style changes to the ChatGPT UI
// @homepageURL  https://github.com/nisc/chatgpt-userscripts/
// @downloadURL  https://raw.githubusercontent.com/nisc/chatgpt-userscripts/main/chatgpt-style-changes.user.js
// @author       nisc
// @match        https://chatgpt.com/*
// @icon         https://chatgpt.com/favicon.ico
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    customProperties: {
      '--user-chat-width': '85%',
      '--sidebar-width': '200px'
    },
    styles: `
      #prompt-textarea {
        max-height: 160px;
        overflow-y: auto;
      }
    `,
    reapplyDelay: 100
  };

  function applyStyles() {
    // Apply CSS custom properties
    Object.entries(CONFIG.customProperties).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });

    // Apply CSS styles
    document.getElementById('chatgpt-style-changes')?.remove();
    const style = Object.assign(document.createElement('style'), {
      id: 'chatgpt-style-changes',
      textContent: CONFIG.styles
    });
    document.head.appendChild(style);
  }

  // Apply styles immediately and on changes
  applyStyles();

  const reapply = () => setTimeout(applyStyles, CONFIG.reapplyDelay);

  // Reapply on DOM changes and visibility changes
  new MutationObserver(() => reapply()).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('visibilitychange', () => !document.hidden && reapply());
})();