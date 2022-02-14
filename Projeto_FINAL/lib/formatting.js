const prompt = require("prompt-sync")();

// ----- FORMAT FUNCTIONS -----

/* formata o texto como título. ex:
------------
example text
------------

*/

exports.formatToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (i = 0; i < text.length; i++) {
    separatorLine = separatorLine.concat(separator);
  }
  return `${separatorLine}\n${text}\n${separatorLine}\n`;
};

// formata o prompt em linha única ex: > message (prompt)

exports.formatPrompt = (message) => prompt(`> ${message} `);

/* formata o prompt em múltiplas linhas. ex: 
  > message 
  > (prompt)
  */

exports.formatPromptMultipleLines = (message) => {
  console.log(message);
  return prompt(`> `);
};

exports.formatClock = (hours, minutes) => {
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

// pausa a execução do código por (milliseconds)

exports.sleep = (milliseconds) => {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};
