# ChatGPT Userscripts

- [Introduction](#introduction)
- [Installation Instructions](#installation-instructions)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)
- [Additional Notes](#additional-notes)

## Introduction

Welcome to the ChatGPT Userscripts repository! This collection includes various user scripts designed to enhance your experience with ChatGPT, the AI assistant developed by OpenAI. For more information on ChatGPT and its capabilities, visit the [official OpenAI website](https://openai.com). **Please note that I am in no way affiliated with OpenAI.**

⚠️ **DISCLAIMER**: These scripts are provided "AS IS" without warranty of any kind. Use them at your own risk. The authors are not responsible for any consequences of using these scripts, including but not limited to:
- Account-related issues
- Data loss or corruption
- Browser performance problems
- Any changes to ChatGPT's functionality or behavior
- Terms of Service violations

## Installation Instructions

1. Install a userscript manager like [Violentmonkey](https://violentmonkey.github.io/)
2. Click on any script in the list below to install it, or manually add scripts using your userscript manager's "Install from URL" feature

These scripts have been tested with Firefox and Violentmonkey on macOS, but should work with other browsers and userscript managers as well.

## Available Scripts

| Script Name | Description |
|-------------|-------------|
| [`chatgpt-delete-chat-shortcut.user.js`](chatgpt-delete-chat-shortcut.user.js) | Enables quick deletion of chats on chatgpt.com using Cmd/Ctrl+Shift+Delete, with automatic confirmation of the deletion prompt. |
| [`chatgpt-private-chat-shortcut.user.js`](chatgpt-private-chat-shortcut.user.js) | Adds keyboard shortcut (Cmd+Shift+J on macOS, Ctrl+Shift+J on Windows/Linux) to quickly toggle temporary chat mode without using the mouse. |
| [`chatgpt-temp-chat-by-default.user.js`](chatgpt-temp-chat-by-default.user.js) | Automatically redirects to the temporary chat mode on chatgpt.com when accessing the root path (`/`) or `/chat`. |
| [`chatgpt-think-shortcut.user.js`](chatgpt-think-shortcut.user.js) | Adds keyboard shortcut (Ctrl+Cmd+T on macOS, Ctrl+Alt+T on Windows/Linux) to quickly toggle ChatGPT's "Think for longer" mode without using the mouse. |

## Contributing

Submit a pull request or open an issue to discuss your ideas for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Additional Notes

1. **Security & Maintenance**:
   - Review script code before installation
   - Keep all components (scripts, userscript manager) updated
   - Report security concerns via issues

2. **Performance & Compatibility**:
   - Scripts may behave differently across browsers and systems
   - Scripts may conflict with each other or extensions
   - Report compatibility issues

3. **Future Changes**:
   - Scripts may need updates when ChatGPT changes
   - Features may become officially supported
   - Consider contributing fixes

By installing and using these scripts, you acknowledge that you do so at your own risk. The authors and contributors cannot be held liable for any issues that may arise from their use.
