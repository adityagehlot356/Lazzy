// Content script injected into web pages

console.log("IntelliAsk AI Content Script Loaded");

document.addEventListener('mouseup', () => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        console.log("User selected text:", selectedText);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract_page_content") {
        const pageText = document.body.innerText;
        // Attempt to extract LeetCode title if we are on LeetCode
        let leetcodeTitle = "";
        const titleElement = document.querySelector('div[data-cy="question-title"]');
        if (titleElement) {
            leetcodeTitle = titleElement.innerText;
        }
        sendResponse({ content: pageText, leetcodeTitle: leetcodeTitle });
    }
});

