const prompt = require("prompt-sync")();

// executa uma nova partida caso playAgain == 'SIM'

while (true) {
  console.log(`\nJOKENPO\n\n+ PEDRA\t\tganha de\tTESOURA\n+ TESOURA\tganha de\tPAPEL\n+ PAPEL\t\tganha de\tPEDRA\n\n-----------------------\n`);

  // solicita número de rodadas ao jogador, e valida a resposta (número inteiro > 0)

  let numberOfRounds;

  while (true) {
    numberOfRounds = prompt(`> número de rodadas: `);

    if (!isNaN(numberOfRounds) && numberOfRounds % 1 == 0 && numberOfRounds > 0) {
      break;
    }
    console.log(`\nvocê deve escolher um NÚMERO > 0`);
  }

  // redefine o placar para 0 ao começo da partida

  let drawCount = 0;
  let playerWinCount = 0;
  let computerWinCount = 0;

  // executa as rodadas de acordo com o número selecionado pelo jogador

  for (i = 0; i < numberOfRounds; i++) {
    console.log(`\n-----------------------\n\nrodada #${i + 1} de ${numberOfRounds}`);

    // solicita a escolha do jogador e valida a resposta (PEDRA, PAPEL ou TESOURA)

    let jokenpoPlayer;

    console.log(`\n\n[PEDRA] [PAPEL] [TESOURA]\n`);

    while (true) {
      jokenpoPlayer = prompt(`> sua escolha: `).trim().toUpperCase();
      if (jokenpoPlayer == "PEDRA" || jokenpoPlayer == "PAPEL" || jokenpoPlayer == "TESOURA") {
        break;
      }
      console.log(`\nvocê deve digitar [PEDRA], [PAPEL] ou [TESOURA]\n`);
    }

    // seleciona aleatoriamente a escolha do computador

    const jokenpoChoices = ["PEDRA", "PAPEL", "TESOURA"];

    let jokenpoComputerIndex = Math.floor(Math.random() * 3);
    jokenpoComputer = jokenpoChoices[jokenpoComputerIndex];

    console.log(`\nVOCÊ:        ${jokenpoPlayer}\nCOMPUTADOR:  ${jokenpoComputer}`);

    // valida o resultado da rodada, exibe se o jogador ganhou, perdeu, ou se houve empate, e adiciona ao placar final da partida

    if (jokenpoPlayer == jokenpoComputer) {
      console.log(`\n|| EMPATE ||`);
      drawCount++;
    } else if (
      (jokenpoPlayer == "PEDRA" && jokenpoComputer == "TESOURA") ||
      (jokenpoPlayer == "PAPEL" && jokenpoComputer == "PEDRA") ||
      (jokenpoPlayer == "TESOURA" && jokenpoComputer == "PAPEL")
    ) {
      console.log(`\n|| VENCEU ||`);
      playerWinCount++;
    } else {
      console.log(`\n|| PERDEU ||`);
      computerWinCount++;
    }
  }

  // exibe o placar final da partida

  console.log(`
-----------------------

RESULTADO DA PARTIDA

 
           RODADAS:  ${numberOfRounds}
 
           EMPATES:  ${drawCount}
    PONTOS JOGADOR:  ${playerWinCount}
 PONTOS COMPUTADOR:  ${computerWinCount}

-----------------------
  `);

  if (playerWinCount > computerWinCount) {
    console.log(`|| VOCÊ é o VENCEDOR ||\n`);
  } else if (playerWinCount < computerWinCount) {
    console.log(`|| o COMPUTADOR é o vencedor ||\n`);
  } else {
    console.log(`|| foi um EMPATE ||\n`);
  }

  // pergunta se o jogador deseja iniciar uma nova partida

  let playAgain = prompt(`jogar novamente [SIM] ou [NÃO] `).trim().toUpperCase();

  if (playAgain != "SIM") {
    break;
  }
} 