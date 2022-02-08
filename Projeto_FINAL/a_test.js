const prompt = require("prompt-sync")();
const activityList = require("./activityList.json");

const formatPromptMultipleLines = (message) => {
  console.log(message);
  return prompt(`> `);
};

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
  },
};

let activityChoice = validatePromptIntMinMax("O que você deseja fazer?", 2);
let chosenActivity = activityList[activityChoice];

player.doActivity(chosenActivity);

console.log("object player", player);