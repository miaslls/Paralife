const prompt = require("prompt-sync")();
const activityList = require("./data/activityList.json");
const jobList = require("./data/jobList.json");
const formatFunctions = require("./functions/format.js");
const validateFunctions = require("./functions/validate.js");

console.log(jobList[1].title);