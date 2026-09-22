// Background service worker for Manifest V3

chrome.runtime.onInstalled.addListener(() => {
  console.log("IntelliAsk AI Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    console.log("Summarize action triggered in background");
    // Connect to backend API
    fetch("http://localhost:8000/notes/universal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problem_id: "example-id",
        platform: "General",
        note_content: "Automated summary placeholder"
      })
    })
    .then(res => res.json())
    .then(data => sendResponse({ status: "success", data: data }))
    .catch(err => sendResponse({ status: "error", error: err.toString() }));
  }
  return true; // Keep the message channel open for async response
});

