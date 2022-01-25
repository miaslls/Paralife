const prompt = require("prompt-sync")();

// BACKGROUND STORY

console.log(`\n\tTHE HERO'S JOURNEY\n`);
console.log(
  `Today is the happiest day of your life. Or it ought to be. You've just sworn your vows to the love of your life.`
);
console.log(
  `You're sitting on a corner watching the guests drink and dance and laugh. You catch a glimpse of your beloved.`
);
console.log(
  `But instead of joy in their eyes, you see pain. You dart toward them, but it's too late.`
);
console.log(
  `When you are finally able to reach them across the room, through a wave of alarmed guests, you find their lifeless body lying on the floor.`
);

// console.log("\n\t.");
// console.log("\n\t.");
// console.log("\n\t.\n");

// let continueStory = "?";

// do {
//     if (continueStory.trim().toUpperCase() != "Y" && continueStory.trim().toUpperCase() != "N" && continueStory.trim().toUpperCase() != "?") {
//         console.log("You must type Y or N.");
//     }
//     continueStory = prompt("\tDo you wish to continue? [Y / N] ");
// } while (continueStory.trim().toUpperCase() != "Y" &&  continueStory.trim().toUpperCase() != "N");

let enter;

enter = prompt("\n\tPress ENTER to continue! ");

// ATTRIBUTES

console.log(`\n\tCHOOSE YOUR ATTRIBUTES`);
console.log(
  `\n\tYou have 3 attribute points. Choose where to spend them! \n\t(You CAN spend more than 1 point per attribute.)`
);
console.log(`\n\t[1] courage;
\t[2] persuasion
\t[3] justice
\t[4] strength
\t[5] compassion\n`);

let courage = 0;
let persuasion = 0;
let justice = 0;
let strength = 0;
let compassion = 0;

let attribute = " ";

for (i = 0; i < 3; i++) {
    do {
        if (attribute < 1 || attribute > 5 || isNaN(attribute)) {
            console.log(`\n\tYou must choose a number [1 - 5]`)
        }
        attribute = prompt(`\tAttribute #${i + 1}: `);
    } while (attribute < 1 || attribute > 5 || isNaN(attribute));

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

// ** TODO - show attributes chosen, press enter to continue

// DECISION #1 - find the killer

console.log(
  `\nAt this very moment, it feels like the ground has been pulled from under you. `
);
console.log(
  `Everyhting goes silent, and the world is moving both too fast and too slow.`
);
console.log(
  `You have a decision to make. Will you give in to grief, or will you set out to find who did this, and why?\n`
);

console.log(`\t[1] I will lie down next to the one I love and mourn them.`);
console.log(
  `\t[2] I will find the one who did this, and avenge their death.\n`
);

let decision1 = 0;

do {
  if (decision1 != 1 && decision1 != 2 && decision1 != 0) {
    console.log("\n\tYou must type 1 or 2.");
  }
  decision1 = +prompt("\tChoose your answer! [1 / 2] ");
} while (decision1 != 1 && decision1 != 2);

let bonusPoints = 0;

if (decision1 == 1) {
  console.log(
    `\n[1] You drop down to the floor and cry. You don't know how much time has passed, but you look out and see it's morning.`
  );
  console.log(
    `You are alone. Through the window, you see your brother running towards the house, and waving wildly at you.`
  );
  console.log(
    `At first, you can't quite make out whats he's saying. But as he gets closer, you understand. He's frantically announcing: "They found the murderer!"\n`
  );
} else {
  console.log(
    `\n[2] (+1 courage) You compose yourself at once and shouts at the guards to bar the doors. No one leaves until you find the one who did this.`
  );
  console.log(
    `Out of the corner of your eye, you see a server drop something, and cautiously start heading to the kitchens.`
  );
  console.log(
    `Your brother, who's standing by your side, sees the same thing. He seizes the suspect and you inspect the vial that's been dropped.`
  );
  console.log(`You take a whiff and get a hint of almonds. Cyanide.\n`);
  bonusPoints++;
}

// console.log("\n\t.");
// console.log("\n\t.");
// console.log("\n\t.\n");

enter = prompt("\n\tPress ENTER to continue! ");

// DECISION 2 - discover the motive

console.log(
  `\nThey bring the accused forward. It's just one of the servants from the kitchens. You stand there for a minute, puzzled.`
);
console.log(
  `What motive could they possibly have? Your bethrothed was loved by all, nobles and commonfolk alike. So why would someone do this?`
);
console.log(
  `You interrogate the server, but they are not saying anything. Will your persuasion techniques be enough to convince them to talk?`
);

console.log(`\n\tROLL THE DICE FOR PERSUASION`);

console.log(
  `\n\t+ If you decided to find the murderer as your previous choice, you will have a +1 bonus to your roll.`
);
console.log(
  `\t+ If you roll 1, 2, or 3, you will not be able to persuade the servant into explosing their motives.`
);
console.log(
  `\t+ If you roll 4, 5, or 6, you will discover the reason behind your spouse's murder.`
);

enter = prompt("\n\tPress ENTER to roll the dice! ");

// DICE ROLL

let diceRoll = Math.floor(Math.random(7) * 10) + 1 + bonusPoints;

if (diceRoll > 6) {
  diceRoll = 6;
}

console.log(`\n\t You roll a ${diceRoll}!`);

if (diceRoll < 4) {
  console.log(
    `\n[${diceRoll}] You try your best, but they are unyielding. You might never know why this tragedy was brought upon you.`
  );
} else {
  console.log(
    `\n[${diceRoll}] (+1 persuasion) After hours of interrogation, despair fills you, as you realize you might never know why this tragedy was brought upon you.`
  );
  console.log(
    `In a frail last attempt to uncover the truth, you drop down to your knees and begs them to please tell you why, why they had to take away what is most precisous to you.`
  );
  console.log(
    `Moved by this unexpected display of emotion, they confess. It was love and jealousy, the masterminds of this crime.`
  );
  console.log(
    `You were the object of their passion for many years, and when you found love yourself, they couldn't bear the thought of seeing you with another.`
  );
  bonusPoints++;
}

// console.log("\n\t.");
// console.log("\n\t.");
// console.log("\n\t.\n");

enter = prompt("\n\tPress ENTER to continue! ");

// DECISION 3 - the killer's fate
