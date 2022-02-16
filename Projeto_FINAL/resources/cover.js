const prompt = require("prompt-sync")();
const { formatPrompt } = require("../lib/formatting");

// BM: PROJETO FINAL - Módulo 1 | BLUE

let integrantesDoGrupo = [
  "Camila Salles",
  "Carlos Eduardo Carvalho",
  "Tatiana Gandra",
];

let notaDoProjeto = formatPrompt("nota do projeto:");
let destaque = formatPrompt("projeto destaque? [S] ou [N]");

if (notaDoProjeto == 10) {
  integrantesDoGrupo.push("😆🥰")
} else {
  integrantesDoGrupo.push("😰😥");
}
if (destaque.toUpperCase() == "S") {
  integrantesDoGrupo.push("🤩🥳");
}

console.log(integrantesDoGrupo);