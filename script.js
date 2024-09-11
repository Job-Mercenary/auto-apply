function saveData(key, value) {
  chrome.storage.local.set({ [key]: value }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error saving data:", chrome.runtime.lastError);
    } else {
      console.log("Data saved:", key, value);
    }
  });
}

function loadData(key, callback) {
  chrome.storage.local.get([key], (result) => {
    if (chrome.runtime.lastError) {
      console.error("Error getting data:", chrome.runtime.lastError);
    } else {
      callback(result[key]);
    }
  });
}

document
  .getElementById("internshala")
  .addEventListener("click", handleInternshala);
document
  .getElementById("coverletterView")
  .addEventListener("click", handleCoverletterView);
document
  .getElementById("coverletterUpdate")
  .addEventListener("click", handleCoverletterUpdate);

function handleInternshala() {
  window.open(
    "https://internshala.com/internships/matching-preferences/",
    "_blank"
  );
}

function handleCoverletterView() {
  loadData("coverLetter", (value) => {
    document.getElementById("coverletterDisplay").innerText =
      value || "No cover letter found.";
  });
}

function handleCoverletterUpdate() {
  const container = document.getElementById("coverletterDisplay");
  container.innerHTML = "";

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Enter a General Cover Letter";
  textarea.id = "dynamic-input";
  container.appendChild(textarea);

  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  container.appendChild(submitButton);
  submitButton.onclick = getInputValue;
}

function getInputValue() {
  const input = document.getElementById("dynamic-input");
  const coverLetter = input.value.trim(); // Trim whitespace

  if (coverLetter) {
    saveData("coverLetter", coverLetter);
    document.getElementById("coverletterDisplay").innerText = coverLetter;
  } else {
    console.error("Cover letter is empty.");
  }
}