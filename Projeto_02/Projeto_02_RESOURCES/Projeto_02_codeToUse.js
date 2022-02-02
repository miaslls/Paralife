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

// qualquer número > 0 inteiro

while (true) {
  rodadas = prompt(`número de rodadas: `);
  if (!isNaN(rodadas) && rodadas > 0 && rodadas % 1 == 0 && rodadas.length != 0) {
    break;
  }
  console.log(`\nvocê deve digitar um NÚMERO INTEIRO > 0`);
}

console.log(rodadas);