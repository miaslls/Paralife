const prompt = require("prompt-sync")();

let background = `Você é um(a) jovem nobre. No dia do seu casamento, seu noivo(a) foi envenenado. \nVocê sai em uma quest para vingar a morte dele(a).`

let perguntas = [
  "Você descobriu quem era o assassino? [S/N] ",
  "Você conseguiu que o assassino confessasse seus motivos? [S/N] ",
  "Você entregou o assassino às autoridades? [S/N] ",
  "Você interviu para que alterassem a pena de morte para prisão perpétua? [S/N] ",
  "Você foi escolhida pelo povo para liderá-los, por sua compaixão e senso de justiça? [S/N] ",
];

console.log(`\n${background}\n`)

let resposta;
let s = 0;

for (i = 0; i < perguntas.length; i++) {
  resposta = prompt(perguntas[i]);
  if (resposta.toUpperCase() == "S") {
    s++;
  }
}

if (s == 0) {
  console.log(`\nVocê falha miseravelmente.\n`);
} else if (s == 1 || s == 2) {
  console.log(`\nVocê falha, mas ainda consegue fugir da situação.\n`);
} else if (s == 3) {
  console.log(`\nVocê chega perto de conseguir alcançar seu objetivo, mas acaba falhando por pouco.\n`);
} else if (s == 4) {
    console.log(`\nDepois de muito esforço você conquista seu objetivo, embora não de maneira perfeita.\n`);
} else if (s == 5) {
    console.log(`\nVocê triunfa de maneira inquestionável e seus feitos serão lembrados por muitas gerações.\n`)
}
