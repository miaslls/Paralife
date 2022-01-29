const prompt = require("prompt-sync")();

const background = `Você é um(a) jovem nobre. No dia do seu casamento, seu noivo(a) foi envenenado. 
Você sai em uma quest para vingar a morte dele(a).`;

const perguntas = [
  "Você descobriu quem era o assassino? [S/N] ",
  "Você conseguiu que o assassino confessasse seus motivos? [S/N] ",
  "Você entregou o assassino às autoridades? [S/N] ",
  "Você interveio para que alterassem a pena de morte para prisão perpétua? [S/N] ",
  "Você foi escolhida pelo povo para liderá-los, por sua compaixão e senso de justiça? [S/N] ",
];

console.log(`\n${background}\n`);

let contSim = 0;

for (i = 0; i < perguntas.length; i++) {
  let resposta;

  while (true) {
    resposta = prompt(perguntas[i]).trim().toUpperCase();
    if (resposta == "S" || resposta == "N") {
      break;
    }
    console.log(`\nVocê deve digitar [S] ou [N]`);
  }
  
  if (resposta == "S") {
    contSim++;
  }
}

console.log(`\n\tVocê atingiu ${contSim} objetivos.`);

const respostas = [
  `\tVocê falha miseravelmente.\n`,
  `\tVocê falha, mas ainda consegue fugir da situação.\n`,
  `\tVocê falha, mas ainda consegue fugir da situação.\n`,
  `\tVocê chega perto de conseguir alcançar seu objetivo, mas acaba falhando por pouco.\n`,
  `\tDepois de muito esforço você conquista seu objetivo, embora não de maneira perfeita.\n`,
  `\tVocê triunfa de maneira inquestionável e seus feitos serão lembrados por muitas gerações.\n`,
];

console.log(respostas[contSim]);