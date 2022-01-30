const prompt = require("prompt-sync")();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

while (true) {

console.log(``);

let numberOfRounds;

while (true) {
  numberOfRounds = prompt(`          # of rounds: `);

  if (!isNaN(numberOfRounds) && numberOfRounds % 1 == 0 && numberOfRounds > 0) {
    break;
  }
  console.log(`\n\tYou must choose a NUMBER > 0`);
}

let roundCount = 1;
let drawCount = 0;
let playerWinCount = 0;
let computerWinCount = 0;

while (roundCount <= numberOfRounds) {
  console.log(`
\tJOKENPO | round #${roundCount} of ${numberOfRounds}

\t+ ROCK beats SCISSORS
\t+ SCISSORS beats PAPER
\t+ PAPER beats ROCK\n`);

  let jokenpoPlayer;

  while (true) {
    jokenpoPlayer = prompt(`        [ROCK], [PAPER] or [SCISSORS]? `).trim().toUpperCase();
    if (
      jokenpoPlayer == "ROCK" ||
      jokenpoPlayer == "PAPER" ||
      jokenpoPlayer == "SCISSORS"
    ) {
      break;
    }
    console.log(`\n\tYou must type [ROCK], [PAPER] or [SCISSORS]`);
  }

  const jokenpoChoices = ["ROCK", "PAPER", "SCISSORS"];

  let jokenpoComputerIndex = getRandomIntInclusive(0, 2);

  jokenpoComputer = jokenpoChoices[jokenpoComputerIndex];

  console.log(`\n\tYOU: \t\t${jokenpoPlayer}
  \tCOMPUTER: \t${jokenpoComputer}`);

  if (jokenpoPlayer == jokenpoComputer) {
    console.log(`\n\t[DRAW!]\n`);
    drawCount++;
  } else if (
    (jokenpoPlayer == "ROCK" && jokenpoComputer == "SCISSORS") ||
    (jokenpoPlayer == "PAPER" && jokenpoComputer == "ROCK") ||
    (jokenpoPlayer == "SCISSORS" && jokenpoComputer == "PAPER")
  ) {
    console.log(`\n\t[WIN]\n`);
    playerWinCount++;
  } else {
    console.log(`\n\t[LOSE]\n`);
    computerWinCount++;
  }

  roundCount++;
}

console.log(`\t------------------

\tRESULTS:

\t       ROUNDS:  ${numberOfRounds}

\t        DRAWS:  ${drawCount}
\t  PLAYER WINS:  ${playerWinCount}
\tCOMPUTER WINS:  ${computerWinCount}
\t------------------`);

if (playerWinCount > computerWinCount) {
    console.log(`\n\tYOU are the WINNER\n`);
} else if (playerWinCount < computerWinCount) {
    console.log(`\n\tthe COMPUTER is the winner\n`)
} else {
    console.log(`\n\tit's a DRAW\n`);
}

let playAgain = prompt(`play again? [YES] or [NO] `).trim().toUpperCase();

if (playAgain == "NO") {
    break;
}
console.clear();
}