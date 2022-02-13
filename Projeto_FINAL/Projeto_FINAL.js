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

// ----- PLAYER ----- BOOKMARK:

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

  // atualiza os atributos de forma autônoma a cada troca de período

  updateNeedsAutonomous: function () {
    this.needs.nutrition -= 3;
    this.needs.energy -= 2;
    this.needs.hygiene -= 3;
    this.needs.toilet -= 4;
    this.needs.fun -= 1;
    this.needs.social -= 1;
  }

};

// ----- TIME ----- BOOKMARK:

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

// ----- RECORDS ----- BOOKMARK:

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
    totalTimesCooked: 0,
    totalTimesDelivery: 0,
    totalTimesEatOut: 0,
    totalCostNutrition: 0,
    totalMinutesNutrition: 0
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
  fun: {
    totalTimesFun: 0,
    totalCostFun: 0,
    totalMinutesFun: 0,
  },
  social: {
    totalTimesSocial: 0,
    totalCostSocial: 0,
    totalMinutesSocial: 0,
  },
};

// ----- FUNCTIONS ----- BOOKMARK:

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
🍔  ${player.needs.nutrition.toString().padStart(2, "0")}      🧼  ${player.needs.hygiene.toString().padStart(2, "0")}      🎈  ${
    player.needs.fun.toString().padStart(2, "0")
  }
💤  ${player.needs.energy.toString().padStart(2, "0")}      🚽  ${player.needs.toilet.toString().padStart(2, "0")}      💬  ${
    player.needs.social.toString().padStart(2, "0")
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

// ----- executa a atividade de NUTRIÇÃO escolhida

const doNutritionActivity = (activity, type) => {
  player.updateNeeds(activity);
  
  switch (type) {

    // COZINHAR

    case 0: {
      time.increment(activity.timeToComplete * 2);
      player.updateWallet(activity);
      records.nutrition.totalTimesCooked++;
      records.nutrition.totalCostNutrition += activity.cost;
      records.nutrition.totalMinutesNutrition += activity.timeToComplete * 2;

      break;
    }

    // DELIVERY

    case 1: {
      time.increment(activity.timeToComplete * 1.5);
      player.updateWallet(activity * 1.5);
      records.nutrition.totalTimesDelivery++;
      records.nutrition.totalCostNutrition += activity.cost * 1.5;
      records.nutrition.totalMinutesNutrition += activity.timeToComplete * 1.5;

      break;
    }

    // RESTAURANTE

    case 2: {
      time.increment(activity.timeToComplete);
      player.updateWallet(activity * 2);
      records.nutrition.totalTimesEatOut++;
      records.nutrition.totalCostNutrition += activity.cost * 2;
      records.nutrition.totalMinutesNutrition += activity.timeToComplete;

      break;
    }
  }
};

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

// ----- executa a atividade de DIVERSÃO escolhida

const doFunActivity = (activity) => {
  time.increment(activity.timeToComplete);
  player.updateNeeds(activity);
  player.updateWallet(activity);
  records.fun.totalTimesFun++;
  records.fun.totalCostFun += activity.costs;
  records.fun.totalMinutesFun += activity.timeToComplete;
};

// ----- executa a atividade de SOCIAL escolhida

const doSocialActivity = (activity) => {
  time.increment(activity.timeToComplete);
  player.updateNeeds(activity);
  player.updateWallet(activity);
  records.social.totalTimesSocial++;
  records.social.totalCostSocial += activity.cost;
  records.social.totalMinutesSocial += activity.timeToComplete;
};

// ----- CODE START ----- BOOKMARK:

let gameName = formatFunctions.formatToTitle("քǟʀǟʟɨʄɛ");
let confirmChoice;

// ----- TELA INCIAL -----

TODO:

// ----- seleção das características do jogador (nome e profissão)

console.clear();
console.log(gameName);

// solicita o nome do jogador e adiciona no objeto player

player.name = validateFunctions.validatePromptString(
  "digite seu nome:",
  "o nome não pode ser vazio"
);

console.clear();

// solicita a seleção da profissão do jogador

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

// ----- define variáveis necessárias à execução das atividades

let mainMenuChoice;
let hoursWorked;
let nutritionActivityChoiceIndex;
let chosenNutritionActivity;
let nutritionPrepMethod;
let hoursSlept;
let hygieneActivityChoiceIndex;
let chosenHygieneActivity;
let toiletActivityChoiceIndex;
let chosenToiletActivity;
let funActivityChoiceIndex;
let chosenFunActivity;
let socialActivityChoiceIndex;
let chosenSocialActivity;

// ----- MENU PRINCIPAL ----- BOOKMARK:

const mainMenu = [
  "TRABALHO",
  "NUTRIÇÃO",
  "ENERGIA",
  "HIGIENE",
  "BANHEIRO",
  "DIVERSÃO",
  "SOCIAL",
];

// ----- solicita a seleção da próxima atividade até o fim do jogo (> 7 dias)

while (true) {
  
  let currentPeriod = time.getPeriod(); // variáveis para definição de update autônomo baseado na mudança de período
  let newPeriod;

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
      console.clear();

      displayPlayerInfo();

      console.log(`NUTRIÇÃO | selecione o que comer`);
      console.log();

      // exibe as opções de comida (menu NUTRIÇÃO)

      for (let nutritionActivity of activityList_nutrition) {
        console.log(
          `[${
            nutritionActivity.index
          }] ${nutritionActivity.title.toUpperCase()}`
        );
      }

      console.log();

      // solicita a escolha da comida

      nutritionActivityChoiceIndex = validateFunctions.validatePromptIntMinMax(
        "sua escolha:",
        activityList_nutrition.length - 1,
        0,
        `digite um NÚMERO INTEIRO entre 0 e ${
          activityList_nutrition.length - 1
        }`
      );

      chosenNutritionActivity =
        activityList_nutrition[nutritionActivityChoiceIndex];

      console.clear();

      // solicita a escolha entre COZINHAR, DELIVERY e RESTAURANTE

      displayPlayerInfo();

      console.log(`alimento selecionado | ${chosenNutritionActivity.title.toUpperCase()}

\t---------------------------------------
\t[0]  |   COZINHAR    |  🕑🕑🕑   💲    
\t---------------------------------------
\t[1]  |   DELIVERY    |   🕑🕑    💲💲   
\t---------------------------------------
\t[2]  |  RESTAURANTE  |    🕑     💲💲💲  
\t---------------------------------------
`);

      nutritionPrepMethod = validateFunctions.validatePromptIntMinMax(
        "sua escolha:",
        2,
        0,
        `digite um NÚMERO INTEIRO entre 0 e 2`
      );

      console.clear();

      // exibe detalhes da atividade selecionada

      displayPlayerInfo();

      switch (nutritionPrepMethod) {

        // ----- COZINHAR

        case 0: {
          console.log(`atividade selecionada | COZINHAR ${chosenNutritionActivity.title.toUpperCase()}

      custo: \t$${chosenNutritionActivity.cost.toFixed(2)}
    duração: \t${chosenNutritionActivity.timeToComplete * 2} minutos
  atributos: \t+${
          chosenNutritionActivity.needsModification.nutrition
        } 🍔 | ${chosenNutritionActivity.needsModification.toilet} 🚽
`);

          // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

          confirmChoice = confirmation();

          break;
        }

        // ----- DELIVERY
        
        case 1: {
          console.log(`atividade selecionada | DELIVERY - ${chosenNutritionActivity.title.toUpperCase()}

      custo: \t$${(chosenNutritionActivity.cost * 1.5).toFixed(2)}
    duração: \t${chosenNutritionActivity.timeToComplete * 1.5} minutos
  atributos: \t+${
          chosenNutritionActivity.needsModification.nutrition
        } 🍔 | ${chosenNutritionActivity.needsModification.toilet} 🚽
`);

          // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

          confirmChoice = confirmation();

          break;
        }

        // ----- RESTAURANTE
        
        case 2: {
          console.log(`atividade selecionada | RESTAURANTE - ${chosenNutritionActivity.title.toUpperCase()}

      custo: \t$${(chosenNutritionActivity.cost * 2).toFixed(2)}
    duração: \t${chosenNutritionActivity.timeToComplete} minutos
  atributos: \t+${
          chosenNutritionActivity.needsModification.nutrition
        } 🍔 | ${chosenNutritionActivity.needsModification.toilet} 🚽
`);

          // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

          confirmChoice = confirmation();

          break;
        }
      }

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
        activityList_hygiene.length - 1,
        0,
        `digite um NÚMERO INTEIRO entre 0 e ${activityList_hygiene.length - 1}`
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
        2,
        1,
        `digite um [1] ou [2]`
      );

      chosenToiletActivity = activityList_toilet[toiletActivityChoiceIndex - 1]; // gambiarra de leve p/ começar as opções com num 1 ao invés de zero

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
      console.clear();

      displayPlayerInfo();

      console.log(`DIVERSÃO | selecione a atividade`);
      console.log();

      // exibe as opções (menu DIVERSÃO)

      for (let funActivity of activityList_fun) {
        console.log(
          `[${funActivity.index}] ${funActivity.title.toUpperCase()}`
        );
      }

      console.log();

      // solicita a escolha da atividade

      funActivityChoiceIndex = validateFunctions.validatePromptIntMinMax(
        "sua escolha:",
        activityList_fun.length - 1,
        0,
        `digite um NÚMERO INTERO entre 0 e ${activityList_fun.length - 1}`
      );

      chosenFunActivity = activityList_fun[funActivityChoiceIndex];

      console.clear();

      // exibe detalhes da atividade seleconada

      displayPlayerInfo();

      console.log(`atividade selecionada | ${chosenFunActivity.title.toUpperCase()}
    
      custo: \t$${chosenFunActivity.cost.toFixed(2)}
    duração: \t${chosenFunActivity.timeToComplete} minutos
  atributos: \t+${chosenFunActivity.needsModification.fun} 🎈
`);

      // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

      confirmChoice = confirmation();

      break;
    }
    // ----- SOCIAL -----

    case 6: {
      console.clear();

      displayPlayerInfo();

      console.log(`SOCIAL | selecione a atividade`);
      console.log();

      // exibe as opções (menu SOCIAL)

      for (let socialActivity of activityList_social) {
        console.log(
          `[${socialActivity.index}] ${socialActivity.title.toUpperCase()}`
        );
      }

      console.log();

      // solicita a escolha da atividade

      socialActivityChoiceIndex = validateFunctions.validatePromptIntMinMax(
        "sua escolha:",
        activityList_social.length - 1,
        0,
        `digite um NÚMERO INTERO entre 0 e ${activityList_social.length - 1}`
      );

      chosenSocialActivity = activityList_social[socialActivityChoiceIndex];

      console.clear();

      // exibe detalhes da atividade selecionada

      displayPlayerInfo();

      console.log(`atividade selecionada | ${chosenSocialActivity.title.toUpperCase()}
    
      custo: \t$${chosenSocialActivity.cost.toFixed(2)}
    duração: \t${chosenSocialActivity.timeToComplete} minutos
  atributos: \t+${chosenSocialActivity.needsModification.social} 💬
`);

      // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente

      confirmChoice = confirmation();

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
    doNutritionActivity(chosenNutritionActivity, nutritionPrepMethod); // executa a atividade NUTRIÇÃO
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
    doFunActivity(chosenFunActivity); // excuta a atividade DIVERSÃO
    break;
  }
  case 6: {
    doSocialActivity(chosenSocialActivity); // executa a atividade SOCIAL
    break;
  }
}

console.clear();

// ----- atualiza os atributos de forma autônoma a cada troca de período

newPeriod = time.getPeriod();

if (currentPeriod != newPeriod) {
  player.updateNeedsAutonomous();
}

// ----- atividades autônomas disparadas por necessidade <= 0

TODO:

// ----- finaliza o jogo após 7 dias completos

if (time.days > 7) {
  break;
}
}