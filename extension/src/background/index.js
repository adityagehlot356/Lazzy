// Background service worker for Manifest V3

chrome.runtime.onInstalled.addListener(() => {
  console.log("IntelliAsk AI Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    console.log("Summarize action triggered in background");
    sendResponse({ status: "success", data: "Summary placeholder" });
  }
  return true; // Keep the message channel open for async response
});

