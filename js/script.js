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
  const answersList = document.getElementById("resultList");
  const questionHeading = document.getElementById("questionHeading");
  questionHeading.innerHTML = "Answer the following questions to find out!";
  questionHeading.style.color = "black";
  answersList.innerHTML = "";
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

  // Suggest languages
  const suggestedLanguages = suggestLanguages(selectedValues);
  const resultListElement = document.getElementById("resultList");
  questionHeading.textContent = "Suggested Programming Languages:";

  const langList = document.createElement("ul");
  for (const language of suggestedLanguages) {
    const langListItem = document.createElement("li");
    langListItem.textContent = language;
    langList.appendChild(langListItem);
  }
  resultListElement.appendChild(langList);
}

function suggestLanguages(selectedValues) {
  const languages = new Set();

  if (selectedValues["What do you want to achieve with programming?"].includes("Web development")) {
    languages.add("JavaScript");
  } else if (
    selectedValues["What do you want to achieve with programming?"].includes("Machine Learning")
  ) {
    languages.add("Python");
  } else if (
    selectedValues["What do you want to achieve with programming?"].includes(
      "Native App Development"
    )
  ) {
    languages.add("C#");
  }

  if (selectedValues["What is your prior experience with programming?"].includes("No experience")) {
    languages.add("Python");
  } else if (
    selectedValues["What is your prior experience with programming?"].includes("Little experience")
  ) {
    languages.add("JavaScript");
  } else if (
    selectedValues["What is your prior experience with programming?"].includes("Very experienced")
  ) {
    languages.add("C#");
  }

  if (
    selectedValues["What is the demand for the language in the job market?"].includes("High demand")
  ) {
    languages.add("JavaScript");
  } else if (
    selectedValues["What is the demand for the language in the job market?"].includes(
      "Moderate demand"
    )
  ) {
    languages.add("Python");
  } else if (
    selectedValues["What is the demand for the language in the job market?"].includes("Low demand")
  ) {
    languages.add("C#");
  }

  if (selectedValues["What is the learning curve of the language?"].includes("Easy")) {
    languages.add("Python");
  } else if (selectedValues["What is the learning curve of the language?"].includes("Moderate")) {
    languages.add("JavaScript");
  } else if (selectedValues["What is the learning curve of the language?"].includes("Difficult")) {
    languages.add("C#");
  }

  if (
    selectedValues["What are the long-term prospects of the language?"].includes("High prospects")
  ) {
    languages.add("JavaScript");
  } else if (
    selectedValues["What are the long-term prospects of the language?"].includes(
      "Moderate prospects"
    )
  ) {
    languages.add("Python");
  } else if (
    selectedValues["What are the long-term prospects of the language?"].includes("Low prospects")
  ) {
    languages.add("C#");
  }

  return languages;
}
