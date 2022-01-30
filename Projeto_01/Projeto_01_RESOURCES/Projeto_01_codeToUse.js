const prompt = require("prompt-sync")();

// ---

// SET TIMEOUT

var a = 1 + 3;
var b;
setTimeout(function() {
    b = a + 4;
}, (3 * 1000));

// CODIGO DO AMIGO - leotinoco7

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

// ---

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

// ---
