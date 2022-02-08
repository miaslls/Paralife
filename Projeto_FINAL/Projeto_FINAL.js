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

// valida número inteiro entre min e max (inclusice min e max)

const validatePromptIntMinMax = (message, max, min = 0, errorMessage = "INVÁLIDO") => { //FIXME: prettier
  while (true) {
    let num = formatPromptMultipleLines(message);

    if (!isNaN(num) && num >= min && num <= max && num % 1 == 0) {
      return num;
    }
    console.log(errorMessage);
  }
};

// ----- OTHER FUNCTIONS -----

// retorna número inteiro aleatório entre min e max (inclusive min e max)

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// ----- CODE START -----

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

  updateNeeds: function (activity) {
    const keysList = Object.keys(this.needs);

    for (key of keysList) {
        this.needs[key] += activity.needsModification[key];

        if (this.needs[key] > 5) {
            this.needs[key] = 5;
          } else if (this.needs[key] < 0) {
            this.needs[key] = 0;
          }
    }

    // for (let i = 0; i < keys.length; i++) {
    //   this.needs[keys[i]] += activity.needsModification[keys[i]];

    //   if (this.needs[keys[i]] > 5) {
    //     this.needs[keys[i]] = 5;
    //   } else if (this.needs[keys[i]] < 0) {
    //     this.needs[keys[i]] = 0;
    //   }
    // }
  },

  updateWallet: function (activity) {
    this.wallet -= activity.cost;
  },

  doActivity: function (activity) {
    this.updateNeeds(activity);
    this.updateWallet(activity);
  }
};

// define o objeto time (tempo)

const time = {
  days: 0,
  hours: 5,
  minutes: 0,

  // avança o relógio

  increment: function(activityMinutes) {
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

  getTime: function() {
    const currentTime = `${this.hours.toString().padStart(2, "0")}:${this.minutes.toString().padStart(2, "0")}`;
    return currentTime;
  },

  // retorna o período atual

  getPeriod: function() {
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

  getWeekDay: function() {
    const weekDays = [
      "SEG",
      "TER",
      "QUA",
      "QUI",
      "SEX",
      "SAB",
      "DOM",
    ];

    return  weekDays[this.days];
  }
};

// ----- GAME START -----

let gameName = formatToTitle("NOME DO JOGO!"); // TODO: define game name

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
📆 DIA ${(time.days + 1).toString().padStart(2, "0")} | ${time.getWeekDay()} 🕑 ${time.getTime()} (${time.getPeriod()})\t\

👤 ${player.name}
💲 ${`R$ ${player.wallet.toFixed(2)}`}
  
🍔  ${player.needs.nutrition}      🧼  ${player.needs.hygiene}      🎈  ${player.needs.fun}
💤  ${player.needs.energy}      🚽  ${player.needs.toilet}      💬  ${player.needs.social}

TODO: Você fez tal coisa
TODO: Sua energia subiu blá
TODO: blá blá blá
  
`);

  // TODO: build menu

  // solicita a escolha da atividade pelo índice da activityList
  let activityChoice = validatePromptIntMinMax("O que você deseja fazer?", 2);

  let chosenActivity = activityList[activityChoice];

  // atualiza os atributos do jogador de acordo com a atividade
  player.doActivity(chosenActivity);

  // avança o relógio
  time.increment(chosenActivity["timeToComplete"]);

  console.clear();

  // condição para finalizar o jogo

  if (time.days >= 7) {
    break;
  }
}