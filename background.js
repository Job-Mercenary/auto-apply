chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes(
      "https://internshala.com/internships/matching-preferences/"
    )
  ) {
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      handleInternshala: true,
    });
  }
});
