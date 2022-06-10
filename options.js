function saveOptions(e) {
  e.preventDefault();
  pageload = document.querySelector("#pageload").checked
  browser.storage.sync.set({
    pageload: pageload
  });
  console.log("Deshortify: Storing '" + pageload + "' value for navigation on page load...")
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#pageload").checked = result.pageload;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("pageload");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
