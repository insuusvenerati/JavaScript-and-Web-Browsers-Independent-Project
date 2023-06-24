window.addEventListener("load", () => {
  const form = document.querySelector("form");
  const submitButton = form.querySelector("button");
  const resetButton = document.getElementById("resetForm");
  resetButton.addEventListener("click", resetForm);
  submitButton.addEventListener("click", handleSubmit);
});

/**
 * Resets the form and shows it again
 * @param {MouseEvent} event
 */
function resetForm() {
  const form = document.querySelector("form");
  const resultList = document.getElementById("result");
  resultList.innerHTML = "";
  form.reset();
  form.classList.remove("hidden");
}

/**
 * Handles the button click event
 * @param {MouseEvent} event
 */
function handleSubmit(event) {
  event.preventDefault();
  const form = document.querySelector("form");
  const questionHeading = document.getElementById("questionHeading");
  questionHeading.innerHTML = "Programming language chosen for you";
  questionHeading.style.color = "green";
  form.classList.add("hidden");

  const elements = form.elements;

  // Get the selected values
  let selectedValues = {};

  for (const element of elements) {
    if (element.tagName === "SELECT") {
      const selectId = element.id;
      const selected = [...element.selectedOptions]
        .filter((option) => option.value !== "disabled")
        .map((option) => option.value);
      selectedValues[selectId] = selected;
    }
  }

  // Show questions with answers
  const answeredQuestionsList = document.getElementById("result");
  answeredQuestionsList.innerHTML = "";
  for (const [selectId, values] of Object.entries(selectedValues)) {
    // Create a title for each selected value based on the select id
    const resultTitle = document.createElement("h3");
    resultTitle.textContent = selectId;
    answeredQuestionsList.appendChild(resultTitle);

    const resultList = document.createElement("ul");
    for (const value of values) {
      const resultListItem = document.createElement("li");
      resultListItem.textContent = value;
      resultList.appendChild(resultListItem);
    }
    answeredQuestionsList.appendChild(resultList);
  }
}

const mockData = {
  question1: ["question1_answer1"],
  question2: ["question2_answer1"],
  question3: ["question3_answer1"],
  question4: ["question4_answer1"],
  question5: ["question5_answer1"],
};
