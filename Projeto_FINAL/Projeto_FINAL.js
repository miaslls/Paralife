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

// valida número inteiro >= 0

const validatePromptPositiveInt = (message, errorMessage = "INVÁLIDO") => {
  while (true) {
    let num = formatPromptMultipleLines(message);

    if (!isNaN(num) && num >= 0 && num % 1 == 0) {
      return num;
    }
    console.log(errorMessage);
  }
};

// valida número inteiro entre min e max (inclusice min e max)

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
  moneyOwned: 0,
  needs: {
    nutrition: 5,
    energy: 5,
    hygiene: 5,
    toilet: 5,
    fun: 5,
    social: 5,
  },

  doActivity: function(activity) {
    this.moneyOwned -= activity.cost; // atualiza a carteira: ganhos/gastos

    // atualiza os atributos do jogador

    this.needs.nutrition += activity.needsModification.nutrition;
    this.needs.energy += activity.needsModification.energy;
    this.needs.hygiene += activity.needsModification.hygiene;
    this.needs.toilet += activity.needsModification.toilet;
    this.needs.fun += activity.needsModification.fun;
    this.needs.social += activity.needsModification.social;

    // garante que o valor máximo do atributo seja 5

    if (this.needs.nutrition > 5) this.needs.nutrition = 5;
    if (this.needs.energy > 5) this.needs.energy = 5;
    if (this.needs.hygiene > 5) this.needs.hygiene = 5;
    if (this.needs.toilet > 5) this.needs.toilet = 5;
    if (this.needs.fun > 5) this.needs.fun = 5;
    if (this.needs.social > 5) this.needs.social = 5;

    return activity.timeToComplete; // retorna a quantidade de minutos da atividade
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
    let newMinutes = this.minutes + activityMinutes;

    if (newMinutes >= 60) {
      hoursToAdd = Math.floor(newMinutes / 60);
      this.hours += hoursToAdd;
      this.minutes = newMinutes % 60;
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
      currentPeriod = "noite/madrugada"; 
    }

    return currentPeriod;
  },

  // retorna o dia da semana

  getWeekDay: function() {
    const weekDays = [
      "Segunda Feira",
      "Terça Feira",
      "Quarta Feira",
      "Quinta Feira",
      "Sexta Feira",
      "Sábado",
      "Domingo",
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
📆 DIA ${time.days + 1} | ${time.getWeekDay()} | 🕑 ${time.getTime()} (${time.getPeriod()}) 
  
Nutrição: ${player.needs.nutrition}\t\tHigiene: ${player.needs.hygiene}\t\tDiversão: ${player.needs.fun}
Energia: ${player.needs.energy}\t\tBanheiro: ${player.needs.toilet}\t\tSocial: ${player.needs.social}

TODO: Você fez tal coisa
TODO: Sua energia subiu blá
TODO: blá blá blá
  
`);

  // TODO: build menu

  // solicita a escolha da atividade pelo índice da activityList
  let activityChoice = validatePromptPositiveInt("O que você deseja fazer?");

  // atualiza os atributos do jogador de acordo com a atividade e retorna o tempo da atividade
  let activityMinutes = player.doActivity(activityList[activityChoice]);

  // avança o relógio
  time.increment(activityMinutes)

  console.clear();

  // condição para finalizar o jogo

  if (time.days >= 7) {
    break;
  }
}