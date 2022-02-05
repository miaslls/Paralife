const prompt = require("prompt-sync")();

// sleep function

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

// get random integer between min and max (inclusive)

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// validade prompt - integer > 0

const validatePositiveInt = (question, errorMessage) => {
  while (true) {
    let num = prompt(question);

    if (!isNaN(num) && num > 0 && num % 1 == 0) {
      return num;
    }

    console.log(errorMessage);
  }
}

// validade prompt - integer between max and min (inclusive)

const validateIntMinMax = (question, errorMessage, max, min = 0) => {
  while (true) {
    let num = prompt(question);

    if (!isNaN(num) && num >= min && num <= max && num % 1 == 0) {
      return num;
    }

    console.log(errorMessage);
  }
}

// sort an object array by key

objectList.sort((a, b) => a.key - b.key); // crescente
objectList.sort((a, b) => b.key - a.key); // descrescente

objectList.forEach((instance) => {
console.log(`${instance.key} ${instance.key2}`);
});

/* formata o texto como título ex:

--------------
qualquer texto
--------------

*/

const formatToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (i = 0; i < text.length; i++)
    separatorLine = separatorLine.concat(separator);

  console.log(`\n${separatorLine}\n${text}\n${separatorLine}\n`);

};

// formata o prompt. ex: `> prompt message `

const formatPrompt = (message) => prompt(`> ${message} `);

formatPrompt("digite ENTER para continuar");

let name = formatPrompt("digite seu nome");

// validação geral

while (true) {
  VARIAVEL =  prompt(`PERGUNTA`);
  if (VALIDACAOVERDADEIRA) {
    break;
  }
  console.log(`MENSAGEM DE ERRO`)
}