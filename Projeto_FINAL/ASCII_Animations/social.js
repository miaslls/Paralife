const sleepFunction = require("../lib/sleep");

exports.socialAnimation = () => {
  for (let i = 0; i < 3; i++) {
    console.clear();
    console.log(`
             %%%%%%        
            %%% ++        
           %C   0>0      
             ;  _~       <  bla
      _______/ /_          
     |  __)  \\_/ \\  _///__
    _| / \\/  )  ) \\/,--
_\\\\\\__/   )    / \  |
         /__/-/   \\/
        /     |
       /     /\\
       \\       \\
       /_/\\__ __\\
         \\   |  \\
          \\  |\\  )
           \\ )/ /
           / | /
           |/|/
           S S
          /x|x\\
          |, \\. 
`);

    sleepFunction.sleep(400);

    console.clear();
    console.log(`
             %%%%%%        
            %%% ++        
           %C   0>0      
             ;  _ ~      <  bla bla
      _______/ /_          
     |  __)  \\_/ \\  _///__
    _| / \\/  )  ) \\/,--
_\\\\\\__/   )    / \  |
         /__/-/   \\/
        /     |
       /     /\\
       \\       \\
       /_/\\__ __\\
         \\   |  \\
          \\  |\\  )
           \\ )/ /
           / | /
           |/|/
           S S
          /x|x\\
          |, \\. 
`);

    sleepFunction.sleep(400);

    console.clear();
    console.log(`
             %%%%%%        
            %%% ++        
           %C   0>0      
             ;  _~       <  bla bla bla
      _______/ /_          
     |  __)  \\_/ \\  _///__
    _| / \\/  )  ) \\/,--
_\\\\\\__/   )    / \  |
         /__/-/   \\/
        /     |
       /     /\\
       \\       \\
       /_/\\__ __\\
         \\   |  \\
          \\  |\\  )
           \\ )/ /
           / | /
           |/|/
           S S
          /x|x\\
          |, \\. 
`);

    sleepFunction.sleep(400);
  }
};
