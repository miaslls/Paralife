const prompt = require("prompt-sync")();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// BACKGROUND STORY

console.log(`\n\tTHE HERO'S JOURNEY\n`);
console.log(`Today is the happiest day of your life. Or it ought to be. You have just sworn your vows to the love of your life.  
You are sitting on a corner watching the guests drink and dance and laugh. You catch a glimpse of your beloved.  
But instead of joy in their eyes, you see pain. You dart toward them, but it is too late. 
When you are finally able to reach them across the room, through a wave of alarmed guests, you find their lifeless body lying on the floor.\n`);

prompt(`    Press ENTER to continue! `);
console.clear();

// ATTRIBUTES

console.log(`\n\tCHOOSE YOUR ATTRIBUTES
\n\tYou have 3 attribute points. Choose where to spend them! \n\t(You CAN spend more than 1 point per attribute.)`);

console.log(`\n\t[1] Courage;
\t[2] Persuasion
\t[3] Justice
\t[4] Strength
\t[5] Compassion\n`);

let courage = 0;
let persuasion = 0;
let justice = 0;
let strength = 0;
let compassion = 0;

for (i = 0; i < 3; i++) {
  let attribute;

  while (true) {
    attribute = prompt(`    Attribute #${i + 1}: `);
    if (
      !isNaN(attribute) &&
      attribute % 1 == 0 && // validate integer
      attribute > 0 &&
      attribute < 6
    ) {
      break;
    }
    console.log(`\n\tYou must choose a NUMBER [1 - 5]`);
  }

  if (attribute == 1) {
    courage++;
  } else if (attribute == 2) {
    persuasion++;
  } else if (attribute == 3) {
    justice++;
  } else if (attribute == 4) {
    strength++;
  } else if (attribute == 5) {
    compassion++;
  }
}

// SHOW CHOSEN ATTRIBUTES

console.log(`    --------------- \n\n\tYour chosen attributes are:\n`);

if (courage > 0) {
  console.log(`\tCourage: ${courage}`);
}
if (persuasion > 0) {
  console.log(`\tPersuasion: ${persuasion}`);
}
if (justice > 0) {
  console.log(`\tJustice: ${justice}`);
}
if (strength > 0) {
  console.log(`\tStrength: ${strength}`);
}
if (compassion > 0) {
  console.log(`\tCompassion: ${compassion}`);
}

console.log(``);
prompt(`    Press ENTER to continue `);
console.clear();

// DECISION #1 - find the killer

console.log(`\nAt this very moment, it feels like the ground has been pulled from under you.  
Everything goes silent, and the world is moving both too fast and too slow. You have a decision to make. 
Will you give in to grief, or will you set out to find who did this, and why? `);

console.log(`\n\t[1] I will lie down next to the one I love and mourn them.  
\t[2] I will find the one who did this and avenge their death.\n`);

let decision1;

while (true) {
  decision1 = prompt(`    Choose your answer [1 / 2] `);
  if (
    !isNaN(decision1) &&
    decision1 % 1 == 0 &&
    decision1 > 0 &&
    decision1 < 3
  ) {
    break;
  }
  console.log(`\n\tYou must type [1] or [2]`);
}

if (decision1 == 1) {
  console.log(`\n[1] (-1 courage) You drop down to the floor and cry. You do not know how much time has passed, but you look out and see it is morning.
You are alone. Through the window, you see your brother running towards the house, and waving wildly at you. 
At first, you can't quite make out what he is saying. But as he gets closer, you understand. He is frantically announcing: "They found the murderer!"\n`);
  courage--;
} else {
  console.log(`\n[2] (+1 courage) You compose yourself at once and shouts at the guards to bar the doors. No one leaves until you find the one who did this. 
Out of the corner of your eye, you see a server drop something, and cautiously start heading to the kitchens. 
Your brother, who is standing by your side sees the same thing. He seizes the suspect, and you inspect the vial that has been dropped. 
You take a whiff and get a hint of almonds. Cyanide.\n`);
  courage++;
}

prompt(`    Press ENTER to continue `);
console.clear();

// DECISION 2 - discover the motive

console.log(`\nThey bring the accused forward. It is just one of the servants from the kitchens. You stand there for a minute, puzzled. 
What motive could they possibly have? Your betrothed was loved by all, nobles and commonfolk alike. So why would someone do this? 
You interrogate the server, but they are not saying anything. Will your persuasion techniques be enough to convince them to talk?`);

console.log(`\n\tROLL THE DICE FOR PERSUASION`);

if (persuasion != 0) {
  console.log(
    `\n\t+ You have ${persuasion} persuasion points. You will get a +${persuasion} to your roll.`
  );
}

console.log(`\n\t+ If you roll 1, 2, or 3, you will not be able to persuade the servant into exposing their motives. 
\t+ If you roll 4, 5, or 6, you will discover the reason behind your spouse's murder.\n`);

prompt(`    Press ENTER to roll the dice `);

// DICE ROLL

let diceRoll = getRandomIntInclusive(1, 6) + persuasion;

if (diceRoll > 6) {
  diceRoll = 6;
}

console.log(`\n\tYou roll a ${diceRoll}!`);

if (diceRoll < 4) {
  console.log(
    `\n[${diceRoll}] (-1 persuasion) You try your best, but they are unyielding. You might never know why this tragedy was brought upon you.\n`
  );
  persuasion--;
} else {
  console.log(`\n[${diceRoll}] (+1 persuasion) After hours of interrogation, despair fills you, as you realize you might never know why this tragedy was brought upon you. 
In a frail last attempt to uncover the truth, you drop down to your knees and beg them to please tell you why, why they had to take your heart from you? 
Moved by this unexpected display of emotion, they confess. It was love and jealousy, the masterminds of this crime. 
You were the object of their passion for many years, and when you found love yourself, they could not bear the thought of seeing you with another.\n`);
  persuasion++;
}

prompt(`    Press ENTER to continue `);
console.clear();

// DECISION 3 - the killer's fate (1)

console.log(`\nOpinions are divided. Some claim there is no excuse for what this person did. They should be executed without delay. 
Others believe it is not in their hands to judge, and the accused deserves a fair trial. What will it be? `);

console.log(`\n\t[1] You are outraged that anyone would think you would commit such a heinous act! You take the killer to justice. 
\t[2] How can they keep breathing when your beloved breathes no more? You draw your sword.\n`);

let decision3;

while (true) {
  decision3 = prompt(`    Choose your answer [1 / 2] `);
  if (
    !isNaN(decision3) &&
    decision3 % 1 == 0 &&
    decision3 > 0 &&
    decision3 < 3
  ) {
    break;
  }
  console.log(`\n    You must type [1] or [2]`);
}

if (decision3 == 1) {
  justice++;
  console.log(`\n\t(+1 Justice)\n`);
} else {
  justice--;
  console.log(
    `\n\t(-1 Justice) Somehow, the server gets ahold of a sword. The execution turns into a duel. What will you do?\n`
  );

  prompt(`    Press ENTER to continue `);
  console.clear();

  // JOKENPO

  let jokenpoPlayer;
  let jokenpoOpponent;

  while (true) {
    console.log(`\n\t+ ATTACK beats DEFEND
\t+ DEFEND beats PARRY
\t+ PARRY beats ATTACK
\t--------------------
\t[1] Attack
\t[2] Defend
\t[3] Parry\n`);

    while (true) {
      jokenpoPlayer = +prompt(`    Choose your answer [1 - 3] `);
      if (
        !isNaN(jokenpoPlayer) &&
        jokenpoPlayer % 1 == 0 &&
        jokenpoPlayer > 0 &&
        jokenpoPlayer < 4
      ) {
        break;
      }
      console.log(`\n\tYou must choose a NUMBER [1 - 3]`);
    }

    jokenpoOpponent = getRandomIntInclusive(1, 3);

    const jokenpoChoices = ["ATTACK", "DEFEND", "PARRY"];

    console.log(`\n\tYour choice: \t\t${jokenpoChoices[jokenpoPlayer - 1]}
  \tYour opponent's: \t${jokenpoChoices[jokenpoOpponent - 1]}`);

    if (jokenpoPlayer != jokenpoOpponent) {
      break;
    }
    console.log(`\n\tIt's a DRAW!\n`);
    prompt(`    Press ENTER to play again `);
    console.clear();
  }

  if (
    (jokenpoPlayer == 1 && jokenpoOpponent == 2) ||
    (jokenpoPlayer == 2 && jokenpoOpponent == 3) ||
    (jokenpoPlayer == 3 && jokenpoOpponent == 1)
  ) {
    console.log(
      `\n[WIN] (+1 Strength) You win the fight. You lift your sword for the final blow, but the guards stop you. \nThis is not your decision to make.\n`
    );
    strength++;
  } else {
    console.log(
      `\n[LOSE] (-1 Strength) You are at your opponent's mercy. A swift blow and you would be dead. \nThey take pity on you though, drop the sword, and let the guards guide them to the dungeons.\n`
    );
    strength--;
  }
}

prompt(`    Press ENTER to continue `);
console.clear();

// DECISION 4 - the killer's fate (2)

console.log(`\nThe time has come to decide the murderer's fate. All are here. Judge, jury, and every soul for miles around.  
You know the judge will heed your words. You know you have power here.  
You hear people scream and curse and call for the gallows.  
You think about that for a moment. Seems fair. Logical, even. A life for a life.  
You also hear people pleading for mercy. Mercy... The word echoes in you. 
You are not too sure now, are you? Well, there is no more time to think.  
The judge calls your name. It is your turn to speak. What will you say?`);

console.log(`\n\t[1] "My friend, what IS there to say? What I held closest to my heart has been ripped from me in the cruelest of ways.  
\tThere is no other way. The killer should hang."
\n\t[2] You say nothing at first. You consider it a bit more. It feels right. But the words are caught in your throat, tears flood your eyes. 
\tHesitantly, you look up. Only two syllables escape your lips. The ones that have been ringing between your ears... "Mercy".\n`);

let decision4;

while (true) {
  decision4 = prompt(`    Choose your answer [1 / 2] `);
  if (
    !isNaN(decision4) &&
    decision4 % 1 == 0 &&
    decision4 > 0 &&
    decision4 < 3
  ) {
    break;
  }
  console.log(`\n\tYou must type [1] or [2]`);
}

if (decision4 == 1) {
  console.log(
    `\n[1] (-1 Compassion) The sentence is carried out, but it does not give you any comfort or closure. You head home with a heavy heart.\n`
  );
  compassion--;
} else {
  console.log(`\n[2] (+1 Compassion)\n`);
  compassion++;
}

prompt(`    Press ENTER to continue `);
console.clear();

// DECISION #5 - the final "battle"

console.log(
  `\nMany years have passed now. You could never find love again, but you are content. Today has been just an ordinary day, one of many.
Until something happens. You hear the news: The king has just died, after 2 long years of suffering.
As soon as people find out, they flock to the main square, eager for more information. You head there as well of course.
Official news comes. 
As the king left no heirs, and there is no one in line for succession, the new Monarch will be chosen from among the nobles in town.
Two names have come up as possible rulers. You are not surprised to hear the first. The head of the oldest and most powerful family in the region.
Yet, as they announce the second name, your heart skips a beat. You did not expect to hear your own name.\n`
);

prompt(`    Press ENTER to continue `);
console.clear();

// BATTLE SETUP

console.log(`\nA debate was set up. You will have to convince the people that you are the one who should lead.
At this time, the virtuous choices you took will count in your favor, both strengthening your attack at the opponent's argument, and solidifying your own argument.
Consequently, any reprehensible choices you made will serve as fuel to your opponent's attack, discrediting your argument.\n`);

prompt(`    Press ENTER to continue to debate `);
console.clear();

const baseDmgMin = 15;
const baseDmgMax = 20;
const baseDefense = 100;

const attributeDmgList = ["Courage", "Strength", "Persuasion"];
const attributeDefenseList = ["Justice", "Compassion"];
const attributeDmgValue = [courage, strength, persuasion];
const attributeDefenseValue = [justice, compassion];
const buffDmgValue = [courage / 10, strength / 10, persuasion / 10];
const buffDefenseValue = [justice / 10, compassion / 10];

let buffDmgTotal = 0;
let buffDefenseTotal = 0;

console.log(`\n\tTHE FINAL BATTLE - the Debate

\tBASE DEFENSE: 100
\tBASE DMG: 15 - 20`);

console.log(
  `\n\tFor each point in one of the following attributes, you will get +10% to your damage inflicted.\n`
);

for (i = 0; i < attributeDmgList.length; i++) {
  console.log(`\t${attributeDmgList[i]} [${attributeDmgValue[i]}]`);
  if (attributeDmgValue[i] > 0) {
    console.log(`\t+${attributeDmgValue[i] * 10}% dmg`);
    buffDmgTotal = buffDmgTotal + buffDmgValue[i];
  }
}

console.log(
  `\n\tFor each point in one of the following attributes, you will get +10% to your argument's defense.\n`
);

for (i = 0; i < attributeDefenseList.length; i++) {
  console.log(`\t${attributeDefenseList[i]} [${attributeDefenseValue[i]}]`);
  if (attributeDefenseValue[i] > 0) {
    console.log(`\t+${attributeDefenseValue[i] * 10}% defense`);
    buffDefenseTotal = buffDefenseTotal + buffDefenseValue[i];
  }
}

console.log(
  `\n\tFor any negative attribute, your opponent will get +10% to their damage inflicted.`
);

let attributeList = attributeDmgList.concat(attributeDefenseList);
let attributeValue = attributeDmgValue.concat(attributeDefenseValue);
let buffValue = buffDmgValue.concat(buffDefenseValue);

let buffOpponentDmg = 0;

for (i = 0; i < attributeList.length; i++) {
  if (attributeValue[i] < 0) {
    console.log(`\t${attributeList[i]} [${attributeValue[i]}]`);
    console.log(`\t+${attributeValue[i] * 10 * -1}% opponent dmg`);
    buffOpponentDmg = buffOpponentDmg + buffValue[i] * -1;
  }
}

const playerDmgMin = baseDmgMin + baseDmgMin * buffDmgTotal;
const playerDmgMax = baseDmgMax + baseDmgMax * buffDmgTotal;

let playerDefense = baseDefense + baseDefense * buffDefenseTotal;

const opponentDmgMin = baseDmgMin + baseDmgMin * buffOpponentDmg;
const opponentDmgMax = baseDmgMax + baseDmgMax * buffOpponentDmg;

let opponentDefense = baseDefense;

console.log(`\n\t--------------------

YOUR DAMAGE: \t${playerDmgMin} - ${playerDmgMax} \t| OPPONENT'S DAMAGE: \t${opponentDmgMin} - ${opponentDmgMax}
YOUR DEFENSE: \t${playerDefense} \t\t| OPPONENT'S DEFENSE: \t${opponentDefense}\n`);

prompt(`    Press ENTER to attack `);

// BATTLE

let roundCount = 1;

while (true) {
  let playerDmgRandom = getRandomIntInclusive(playerDmgMin, playerDmgMax);
  let opponentDmgRandom = getRandomIntInclusive(opponentDmgMin, opponentDmgMax);

  let playerDmg = playerDmgRandom;
  let opponentDmg = opponentDmgRandom;

  playerDefense = playerDefense - opponentDmg;
  opponentDefense = opponentDefense - playerDmg;

  console.log(`\n\tROUND ${roundCount}
  
\tYou attack your opponent's argument for ${playerDmg} damage.
\tYour opponent attacks your argument for ${opponentDmg} damage.

\tYour defense:    ${playerDefense}
\tYour opponent's: ${opponentDefense}\n`);

  roundCount++;

  prompt(`    Press ENTER for next round `);

  if (playerDefense <= 0 || opponentDefense <= 0) {
    console.log(`\n    Oh, it looks like that was the last round...`);
    prompt(`    Press ENTER for results `);
    break;
  }
}

console.clear();

if (playerDefense > opponentDefense) {
  console.log(
    `\n[WIN] You carried yourself well. The positive attributes you have shown throughout this journey have earned you the title of Supreme Ruler. Congratulations.\n`
  );
} else if (playerDefense < opponentDefense) {
  console.log(
    `\n[LOSE] Your choices in life have led to your inevitable defeat.\n`
  );
} else if (playerDefense == opponentDefense) {
  console.log(
    `\n[DRAW] Neither you nor your opponent were able to convince the people that you are fit to rule... The search for a new leader continues.\n`
  );
}