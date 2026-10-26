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

chrome.runtime.onInstalled.addListener(() => {
  injectIntoAllConvoseTabs();
});

chrome.runtime.onStartup.addListener(() => {
  injectIntoAllConvoseTabs();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("convose.com") && (changeInfo.status === "loading" || changeInfo.status === "complete")) {
    injectIntoTab(tabId);
  }
});
