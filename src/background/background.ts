import { ActionConstant } from "../constants/actionConstants";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === ActionConstant.RequestPageChange) {

      // Find the active tab to send message to content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { type: ActionConstant.RequestPageChange });
        }
      });
    }
  });