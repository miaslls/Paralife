const prompt = require("prompt-sync")();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const diagramText = `
SCISSORS    cuts        PAPER
PAPER       covers      ROCK
ROCK        crushes     LIZARD
LIZARD      poisons     SPOCK
SPOCK       smashes     SCISSORS
SCISSORS    decapitates LIZARD
LIZARD      eats        PAPER
PAPER       disproves   SPOCK
SPOCK       vaporizes   ROCK
ROCK        crushes     SCISSORS
`;

while (true) {
  console.log(`
-------------------------------------
rock, paper, scissors, lizard, Spock
-------------------------------------`);
  console.log(diagramText);

  let drawCount = 0;
  let playerWinCount = 0;
  let computerWinCount = 0;

  // rounds

  let numberOfRounds;

  while (true) {
    numberOfRounds = prompt(`number of rounds: `);

    if (
      !isNaN(numberOfRounds) &&
      numberOfRounds % 1 == 0 &&
      numberOfRounds > 0
    ) {
      break;
    }
    console.log(`\n\tYou must choose a NUMBER > 0`);
  }

  console.log(`--------------------`);

  for (i = 0; i < numberOfRounds; i++) {
    console.log(`
ROUND #${i + 1} of ${numberOfRounds}
`);

    // get player's choice

    const elementChoiceList = ["ROCK", "PAPER", "SCISSORS", "LIZARD", "SPOCK"];

    let playersChoice;

    while (true) {
      let validation = 0;

      console.log(`\n[ROCK] [PAPER] [SCISSORS] [LIZARD] [SPOCK]\n`);
      playersChoice = prompt(`your choice: `).trim().toUpperCase();

      for (element of elementChoiceList) {
        if (playersChoice == element) {
          validation = 1;
        }
      }
      if (validation) {
        break;
      }
      console.log(`\nyou must choose a valid option. ex: ROCK`);
    }

    // get computer choice

    let computerChoiceIndex = getRandomIntInclusive(0,elementChoiceList.length - 1);
    let computerChoice = elementChoiceList[computerChoiceIndex];

    // show both choices

    console.log(`
YOU:        ${playersChoice}
COMPUTER:   ${computerChoice}
`);

    // calculate round results

    const diagramVictory = [
      [elementChoiceList[0], elementChoiceList[2]],
      [elementChoiceList[0], elementChoiceList[3]],
      [elementChoiceList[1], elementChoiceList[0]],
      [elementChoiceList[1], elementChoiceList[4]],
      [elementChoiceList[2], elementChoiceList[1]],
      [elementChoiceList[2], elementChoiceList[3]],
      [elementChoiceList[3], elementChoiceList[1]],
      [elementChoiceList[3], elementChoiceList[4]],
      [elementChoiceList[4], elementChoiceList[0]],
      [elementChoiceList[4], elementChoiceList[2]],
    ];

    const diagramVictoryJoined = [];

    for (j = 0; j < diagramVictory.length; j++) {
      diagramVictoryJoined.push(diagramVictory[j].join());
    }

    const actionList = [
      "crushes",
      "crushes",
      "covers",
      "disproves",
      "cuts",
      "decapitates",
      "eats",
      "poisons",
      "vaporizes",
      "smashes",
    ];

    let result = [playersChoice, computerChoice];

    if (playersChoice == computerChoice) {
      drawCount++;
      console.log(`DRAW`);
    } else {
      if (diagramVictoryJoined.indexOf(result.join()) == -1) {
        console.log(`LOSE`);
        computerWinCount++;
        result = [computerChoice, playersChoice];
      } else {
        console.log(`WIN`);
        playerWinCount++;
      }

      // show round results (win/lose)

      let resultIndex = diagramVictoryJoined.indexOf(result.join());
      let resultAction = actionList[resultIndex];

      if (playersChoice != computerChoice) {
        console.log(result.join(" " + actionList[resultIndex] + " "));
      }
    }
    console.log(`--------------------`);
  }

  // show final results

  console.log(`
RESULTS
  
         ROUNDS:  ${numberOfRounds}
  
          DRAWS:  ${drawCount}
    PLAYER WINS:  ${playerWinCount}
  COMPUTER WINS:  ${computerWinCount}
 -------------------`);

  if (playerWinCount > computerWinCount) {
    console.log(`YOU are the WINNER!\n`);
  } else if (playerWinCount < computerWinCount) {
    console.log(`the COMPUTER is the winner.\n`);
  } else {
    console.log(`it's a DRAW!\n`);
  }

  // play again?

  let playAgain = prompt(`play again? [YES] or [NO] `).trim().toUpperCase();

  if (playAgain != "YES") {
    break;
  }
  console.clear();
}