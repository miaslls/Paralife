"use strict";

// ----- solicita recursos necessários

const prompt = require("prompt-sync")();
const activityList_nutrition = require("./data/activityList_nutrition.json");
const activityList_hygiene = require("./data/activityList_hygiene.json"); // FIXME:
const activityList_toilet = require("./data/activityList_toilet.json");
const activityList_fun = require("./data/activityList_fun.json"); // FIXME:
const activityList_social = require("./data/activityList_social.json"); // FIXME:
const jobList = require("./data/jobList.json"); //FIXME:
const formatFunctions = require("./lib/format.js");
const validateFunctions = require("./lib/validate.js");
const sleepFunction = require("./lib/sleep.js")
const nutritionAnimation = require("./ASCII_Animations/nutrition.js");
const energyAnimation = require("./ASCII_Animations/energy.js");
const hygieneAnimation = require("./ASCII_Animations/hygiene.js");
const toiletAnimation = require("./ASCII_Animations/toilet.js");
const funAnimation = require("./ASCII_Animations/fun.js");
const socialAnimation = require("./ASCII_Animations/social.js"); // FIXME:
const workAnimation = require("./ASCII_Animations/work.js");
const ohNoAnimation = require("./ASCII_Animations/ohNo.js");

console.clear();
ohNoAnimation.ohNoAnimation();

console.log(`seu atributo ATRIBUTO chegou a 0!

MENSAGEM RELACIONADA AO ATRIBUTO BAIXO

+10 🍔 \t -5 💬
`);

formatFunctions.formatPrompt("digite ENTER para continuar");
console.clear();

