const { sleep } = require("../lib/formatting.js");

exports.gameOverAnimation = () => {
  for (let i = 0; i < 3; i++) {
    console.clear();
    console.log(`
    
  
  
  
  
  
  
  
    `);

    sleep(200);
    console.clear();

    console.log(`
                    
     ____ _ ____ _ ____ ___   ___ 
    / __ \`// __ \`// __ \`__ \\ / _ \\
   / /_/ // /_/ // / / / / //  __/
   \\__, / \\__,_//_/ /_/ /_/ \\___/ 
  /____/                          
                              __  
    ____  _   __ ___   _____ / /  
   / __ \\| | / // _ \\ / ___// /   
  / /_/ /| |/ //  __// /   /_/    
  \\____/ |___/ \\___//_/   (_)     
                                  
  
`);

    sleep(200);
  }
};
