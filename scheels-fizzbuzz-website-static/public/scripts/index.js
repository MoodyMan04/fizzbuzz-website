"use strict";

// Imports
import { validateGenerateInputs } from "./generate-validation.js";

// When the page is loaded, set up variables, buttons, button click events, etc.
document.addEventListener("DOMContentLoaded", () => {
  // Get elements of main page, specifically the header, input, output, and buttons.
  const body = document.body;
  const header = document.getElementById("mainHeader");
  const minInput = document.getElementById("minInput");
  const maxInput = document.getElementById("maxInput");
  const textThreeInput = document.getElementById("textThreeInput");
  const textFiveInput = document.getElementById("textFiveInput");
  const outputText = document.getElementById("outputText");
  const runBtn = document.getElementById("runBtn");
  const resetBtn = document.getElementById("resetBtn");
  const themeBtn = document.getElementById("themeBtn");

  // Apply dark mode if saved on local.
  if (localStorage.getItem("dark-mode") === "true")
    body.classList.add("dark-mode");

  // Hide header when scrolling down, reappear when scrolling up.
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (window.scrollY > lastScrollY) {
      // Scrolling down
      header.classList.add("hidden-up");
    } else {
      // Scrolling up
      header.classList.remove("hidden-up");
    }

    lastScrollY = currentScrollY;
  });

  // Function for the run button's click event.
  runBtn.addEventListener("click", async () => {
    // Get the value of the input elements and add it to a payload mapping.
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    const textThree = textThreeInput.value;
    const textFive = textFiveInput.value;

    console.log(
      `Running FizzBuzz with min: ${min}, max: ${max}, textThree: ${textThree}, textFive: ${textFive}`
    );

    // Check if inputs are valid. If not, return error instead.
    const errors = validateGenerateInputs(min, max, textThree, textFive);
    if (errors.length) {
      outputText.textContent = `${errors.join("\n")}`;
      return;
    }

    // Have the outputText display 'Running...' while generating result.
    outputText.textContent = "Running...";

    // Run FizzBuzz logic.
    const output = [];
    for (let i = min; i <= max; i++)
      output.push((i % 3 ? "" : textThree) + (i % 5 ? "" : textFive) || i);

    // Place output into output text.
    outputText.textContent = output.join("\n");
  });

  // Function for the reset button's click event.
  resetBtn.addEventListener("click", () => {
    // Reset all text and values for FizzBuzz.
    outputText.textContent = "";
    minInput.value = 1;
    maxInput.value = 100;
    textThreeInput.value = "SCHEELS";
    textFiveInput.value = ".COM";
  });

  // Function for the theme button's click event.
  themeBtn.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", isDark);
  });
});
