function injectIntoTab(tabId) {
  chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    files: ["content.js"]
  }).catch(() => {
    // Ignore tabs where scripting is not permitted
  });
}

function injectIntoAllConvoseTabs() {
  chrome.tabs.query({ url: ["*://*.convose.com/*", "*://convose.com/*"] }, (tabs) => {
    if (chrome.runtime.lastError || !tabs) return;
    for (const tab of tabs) {
      if (tab.id) {
        injectIntoTab(tab.id);
      }
    }
  });
}

// After an install or reload, old copies of the content script may still run in open tabs.
// Reloading the tabs gives a clean start with only the new script.
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ url: ["*://*.convose.com/*", "*://convose.com/*"] }, (tabs) => {
    if (chrome.runtime.lastError || !tabs) return;
    for (const tab of tabs) {
      if (tab.id) chrome.tabs.reload(tab.id);
    }
  });
});

chrome.runtime.onStartup.addListener(() => {
  injectIntoAllConvoseTabs();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("convose.com") && (changeInfo.status === "loading" || changeInfo.status === "complete")) {
    injectIntoTab(tabId);
  }
});
