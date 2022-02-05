const prompt = require("prompt-sync")();

// valida números inteiros > 0

let validatePositiveInt = (question, errorMessage) => {
  while (true) {
    let num = prompt(`> ${question} `);

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

  for (i = 0; i < text.length; i++)
    separatorLine = separatorLine.concat(separator);

  console.log(`${separatorLine}\n${text}\n${separatorLine}\n`);

};

formatStringToTitle("qualquer texto");

// ----------

const formatPrompt = (message) => prompt(`> ${message} `);

formatPrompt("digite ENTER para continuar");

let name = formatPrompt("digite seu nome");

console.log(name);