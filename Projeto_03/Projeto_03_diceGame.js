//----- FUNCTIONS -----

// requer o prompt

const prompt = require("prompt-sync")();

/* formata o texto como título. ex:

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

// formata o prompt em uma linha única . ex: > message (prompt)

const formatPrompt = (message) => prompt(`> ${message} `);

/* formata o prompt em múltiplas linhas. ex: 
> message 
> (prompt)
*/

const formatPromptMultipleLines = (message) => {
  console.log(message)
  return prompt(`> `);
}

// valida números inteiros > min

const validatePromptPositiveIntMin = (message, errorMessage, min) => {
  while (true) {

    let num = formatPromptMultipleLines(message);

    if (!isNaN(num) && num >= min && num % 1 == 0) {
      return num;
    }

    console.log(`\n${errorMessage}\n`);
  }
}

// valida string não vazia

const validatePromptString = (message, errorMessage) => {
  while (true) {
    let string = formatPromptMultipleLines(message);

    if (string.length > 0) {
      return string;
    }

    console.log(`\n${errorMessage}\n`);
  }
}

// retorna valor inteiro aleatório ente min e max (inclusive min e max)

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// construtor do objeto player

function Player(index, name, wins = 0) {
  this.index = index, 
  this.name = name, 
  this.wins = wins;
}

//----- CODE START -----

formatToTitle("DICE GAME");

console.log(`+ mínimo 2 jogadores

vencedor da RODADA  - aquele que rolar o maior valor no dado.
vencedor da PARTIDA - aquele que vencer o maior número de rodadas.

`);

// solicita e valida jogadores e rodadas

console.log(`SELECIONE:\n`);

const numberOfPlayers = validatePromptPositiveIntMin(
  "número de jogadores:",
  "digite um NÚMERO INTEIRO >= 2",
  2
);

const numberOfRounds = validatePromptPositiveIntMin(
  "número de rodadas:",
  "digite um NÚMERO INTEIRO >= 1",
  1
);

console.log();

const playerObjectList = [];
let playerObject;

// cria um objeto para cada jogador

for (i = 0; i < numberOfPlayers; i++) {
  let playerName = validatePromptString(`nome do jogador #${i + 1}`, "nome não pode ser vazio");
  playerObject = new Player(i, playerName);
  playerObjectList.push(playerObject);
}

console.log();
formatPrompt("digite ENTER para começar a partida");

// repete pelo número de rodadas selecionado

for (j = 0; j < numberOfRounds; j++) {
  formatToTitle(`rodada ${j + 1}`);

  // define e exibe o resultado da rodada para cada jogador

  playerObjectList.forEach((instance) => {
    diceRoll = getRandomIntInclusive(1, 6);
    instance.result = diceRoll;
    console.log(`\t${instance.name} rolou ${instance.result}`);
  });

  // organiza os objetos (player) por ordem decrescente de resultado (por rodada)

  playerObjectList.sort((a, b) => b.result - a.result);

  // exibe o vencedor da rodada

  if (playerObjectList[0].result == playerObjectList[1].result) {
    console.log(`\nempate, ninguém vence a rodada.`);
  } else {
    console.log(`\no vencedor da rodada é ${playerObjectList[0].name}.`);
    playerObjectList[0].wins++;
  }

  if (j < numberOfRounds - 1) {
    console.log();
    formatPrompt("digite ENTER para próxima rodada");
  } else {
    console.log();
    formatPrompt("digite ENTER para resultados da partida")
  }

  // reseta os objetos (player) por ordem de entrada

  playerObjectList.sort((a, b) => a.index - b.index);
}

formatToTitle("RESULTADOS");

// exibe o número de rodadas que cada jogador venceu

playerObjectList.forEach((instance) => {
  console.log(`\t${instance.name} - ${instance.wins} rodadas`);
});

// organiza os objetos (player) por ordem decrescente de vitórias

playerObjectList.sort((a, b) => b.wins - a.wins);

// exibe o vencedor da partida

if (playerObjectList[0].wins == playerObjectList[1].wins) {
  console.log(`\nempate, ninguém vence a partida.`);
} else {
  console.log(`\no vencedor da partida é ${playerObjectList[0].name} ❤`);
}
console.log();