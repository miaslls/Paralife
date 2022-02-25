"use strict"; // catador de 🐞
const prompt = require("prompt-sync")(); // requer o prompt

// 📌📌📌 ----- FORMATTING / VALIDATION FUNCTIONS -----

// formata o texto como título

const formatToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (let i = 0; i < text.length; i++) {
    separatorLine = separatorLine.concat(separator);
  }

  console.log(`${separatorLine}\n${text}\n${separatorLine}\n`);
};

// formata o prompt em uma linha única
const formatPrompt = (message) => prompt(`> ${message} `);

// formata o prompt em múltiplas linhas

const formatPromptMultipleLines = (message) => {
  console.log(message);
  return prompt(`> `);
};

// valida números inteiros > min

const validatePromptIntMin = (message, errorMessage, min) => {
  while (true) {
    let num = formatPromptMultipleLines(message);

    if (!isNaN(num) && num >= min && num % 1 == 0) {
      return num;
    }

    console.log(`\n${errorMessage}\n`);
  }
};

// valida string não vazia

const validatePromptString = (message, errorMessage) => {
  while (true) {
    let string = formatPromptMultipleLines(message);

    if (string.length > 0) {
      return string;
    }

    console.log(`\n${errorMessage}\n`);
  }
};

// retorna valor inteiro aleatório ente min e max (inclusive min e max)

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 📌📌📌 ----- OBJECTS / METHODS DEFINITION -----

// 📌📌 define a classe Player (jogador)

class Player {
  constructor(index, name, wins = 0) {
    this.index = index;
    this.name = name;
    this.wins = wins;
  }
}

// 📌📌 ----- SET UP -----

const setUp = {
  // 📌 exibe informações do jogo

  showGameInfo: function () {
    console.clear();
    formatToTitle("DICE GAME");

    console.log(`‼ mínimo 2 jogadores

vencedor da RODADA  - aquele que rolar o maior valor no dado.
vencedor da PARTIDA - aquele que vencer o maior número de rodadas.
`);
  },

  // 📌 solicita o número de jogadores

  getNumberOfPlayers: function () {
    return validatePromptIntMin(
      "\nnúmero de jogadores:",
      "digite um NÚMERO INTEIRO >= 2",
      2
    );
  },

  // 📌 solicita o número de rodadas

  getNumberOfRounds: function () {
    return validatePromptIntMin(
      "\nnúmero de rodadas:",
      "digite um NÚMERO INTEIRO > 0",
      2
    );
  },

  // 📌 solicita o nome do jogador

  getPlayerName: function (playerNumber) {
    let playerName = validatePromptString(
      `\nnome do jogador # ${playerNumber}`,
      "NOME NÃO PODE SER VAZIO"
    );
    return playerName;
  },

  // 📌 constrói a lista de jogadores

  buildPlayerList: function (numberOfPlayers) {
    const playerObjectList = [];

    for (let player = 0; player < numberOfPlayers; player++) {
      let playerNumber = player + 1;
      let playerName = this.getPlayerName(playerNumber);

      let playerObject = new Player(player, playerName, 0);
      playerObjectList.push(playerObject);
    }

    return playerObjectList;
  },
};

// 📌📌 encapsula os métodos do objeto game

const game = {
  rollDice: function (playerObjectList) {
    for (let player of playerObjectList) {
      let diceRoll = getRandomIntInclusive(1, 6);
      player["lastRoll"] = diceRoll;
      console.log(`\t${player["name"]} rolou ${player["lastRoll"]}`);
    }
  },

  // 📌 organiza os objetos (player) por ordem decrescente de resultado (por rodada / partida)

  sortByWinner: function (playerObjectList, type) {
    switch (type) {
      case "round": {
        playerObjectList.sort((a, b) => b.lastRoll - a.lastRoll);
        break;
      }
      case "game": {
        playerObjectList.sort((a, b) => b.wins - a.wins);
        break;
      }
    }
  },

  // 📌 reseta os objetos (player) por ordem de entrada

  sortByInput: function (playerObjectList) {
    playerObjectList.sort((a, b) => a.index - b.index);
  },

  // 📌 exibe o vencedor (rodada / partida)

  getWinner: function (playerObjectList, type) {
    switch (type) {
      case "round": {
        if (playerObjectList[0].lastRoll == playerObjectList[1].lastRoll) {
          console.log(`\nEMPATE! ninguém vence a rodada.`);
        } else {
          console.log(`\no vencedor da rodada é ${playerObjectList[0].name}.`);
          playerObjectList[0].wins++;
        }
        break;
      }
      case "game": {
        if (playerObjectList[0].wins == playerObjectList[1].wins) {
          console.log(`\nEMPATE! ninguém vence a partida.`);
        } else {
          console.log(
            `\no vencedor da partida é ${playerObjectList[0].name} ❤`
          );
        }
        console.log();
      }
    }
  },

  // 📌 continua para o próximo round / resultados

  next: function (numberOfRounds, currentRound) {
    if (currentRound < numberOfRounds - 1) {
      console.log();
      formatPrompt("digite ENTER para próxima rodada");
      console.clear();
    } else {
      console.log();
      formatPrompt("digite ENTER para resultados da partida");
      console.clear();
    }
  },

  // 📌 executa as rodadas de acordo com o número escolhida

  playRound: function (playerObjectList, numberOfRounds) {
    console.clear();

    for (let round = 0; round < numberOfRounds; round++) {
      formatToTitle(`RODADA # ${round + 1}`);
      this.rollDice(playerObjectList);
      this.sortByWinner(playerObjectList, "round");
      this.getWinner(playerObjectList, "round");
      this.next(numberOfRounds, round);
      this.sortByInput(playerObjectList);
    }
  },

  // 📌 exibe os resultados do jogo

  getResults: function (playerObjectList) {
    formatToTitle("RESULTADOS");

    for (let player of playerObjectList) {
      console.log(`\t${player["name"]} - ${player["wins"]} rodada(s)`);
    }

    this.sortByWinner(playerObjectList, "game");
    this.getWinner(playerObjectList, "game");
  },
};

// 📌📌📌 ----- CODE START -----

setUp.showGameInfo();

const numberOfPlayers = setUp.getNumberOfPlayers();
const numberOfRounds = setUp.getNumberOfRounds();
const playerObjectList = setUp.buildPlayerList(numberOfPlayers);

console.log();
formatPrompt("digite ENTER para começar a partida");

game.playRound(playerObjectList, numberOfRounds);
game.getResults(playerObjectList);
