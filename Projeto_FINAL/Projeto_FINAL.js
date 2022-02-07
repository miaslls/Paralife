// ----- FORMAT FUNCTIONS ----- TODO: REMOVE UNUSED FUNCTIONS ⚠

/* formata o texto como título. ex:

------------
example text
------------

*/

const formatToTitle = (text, separator = "-") => {
    let separatorLine = "";
  
    for (i = 0; i < text.length; i++) {
      separatorLine = separatorLine.concat(separator);
    }
    console.log(`\n${separatorLine}\n${text}\n${separatorLine}\n`);
  }
  
  // formata o prompt em linha única ex: > message (prompt)
  
  const formatPrompt = (message) => prompt(`> ${message} `);
  
  /* formata o prompt em múltiplas linhas. ex: 
  > message 
  > (prompt)
  */
  
  const formatPromptMultipleLines = (message) => {
    console.log(message)
    return prompt(`> `);
  }

// ----- VALIDATION FUNCTIONS -----

// impede o input de string vazia

const validatePromptString = (message, errorMessage = "INVÁLIDO") => {
  while (true) {
    let string = formatPromptMultipleLines(message);

    if (string.length > 0) {
      return string;
    }
    console.log(`\n${errorMessage}\n`);
  }
}

// valida número inteiro > 0

const validatePromptPositiveInt = (message, errorMessage = "INVÁLIDO") => {
    while (true) {
      let num = formatPromptMultipleLines(message);
  
      if (!isNaN(num) && num > 0 && num % 1 == 0) {
        return num;
      }
      console.log(errorMessage);
    }
  }
  
  // valida número inteiro entre min e max (inclusice min e max)
  
  const validatePromptIntMinMax = (message, max, min = 0, errorMessage = "INVÁLIDO") => {
    while (true) {
      let num = formatPromptMultipleLines(message);
  
      if (!isNaN(num) && num >= min && num <= max && num % 1 == 0) {
        return num;
      }
      console.log(errorMessage);
    }
  }

// ----- OTHER FUNCTIONS -----

// retorna número inteiro aleatório entre min e max (inclusive min e max)

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
  
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

// ----- CODE START -----
