const sleepFunction = require("../lib/sleep");

exports.funAnimation = () => {
  for (let i = 0; i < 3; i++) {
    console.clear();
    console.log(`             *                     *
      )          H     )        )
                [ ]            (
         (  *   |-|       *     )    (
   *      )     |_|        .          )
         (      | |    .  
   )           /   \\     .    ' .        *
  (           |_____|  '  .    .  
   )          | ___ |  \\~~~/  ' .   (
          *   | \\ / |   \\_/  \\~~~/   )
              | _Y_ |    |    \\_/   (
  *           |-----|  __|__   |      *
              '-----'        __|__
`);

    sleepFunction.sleep(400);

    console.clear();
    console.log(`              *                     *
       )         H      )        )
                [ ]             (
          (  *  |-|        *     )    (
    *      )    |_|         .          )
          (     | |     .  
    )          /   \\      .    ' .        *
   (          |_____|   '  .    .  
    )         | ___ |  \\~~~/   ' .   (
           *  | \\ / |   \\_/  \\~~~/    )
              | _Y_ |    |    \\_/    (
   *          |-----|  __|__   |       *
              '-----'        __|__
`);

    sleepFunction.sleep(400);
  }
};
