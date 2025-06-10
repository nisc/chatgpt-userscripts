// ==UserScript==
// @name         ChatGPT Temporary Chat Shortcut
// @namespace    nisc
// @version      2025.06.10-A
// @description  Toggle temporary chat mode with Cmd+Shift+J (macOS) or Ctrl+Shift+J (Windows/Linux)
// @homepageURL  https://github.com/nisc/chatgpt-userscripts/
// @downloadURL  https://raw.githubusercontent.com/nisc/chatgpt-userscripts/main/chatgpt-private-chat-shortcut.user.js
// @author       nisc
// @match        https://chatgpt.com/*
// @icon         https://chatgpt.com/favicon.ico
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Configuration object for all customizable settings
  const CONFIG = {
    shortcut: {
      key: 'j',
      requireShift: true,
      requireCtrl: true
    },
    selectors: {
      // Button that toggles temporary chat
      tempChatButton: 'button[aria-label*="temporary chat"]'
    }
  };

  /**
   * Simulates a full interaction with a button element
   * @param {HTMLElement} element - The element to interact with
   */
  function simulateButtonClick(element) {
    // Simulate all necessary pointer events in sequence
    ['pointerover', 'pointerenter', 'pointerdown', 'pointerup', 'click'].forEach(eventType => {
      element.dispatchEvent(new PointerEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
        pointerType: 'mouse'
      }));
    });
  }

  // Add keyboard shortcut listener
  document.addEventListener('keydown', e => {
    // Check if the shortcut combination is pressed
    if (e.key.toLowerCase() === CONFIG.shortcut.key &&
        (navigator.userAgent.includes('Mac') ? e.metaKey : e.ctrlKey) &&
        e.shiftKey === CONFIG.shortcut.requireShift) {

      e.preventDefault();
      e.stopPropagation();

      // Find and click the temporary chat button
      const tempChatButton = document.querySelector(CONFIG.selectors.tempChatButton);
      if (!tempChatButton) return;

      simulateButtonClick(tempChatButton);
    }
  });
})();
