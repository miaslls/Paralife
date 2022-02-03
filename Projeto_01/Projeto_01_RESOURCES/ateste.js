let persuasion = 0;

let diceRoll = 3

if (diceRoll > 6) {
    diceRoll = 6;
  } else if (diceRoll < 4) {
    console.log(
      `\n\t[LOSE]`
    );
    persuasion--;
  } else {
    console.log(`\n\t[WIN]`
  );
    persuasion++;
  }
  
  console.log(`\n\tYou roll a ${diceRoll}!`);