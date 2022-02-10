// ----- FUNCTIONS -----//

// ----- solicita recursos necessários (prompt/jSON)

const prompt = require("prompt-sync")();
const activityList = require("./data/activityList.json"); // FIXME:
const jobList = require("./data/jobList.json");
const formatFunctions = require("./functions/format.js");
const validateFunctions = require("./functions/validate.js");

const displayPlayerInfo = () => {
  console.log(gameName);

  console.log(`📆 DIA ${(time.days + 1).toString().padStart(2, "0")} | ${time.getWeekDay()} 🕑 ${time.getTime()} (${time.getPeriod()})

👤 ${player.name}\t💲 ${`$ ${player.wallet}`}
💼 ${player.job.title}

---------------------------
🍔  ${player.needs.nutrition}      🧼  ${player.needs.hygiene}      🎈  ${player.needs.fun}
💤  ${player.needs.energy}      🚽  ${player.needs.toilet}      💬  ${player.needs.social}
---------------------------
`);
};

// ---- atualiza o objeto player de acordo com a seleção da profissão

const updatePlayerJob = (job) => {
  player.job.title = job.title;
  player.job.daysToWork = job.daysToWork;
  player.job.periodsToWork = job.periodsToWork;
  player.job.minHoursPerWeek = parseInt(job.minHoursPerWeek);
  player.job.salaryPerHour = parseInt(job.salaryPerHour);
};

// ----- executa a atividade TRABALHAR

const doWork = (hours) => {
  time.increment(hours * 60);
  player.job.hoursWorked += hours;
  player.wallet += hours * player.job.salaryPerHour;
};

// ----- executa a atividade escolhida pelo jogador

const doActivity = (activity) => {
  needsModified = player.updateNeeds(activity);
  player.updateWallet(activity);
  time.increment(activity["timeToComplete"]);

  // TODO: add getperiod + var for current time + var for new time

  return needsModified;
};

// ----- OBJECTS DEFINITION -----

// ----- PLAYER -----

// ----- define objeto player (jogador)

const player = {
  name: "",
  job: {
    title: " ",
    daysToWork: [],
    periodsToWork: [],
    minHoursPerWeek: 0,
    salaryPerHour: 0,
    hoursWorked: 0,
  },
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

      // adiciona os valores em um array e formata o retorno da função

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

// ----- TIME -----

// ----- define o objeto time (tempo)

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

  // retorna o período atual FIXME: current time/new time - if current != new -> event triggered by low need

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

let gameName = formatFunctions.formatToTitle("քǟʀǟʟɨʄɛ");

// ----- TELA INCIAL

console.clear();
console.log(gameName);

// solicita o nome do jogador e adiciona no objeto player

player.name = validateFunctions.validatePromptString(
  "digite seu nome:",
  "o nome não pode ser vazio"
);

console.clear();

// ----- solicita a escolha da profissão do jogador

  let jobChoice;
  let chosenJob
  let confirmChoice;

  // repete a escolha da profissão até que o jogador confirme a escolha

  while (true) {
    formatFunctions.formatToTitle("քǟʀǟʟɨʄɛ");

    console.log("selecione sua profissão\n");

    for (job of jobList) {
      console.log(`[${job.index}] ${job.title}`);
    }

    console.log();

    jobChoice = validateFunctions.validatePromptIntMinMax(
      "sua escolha:",
      jobList.length,
      0,
      `digite um NÚMERO INTEIRO entre 0 e ${jobList.length}`
    );

    chosenJob = jobList[jobChoice];

    console.clear();
    formatFunctions.formatToTitle("քǟʀǟʟɨʄɛ");

    // exibe a opção selecionada

    console.log(`profissão selecionada | ${chosenJob.title.toUpperCase()}
  
  dias: ${chosenJob.daysToWork}
  horário: ${chosenJob.periodsToWork}
  salário: $${chosenJob.salaryPerHour}/hora
  carga horária mínima: ${chosenJob.minHoursPerWeek}h/semana
  `);

    // dá ao jogador a opção de confirmar a escolha ou voltar e escolher novamente

    confirmChoice = validateFunctions.validatePromptIntMinMax(
      "digite [0] para voltar\ndigite [1] para confirmar",
      1,
      0,
      "Você deve digitar [0] ou [1]"
    );

    console.clear();

    if (confirmChoice == 1) {
      break;
    }
  }

updatePlayerJob(chosenJob);

// ----- TELA PRINCIPAL

// ----- repete a escolha da atividade até o fim do jogo

while (true) {

//   // exibe dia/hora + status dos atributos

displayPlayerInfo();

//   console.log(`📆 DIA ${(time.days + 1)
//     .toString()
//     .padStart(
//       2,
//       "0"
//     )} | ${time.getWeekDay()} 🕑 ${time.getTime()} (${time.getPeriod()})

// 👤 ${player.name}
// 💼 ${player.job.title}
// 💲 ${`$ ${player.wallet}`}

// ---------------------------
// 🍔  ${player.needs.nutrition}      🧼  ${player.needs.hygiene}      🎈  ${
//     player.needs.fun
//   }
// 💤  ${player.needs.energy}      🚽  ${player.needs.toilet}      💬  ${
//     player.needs.social
//   }
// ---------------------------
// `);

  // ----- PRIMEIRO MENU

  const firstMenu = ["TRABALHAR", "OUTRA ATIVIDADE"];

  console.log(`selecione a próxima atividade:

\t${firstMenu.join("\n\t")}
`);

  let firstMenuChoice = formatFunctions
    .formatPrompt("sua escolha:")
    .toUpperCase();

  console.log(); // TODO: create empty line function

  // ----- submenu TRABALHAR

  if (firstMenuChoice == "TRABALHAR") {
    let hoursWorked = validateFunctions.validatePromptIntMinMax(
      "trabalhar quantas horas?",
      4,
      1,
      "você deve selecionar um NÚMERO INTEIRO entre 1 e 4"
    );

    // executa a atividade TRABALHAR

    doWork(hoursWorked);

    console.clear();

    // exibe detalhes da ação TRABALHAR

    console.log(`ATIVIDADE REALIZADA | TRABALHAR ${hoursWorked}h
    
\t+ $${hoursWorked * player.job.salaryPerHour.toFixed(2)}
\t+ ${hoursWorked} horas trabalhadas
    `);

    formatFunctions.formatPrompt("digite ENTER para continuar");
    console.clear();
  }

  if (firstMenuChoice == "OUTRA ATIVIDADE") {

    // ----- submenu OUTRA ATIVIDADE

    console.clear();

    const otherActivityMenu = [0, 1, 2];

    console.log(`selecione a próxima atividade:

\t${otherActivityMenu.join("\t")}
`);

    let activityChoice = formatFunctions.formatPrompt("sua escolha:");

    let chosenActivity = activityList[activityChoice];

    // executa a atividade escolhida

    let needsModified = doActivity(chosenActivity);

    console.clear();

    // exibe detalhes da atividade realizada

    console.log(`ATIVIDADE REALIZADA | ${chosenActivity.title}

           custo: \t$${chosenActivity.cost.toFixed(2)}
         duração: \t${chosenActivity.timeToComplete} minutos

       atributos: \t[ ${needsModified} ]

    `);

    formatFunctions.formatPrompt("digite ENTER para continuar");
    console.clear();
  }

  // condição para finalizar o jogo

  if (time.days >= 7) {
    break;
  }
}