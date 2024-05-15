chrome.runtime.onInstalled.addListener(() => {
  console.log("Email Scraper Extension Installed");
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
