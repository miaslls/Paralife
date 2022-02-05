const prompt = require("prompt-sync")();

// get random integer between min and max (inclusive)

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// validade prompt - integer > 0

const validatePositiveInt = (question, errorMessage) => {
  while (true) {
    let num = prompt(question);

    if (!isNaN(num) && num > 0 && num % 1 == 0) {
      return num;
    }

    console.log(errorMessage);
  }
}

// validade prompt - integer between max and min (inclusive)

const validateIntMinMax = (question, errorMessage, max, min = 0) => {
  while (true) {
    let num = prompt(question);

    if (!isNaN(num) && num >= min && num <= max && num % 1 == 0) {
      return num;
    }

    console.log(errorMessage);
  }
}

// sort an object array by key

objectList.sort((a, b) => {
  return a.key1 - b.key2;
});

objectList.forEach((instance) => {
console.log(`${instance.key1} ${instance.key2}`);
});

/* formata o texto como título ex:
//
// --------------
// qualquer texto
// --------------
*/

const formatStringToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (i = 0; i < text.length; i++)
    separatorLine = separatorLine.concat(separator);

  console.log(`\n${separatorLine}\n${text}\n${separatorLine}\n`);

};