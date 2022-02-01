function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let playersChoice = 'ROCK';

const elementChoiceList = ['ROCK', 'PAPER', 'SCISSORS', 'LIZARD', 'SPOCK'];

let computerChoiceIndex = getRandomIntInclusive(0, elementChoiceList.length - 1);
computerChoice = elementChoiceList[computerChoiceIndex];

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

for (i = 0; i < diagramVictory.length; i++) {

  diagramVictoryJoined.push(diagramVictory[i].join());
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

let drawCount = 0;
let winCount = 0;
let loseCount = 0;

if (playersChoice == computerChoice) {
  drawCount++;
  console.log(`DRAW`);
} else {
  if (diagramVictoryJoined.indexOf(result.join()) == -1) {
    console.log(`LOSE`);
    loseCount++;
    result = [computerChoice, playersChoice];
    
  } else {
    console.log(`WIN`);
    winCount++;
  }

  let resultIndex = diagramVictoryJoined.indexOf(result.join());
  let resultAction = actionList[resultIndex];

  console.log(result.join(' ' + actionList[resultIndex] + ' '));
}