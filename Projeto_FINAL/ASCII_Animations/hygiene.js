const sleepFunction = require("../lib/sleep");

exports.hygieneAnimation = () => {
  for (let i = 0; i < 3; i++) {
    console.clear();
    console.log(`
        o    .   _     .
          .     (_)         o
   o      ____            _       o
  _   ,-/   /)))  .   o  (_)   .
 (_)  \\_\\  ( e(     O             _
 o       \\/' _/   ,_ ,  o   o    (_)
  . O    _/ (_   / _/      .  ,        o
     o8o/    \\\\_/ / ,-.  ,oO8/( -TT
    o8o8O | } }  / /   \\Oo8OOo8Oo||     O
   Oo(""o8"""""""""""""""8oo""""""")
  _   '\\''                  ''   /'   o
 (_)    \\                       /    _   .
      O  \\           _         /    (_)
o   .     '-. .----<(o)_--. .-'
   --------(_/------(_<_/--\\_)-------- 
`);

    sleepFunction.sleep(400);
    console.clear();
    console.log(`
         o    .   _     .
           .     (_)         o
    o     ____             _       o
   _  ,-/   /)))   .   o  (_)   .
  (_) \\_\\  ( e(      O             _
  o      \\/' _/   ,_ ,   o   o    (_)
   . O   _/ (_   / _/       .  ,        o
     o8o/    \\\\_/ / ,-.  ,oO8/( -TT
    o8o8O | } }  / /   \\Oo8OOo8Oo||      O
   Oo(""o8"""""""""""""""8oo""""""")
   _  '\\''                  ''   /'    o
  (_)   \\                       /     _   .
       O \\           _         /     (_)
 o   .    '-. .----<(o)_--. .-'
   --------(_/------(_<_/--\\_)-------- 
`);

    sleepFunction.sleep(400);
  }
};
