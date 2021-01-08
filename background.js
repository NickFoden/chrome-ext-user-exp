let current_active_tabId = null;
let THEME = null;

function init() {
  try {
    chrome.storage.local.get(["theme"], (result) => {
      THEME = result.theme || "light";
    });
  } catch (err) {
    THEME = "light";
  }
}

init();

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

    try {
      chrome.storage.local.set({ theme: THEME }, () => {
        chrome.runtime.sendMessage(
          {
            message: "change_theme",
            payload: THEME,
          },
          () => {
            sendResponse({ message: "success" });
          }
        );
      });
    } catch (err) {
      sendResponse({ message: "fail" });
    }
  } else if (req.message === "set_ranking_data") {
    try {
      chrome.tabs.get(current_active_tabId, (tab) => {
        let domain = tab.url.substring(tab.url.indexOf("/") + 2);
        domain = domain.substring(0, domain.indexOf("/"));
        const user_data_object = {};

        user_data_object[domain] = {
          ranking: req.payload.ranking,
          comment: req.payload.comment,
        };
        chrome.storage.local.set(user_data_object, () => {
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
        });
      });
    } catch (err) {
      sendResponse({ message: "fail" });
    }
  } else if (req.message === "get_theme") {
    sendResponse({
      message: "success",
      payload: THEME,
    });
  } else if (req.message === "get_ranking_data") {
    try {
      chrome.tabs.get(current_active_tabId, (tab) => {
        let domain = tab.url.substring(tab.url.indexOf("/") + 2);
        domain = domain.substring(0, domain.indexOf("/"));

        chrome.storage.local.get([domain], (result) => {
          if (result[domain]) {
            sendResponse({
              message: "success",
              payload: {
                ranking: result[domain].ranking,
                comment: result[domain].comment,
              },
            });
          } else {
            sendResponse({
              message: "success",
              payload: { ranking: 1, comment: "" },
            });
          }
        });
      });
    } catch (err) {
      sendResponse({
        message: "success",
        payload: { ranking: 1, comment: "" },
      });
    }
  }
  return true;
});
