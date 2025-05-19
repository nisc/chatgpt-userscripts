// ==UserScript==
// @name         ChatGPT Temp Chat By Default
// @namespace    nisc
// @version      0.5
// @description  Automatically selects temporary mode on ChatGPT's new prompt page once per page load or URL change
// @author       nisc
// @match        https://chatgpt.com/*
// @icon         https://chatgpt.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function activateTemporaryMode() {
        const params = new URLSearchParams(window.location.search);
        const currentPathname = window.location.pathname;

        // Only activate if not already temporary and not previously activated on this pathname
        if ((!params.has('temporary-chat') || params.get('temporary-chat') !== 'true') &&
            (!window._lastActivatedPathname || window._lastActivatedPathname !== currentPathname)) {
            let attempts = 0;
            const maxAttempts = 5;
            const interval = 500; // 500ms delay between attempts

            const tryClickButton = setInterval(() => {
                const buttons = document.querySelectorAll('button');
                for (const button of buttons) {
                    if (button.textContent.trim() === 'Temporary') {
                        button.click();
                        clearInterval(tryClickButton);
                        window._lastActivatedPathname = currentPathname; // Record this pathname
                        return;
                    }
                }
                attempts++;
                if (attempts >= maxAttempts) {
                    clearInterval(tryClickButton);
                }
            }, interval);
        }
    }

    // Wrap history.pushState and history.replaceState to trigger on URL changes
    if (!window._historyWrapped) {
        const originalPushState = history.pushState;
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            activateTemporaryMode();
        };

        const originalReplaceState = history.replaceState;
        history.replaceState = function() {
            originalReplaceState.apply(this, arguments);
            activateTemporaryMode();
        };

        window._historyWrapped = true;
    }

    window.addEventListener('load', function() {
        activateTemporaryMode();
    });
})();
