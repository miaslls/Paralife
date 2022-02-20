"use strict";

const prompt = require("prompt-sync")();

// ----- FORMATTING / VALIDATION FUNCTIONS -----

/* formata o texto como título. ex:
------------
example text
------------

*/

const formatToTitle = (text, separator = "-") => {
  let separatorLine = "";

  for (let i = 0; i < text.length; i++) {
    separatorLine = separatorLine.concat(separator);
  }
  console.log(`${separatorLine}\n${text}\n${separatorLine}\n`);
};

// formata o prompt em linha única ex: > message (prompt)

const formatPrompt = (message) => prompt(`> ${message} `);

/* formata o prompt em múltiplas linhas. ex: 
  message 
  > (prompt)
  */

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

// ----- PROJECT SPECIFIC FUNCTIONS -----

const autorizaVoto = (anoNascimento) => {
  if (anoNascimento > 2006) {
    return "negado";
  } else if (anoNascimento <= 2006 && anoNascimento > 2004) {
    return "opcional";
  } else {
    return "obrigatório";
  }
};

const votacao = (autorizacao) => {
  switch (autorizacao) {
    case "negado": {
      console.log("você não pode votar.");
      console.log();
      break;
    }
    case "opcional": {
      console.log("seu voto é opcional.");
      let votarOpcional = formatPrompt("deseja votar? [S] ou [N]");
      console.log();
      if (votarOpcional.toUpperCase() == "N") {
        break;
      }
    }
    case "obrigatório": {
      console.log(`vote de acordo com a legenda:

      [1] CANDIDATO A
      [2] CANDIDATO B
      [3] CANDIDATO C
      [4] VOTO NULO
      [5] VOTO EM BRANCO
      `);

      let voto = validatePromptIntMinMax(
        "seu voto",
        5,
        1,
        "você deve digitar um NÚMERO entre 1 e 5"
      );

      console.log();

      switch (voto) {
        case 1: {
          resultadosVotacao["candidato A"]++;
          break;
        }
        case 2: {
          resultadosVotacao["candidato B"]++;
          break;
        }
        case 3: {
          resultadosVotacao["candidato C"]++;
          break;
        }
        case 4: {
          resultadosVotacao["nulos"]++;
          break;
        }
        case 5: {
          resultadosVotacao["em branco"]++;
          break;
        }
      }
    }
  }
};

const proximoEleitor = () => {
  let finalizar = validatePromptIntMinMax(
    "digite [0] para próximo eleitor\ndigite [1] para finalizar e ver resultados",
    1,
    0,
    "você deve digitar [0] ou [1]"
  );

  return finalizar;
};

// ----- OBJECTS -----

const resultadosVotacao = {
  "candidato A": 0,
  "candidato B": 0,
  "candidato C": 0,
  nulos: 0,
  "em branco": 0,

  exibirResultados: function () {
    let resultadosVotacaoArray = Object.entries(resultadosVotacao);

    console.clear();
    formatToTitle("resultados | ELEIÇÃO 2022");

    for (let resultado of resultadosVotacaoArray) {
      if (!isNaN(resultado[1])) {
        console.log(`${resultado[0]} - ${resultado[1]} voto(s)`);
      }
    }

    let resultadoCandidatosArray = resultadosVotacaoArray.slice(0,3);
    resultadoCandidatosArray.sort((a, b) => b[1] - a[1]);

    if (resultadoCandidatosArray[0][1] != resultadoCandidatosArray[1][1]) {

    console.log();
    console.log(`${resultadoCandidatosArray[0][0].toUpperCase()} venceu a eleição com um total de ${resultadoCandidatosArray[0][1]} votos.`);
    } else {
        console.log("EMPATE. decisão no segundo turno.");
    }
  },
};

// ----- CODE START -----

let numeroEleitor = 1;

while (true) {
  console.clear();
  formatToTitle(`ELEIÇÕES 2022 | eleitor ${numeroEleitor}`);

  let anoNascimento = formatPrompt("ano de nascimento:");
  let autorizacao = autorizaVoto(anoNascimento);

  console.log();

  votacao(autorizacao);

  let finalizar = proximoEleitor();

  numeroEleitor++;

  if (finalizar) {
    break;
  }
}

resultadosVotacao.exibirResultados();
