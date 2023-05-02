const { sleep } = require("../lib/formatting.js");

exports.ohNoAnimation = () => {
  for (let i = 0; i < 3; i++) {
    console.clear();
    console.log(`
    
  
  
  
  
  
  
  
    `);

    sleep(200);
    console.clear();

    console.log(`

          __                     __
  ____   / /_     ____   ____   / /
 / __ \\ / __ \\   / __ \\ / __ \\ / / 
/ /_/ // / / /  / / / // /_/ //_/  
\\____//_/ /_/  /_/ /_/ \\____/(_)   
                                   

`);

    sleep(200);
  }
};
