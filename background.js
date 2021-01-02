let current_active_tabId = null;
let THEME = null;

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

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.message === "set_theme") {
    THEME = req.payload;
    chrome.runtime.sendMessage(
      {
        message: "change_theme",
        payload: THEME,
      },
      () => {
        sendResponse({ message: "succes" });
      }
    );
  } else if ((req.message = "set_ranking_data")) {
    chrome.tabs.sendMessage(
      current_active_tabId,
      {
        message: "display_message",
        payload: req.payload.ranking,
      },
      () => {
        sendResponse({ message: "success" });
      }
    );
  }
  return true;
});
