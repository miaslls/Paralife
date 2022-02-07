const prompt = require("prompt-sync")();

// ----- VALIDATION -----

// general validation

while (true) {
  VARIAVEL =  prompt(`PERGUNTA`);
  if (VALIDACAOVERDADEIRA) {
    break;
  }
  console.log(`MENSAGEM DE ERRO`)
}

// validate for empty string

const validatePromptString = (message, errorMessage = "INVÁLIDO") => {
  while (true) {
    let string = prompt(message);

    if (string.length > 0) {
      return string;
    }
    console.log(`\n${errorMessage}\n`);
  }
}

// validade prompt - integer > 0

const validatePromptPositiveInt = (message, errorMessage = "INVÁLIDO") => {
  while (true) {
    let num = prompt(message);

    if (!isNaN(num) && num > 0 && num % 1 == 0) {
      return num;
    }
    console.log(errorMessage);
  }
}

// validade prompt - integer between max and min (inclusive)

const validatePromptIntMinMax = (message, max, min = 0, errorMessage = "INVÁLIDO") => {
  while (true) {
    let num = prompt(message);

    if (!isNaN(num) && num >= min && num <= max && num % 1 == 0) {
      return num;
    }
    console.log(errorMessage);
  }
}

// ----- FORMAT FUNCTIONS -----

/* format text as title. ex:

------------
example text
------------

*/

const formatToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (i = 0; i < text.length; i++) {
    separatorLine = separatorLine.concat(separator);
  }
  console.log(`\n${separatorLine}\n${text}\n${separatorLine}\n`);
}

// format single line prompt ex: > message (prompt)

const formatPrompt = (message) => prompt(`> ${message} `);

/* format multiple line prompt. ex: 
> message 
> (prompt)
*/

const formatPromptMultipleLines = (message) => {
  console.log(message)
  return prompt(`> `);
}

// ----- OTHER -----

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

// sort an object array by key

objectList.sort((a, b) => a.key - b.key); // crescente
objectList.sort((a, b) => b.key - a.key); // descrescente

objectList.forEach((instance) => {
console.log(`${instance.key} ${instance.key2}`);
});

// requires json file

const variableName = require('./fileName.json');

// ----- CODE TO ANALIZE

// TODO: função do colega SuiCarrot para criação de objetos

function criarJogador(qtd) {
  //Função para construir jogadores, como objetos

  for (let i = 0; i < qtd; i++) {
    let jogador = {
      nome: nomes[i],
      dado: 0,
      vitorias: 0,
    };
    jogadores.push(jogador);
  }
  return jogadores;
}

const jogadores = []; //Definição dos arrays de jogadores e array de nomes
const nomes = [];

  //Definição da quantidade de jogadores e dos nomes de cada um

  console.log(`Quantos jogadores irão jogar?`);
  let qtdadeJogadores = +prompt(``);
  for (i = 0; i < qtdadeJogadores; i++) {
    let nome = prompt(`Digite o nome do jogador ${i + 1}: `);
    nomes.push(nome);
  }
  criarJogador(qtdadeJogadores); //Criação dos objetos jogadores