"use strict";

chrome.contextMenus.create({
  id: "copyAsMarkup",
  title: "SlackのMarkdown風記法に変換してコピー",
  contexts: ["selection"],
});

chrome.contextMenus.create({
  id: "copyAsMarkupWithQuote",
  title: "SlackのMarkdown風記法に変換してコピー(引用記号付き)",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  await chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func: (isWithQuote) => {
      return copyAsMarkup(isWithQuote);
    },
    args: [info.menuItemId === "copyAsMarkupWithQuote"],
  });
});
