console.log("[background.js]", "Hello World!");

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          pathSuffix: "\.md"
        }
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});