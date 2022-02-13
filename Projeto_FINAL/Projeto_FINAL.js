"use strict";

// ----- solicita recursos necessários (prompt/jSON)

const prompt = require("prompt-sync")();
const activityList_nutrition = require("./data/activityList_nutrition.json");
const activityList_hygiene = require("./data/activityList_hygiene.json"); // FIXME:
const activityList_toilet = require("./data/activityList_toilet.json");
const activityList_fun = require("./data/activityList_fun.json"); // FIXME:
const activityList_social = require("./data/activityList_social.json"); // FIXME:
const jobList = require("./data/jobList.json"); //FIXME:
const formatFunctions = require("./functions/format.js");
const validateFunctions = require("./functions/validate.js");

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
  },
  wallet: 0,
  needs: {
    nutrition: 10,
    energy: 10,
    hygiene: 10,
    toilet: 10,
    fun: 10,
    social: 10,
  },

  // atualiza os atributos do jogador de acordo com a atividade escolhida

  updateNeeds: function (activity) {
    const activityKeysList = Object.keys(activity.needsModification);

    for (let need of activityKeysList) {
      this.needs[need] += activity.needsModification[need];

      if (this.needs[need] > 10) {
        this.needs[need] = 10;
      } else if (this.needs[need] < 0) {
        this.needs[need] = 0;
      }
    }
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

  getPeriod: function () {
    let currentPeriod;

    if (this.hours >= 4 && this.hours < 12) {
      currentPeriod = "manhã";
    } else if (this.hours >= 12 && this.hours < 18) {
      currentPeriod = "tarde";
    } else if (this.hours < 4 || this.hours >= 18) {
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

// ----- RECORDS -----

// ----- define o objeto records

const records = {
  work: {
    totalTimesWorked: 0,
    totalHoursWorked: 0,
    totalEarnings: 0,
  },
  energy: {
    totalTimesSlept: 0,
    totalHoursSlept: 0,
  },
  nutrition: {
    // TODO:
  },
  hygiene: {
    totalTimesHygiene: 0,
    totalCostHygiene: 0,
    totalMinutesHygiene: 0,
  },
  toilet: {
    totalTimesToilet: 0,
    totalMinutesToilet: 0,
  },
};

// ----- FUNCTIONS -----

// ----- exibe as informações do jogador

const displayPlayerInfo = () => {
  console.log(gameName);

  console.log(`📆 DIA ${(time.days + 1)
    .toString()
    .padStart(
      2,
      "0"
    )} | ${time.getWeekDay()} 🕑 ${time.getTime()} (${time.getPeriod()})

👤 ${player.name}
💲 ${`$ ${player.wallet}`}
💼 ${player.job.title}

---------------------------
🍔  ${player.needs.nutrition}      🧼  ${player.needs.hygiene}      🎈  ${
    player.needs.fun
  }
💤  ${player.needs.energy}      🚽  ${player.needs.toilet}      💬  ${
    player.needs.social
  }
---------------------------
`);
};

// dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

const confirmation = () => {
  let confirmChoice = validateFunctions.validatePromptIntMinMax(
    "digite [0] para voltar\ndigite [1] para confirmar",
    1,
    0,
    "Você deve digitar [0] ou [1]"
  );

  return confirmChoice;
};

// ---- atualiza o objeto player de acordo com a seleção da profissão

const updatePlayerJob = (job) => {
  player.job.title = job.title;
  player.job.daysToWork = job.daysToWork;
  player.job.periodsToWork = job.periodsToWork;
  player.job.minHoursPerWeek = job.minHoursPerWeek;
  player.job.salaryPerHour = job.salaryPerHour;
};

// ----- executa a atividade TRABALHAR

const doWork = (hours) => {
  let earnedNow = hours * player.job.salaryPerHour;

  time.increment(hours * 60);
  player.wallet += earnedNow;
  player.needs.fun -= hours;
  records.work.totalTimesWorked++;
  records.work.totalHoursWorked += hours;
  records.work.totalEarnings += earnedNow;

  if (player.needs.fun < 0) {
    player.needs.fun = 0;
  }
};

// ----- executa a atividade DORMIR

const doSleep = (hours) => {
  time.increment(hours * 60);
  player.needs.energy += hours;
  records.energy.totalTimesSlept++;
  records.energy.totalHoursSlept += hours;

  if (player.needs.energy > 10) {
    player.needs.energy = 10;
  }
};

// TODO: ----- executa a atividade de NUTRIÇÃO escolhida

// ----- executa a atividade de HIGIENE escolhida

const doHigieneActivity = (activity) => {
  time.increment(activity.timeToComplete);
  player.updateNeeds(activity);
  player.updateWallet(activity);
  records.hygiene.totalTimesHygiene++;
  records.hygiene.totalCostHygiene += activity.cost;
  records.hygiene.totalMinutesHygiene += activity.timeToComplete;
};

// ----- executa a atividade de BANHEIRO escolhida

const doToiletActivity = (activity) => {
  time.increment(activity.timeToComplete);
  player.updateNeeds(activity);
  records.toilet.totalTimesToilet++;
  records.toilet.totalMinutesToilet += activity.timeToComplete;
};

// ----- CODE START -----

let gameName = formatFunctions.formatToTitle("քǟʀǟʟɨʄɛ");
let confirmChoice;

// ----- TELA INCIAL -----

console.clear();
console.log(gameName);

// solicita o nome do jogador e adiciona no objeto player

player.name = validateFunctions.validatePromptString(
  "digite seu nome:",
  "o nome não pode ser vazio"
);

console.clear();

// ----- solicita a seleção da profissão do jogador

let jobChoiceIndex;
let chosenJob;

// repete a seleção da profissão até a confirmação do jogador

while (true) {
  console.log(gameName);

  console.log("selecione sua profissão\n");

  for (let job of jobList) {
    console.log(`[${job.index}] ${job.title}`);
  }

  console.log();

  jobChoiceIndex = validateFunctions.validatePromptIntMinMax(
    "sua escolha:",
    jobList.length,
    0,
    `digite um NÚMERO INTEIRO entre 0 e ${jobList.length - 1}`
  );

  chosenJob = jobList[jobChoiceIndex];

  console.clear();
  console.log(gameName);

  // exibe a opção selecionada

  console.log(`profissão selecionada | ${chosenJob.title.toUpperCase()}
  
  dias: ${chosenJob.daysToWork}
  horário: ${chosenJob.periodsToWork}
  salário: $${chosenJob.salaryPerHour}/hora
  carga horária mínima: ${chosenJob.minHoursPerWeek}h/semana
  `);

  // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

  confirmChoice = confirmation();

  if (confirmChoice == 1) {
    break;
  }
}

// atualiza o objeto player com os detalhes da profissão escolhida

updatePlayerJob(chosenJob);

console.clear();

// ----- MENU PRINCIPAL -----

let mainMenuChoice;
let hoursWorked;

let hoursSlept;
let hygieneActivityChoiceIndex;
let chosenHygieneActivity;
let toiletActivityChoiceIndex;
let chosenToiletActivity;

const mainMenu = [
  "TRABALHO",
  "NUTRIÇÃO",
  "ENERGIA",
  "HIGIENE",
  "BANHEIRO",
  "DIVERSÃO",
  "SOCIAL",
];

// ----- repete a seleção da atividade até a confirmação do jogador

while (true) {
  // exibe dia/hora + status dos atributos

  displayPlayerInfo();

  console.log(`selecione a próxima atividade
`);

  // exibe as opções (MENU PRINCIPAL)

  for (let option of mainMenu) {
    console.log(`[${mainMenu.indexOf(option)}] ${option}`);
  }

  console.log();

  // solicita a seleção da atividade

  mainMenuChoice = validateFunctions.validatePromptIntMinMax(
    "sua escolha:",
    mainMenu.length - 1,
    0,
    `digite um NÚMERO INTEIRO entre 0 e ${mainMenu.length - 1}`
  );

  console.log();

  // ----- exibe opções adicionais de acordo com a opção selecionada no menu principal

  switch (mainMenuChoice) {
    // ----- TRABALHAR -----

    case 0: {
      let today = time.getWeekDay();
      let now = time.getPeriod();

      // executa a tarefa se dia/período de trabalho permitido

      if (
        (player.job.daysToWork == "qualquer" ||
          player.job.daysToWork.includes(today)) &&
        (player.job.periodsToWork == "qualquer" ||
          player.job.periodsToWork.includes(now))
      ) {
        // solicita a quantidade de horas a trabalhar

        hoursWorked = validateFunctions.validatePromptIntMinMax(
          "trabalhar quantas horas?",
          4,
          1,
          "você deve selecionar um NÚMERO INTEIRO entre 1 e 4"
        );

        console.clear();

        displayPlayerInfo();

        // exibe detalhes da ação TRABALHAR

        console.log(`atividade selecionada | TRABALHAR ${hoursWorked}h
      
  \t- ${hoursWorked} 🎈
  \t+ $${hoursWorked * player.job.salaryPerHour.toFixed(2)}
  \t+ ${hoursWorked} horas trabalhadas
  
  \tTOTAL horas trabalhadas essa semana: ${records.work.totalHoursWorked}
  `);

        // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

        confirmChoice = confirmation();
      } else {
        // exibe um erro se dia/período de trabalho não permitido

        console.log(`você não pode trabalhar agora!
        
seu cronograma de trabalho:

   dias: ${chosenJob.daysToWork}
horário: ${chosenJob.periodsToWork}

     `);

        confirmChoice = 0;

        formatFunctions.formatPrompt("digite ENTER para voltar");
      }

      break;
    }

    //----- NUTRIÇÃO -----

    case 1: {
      // TODO:
      break;
    }

    // ----- ENERGIA -----

    case 2: {
      // solicita a quantidade de horas a dormir

      hoursSlept = validateFunctions.validatePromptIntMinMax(
        "dormir quantas horas?",
        8,
        1,
        "você deve selecionar um NÚMERO INTEIRO entre 1 e 8"
      );

      console.clear();

      displayPlayerInfo();

      // exibe detalhes da ação DORMIR

      console.log(`atividade selecionada | DORMIR ${hoursSlept}h

\t+ ${hoursSlept} 💤

\tTOTAL horas dormidas essa semana: ${records.energy.totalHoursSlept}
`);

      // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

      confirmChoice = confirmation();

      break;
    }

    // ----- HIGIENE -----

    case 3: {
      console.clear();

      displayPlayerInfo();

      console.log(`HIGIENE | selecione a atividade`);

      console.log();

      // exibe as opções (menu HIGIENE)

      for (let hygieneActivity of activityList_hygiene) {
        console.log(
          `[${hygieneActivity.index}] ${hygieneActivity.title.toUpperCase()}`
        );
      }

      console.log();

      // solicita a escolha da atividade

      hygieneActivityChoiceIndex = validateFunctions.validatePromptIntMinMax(
        "sua escolha:",
        activityList_hygiene.length,
        0,
        `digite um número INTEIRO entre 0 e ${activityList_hygiene.length - 1}`
      );

      chosenHygieneActivity = activityList_hygiene[hygieneActivityChoiceIndex];

      console.clear();

      // exibe detalhes da atividade selecionada

      displayPlayerInfo();

      console.log(`atividade selecionada | ${chosenHygieneActivity.title.toUpperCase()}
      
      custo: \t$${chosenHygieneActivity.cost.toFixed(2)}
    duração: \t${chosenHygieneActivity.timeToComplete} minutos
  atributos: \t+${chosenHygieneActivity.needsModification.hygiene} 🧼
`);

      // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

      confirmChoice = confirmation();

      break;
    }

    // ----- BANHEIRO -----

    case 4: {
      console.clear();

      displayPlayerInfo();

      console.log(`BANHEIRO | selecione a atividade`);

      console.log();

      // exibe as opções (menu BANHEIRO)

      for (let toiletActivity of activityList_toilet) {
        console.log(
          `[${toiletActivity.index}] ${toiletActivity.title.toUpperCase()}`
        );
      }

      console.log();

      // solicita a escolha da atividade

      toiletActivityChoiceIndex = validateFunctions.validatePromptIntMinMax(
        "sua escolha:",
        activityList_toilet.length - 1,
        0,
        `digite um número INTEIRO entre 0 e ${activityList_toilet.length - 1}`
      );

      chosenToiletActivity = activityList_toilet[toiletActivityChoiceIndex];

      console.clear();

      // exibe detalhes da atividade selecionada

      displayPlayerInfo();

      console.log(`atividade selecionada | ${chosenToiletActivity.title.toUpperCase()}
      
    duração: \t${chosenToiletActivity.timeToComplete} minutos
  atributos: \t+${chosenToiletActivity.needsModification.toilet} 🚽 | ${
        chosenToiletActivity.needsModification.hygiene
      } 🧼
`);

      // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

      confirmChoice = confirmation();

      break;
    }

    // ----- DIVERSÃO -----

    case 5: {
      // TODO:
      break;
    }
    // ----- SOCIAL -----

    case 6: {
      // TODO:
      break;
    }
  }

  if (confirmChoice == 1) {
    break;
  }
}

// ----- executa a atividade selecionada

switch (mainMenuChoice) {
  case 0: {
    doWork(hoursWorked); // executa a atividade TRABALHAR
    break;
  }
  case 1: {
    // TODO: executa a atividade NUTRIÇÃO
    break;
  }
  case 2: {
    doSleep(hoursSlept); // executa a atividade DORMIR
    break;
  }
  case 3: {
    doHigieneActivity(chosenHygieneActivity); // executa a atividade HIGIENE
    break;
  }
  case 4: {
    doToiletActivity(chosenToiletActivity); // executa a atividade BANHEIRO 
    break;
  }
  case 5: {
    //TODO: excuta a atividade DIVERSÃO
    break;
  }
  case 6: {
    //TODO: executa a atividade SOCIAL
    break;
  }
}

console.log("player", player); //FIXME:
console.log("time", time);
console.log("records", records);
