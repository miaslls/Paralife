"use strict"; // catador de 🐞
const prompt = require("prompt-sync")(); // requer o prompt
let today = new Date(); // define a data / hora atual

// 📌📌📌 ----- FORMATTING / VALIDATION FUNCTIONS -----

// formata o texto como título

const formatToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (let i = 0; i < text.length + 1; i++) {
    separatorLine = separatorLine.concat(separator);
  }
  console.log(`${separatorLine}\n${text}\n${separatorLine}\n`);
};

// formata o prompt em múltiplas linhas

const formatPromptMultipleLines = (message) => {
  console.log(message);
  return prompt(`> `);
};

// valida NÚMERO INTEIRO entre MIN e MAX (inclusive min e max)

const validatePromptIntMinMax = (
  message,
  max,
  min = 0,
  errorMessage = "INVÁLIDO"
) => {
  while (true) {
    let num = formatPromptMultipleLines(message);

    if (!isNaN(num) && num >= min && num <= max && num % 1 == 0) {
      return parseInt(num);
    }
    console.log(`\n${errorMessage}\n`);
  }
};

const validateTwoOptionStringPrompt = (
  message,
  string1,
  string2,
  errorMessage = "INVÁLIDO"
) => {
  while (true) {
    let str = formatPromptMultipleLines(message).toUpperCase();

    if (str == string1 || str == string2) {
      return str;
    }
    console.log(`\n${errorMessage}\n`);
  }
};

// 📌📌📌 ----- OBJECTS / METODS DEFINITION -----

const election = {
  results: {
    "candidato A": 0,
    "candidato B": 0,
    "candidato C": 0,
    "EM BRANCO": 0,
    "NULOS": 0,
  },

  // 📌 exibe o cabeçalho da página

  showHeader: function () {
    console.clear();

    let date = `${today.getDate().toString().padStart(2, "0")}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getFullYear().toString().substring(2)}`;
    let time = `${today.getHours().toString().padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}`;

    formatToTitle(`✅ ELEIÇÃO ${today.getFullYear()} | 📆 ${date} | 🕑 ${time}`);
  },

  // 📌 autoriza o voto pela idade do eleitor (data de nascimento)

  voteAuth: function (roundNumber) {
    console.log(`ELEITOR #${roundNumber}`);
    console.log();

    // solicita a data de nascimento do eleitor

    let birthYear = validatePromptIntMinMax(
      "ano de nascimento:",
      today.getFullYear(),
      1900,
      "digite o ANO DE NASCIMENTO com 4 dígitos. ex: 1998"
    );

    let birthMonth =
      validatePromptIntMinMax(
        "mês de nascimento:",
        12,
        1,
        "você deve digitar o NÚMERO correspondente ao MÊS DE NASCIMENTO. ex: 04"
      ) - 1;

    let birthDay = validatePromptIntMinMax(
      "dia de nascimento:",
      31,
      1,
      "digite o DIA DO NASCIMENTO. ex: 23"
    );

    console.log();

    let birthDate = new Date(birthYear, birthMonth, birthDay);

    // cutDate => menor de 16 anos

    let cutDate = new Date(
      today.getFullYear() - 16,
      today.getMonth(),
      today.getDate()
    );

    // optionalDate => menor de 18 anos

    let optionalDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (birthDate > cutDate) {
      return "denied";
    } else if (birthDate > optionalDate) {
      return "optional";
    } else {
      return "mandatory";
    }
  },

  // 📌 solicita / nega o voto de acordo com autorização

  vote: function (auth) {
    switch (auth) {
      case "denied": {
        console.log("você não pode votar (menor de 16 anos).");
        console.log();
        break;
      }
      case "optional": {
        console.log("seu voto é opcional.");
        let voteOptional = validateTwoOptionStringPrompt(
          "deseja votar? [S] ou [N]",
          "S",
          "N",
          "você deve digitar [S] ou [N]"
        );
        console.log();
        if (voteOptional == "N") {
          break;
        }
      }
      case "mandatory": {
        console.log(`vote de acordo com a legenda:

  [1] CANDIDATO A
  [2] CANDIDATO B
  [3] CANDIDATO C
  [4] EM BRANCO
  [5] NULO
      `);

        let vote = validatePromptIntMinMax(
          "seu voto:",
          5,
          1,
          "você deve digitar um NÚMERO entre 1 e 5"
        );
        console.log();

        if (vote == 1) {
          this.results["candidato A"]++;
        }
        if (vote == 2) {
          this.results["candidato B"]++;
        }
        if (vote == 3) {
          this.results["candidato C"]++;
        }
        if (vote == 4) {
          this.results["EM BRANCO"]++;
        }
        if (vote == 5) {
          this.results["NULOS"]++;
        }
      }
    }
  },

  // 📌 repete autorização / votação ou finaliza e exibe resultados

  nextVoter: function () {
    let endRound = validatePromptIntMinMax(
      "digite [0] para próximo eleitor\ndigite [1] para finalizar e ver resultados",
      1,
      0,
      "você deve digitar [0] ou [1]"
    );

    return endRound;
  },

  // 📌 exibe resultados da eleição

  showResults: function () {
    console.clear();
    this.showHeader();

    const resultsArray = Object.entries(election.results);

    for (let result of resultsArray) {
      console.log(`${result[0]} - ${result[1]} voto(s)`);
    }

    const candidateResultsArray = resultsArray.slice(0, 3);
    candidateResultsArray.sort((a, b) => b[1] - a[1]);

    if (candidateResultsArray[0][1] != candidateResultsArray[1][1]) {
      console.log();
      console.log(`${candidateResultsArray[0][0].toUpperCase()} venceu a eleição com um total de ${candidateResultsArray[0][1]} votos.`);
      console.log();
    } else {
      console.log();
      console.log("EMPATE. decisão no segundo turno.");
      console.log();
    }
  },
};

// 📌📌📌 ----- CODE START -----

let roundNumber = 1;

while (true) {
  election.showHeader();
  let auth = election.voteAuth(roundNumber);
  election.vote(auth);

  roundNumber++;

  let endRound = election.nextVoter();

  if (endRound) {
    break;
  }
}

election.showResults();
