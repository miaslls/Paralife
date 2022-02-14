const { formatClock, sleep } = require("../lib/formatting.js");

exports.energyAnimation = (nowHours, nowMinutes, hoursSlept) => {
  for (let i = 0; i <= hoursSlept; i++) {
    let hoursShown;

    if (hoursShown == 24) {
      hoursShown = 0;
    }

    hoursShown = nowHours + i;

    console.clear();
    console.log(`

_____________
|-( )-        |
|/'|\\'        |
|__|_\\_'______|

              zz
    ! _    zz           _____
    |(~} zz         !  [${formatClock(nowHours + i, nowMinutes)}]
    |(_/__________..| =========
    |  ||:::::::::::|  |_____|

    `);

    sleep(400);

    console.clear();
    console.log(`
    
_____________
|-( )-        |
|/'|\\'        |
|__|_\\_'______|

                zz
    ! _      zz         _____
    |(~}  zz        !  [${formatClock(nowHours + i, nowMinutes)}]
    |(_/__________..| =========
    |  ||:::::::::::|  |_____|

    `);

    sleep(400);
  }
};
