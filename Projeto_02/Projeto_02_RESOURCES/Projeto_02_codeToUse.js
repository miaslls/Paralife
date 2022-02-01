const prompt = require("prompt-sync")();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ------------------------------------------------------------

while (true) {
  VARIAVEL =  prompt(`PERGUNTA`);
  if (VALIDACAOVERDADEIRA) {
    break;
  }
  console.log(`MENSAGEM DE ERRO`)
}