const prompt = require("prompt-sync")(); // require prompt

console.clear();

let today = new Date();

let birthYear = prompt("ano de nascimento:");
let birthMonth = prompt("mês de nascimento:") - 1;
let birthDay = prompt("dia de nascimento:");

let birthDate = new Date(birthYear, birthMonth, birthDay);

console.log("today\n" + today);
console.log("birthDate\n" + birthDate);

let cutDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
let optionalDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

console.log("cutDate\n" + cutDate);
console.log("optionalDate\n" + optionalDate);

let auth;

if (birthDate > cutDate) {
    auth = "denied";
} else if (birthDate > optionalDate) {
    auth = "optional";
} else {
    auth = "mandatory";
}

console.log(auth);
