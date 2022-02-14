const sleepFunction = require("../lib/sleep");

exports.ohNoAnimation = () => {
  for (let i = 0; i < 3; i++) {
    console.clear();
    console.log(`
    
  
  
  
  
  
  
  
    `);

    sleepFunction.sleep(200);
    console.clear();

    console.log(`

          __                     __
  ____   / /_     ____   ____   / /
 / __ \\ / __ \\   / __ \\ / __ \\ / / 
/ /_/ // / / /  / / / // /_/ //_/  
\\____//_/ /_/  /_/ /_/ \\____/(_)   
                                   

`);

    sleepFunction.sleep(200);
  }
};
