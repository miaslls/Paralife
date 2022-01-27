const prompt = require("prompt-sync")();

// BACKGROUND STORY

console.log(`\n\tTHE HERO'S JOURNEY\n`);
console.log(`Today is the happiest day of your life. Or it ought to be. You've just sworn your vows to the love of your life.
You're sitting on a corner watching the guests drink and dance and laugh. You catch a glimpse of your beloved.
But instead of joy in their eyes, you see pain. You dart toward them, but it's too late.
When you are finally able to reach them across the room, through a wave of alarmed guests, you find their lifeless body lying on the floor.\n`);

prompt("\tPress ENTER to continue! ");

// ATTRIBUTES

console.log(`\n\tCHOOSE YOUR ATTRIBUTES
\n\tYou have 3 attribute points. Choose where to spend them! \n\t(You CAN spend more than 1 point per attribute.)`);

// TODO: put attributes in a bidimensional array
// TODO: a1.join(separator) Join all elements of array a1 into a string separated by separator arg

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

// TODO: ajust for bidimensional array (Aula 08)

for (i = 0; i < 3; i++) {
  while (true) {
    attribute = prompt(`\tAttribute #${i + 1}: `);
    if (
      !isNaN(attribute) &&
      attribute % 1 == 0 &&
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

console.log(
  `\t------------------------------ \n\tYour chosen attributes are:\n`
);

if (courage != 0) {
  console.log(`\tCourage: ${courage}`);
}
if (persuasion != 0) {
  console.log(`\tPersuasion: ${persuasion}`);
}
if (justice != 0) {
  console.log(`\tJustice: ${justice}`);
}
if (strength != 0) {
  console.log(`\tStrength: ${strength}`);
}
if (compassion != 0) {
  console.log(`\tCompassion: ${compassion}`);
}

prompt("\n\tPress ENTER to continue! ");

// DECISION #1 - find the killer

console.log(`\nAt this very moment, it feels like the ground has been pulled from under you.
Everything goes silent, and the world is moving both too fast and too slow.
You have a decision to make. Will you give in to grief, or will you set out to find who did this, and why?`);

console.log(`\n\t[1] I will lie down next to the one I love and mourn them.);
\t[2] I will find the one who did this, and avenge their death.\n`);

let decision1 = 0;

while (true) {
  decision1 = prompt("\tChoose your answer! [1 / 2] ");
  if (
    !isNaN(decision1) &&
    decision1 % 1 == 0 &&
    decision1 > 0 &&
    decision1 < 3
  ) {
    break;
  }
  console.log(`\n\tYou must type [1] or [2].`);
}

if (decision1 == 1) {
  console.log(`\n[1] You drop down to the floor and cry. You don't know how much time has passed, but you look out and see it's morning.
You are alone. Through the window, you see your brother running towards the house, and waving wildly at you.
At first, you can't quite make out whats he's saying. But as he gets closer, you understand. He's frantically announcing: "They found the murderer!"\n`);
} else {
  console.log(`\n[2] (+1 courage) You compose yourself at once and shouts at the guards to bar the doors. No one leaves until you find the one who did this.
Out of the corner of your eye, you see a server drop something, and cautiously start heading to the kitchens.
Your brother, who's standing by your side, sees the same thing. He seizes the suspect and you inspect the vial that's been dropped.
You take a whiff and get a hint of almonds. Cyanide.\n`);
  courage++;
}

prompt("\tPress ENTER to continue! ");

// DECISION 2 - discover the motive

console.log(`\nThey bring the accused forward. It's just one of the servants from the kitchens. You stand there for a minute, puzzled.
What motive could they possibly have? Your bethrothed was loved by all, nobles and commonfolk alike. So why would someone do this?
You interrogate the server, but they are not saying anything. Will your persuasion techniques be enough to convince them to talk?`);

console.log(`\n\tROLL THE DICE FOR PERSUASION`);

if (persuasion != 0) {
  console.log(
    `\n\t+ You have ${persuasion} persuasion points. You will get a +${persuasion} to your roll.`
  );
}

console.log(`\n\t+ If you roll 1, 2, or 3, you will not be able to persuade the servant into explosing their motives.
\t+ If you roll 4, 5, or 6, you will discover the reason behind your spouse's murder.\n`);

prompt("\tPress ENTER to roll the dice! ");

// DICE ROLL

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let diceRoll = getRandomIntInclusive(1, 6) + persuasion;

if (diceRoll > 6) {
  diceRoll = 6;
}

console.log(`\n\tYou roll a ${diceRoll}!`);

if (diceRoll < 4) {
  console.log(
    `\n[${diceRoll}] You try your best, but they are unyielding. You might never know why this tragedy was brought upon you.\n`
  );
} else {
  console.log(`\n[${diceRoll}] (+1 persuasion) After hours of interrogation, despair fills you, as you realize you might never know why this tragedy was brought upon you.
In a frail last attempt to uncover the truth, you drop down to your knees and begs them to please tell you why, why they had to take away what is most precisous to you.
Moved by this unexpected display of emotion, they confess. It was love and jealousy, the masterminds of this crime.
You were the object of their passion for many years, and when you found love yourself, they couldn't bear the thought of seeing you with another.\n`);
  persuasion++;
}

prompt("\tPress ENTER to continue! ");

// DECISION 3 - the killer's fate

console.log(`\nOpinions are divided. Some claim there is no excuse for what this person did. They should be executed right then and there.
Others believe it is not in their hands to judge, and the accused deserves a fair trial. What will it be?`);

console.log(`\n\t[1] You are outraged that anyone would think you would commit such a heinous act! You take the killer to justice.
\t[2] How can they keep breathing when your beloved breathes no more? You draw you sword.\n`);

// TODO: Add console.log (+1 Justice)

let decision2 = 0;

while (true) {
  decision2 = prompt("\tChoose your answer! [1 / 2] ");
  if (
    !isNaN(decision2) &&
    decision2 % 1 == 0 &&
    decision2 > 0 &&
    decision2 < 3
  ) {
    break;
  }
  console.log(`\n\tYou must type [1] or [2].`);
}

if (decision2 == 1) {
  justice++;
} else {
  justice--;
  console.log(
    `\n\t(-1 Justice) Somehow, the server gets ahold of a sword. The execution turns into a duel. What will you do?\n`
  );

  prompt("\tPress ENTER to continue! ");

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
      jokenpoPlayer = +prompt(`\tChoose your answer! [1 - 3] `);
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

    // FIXME: check ▼

    if (jokenpoPlayer != jokenpoOpponent) {
      break;
    }
    console.log(`\n\tIt's a DRAW!`);
    prompt(`\tPress ENTER to play again.`);
  }

  const resultsWin = [
    [0, 2],
    [1, 0],
    [2, 1],
  ];

  const resultsLose = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];

  const results = [[jokenpoPlayer - 1, jokenpoOpponent - 1]];

  for (i = 0; i < resultsWin.length; i++) {
    if (
      results[0][0] == resultsWin[i][0] &&
      results[0][1] == resultsWin[i][1]
    ) {
      console.log(
        `\n\t[WIN] (+1 Strength) You win the fight. You lift your sword for the final blow, but the guards stop you. This is not your decision to make.`
      );
      stength++;
    }
  }

  for (i = 0; i < resultsLose.length; i++) {
    if (
      results[0][0] == resultsLose[i][0] &&
      results[0][1] == resultsLose[i][1]
    ) {
      console.log(
        `\n\t[LOSE] You are at your opponents mercy. A swift blow and you'll be dead. They take pity on you though, drop the sword, and let the guards guide them to the dungeons.`
      );
    }
  }
}
