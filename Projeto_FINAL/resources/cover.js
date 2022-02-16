const prompt = require("prompt-sync")();
const { formatPrompt } = require("../lib/formatting");

// BM: PROJETO FINAL - Módulo 1 | BLUE

let integrantesDoGrupo = [
  "Camila Salles",
  "Carlos Eduardo Carvalho",
  "Tatiana Gandra",
];

let notaDoProjeto = formatPrompt("nota do projeto:");

for (let integrante of integrantesDoGrupo) {
  if (notaDoProjeto == 10) {
    console.log(integrante, "🥰");
  } else {
    console.log(integrante, "😰");
  }
}