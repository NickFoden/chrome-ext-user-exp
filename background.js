let current_active_tabId = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  current_active_tabId = tabId;
  if (changeInfo.status === "complete" && tab.url.includes("http")) {
    chrome.tabs.insertCSS(
      current_active_tabId,
      { file: "./foreground.css" },
      () => {
        chrome.tabs.executeScript(
          current_active_tabId,
          { file: "./foreground.js" },
          () => {
            console.log("injected and inserted");
          }
        );
      }
    );
  }
});

chrome.tabs.onActivated.addListener((activeInfo, windowId) => {
  current_active_tabId = activeInfo.tabId;
});
