// ==UserScript==
// @name         ChatGPT Think Shortcut
// @namespace    nisc
// @version      2025.07.07-A
// @description  Activate ChatGPT Thinking mode with Ctrl+Cmd+T (macOS) or Ctrl+Alt+T (Windows/Linux)
// @homepageURL  https://github.com/nisc/chatgpt-userscripts/
// @downloadURL  https://raw.githubusercontent.com/nisc/chatgpt-userscripts/main/chatgpt-think-shortcut.user.js
// @author       nisc
// @match        https://chatgpt.com/*
// @icon         https://chatgpt.com/favicon.ico
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    shortcut: {
      key: 't',
      requireShift: false,
      requireCtrl: true
    },
    selectors: {
      toolsButton: 'button#system-hint-button',
      toolsPopupMenu: [
        'div[data-side="bottom"][role="menu"][data-radix-menu-content]',
        'div[data-radix-popper-content-wrapper] div[role="menu"]'
      ],
      thinkMenuItem: 'div[role="menuitemradio"]',
      thinkMenuItemText: 'div.flex.min-w-0.grow.items-center.gap-2\\.5 div.truncate'
    },
    text: 'Think for longer',
    delay: 75
  };

  function findMenuItemByText(menu, text) {
    return Array.from(menu.querySelectorAll(CONFIG.selectors.thinkMenuItem))
      .find(item => {
        const textDiv = item.querySelector(CONFIG.selectors.thinkMenuItemText);
        return textDiv?.textContent.trim() === text;
      });
  }

  function simulateRadixInteraction(element, { isButton = false } = {}) {
    element.setAttribute('data-state', isButton ? 'open' : 'checked');
    element.setAttribute(isButton ? 'aria-expanded' : 'aria-checked', 'true');

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
    if (e.key.toLowerCase() === CONFIG.shortcut.key &&
      (navigator.userAgent.includes('Mac') ? e.metaKey : e.altKey) &&
      e.shiftKey === CONFIG.shortcut.requireShift &&
      e.ctrlKey === CONFIG.shortcut.requireCtrl) {

      e.preventDefault();
      e.stopPropagation();

      // Find and click the tools button
      const toolsButton = document.querySelector(CONFIG.selectors.toolsButton);
      if (!toolsButton) return;

      simulateRadixInteraction(toolsButton, { isButton: true });

      // Wait for menu to appear, then find and click the "Think longer" option
      setTimeout(() => {
        let menus = [];
        CONFIG.selectors.toolsPopupMenu.forEach(selector => {
          menus = menus.concat(Array.from(document.querySelectorAll(selector)));
        });

        const menu = menus[menus.length - 1];
        if (!menu) return;

        const thinkOption = findMenuItemByText(menu, CONFIG.text);
        if (!thinkOption) return;

        simulateRadixInteraction(thinkOption);
      }, CONFIG.delay);
    }
  });
})();
