// ==UserScript==
// @name         ChatGPT Think Shortcut
// @namespace    nisc
// @version      2026.06.07-A
// @description  Activate ChatGPT Thinking mode with Cmd/Ctrl+Shift+D.
// @homepageURL  https://github.com/nisc/chatgpt-userscripts/
// @author       nisc
// @match        https://chatgpt.com/*
// @icon         https://chatgpt.com/favicon.ico
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const CONFIG = {
      shortcut: {
        key: 'd',
        requireShift: true
      },
      selectors: {
        toolsButton: 'button#system-hint-button',
        toolsPopupMenu: 'div[data-side="bottom"][role="menu"][data-radix-menu-content]',
        thinkMenuItem: 'div[role="menuitemradio"]',
        thinkMenuItemText: 'div.flex.min-w-0.grow.items-center.gap-2'
      },
      text: 'Think for longer',
      delay: 50
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

    document.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === CONFIG.shortcut.key &&
          (navigator.userAgent.includes('Mac') ? e.metaKey : e.ctrlKey) &&
          e.shiftKey === CONFIG.shortcut.requireShift &&
          !e.altKey) {

        e.preventDefault();
        e.stopPropagation();

        const toolsButton = document.querySelector(CONFIG.selectors.toolsButton);
        if (!toolsButton) return;

        simulateRadixInteraction(toolsButton, { isButton: true });

        setTimeout(() => {
          const menu = document.querySelector(CONFIG.selectors.toolsPopupMenu);
          if (!menu) return;

          const thinkOption = findMenuItemByText(menu, CONFIG.text);
          if (!thinkOption) return;

          simulateRadixInteraction(thinkOption);
        }, CONFIG.delay);
      }
    });
})();
