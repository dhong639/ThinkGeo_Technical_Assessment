export function switchTab(element, contentId) {
  for (let tab of document.getElementById("tabs").children) {
    tab.className = "";
    if (tab === element) {
      element.className = "is-active";
    }
  }
  for (let content of document.getElementById("tabContentBlock").children) {
    content.className = "content-tab";
    if (content.id !== contentId) {
      content.className += " is-hidden";
    }
  }
}
