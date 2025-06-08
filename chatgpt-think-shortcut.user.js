// ==UserScript==
// @name         ChatGPT Think Shortcut
// @namespace    nisc
// @version      2025.06.08-B
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

  // Configuration object for all customizable settings
  const CONFIG = {
    shortcut: {
      key: 'd',
      requireShift: true
    },
    selectors: {
      // Button that opens the tools menu
      toolsButton: 'button#system-hint-button',
      // Selectors for both new chat and existing chat menu structures
      toolsPopupMenu: [
        'div[data-side="bottom"][role="menu"][data-radix-menu-content]',
        'div[data-radix-popper-content-wrapper] div[role="menu"]'
      ],
      // Menu item elements
      thinkMenuItem: 'div[role="menuitemradio"]',
      thinkMenuItemText: 'div.flex.min-w-0.grow.items-center.gap-2'
    },
    // Text to match for the "Think longer" option
    text: 'Think for longer',
    // Delay before attempting to find and click menu item (ms)
    delay: 75
  };

  /**
   * Finds a menu item by its text content
   * @param {HTMLElement} menu - The menu element to search in
   * @param {string} text - The text to search for
   * @returns {HTMLElement|undefined} The found menu item or undefined
   */
  function findMenuItemByText(menu, text) {
    return Array.from(menu.querySelectorAll(CONFIG.selectors.thinkMenuItem))
      .find(item => {
        const textDiv = item.querySelector(CONFIG.selectors.thinkMenuItemText);
        return textDiv?.textContent.trim() === text;
      });
  }

  /**
   * Simulates a full interaction with a Radix UI element
   * @param {HTMLElement} element - The element to interact with
   * @param {Object} options - Options for the interaction
   * @param {boolean} options.isButton - Whether the element is a button
   */
  function simulateRadixInteraction(element, { isButton = false } = {}) {
    // Set appropriate ARIA attributes based on element type
    element.setAttribute('data-state', isButton ? 'open' : 'checked');
    element.setAttribute(isButton ? 'aria-expanded' : 'aria-checked', 'true');

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
        e.shiftKey === CONFIG.shortcut.requireShift &&
        !e.altKey) {

      e.preventDefault();
      e.stopPropagation();

      // Find and click the tools button
      const toolsButton = document.querySelector(CONFIG.selectors.toolsButton);
      if (!toolsButton) return;

      simulateRadixInteraction(toolsButton, { isButton: true });

      // Wait for menu to appear, then find and click the "Think longer" option
      setTimeout(() => {
        // Try both selector patterns and combine results
        let menus = [];
        CONFIG.selectors.toolsPopupMenu.forEach(selector => {
          menus = menus.concat(Array.from(document.querySelectorAll(selector)));
        });

        // Get the last menu (most recently opened)
        const menu = menus[menus.length - 1];
        if (!menu) return;

        const thinkOption = findMenuItemByText(menu, CONFIG.text);
        if (!thinkOption) return;

        simulateRadixInteraction(thinkOption);
      }, CONFIG.delay);
    }
  });
})();