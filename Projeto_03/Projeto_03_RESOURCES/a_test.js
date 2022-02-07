const prompt = require("prompt-sync")();

// valida números inteiros > 0

let validatePromptPositiveInt = (message, errorMessage) => {
  while (true) {
    let num = prompt(`> ${message} `);

    if (!isNaN(num) && num > 0 && num % 1 == 0) {
      return num;
    }
    console.log(`\n${errorMessage}`);
  }
};

// retorna valor inteiro aleatório ente min e max (inclusive min e max)

let getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// ----------

const formatStringToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (i = 0; i < text.length; i++) {
    separatorLine = separatorLine.concat(separator);
  }

  console.log(`${separatorLine}\n${text}\n${separatorLine}\n`);

}

formatStringToTitle("qualquer texto");

// ----------

const formatPrompt = (message) => prompt(`> ${message} `);

formatPrompt("digite ENTER para continuar");

let name = formatPrompt("digite seu nome");

console.log(name);

// ----------

// validate for empty string

const validatePromptString = (message = "", errorMessage) => {
  while (true) {
    let string = prompt(message);

    if (string.length > 0) {
      return string;
    }
    console.log(errorMessage);
  }
}

validatePromptString("nome:", "nome não pode ser vazio")