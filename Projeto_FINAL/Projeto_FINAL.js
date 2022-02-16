"use strict";

// ----- solicita recursos necessários 📌📌📌

const prompt = require("prompt-sync")();
const activityList_nutrition = require("./data/activityList_nutrition.json");
const activityList_hygiene = require("./data/activityList_hygiene.json"); // FIXME:
const activityList_toilet = require("./data/activityList_toilet.json");
const activityList_fun = require("./data/activityList_fun.json"); // FIXME:
const activityList_social = require("./data/activityList_social.json"); // FIXME:
const jobList = require("./data/jobList.json"); //FIXME:
const { nutritionAnimation } = require("./ASCII_Animations/nutrition.js");
const { energyAnimation } = require("./ASCII_Animations/energy.js");
const { hygieneAnimation } = require("./ASCII_Animations/hygiene.js");
const { toiletAnimation } = require("./ASCII_Animations/toilet.js");
const { funAnimation } = require("./ASCII_Animations/fun.js");
const { socialAnimation } = require("./ASCII_Animations/social.js");
const { workAnimation } = require("./ASCII_Animations/work.js");
const { ohNoAnimation } = require("./ASCII_Animations/ohNo.js");
const { gameOverAnimation } = require("./ASCII_Animations/gameOver.js");
const { statisticsAnimation } = require("./ASCII_Animations/statistics.js");
const {
  formatToTitle,
  formatPrompt,
  formatClock,
  sleep,
} = require("./lib/formatting.js");
const {
  validatePromptString,
  validatePromptIntMinMax,
} = require("./lib/validation.js");
const { confirmation } = require("./lib/confirmation");

// ----- OBJECTS DEFINITION ----- 📌📌📌

// ----- PLAYER ----- 📌📌

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
    nutrition: 7,
    energy: 7,
    hygiene: 7,
    toilet: 7,
    fun: 7,
    social: 7,
  },

  // atualiza o objeto player de acordo com a profissão selecionada 📌

  updatePlayerJob: function (job) {
    this.job.title = job.title;
    this.job.daysToWork = job.daysToWork;
    this.job.periodsToWork = job.periodsToWork;
    this.job.minHoursPerWeek = job.minHoursPerWeek;
    this.job.salaryPerHour = job.salaryPerHour;
  },

  // atualiza os atributos do jogador de acordo com a atividade escolhida 📌

  updateNeeds: function (chosenActivity) {
    const activityKeysList = Object.keys(chosenActivity.needsModification);

    for (let need of activityKeysList) {
      this.needs[need] += chosenActivity.needsModification[need];

      if (this.needs[need] > 10) {
        this.needs[need] = 10;
      } else if (this.needs[need] < 0) {
        this.needs[need] = 0;
      }
    }
  },
  // atualiza a carteira com os gastos da atividade

  updateWallet: function (amount) {
    this.wallet -= amount;
  },

  // atualiza os atributos de forma autônoma a cada troca de período 📌

  updateNeedsAutonomous: function () {
    this.needs.nutrition -= 3;
    this.needs.energy -= 2;
    this.needs.hygiene -= 3;
    this.needs.toilet -= 3;
    this.needs.fun -= 1;
    this.needs.social -= 1;
  },
};

// ----- TIME ----- 📌📌

const time = {
  days: 0,
  hours: 7,
  minutes: 0,

  // avança o relógio 📌

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

  // retorna a hora atual no formato 00:00 📌

  getTime: function () {
    let currentTime = formatClock(this.hours, this.minutes);
    return currentTime;
  },

  // retorna o período atual 📌

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

  // retorna o dia atual 📌

  getDay: function () {
    let currentDay;
    return this.days + 1;
  },

  // retorna o dia da semana atual 📌

  getWeekDay: function () {
    const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

    return weekDays[this.days];
  },
};

// ----- CHOSEN ACTIVITY ----- 📌📌 (atividade selecionada)

let chosenActivity = {
  type: "",
  title: "",
  cost: 0,
  timeToComplete: 0,
  needsModification: {
    nutrition: 0,
    energy: 0,
    hygiene: 0,
    toilet: 0,
    fun: 0,
    social: 0,
  },
  work: {
    earnedNow: 0,
    hoursWorked: 0,
  },

  // exibe informações da atividade selecionada 📌

  displayChosenActivityInfo: function () {
    console.clear();

    displayPlayerInfo();

    let needsModificationString = getFormattedNeedsModification(
      this.needsModification
    );

    console.log(`atividade selecionada | ${this.title}`);
    console.log();

    if (this.cost != 0) {
      console.log(`       custo: \t$${this.cost.toFixed(2)}`);
    }

    console.log(`     duração: \t${this.timeToComplete} minutos
    atributos: \t${needsModificationString} 
`);

    if (this.type == 0) {
      console.log(`💲 +$${this.work.earnedNow}\t+${this.work.hoursWorked}h trabalhadas
      
TOTAL horas trabalhadas até agora: ${records.work.totalHours}
`);
    }
  },
};

// ----- LOW NEED ACTIVITIES ----- 📌📌 (atividades acionadas por atributo <= 0)

const lowNeedActivities = {
  nutrition: {
    title: "nutrição",
    area: "physicalHealth",
    timeToComplete: 180,
    needsModification: {
      nutrition: 10,
    },
    message:
      "você desmaiou por estar desnutrido.\nvocê foi levado ao hospital para receber os cuidados necessários.",
  },
  energy: {
    title: "energia",
    area: "physicalHealth",
    timeToComplete: 480,
    needsModification: {
      energy: 8,
    },
    message: "você dormiu por 8 horas para recuperar a energia.",
  },
  hygiene: {
    title: "higiene",
    area: "physicalHealth",
    timeToComplete: 60,
    needsModification: {
      hygiene: 10,
      social: -3,
    },
    message:
      "ninguém queria chegar perto de você, por causa do fedô.\nvocê tomou um banho caprichado",
  },
  toilet: {
    title: "banheiro",
    area: "physicalHealth",
    timeToComplete: 60,
    needsModification: {
      hygiene: 8,
      toilet: 10,
      social: -3,
    },
    message:
      "você fez xixi na calça e todo mundo viu. você tomou um banho e lavou suas roupas.",
  },
  fun: {
    title: "diversão",
    area: "mentalHealth",
    timeToComplete: 120,
    needsModification: {
      fun: 5,
    },
    message: "você foi à emergência psiquiátrica para uma consulta por stress.",
  },
  social: {
    title: "social",
    area: "mentalHealth",
    timeToComplete: 60,
    needsModification: {
      fun: -2,
      social: -3,
    },
    message:
      "você se sente sozinho e abandonado então passa um tempo conversando com as plantas.",
  },

  // executa a ação equivalente quando atributo <= 0 📌

  triggerAction: function () {
    const needsModificationKeys = [
      "nutrition",
      "energy",
      "hygiene",
      "toilet",
      "fun",
      "social",
    ];

    for (let key of needsModificationKeys) {
      if (player.needs[key] <= 0) {
        let actionTriggered = this[key];

        time.increment(actionTriggered.timeToComplete);
        player.updateNeeds(actionTriggered);
        records.lowNeedActivities[key]["totalTimes"]++;
        records.lowNeedActivities[key]["totalMinutes"] +=
          actionTriggered.timeToComplete;

        if (actionTriggered.area == "physicalHealth") {
          records.lowNeedAreas.physicalHealth++;
        } else {
          records.lowNeedAreas.mentalHealth++;
        }

        const actionTriggeredTitle = formatToTitle(
          `${actionTriggered.title.toUpperCase()} menor ou igual a ZERO!`
        );

        let needsModificationString = getFormattedNeedsModification(
          actionTriggered.needsModification
        );

        console.clear();
        ohNoAnimation();
        console.log(actionTriggeredTitle);
        console.log(actionTriggered.message);
        console.log();
        console.log(needsModificationString);
        console.log(`🕑 ${actionTriggered.timeToComplete} min`);
        console.log();
        formatPrompt("digite ENTER para continuar");
        console.clear();
      }
    }
  },
};

// ----- RECORDS ----- 📌📌 (estatísticas)

const records = {
  work: {
    totalTimes: 0,
    totalHours: 0,
    totalEarnings: 0,
  },
  energy: {
    totalTimes: 0,
    totalHours: 0,
  },
  nutrition: {
    cook: { totalTimes: 0 },
    delivery: { totalTimes: 0 },
    eatOut: { totalTimes: 0 },
    totalCost: 0,
    totalMinutes: 0,
  },
  hygiene: {
    totalTimes: 0,
    totalCost: 0,
    totalMinutes: 0,
  },
  toilet: {
    totalTimes: 0,
    totalCost: 0,
    totalMinutes: 0,
  },
  fun: {
    totalTimes: 0,
    totalCost: 0,
    totalMinutes: 0,
  },
  social: {
    totalTimes: 0,
    totalCost: 0,
    totalMinutes: 0,
  },
  lowNeedActivities: {
    nutrition: {
      totalTimes: 0,
      totalMinutes: 0,
    },
    energy: {
      totalTimes: 0,
      totalMinutes: 0,
    },
    hygiene: {
      totalTimes: 0,
      totalMinutes: 0,
    },
    toilet: {
      totalTimes: 0,
      totalMinutes: 0,
    },
    fun: {
      totalTimes: 0,
      totalMinutes: 0,
    },
    social: {
      totalTimes: 0,
      totalMinutes: 0,
    },
  },
  lowNeedAreas: {
    physicalHealth: 0,
    mentalHealth: 0,
  },
};

// SUBMENUS 📌📌📌

// ----- submenu WORK 📌📌

const submenuWork = () => {
  let weekDayToday = time.getWeekDay();
  let now = time.getPeriod();
  let confirmChoice;

  // seleciona a tarefa se dia/período de trabalho permitido 📌

  if (
    (player.job.daysToWork == "qualquer" ||
      player.job.daysToWork.includes(weekDayToday)) &&
    (player.job.periodsToWork == "qualquer" ||
      player.job.periodsToWork.includes(now))
  ) {
    // solicita a quantidade de horas a trabalhar 📌

    let hoursWorked = validatePromptIntMinMax(
      "trabalhar quantas horas?",
      4,
      1,
      "você deve selecionar um NÚMERO INTEIRO entre 1 e 4"
    );

    // altera o objeto chosenActivity com as opções escolhidas 📌

    const WorkActivity = {
      type: 0,
      title: `TRABALHAR ${hoursWorked}h`,
      cost: 0,
      timeToComplete: hoursWorked * 60,
      needsModification: {
        nutrition: 0,
        energy: 0,
        hygiene: 0,
        toilet: 0,
        fun: Math.ceil((hoursWorked / 2) * -1),
        social: 0,
      },
      work: {
        earnedNow: hoursWorked * player.job.salaryPerHour,
        hoursWorked: hoursWorked,
      },
    };

    Object.assign(chosenActivity, WorkActivity);

    chosenActivity.displayChosenActivityInfo();

    // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente 📌

    confirmChoice = confirmation();
  } else {
    // exibe um erro se dia/período de trabalho não permitido

    console.log(`você não pode trabalhar agora!
        
seu cronograma de trabalho:

   dias: ${player.job.daysToWork}
horário: ${player.job.periodsToWork}
`);

    confirmChoice = 0;

    formatPrompt("digite ENTER para voltar");
  }

  return confirmChoice;
};

// ----- submenu NUTRITION 📌📌

const submenuNutrition = () => {
  let nutritionActivityChoiceIndex;
  let chosenNutritionActivity;
  let confirmChoice;

  console.clear();

  displayPlayerInfo();

  console.log(`NUTRIÇÃO | selecione o que comer`);
  console.log();

  // exibe as opções de comida 📌

  for (let nutritionActivity of activityList_nutrition) {
    console.log(
      `[${nutritionActivity.index}] ${nutritionActivity.title.toUpperCase()}`
    );
  }

  console.log();

  // solicita a escolha da comida 📌

  nutritionActivityChoiceIndex = validatePromptIntMinMax(
    "sua escolha:",
    activityList_nutrition.length - 1,
    0,
    `digite um NÚMERO INTEIRO entre 0 e ${activityList_nutrition.length - 1}`
  );

  chosenNutritionActivity =
    activityList_nutrition[nutritionActivityChoiceIndex];

  console.clear();

  // solicita a escolha entre COZINHAR, DELIVERY e RESTAURANTE 📌

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

  let nutritionPrepMethodIndex = validatePromptIntMinMax(
    "sua escolha:",
    2,
    0,
    `digite um NÚMERO INTEIRO entre 0 e 2`
  );

  // altera o objeto chosenActivity com as opções escolhidas 📌

  let nutritionActivity;

  // COZINHAR 🚨

  switch (nutritionPrepMethodIndex) {
    case 0: {
      nutritionActivity = {
        type: 1,
        typeString: "cook",
        title: `COZINHAR ${chosenNutritionActivity.title.toUpperCase()}`,
        cost: chosenNutritionActivity.cost,
        timeToComplete: chosenNutritionActivity.timeToComplete * 2,
        needsModification: {
          nutrition: chosenNutritionActivity.needsModification.nutrition,
          energy: 0,
          hygiene: 0,
          toilet: chosenNutritionActivity.needsModification.toilet,
          fun: 0,
          social: 0,
        },
      };

      break;
    }

    // DELIVERY 🚨

    case 1: {
      nutritionActivity = {
        type: 1,
        typeString: "delivery",
        title: `DELIVERY - ${chosenNutritionActivity.title.toUpperCase()}`,
        cost: Math.floor(chosenNutritionActivity.cost * 1.5),
        timeToComplete: Math.floor(
          chosenNutritionActivity.timeToComplete * 1.5
        ),
        needsModification: {
          nutrition: chosenNutritionActivity.needsModification.nutrition,
          energy: 0,
          hygiene: 0,
          toilet: chosenNutritionActivity.needsModification.toilet,
          fun: 0,
          social: 0,
        },
      };

      break;
    }

    // RESTAURANTE 🚨

    case 2: {
      nutritionActivity = {
        type: 1,
        typeString: "eatOut",
        title: `RESTAURANTE - ${chosenNutritionActivity.title.toUpperCase()}`,
        cost: chosenNutritionActivity.cost * 2,
        timeToComplete: chosenNutritionActivity.timeToComplete,
        needsModification: {
          nutrition: chosenNutritionActivity.needsModification.nutrition,
          energy: 0,
          hygiene: 0,
          toilet: chosenNutritionActivity.needsModification.toilet,
          fun: 0,
          social: 0,
        },
      };

      break;
    }
  }

  Object.assign(chosenActivity, nutritionActivity);

  chosenActivity.displayChosenActivityInfo();

  // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente 📌

  confirmChoice = confirmation();
  return confirmChoice;
};

// submenu ENERGY 📌📌

const submenuEnergy = () => {
  {
    let confirmChoice;

    // solicita a quantidade de horas a dormir 📌

    let hoursSlept = validatePromptIntMinMax(
      "dormir quantas horas?",
      8,
      1,
      "você deve selecionar um NÚMERO INTEIRO entre 1 e 8"
    );

    // altera o objeto chosenActivity com as opções escolhidas 📌

    const energyActivity = {
      type: 2,
      title: `DORMIR ${hoursSlept}h`,
      cost: 0,
      timeToComplete: hoursSlept * 60,
      needsModification: {
        nutrition: 0,
        energy: hoursSlept,
        hygiene: 0,
        toilet: 0,
        fun: 0,
        social: 0,
      },
    };

    Object.assign(chosenActivity, energyActivity);

    chosenActivity.displayChosenActivityInfo();

    // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente 📌

    confirmChoice = confirmation();
    return confirmChoice;
  }
};

// submenu OTHER (hygiene, toilet, fun, social) 📌📌

const submenuOther = (chosenActivityType) => {
  let otherActivityList = [];
  let otherActivityTitle;
  let otherActivityChoiceIndex;
  let chosenOtherActivity;
  let confirmChoice;

  switch (chosenActivityType) {
    case 3:
      otherActivityList = activityList_hygiene;
      otherActivityTitle = "HIGIENE";
      break;
    case 4:
      otherActivityList = activityList_toilet;
      otherActivityTitle = "BANHEIRO";
      break;
    case 5:
      otherActivityList = activityList_fun;
      otherActivityTitle = "DIVERSÃO";
      break;
    case 6:
      otherActivityList = activityList_social;
      otherActivityTitle = "SOCIAL";
      break;
  }

  console.clear();
  displayPlayerInfo();

  console.log(`${otherActivityTitle} | selecione a atividade`);
  console.log();

  // exibe as opções (submenu) 📌

  for (let activity of otherActivityList) {
    console.log(`[${activity.index}] ${activity.title.toUpperCase()}`);
  }

  console.log();

  // solicita a escolha da atividade 📌

  otherActivityChoiceIndex = validatePromptIntMinMax(
    "sua escolha",
    otherActivityList.length - 1,
    0,
    `digite um NÚMERO INTEIRO entre 0 e ${otherActivityList.length - 1}`
  );

  chosenOtherActivity = otherActivityList[otherActivityChoiceIndex];

  // altera o objeto chosenActivity com as opções escolhidas 📌

  let otherActivity = {
    type: chosenActivityType,
    title: chosenOtherActivity.title.toUpperCase(),
    cost: chosenOtherActivity.cost,
    timeToComplete: chosenOtherActivity.timeToComplete,
    needsModification: chosenOtherActivity.needsModification,
  };

  Object.assign(
    chosenActivity.needsModification,
    chosenOtherActivity.needsModification
  );
  Object.assign(chosenActivity, otherActivity);

  chosenActivity.displayChosenActivityInfo();

  // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente 📌

  confirmChoice = confirmation();
  return confirmChoice;
};

// ----- executa a atividade selecionada 📌📌

const doNextActivity = (chosenActivityType) => {
  switch (chosenActivityType) {
    case 0: {
      doWork(chosenActivity); // executa a atividade TRABALHAR
      break;
    }
    case 1: {
      doNutritionActivity(chosenActivity); // executa a atividade NUTRIÇÃO
      break;
    }
    case 2: {
      doEnergyActivity(chosenActivity); // executa a atividade DORMIR
      break;
    }
    default: {
      doOtherActivity(chosenActivity); // executa a atividade HIGIENE, BANHEIRO, DIVERSÃO ou SOCIAL
      break;
    }
  }
};

// ----- executa a atividade TRABALHAR 📌

const doWork = (chosenActivity) => {
  workAnimation();
  time.increment(chosenActivity.timeToComplete);
  player.wallet += chosenActivity.work.earnedNow;
  player.updateNeeds(chosenActivity);
  records.work.totalTimes++;
  records.work.totalHours += chosenActivity.work.hoursWorked;
  records.work.totalEarnings += chosenActivity.work.earnedNow;
};

// ----- executa a atividade de NUTRIÇÃO escolhida 📌

const doNutritionActivity = (chosenActivity) => {
  nutritionAnimation();
  time.increment(chosenActivity.timeToComplete);
  player.updateWallet(chosenActivity.cost);
  player.updateNeeds(chosenActivity);
  records["nutrition"][chosenActivity.typeString]["totalTimes"]++;
  records.nutrition.totalCost += chosenActivity.cost;
  records.nutrition.totalMinutes += chosenActivity.timeToComplete;
};

// ----- executa a atividade DORMIR 📌

const doEnergyActivity = (chosenActivity) => {
  energyAnimation(
    time.hours,
    time.minutes,
    chosenActivity.needsModification.energy
  );
  time.increment(chosenActivity.timeToComplete);
  player.updateNeeds(chosenActivity);
  records.energy.totalTimes++;
  records.energy.totalHours += chosenActivity.needsModification.energy;
};

// ----- executa a atividade de HIGIENE, BANHEIRO, DIVERSÃO ou SOCIAL 📌

const doOtherActivity = (chosenActivity) => {
  switch (chosenActivity.type) {
    case 3: {
      hygieneAnimation();
      records.hygiene.totalTimes++;
      records.hygiene.totalCost += chosenActivity.cost;
      records.hygiene.totalMinutes += chosenActivity.timeToComplete;
      break;
    }
    case 4: {
      toiletAnimation();
      records.toilet.totalTimes++;
      records.toilet.totalCost += chosenActivity.cost;
      records.toilet.totalMinutes += chosenActivity.timeToComplete;
      break;
    }
    case 5: {
      funAnimation();
      records.fun.totalTimes++;
      records.fun.totalCost += chosenActivity.cost;
      records.fun.totalMinutes += chosenActivity.timeToComplete;
      break;
    }
    case 6: {
      socialAnimation();
      records.social.totalTimes++;
      records.social.totalCost += chosenActivity.cost;
      records.social.totalMinutes += chosenActivity.timeToComplete;
      break;
    }
  }

  time.increment(chosenActivity.timeToComplete);
  player.updateWallet(chosenActivity.cost);
  player.updateNeeds(chosenActivity);
};

// ----- DISPLAY FORMATTED INFO ----- 📌📌📌

// ----- exibe as informações do jogador 📌📌

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
🍔  ${player.needs.nutrition
    .toString()
    .padStart(2, "0")}      🧼  ${player.needs.hygiene
    .toString()
    .padStart(2, "0")}      🎈  ${player.needs.fun.toString().padStart(2, "0")}
💤  ${player.needs.energy
    .toString()
    .padStart(2, "0")}      🚽  ${player.needs.toilet
    .toString()
    .padStart(2, "0")}      💬  ${player.needs.social
    .toString()
    .padStart(2, "0")}
---------------------------
`);
};

// retorna as modificações de atributos formatadas. ex: 🍔 +1 | 🚽 -3 📌📌

const getFormattedNeedsModification = (needsModification) => {
  const needsModificationList = [];
  const needsModificationKeys = [
    "nutrition",
    "energy",
    "hygiene",
    "toilet",
    "fun",
    "social",
  ];

  for (let key of needsModificationKeys) {
    if (needsModification[key] > 0 || needsModification[key] < 0) {
      needsModificationList.push([key, needsModification[key]]);
    }
  }

  const needsModificationFormatted = [];

  for (let need of needsModificationList) {
    let needEmoji;
    let valueFormated = need[1].toString().padStart(2, "+");

    switch (need[0]) {
      case "nutrition":
        needEmoji = "🍔";
        break;
      case "energy":
        needEmoji = "💤";
        break;
      case "hygiene":
        needEmoji = "🧼";
        break;
      case "toilet":
        needEmoji = "🚽";
        break;
      case "fun":
        needEmoji = "🎈";
        break;
      case "social":
        needEmoji = "💬";
        break;
    }

    needsModificationFormatted.push(`${valueFormated} ${needEmoji}`);
  }

  let needsModificationString = needsModificationFormatted.join(" | ");
  return needsModificationString;
};

// ----- CODE START ----- 📌📌📌

const gameName = formatToTitle("քǟʀǟʟɨʄɛ");
let confirmChoice;

// ----- TELA INCIAL -----📌📌📌

// TODO: 🚨🚨🚨

// ----- seleção das características do jogador (nome e profissão) !!: 📌📌

console.clear();
console.log(gameName);

// solicita o nome do jogador e adiciona no objeto player 📌

player.name = validatePromptString(
  "digite seu nome:",
  "o nome não pode ser vazio"
);

console.clear();

// solicita a seleção da profissão do jogador 📌

let jobChoiceIndex;
let chosenJob;

// repete a seleção da profissão até a confirmação do jogador 📌

while (true) {
  console.log(gameName);

  console.log("selecione sua profissão");

  for (let job of jobList) {
    console.log(`[${job.index}] ${job.title}`);
  }

  console.log();

  jobChoiceIndex = validatePromptIntMinMax(
    "sua escolha:",
    jobList.length,
    0,
    `digite um NÚMERO INTEIRO entre 0 e ${jobList.length - 1}`
  );

  chosenJob = jobList[jobChoiceIndex];

  console.clear();
  console.log(gameName);

  // exibe a opção selecionada 📌

  console.log(`profissão selecionada | ${chosenJob.title.toUpperCase()}
  
  dias: ${chosenJob.daysToWork}
  horário: ${chosenJob.periodsToWork}
  salário: $${chosenJob.salaryPerHour}/hora
  carga horária mínima: ${chosenJob.minHoursPerWeek}h/semana
  `);

  // dá ao jogador a opção de confirmar a seleção ou voltar e escolher novamente 📌

  confirmChoice = confirmation();

  if (confirmChoice == 1) {
    break;
  }
}

// atualiza o objeto player com os detalhes da profissão escolhida 📌

player.updatePlayerJob(chosenJob);

console.clear();

// ----- MENU PRINCIPAL -----📌📌📌

let mainMenuChoice;

const mainMenu = [
  "TRABALHO",
  "NUTRIÇÃO",
  "ENERGIA",
  "HIGIENE",
  "BANHEIRO",
  "DIVERSÃO",
  "SOCIAL",
];

// ----- solicita a seleção da próxima atividade até o fim do jogo (> 7 dias) 📌📌

while (true) {
  let currentPeriod = time.getPeriod(); // variáveis para definição de update autônomo baseado na mudança de período
  let newPeriod;

  // ----- repete a seleção da atividade (MENU e SUBMENU) até a confirmação do jogador 📌📌

  while (true) {
    // exibe dia/hora + status dos atributos 📌

    displayPlayerInfo();

    console.log(`selecione a próxima atividade`);
    console.log();

    // exibe as opções (MENU PRINCIPAL) 📌📌

    for (let option of mainMenu) {
      console.log(`[${mainMenu.indexOf(option)}] ${option}`);
    }

    console.log();

    // solicita a seleção da atividade

    mainMenuChoice = validatePromptIntMinMax(
      "sua escolha:",
      mainMenu.length - 1,
      0,
      `digite um NÚMERO INTEIRO entre 0 e ${mainMenu.length - 1}`
    );

    console.log();

    // ----- SUBMENU -----📌📌

    // ----- exibe opções adicionais e confirma a seleção da atividade 📌

    switch (mainMenuChoice) {
      case 0: {
        confirmChoice = submenuWork(); // submenu TRABALHAR
        break;
      }
      case 1: {
        confirmChoice = submenuNutrition(); // submenu NUTRIÇÃO
        break;
      }
      case 2: {
        confirmChoice = submenuEnergy(); // submenu ENERGIA
        break;
      }
      default: {
        confirmChoice = submenuOther(mainMenuChoice); // submenu HIGIENE, BANHEIRO, DIVERSÃO E SOCIAL
        break;
      }
    }

    if (confirmChoice == 1) {
      break;
    }
  }

  // ----- executa a atividade selecionada 📌

  doNextActivity(chosenActivity.type);

  console.clear();

  // ----- atualiza os atributos de forma autônoma a cada troca de período 📌📌

  newPeriod = time.getPeriod();

  if (currentPeriod != newPeriod) {
    player.updateNeedsAutonomous();
  }

  // ----- atividades autônomas disparadas por necessidade <= 0 📌📌

  lowNeedActivities.triggerAction();

  // ----- finaliza o jogo após 7 dias completos 📌📌

  let dayNumberToday = time.getDay();

  // FIXME: 🚨🚨 => dayNumberToday > 7

  if (dayNumberToday > 1) {
    break;
  }
}
// ----- tela GAME OVER ----- 📌📌📌

gameOverAnimation();

console.log(
  '"a vida é como um jogo\ne cada vez que damos um passo\nnós caminhamos para o GAME OVER."'
);

console.log();
formatPrompt("digite ENTER para ver seus resultados");
console.clear();

// ----- exibe os resultados até o jogador escolher sair 📌📌

while (true) {

// ----- TELA 1 - ÁREAS (trabalho, saúde física e saúde mental) 📌

  console.log(formatToTitle("TRABALHO"));

  if (records.work.totalHours > player.job.minHoursPerWeek + 5) {
    console.log(
      "você foi além das expectativas!\n\nparabéns pela sua PROMOÇÃO! você mereceu! ✨"
    );
  } else if (records.work.totalHours < player.job.minHoursPerWeek - 5) {
    console.log(
      "você não trabalhou o mínimo de horas necessárias.\ninfelizmente, você foi demitido. 💸"
    );
  } else {
    console.log("você cumpriu com suas expectativas no trabalho.");
  }

  console.log();
  sleep(1000);

  console.log(formatToTitle("SAÚDE FÍSICA"));

  if (records.lowNeedAreas.physicalHealth < 3) {
    console.log(
      "nossa, mas que corpo bem cuidado!\nvocê virou influencer fitness e agora ganha milhões nas redes sociais! 💪"
    );
  } else if (records.lowNeedAreas.physicalHealth < 7) {
    console.log(
      "você precisa se cuidar melhor, hein?\nvocê desenvolveu uma doença crônica e agora passa seus dias no hospital. 😷"
    );
  } else {
    ("você cuidou do seu corpo direitinho, parabéns!");
  }

  console.log();
  sleep(1000);

  console.log(formatToTitle("SAÚDE MENTAL"));

  if (records.lowNeedAreas.mentalHealth < 3) {
    console.log(
      "uau! que mente equilibrada!\nvocê virou coach good vibes e ajuda muitas pessoas! ☮"
    );
  } else if (records.mentalHealth.mental < 7) {
    console.log(
      "você não aguentou o stress e foi internado em uma cínica psiquiátrica. 😭"
    );
  } else {
    ("você cuidou do seu corpo direitinho, parabéns!");
  }

  // TODO: outras observações (1 para cada atributo) (nossa, você curte uma balada, hein? você SE DIVERTIU x vezes) 💡

  console.log();
  sleep(1000);

  formatPrompt("digite ENTER para continuar")

  // ----- TELA 2 - ESTATÍSTICAS 📌

  statisticsAnimation();

  sleep(1000);

  console.log(formatToTitle("TRABALHO"));
  console.log(`trabalhou ${records.work.totalTimes} vezes`);
  console.log(
    `🕑 ${records.work.totalHours}h\t💲 +$${records.work.totalEarnings}`
  );

  console.log();
  sleep(1000);

  console.log(formatToTitle("ENERGIA"));
  console.log(`chegou a 0 (OH NO!) ${records.lowNeedActivities.energy.totalTimes} vezes`);
  console.log();
  console.log(`dormiu ${records.energy.totalTimes} vezes`);
  console.log();
  console.log(`🕑 ${records.energy.totalHours}h`);

  console.log();
  sleep(1000);

  console.log(formatToTitle("NUTRIÇÃO"));
  console.log(`chegou a 0 (OH NO!) ${records.lowNeedActivities.nutrition.totalTimes}  vezes`);
  console.log();
  console.log(`cozinhou ${records.nutrition.cook.totalTimes} vezes`);
  console.log(`pediu delivery ${records.nutrition.delivery.totalTimes} vezes`);
  console.log(
    `comeu no restaurante ${records.nutrition.eatOut.totalTimes} vezes`
  );
  console.log();
  console.log(
    `🕑 ${formatClock(
      Math.floor(records.nutrition.totalMinutes / 60),
      records.nutrition.totalMinutes % 60
    )}\t💲 -$${records.nutrition.totalCost}`
  );

  console.log();
  sleep(1000);

  const otherNeedsKeys = ["hygiene", "toilet", "fun", "social"];

  for (let key of otherNeedsKeys) {
    switch (key) {
      case "hygiene": {
        console.log(formatToTitle("HIGIENE"));
        console.log(
          `chegou a 0 (OH NO!) ${records["lowNeedActivities"][key]["totalTimes"]} vezes`
        );
        console.log();
        console.log(`ficou cheiroso ${records[key]["totalTimes"]} vezes`);
        break;
      }
      case "toilet": {
        console.log(formatToTitle("BANHEIRO"));
        console.log(
          `chegou a 0 (OH NO!) ${records["lowNeedActivities"][key]["totalTimes"]} vezes`
        );
        console.log();
        console.log(`usou a casinha ${records[key]["totalTimes"]} vezes`);
        break;
      }
      case "fun": {
        console.log(formatToTitle("DIVERSÃO"));
        console.log(
          `chegou a 0 (OH NO!) ${records["lowNeedActivities"][key]["totalTimes"]} vezes`
        );
        console.log();
        console.log(`curtiu a vida ${records[key]["totalTimes"]} vezes`);
        break;
      }
      case "social":
        console.log(formatToTitle("SOCIAL"));
        console.log(
          `chegou a 0 (OH NO!) ${records["lowNeedActivities"][key]["totalTimes"]} vezes`
        );
        console.log();
        console.log(`jogou conversa fora ${records[key]["totalTimes"]} vezes`);
        break;
    }
    console.log();
    console.log(
      `🕑 ${formatClock(
        Math.floor(records[key]["totalMinutes"] / 60),
        records[key]["totalMinutes"] % 60
      )}\t💲 -$${records[key]["totalCost"]}`
    );

    console.log();
  }

  // sair do jogo ou voltar à tela anterior 📌

  let endGame = validatePromptIntMinMax(
    "digite [0] para sair\ndigite [1] para voltar à tela anterior",
    1,
    0,
    "você deve digitar [0] ou [1]"
  );

  console.clear();

  if (endGame == 0) {
    break;
  }
}
