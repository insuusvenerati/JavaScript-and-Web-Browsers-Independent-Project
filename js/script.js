window.addEventListener("load", () => {
  const form = document.querySelector("form");
  const submitButton = form.querySelector("button");
  submitButton.addEventListener("click", handleSubmit);
});

/**
 * Determines the suggested language based on the form data
 * @param {FormData} formData
 */
function determineSuggestedLanguage(formData) {}

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

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = "";

  for (const [selectId, values] of Object.entries(selectedValues)) {
    // Create a title for each selected value based on the select id
    const resultTitle = document.createElement("h3");
    resultTitle.textContent = selectId;
    resultElement.appendChild(resultTitle);

    const resultList = document.createElement("ul");
    for (const value of values) {
      const resultListItem = document.createElement("li");
      resultListItem.textContent = value;
      resultList.appendChild(resultListItem);
    }
    resultElement.appendChild(resultList);
  }
}
