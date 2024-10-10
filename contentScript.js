function saveData(key, value) {
  chrome.storage.local.set({ [key]: value }, () => {});
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NEW" && message.handleInternshala) {
    handleInternshala();
  }
});

function handleInternshala() {
  let coverLetter = ``;
  let memo = {};
  loadData("memo", (value) => {
    memo = value || {};
  });
  loadData("coverLetter", (value) => {
    coverLetter = value;
  });

  setTimeout(() => {
    document.querySelector(".ic-16-reschedule")?.click();
  }, 10);

  setTimeout(() => {
    document.querySelector("#continue_button")?.click();
    document.querySelector("#apply_now_button")?.click();
    document.querySelector("#easy_apply_button")?.click();
  }, 2000);

  setTimeout(() => {
    document.querySelector(".proceed-btn")?.click();

    const coverLetterHolder = document.getElementById("cover_letter");
    if (coverLetterHolder) coverLetterHolder.value = coverLetter;
    else document.querySelector(".copyCoverLetterTitle")?.click();

    const check = document.getElementById("check");
    if (check) check.checked = true;

    const addQues = document.querySelectorAll(".additional_question");

    addQues.forEach((addQues) => {
      const questionElement = addQues.querySelector(
        ".assessment_question label"
      );
      const textarea = addQues.querySelector("textarea");

      const questionText = questionElement.innerText;

      textarea.value = memo[questionText] || "";

      textarea.addEventListener("input", () => {
        memo[questionText] = textarea.value;
      });
    });

    const submitButton = document.querySelector("#submit");
    if (addQues.length === 0) {
      submitButton?.click();
      afterSubmitHandle();
    } else {

      submitButton?.addEventListener("click", () => {
        userClickedSubmit = true;
        afterSubmitHandle();
      });
    }
  }, 2000);

  saveData("memo", JSON.stringify(memo));
}

function afterSubmitHandle() {
  setTimeout(() => {
    document.querySelector("#dismiss_similar_job_modal")?.click();
    handleInternshala();
  }, 2000);
}