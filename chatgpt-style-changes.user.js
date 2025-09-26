// ==UserScript==
// @name         ChatGPT Style Changes
// @namespace    nisc
// @version      2025.09.25-A
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
    reapplyDelay: 100
  };

  function applyStyleChanges() {
    // Apply CSS custom properties to root
    const root = document.documentElement;
    Object.entries(CONFIG.customProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }

  // Apply changes immediately
  applyStyleChanges();

  // Reapply changes when new content is loaded (for SPA behavior)
  const observer = new MutationObserver((mutations) => {
    let shouldReapply = false;

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Check if any new content was added
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            shouldReapply = true;
          }
        });
      }
    });

    if (shouldReapply) {
      setTimeout(applyStyleChanges, CONFIG.reapplyDelay);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Also reapply on page visibility change (in case of navigation)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(applyStyleChanges, CONFIG.reapplyDelay);
    }
  });
})();
