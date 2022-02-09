// ----- FUNCTIONS -----//

// solicita recursos necessários (prompt/jSON)

const prompt = require("prompt-sync")();
const activityList = require("./activityList.json");

// ----- FORMAT FUNCTIONS ----- TODO: REMOVE UNUSED FUNCTIONS ⚠

/* formata o texto como título. ex:
------------
example text
------------

*/

const formatToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (i = 0; i < text.length; i++) {
    separatorLine = separatorLine.concat(separator);
  }
  return `${separatorLine}\n${text}\n${separatorLine}\n`;
};

// formata o prompt em linha única ex: > message (prompt)

const formatPrompt = (message) => prompt(`> ${message} `);

/* formata o prompt em múltiplas linhas. ex: 
  > message 
  > (prompt)
  */

const formatPromptMultipleLines = (message) => {
  console.log(message);
  return prompt(`> `);
};

// ----- VALIDATION FUNCTIONS -----

// impede o input de string vazia

const validatePromptString = (message, errorMessage = "INVÁLIDO") => {
  while (true) {
    let string = formatPromptMultipleLines(message);

    if (string.length > 0) {
      return string;
    }
    console.log(`\n${errorMessage}\n`);
  }
};

// valida número inteiro entre min e max (inclusive min e max)
//FIXME: prettier

const validatePromptIntMinMax = (
  message,
  max,
  min = 0,
  errorMessage = "INVÁLIDO"
) => {
  while (true) {
    let num = formatPromptMultipleLines(message);

    if (!isNaN(num) && num >= min && num <= max && num % 1 == 0) {
      return num;
    }
    console.log(errorMessage);
  }
};

// ----- OTHER FUNCTIONS -----

// realiza a atividade escolhida pelo jogador

const doActivity = (activity) => {
  needsModified = player.updateNeeds(activity);
  player.updateWallet(activity);
  time.increment(activity["timeToComplete"]);

  // TODO: add getperiod + var for current time + var for new time

  return needsModified;
};

// ----- OBJECTS DEFINITION -----

// ----- OBJECT PLAYER -----

// define objeto player (jogador)

const player = {
  name: "",
  wallet: 0,
  needs: {
    nutrition: 5,
    energy: 5,
    hygiene: 5,
    toilet: 5,
    fun: 5,
    social: 5,
  },

  // atualiza os atributos do jogador de acordo com a atividade escolhida

  updateNeeds: function (activity) {
    const activityKeysList = Object.keys(activity.needsModification);
    const needsModified = [];

    for (key of activityKeysList) {
      this.needs[key] += activity.needsModification[key];

      if (this.needs[key] > 5) {
        this.needs[key] = 5;
      } else if (this.needs[key] < 0) {
        this.needs[key] = 0;
      }

      needsModified.push([
        activity.needsModification[key].toString().padStart(2, "+"),
        key,
      ]);

      needsModifiedValues = Object.values(needsModified);

      for (value of needsModifiedValues) {
        if (value[1] == "nutrition") value[1] = "🍔";
        if (value[1] == "energy") value[1] = "💤";
        if (value[1] == "hygiene") value[1] = "🧼";
        if (value[1] == "toilet") value[1] = "🚽";
        if (value[1] == "fun") value[1] = "🎈";
        if (value[1] == "social") value[1] = "💬";
      }
    }

    let needsModifiedString = needsModified.join(" | ");
    needsModifiedFormatted = needsModifiedString.replace(/,/g, " ");

    return needsModifiedFormatted;
  },

  // atualiza a carteira

  updateWallet: function (activity) {
    this.wallet -= activity.cost;
  },
};

// ----- OBJECT TIME -----

// define o objeto time (tempo)

const time = {
  days: 0,
  hours: 5,
  minutes: 0,

  // avança o relógio

  increment: function (activityMinutes) {
    let hoursToAdd = 0;
    let daysToAdd = 0;

    this.minutes += activityMinutes;

    if (this.minutes >= 60) {
      hoursToAdd = Math.floor(this.minutes / 60);
      this.hours += hoursToAdd;
      this.minutes %= 60;
    }

    if (this.hours >= 24) {
      daysToAdd = Math.floor(this.hours / 24);
      this.days += daysToAdd;
      this.hours %= 24;
    }
  },

  // retorna a hora atual no formato 00:00

  getTime: function () {
    const currentTime = `${this.hours
      .toString()
      .padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")}`;
    return currentTime;
  },

  // retorna o período atual

  getPeriod: function () {
    let currentPeriod;

    if (this.hours >= 5 && this.hours < 12) {
      currentPeriod = "manhã";
    } else if (this.hours >= 12 && this.hours < 18) {
      currentPeriod = "tarde";
    } else if (this.hours < 5 || this.hours >= 18) {
      currentPeriod = "noite";
    }

    return currentPeriod;
  },

  // retorna o dia da semana

  getWeekDay: function () {
    const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

    return weekDays[this.days];
  },
};

// ----- CODE START -----

// FIXME: font: https://coolsymbol.com/cool-fancy-text-generator.html | style: Sorcerer Font

let gameName = formatToTitle("ռօʍɛ ɖօ ʝօɢօ"); // TODO: define game name

// TELA INCIAL

console.clear();

console.log(gameName);

// adiciona o nome do jogador no objeto player

player.name = validatePromptString(
  "Qual é o seu nome?",
  "O nome não pode ser vazio!"
);

console.clear();

// TELA PRINCIPAL

// repete a escolha da atividade até o fim do jogo

while (true) {
  // exibe dia/hora + status dos atributos

  console.log(`${gameName}
📆 DIA ${(time.days + 1)
    .toString()
    .padStart(
      2,
      "0"
    )} | ${time.getWeekDay()} 🕑 ${time.getTime()} (${time.getPeriod()})\t\

👤 ${player.name}
💲 ${`$ ${player.wallet.toFixed(2)}`}
  
🍔  ${player.needs.nutrition}      🧼  ${player.needs.hygiene}      🎈  ${
    player.needs.fun
  }
💤  ${player.needs.energy}      🚽  ${player.needs.toilet}      💬  ${
    player.needs.social
  }
`);

  // solicita a escolha da atividade pelo índice da activityList

  let activityChoice = validatePromptIntMinMax("O que você deseja fazer?", 2);
  let chosenActivity = activityList[activityChoice];

  //

  let needsModified = doActivity(chosenActivity);

  console.clear();

  console.log(gameName);

  // exibe detalhes da atividade realizada

  console.log(`ATIVIDADE REALIZADA | ${chosenActivity.title}

       custo: \t$${chosenActivity.cost.toFixed(2)}
     duração: \t${chosenActivity.timeToComplete} minutos

   atributos: \t[ ${needsModified} ]

`);

  formatPrompt("digite ENTER para continuar");
  console.clear();

  // condição para finalizar o jogo

  if (time.days >= 7) {
    break;
  }
}
