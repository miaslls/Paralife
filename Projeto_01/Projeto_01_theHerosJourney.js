const prompt = require("prompt-sync")();

// BACKGROUND STORY

console.log(`\n\tTHE HERO'S JOURNEY\n`);
console.log(
  `\tToday is the happiest day of your life. Or it ought to be. You've just sworn your vows to the love of your life.
You're sitting on a corner watching the guests drink and dance and laugh. You catch a glimpse of your beloved.
But instead of joy in their eyes, you see pain. You dart toward them, but it's too late.
When you are finally able to reach them across the room, through a wave of alarmed guests, you find their lifeless body lying on the floor.`
);

prompt("\n\tPress ENTER to continue! ");

// ATTRIBUTES

console.log(`\n\tCHOOSE YOUR ATTRIBUTES`);
console.log(
  `\n\tYou have 3 attribute points. Choose where to spend them! \n\t(You CAN spend more than 1 point per attribute.)`
);
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

console.log(
  `\nAt this very moment, it feels like the ground has been pulled from under you. 
Everyhting goes silent, and the world is moving both too fast and too slow.
You have a decision to make. Will you give in to grief, or will you set out to find who did this, and why?\n`
);

console.log(
  `\t[1] I will lie down next to the one I love and mourn them.);
\t[2] I will find the one who did this, and avenge their death.\n`
);

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
  console.log(`\n\tYou must type 1 or 2.`);
}

if (decision1 == 1) {
  console.log(
    `\n[1] You drop down to the floor and cry. You don't know how much time has passed, but you look out and see it's morning.
You are alone. Through the window, you see your brother running towards the house, and waving wildly at you.
At first, you can't quite make out whats he's saying. But as he gets closer, you understand. He's frantically announcing: "They found the murderer!"\n`
  );
} else {
  console.log(
    `\n[2] (+1 courage) You compose yourself at once and shouts at the guards to bar the doors. No one leaves until you find the one who did this.
Out of the corner of your eye, you see a server drop something, and cautiously start heading to the kitchens.
Your brother, who's standing by your side, sees the same thing. He seizes the suspect and you inspect the vial that's been dropped.
You take a whiff and get a hint of almonds. Cyanide.\n`
  );
  courage++;
}

prompt("\n\tPress ENTER to continue! ");

// DECISION 2 - discover the motive

console.log(
  `\nThey bring the accused forward. It's just one of the servants from the kitchens. You stand there for a minute, puzzled.
What motive could they possibly have? Your bethrothed was loved by all, nobles and commonfolk alike. So why would someone do this?
You interrogate the server, but they are not saying anything. Will your persuasion techniques be enough to convince them to talk?`
);

console.log(`\n\tROLL THE DICE FOR PERSUASION`);

if (persuasion != 0) {
  console.log(
    `\n\t+ You have ${persuasion} persuasion points. You will get a +${persuasion} to your roll.`
  );
}

console.log(
  `\n\t+ If you roll 1, 2, or 3, you will not be able to persuade the servant into explosing their motives.
\t+ If you roll 4, 5, or 6, you will discover the reason behind your spouse's murder.`
);

prompt("\n\tPress ENTER to roll the dice! ");

// DICE ROLL

let diceRoll = Math.floor(Math.random(6) * 10) + 1 + persuasion;

if (diceRoll > 6) {
  diceRoll = 6;
}

console.log(`\n\tYou roll a ${diceRoll}!`);

if (diceRoll < 4) {
  console.log(
    `\n[${diceRoll}] You try your best, but they are unyielding. You might never know why this tragedy was brought upon you.`
  );
} else {
  console.log(
    `\n[${diceRoll}] (+1 persuasion) After hours of interrogation, despair fills you, as you realize you might never know why this tragedy was brought upon you.
In a frail last attempt to uncover the truth, you drop down to your knees and begs them to please tell you why, why they had to take away what is most precisous to you.
Moved by this unexpected display of emotion, they confess. It was love and jealousy, the masterminds of this crime.
You were the object of their passion for many years, and when you found love yourself, they couldn't bear the thought of seeing you with another.`
  );
  persuasion++;
}

prompt("\n\tPress ENTER to continue! ");

// DECISION 3 - the killer's fate
