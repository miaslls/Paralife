const prompt = require("prompt-sync")();
const formatFunctions = require("./formatting.js");

// ----- VALIDATION FUNCTIONS -----

// impede o input de string vazia

exports.validatePromptString = (message, errorMessage = "INVÁLIDO") => {
  while (true) {
    let string = formatFunctions.formatPromptMultipleLines(message);

    if (string.length > 0) {
      return string;
    }
    console.log(`\n${errorMessage}\n`);
  }
};

// valida NÚMERO INTEIRO entre MIN e MAX (inclusive min e max)

exports.validatePromptIntMinMax = (
  message,
  max,
  min = 0,
  errorMessage = "INVÁLIDO"
) => {
  while (true) {
    let num = formatFunctions.formatPromptMultipleLines(message);

    if (!isNaN(num) && num >= min && num <= max && num % 1 == 0) {
      return parseInt(num);
    }
    console.log(errorMessage);
  }
};