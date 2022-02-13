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