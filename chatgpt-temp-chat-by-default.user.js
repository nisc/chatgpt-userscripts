// ==UserScript==
// @name         ChatGPT Temp Chat By Default
// @description  Automatically enables temporary mode on ChatGPT unless manually disabled by the user
// @version      0.6
// @author       nisc
// @match        https://chatgpt.com/*
// @icon         https://chatgpt.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Flag to track if user has manually disabled temporary chat
    let userDisabledTempChat = false;

    // Helper function to get the temporary chat button
    function getTempChatButton() {
        return document.querySelector('button[aria-label*="temporary chat"]');
    }

    // Function to enable temporary chat mode
    function activateTemporaryMode() {
        if (userDisabledTempChat) return;

        let attempts = 0;
        const maxAttempts = 5;
        const interval = 500;

        const tryFindButton = setInterval(() => {
            const tempChatButton = getTempChatButton();
            if (tempChatButton) {
                // Add listener to detect manual disabling
                if (!tempChatButton._hasListener) {
                    tempChatButton.addEventListener('click', function() {
                        userDisabledTempChat = this.getAttribute('aria-label') === 'Turn off temporary chat';
                    });
                    tempChatButton._hasListener = true;
                }
                // Enable temporary chat if it’s off
                if (tempChatButton.getAttribute('aria-label') === 'Turn on temporary chat') {
                    tempChatButton.click();
                }
                clearInterval(tryFindButton);
            } else if (attempts++ >= maxAttempts) {
                clearInterval(tryFindButton);
            }
        }, interval);
    }

    // Set up MutationObserver to detect new chats via DOM changes
    function setupMutationObserver() {
        const targetNode = document.querySelector('#conversation-header-actions') || document.body;
        const observer = new MutationObserver(() => {
            const tempChatButton = getTempChatButton();
            if (tempChatButton && tempChatButton.getAttribute('aria-label') === 'Turn on temporary chat') {
                userDisabledTempChat = false; // Reset for new chat
                activateTemporaryMode();
            }
        });
        observer.observe(targetNode, { childList: true, subtree: true });
    }

    // Common handler for history state changes
    function handleStateChange() {
        if (window.location.pathname.startsWith('/c/')) {
            userDisabledTempChat = false;
            activateTemporaryMode();
        }
    }

    // Detect URL changes for chats like /c/<chat_id>
    if (!window._historyWrapped) {
        const originalPushState = history.pushState;
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            handleStateChange();
        };

        const originalReplaceState = history.replaceState;
        history.replaceState = function() {
            originalReplaceState.apply(this, arguments);
            handleStateChange();
        };
        window._historyWrapped = true;
    }

    // Initialize on page load
    window.addEventListener('load', function() {
        setupMutationObserver();
        activateTemporaryMode();
    });
})();
