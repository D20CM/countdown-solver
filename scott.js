import dictionaryObject from "./dictionaryObject.js";

const letter1 = "t";
const letter2 = "d";
const letter3 = "n";
const letter4 = "p";
const letter5 = "e";
const letter6 = "u";
const letter7 = "a";
const letter8 = "i";
const letter9 = "r";

const letters = [
  letter1,
  letter2,
  letter3,
  letter4,
  letter5,
  letter6,
  letter7,
  letter8,
  letter9,
];

function checkRepeats(letters) {
  let repeatedLetters = [];
  for (let i = 0; i < letters.length; i++) {
    if (letters.indexOf(letters[i]) !== letters.lastIndexOf(letters[i])) {
      repeatedLetters.push(letters[i]);
    }
  }

  return repeatedLetters;
}

const repeatedLetters = checkRepeats(letters);
if (repeatedLetters.length > 0) {
  console.log("Repeated letters are: ", repeatedLetters);
}

//create an object to count how many of each repeated letter are present
let repeatedLettersObj = {};
for (let i = 0; i < repeatedLetters.length; i++) {
  if (repeatedLettersObj.hasOwnProperty(repeatedLetters[i])) {
    repeatedLettersObj[repeatedLetters[i]] =
      repeatedLettersObj[repeatedLetters[i]] + 1;
  } else {
    repeatedLettersObj[repeatedLetters[i]] = 1;
  }
}

console.log(repeatedLettersObj);

const words = Object.keys(dictionaryObject).filter((word) => word.length < 10);

// console.log(words);
let results = words.filter(
  (word) => word.length === 9 && wordscore(word) === 9
);

if (results.length === 0) {
  results = words.filter((word) => word.length === 8 && wordscore(word) === 8);
}

if (results.length === 0) {
  results = words.filter((word) => word.length === 7 && wordscore(word) === 7);
}

if (results.length === 0) {
  results = words.filter((word) => word.length === 6 && wordscore(word) === 6);
}

if (results.length === 0) {
  results = words.filter((word) => word.length === 5 && wordscore(word) === 5);
}

if (results.length === 0) {
  results = words.filter((word) => word.length === 4 && wordscore(word) === 4);
}

console.log(results);

function wordscore(word) {
  let score = 0;

  if (repeatedLetters.length > 0) {
    for (const repeatedLetter in repeatedLettersObj) {
      //count how many times the letter is present in the word
      if (
        word.split(repeatedLetter).length - 1 ===
        repeatedLettersObj[repeatedLetter]
      ) {
        //score if all repeats are used - how best to count only partial uses of repeats?

        score += repeatedLettersObj[repeatedLetter];
      } else if (
        //this will handle up to 4 repeats of a particular letter
        word.split(repeatedLetter).length - 1 ===
          repeatedLettersObj[repeatedLetter] - 1 &&
        repeatedLettersObj[repeatedLetter] > 0
      ) {
        score += repeatedLettersObj[repeatedLetter] - 1;
      } else if (
        word.split(repeatedLetter).length - 1 ===
          repeatedLettersObj[repeatedLetter] - 2 &&
        repeatedLettersObj[repeatedLetter] > 0
      ) {
        score += repeatedLettersObj[repeatedLetter] - 2;
      } else if (
        word.split(repeatedLetter).length - 1 ===
          repeatedLettersObj[repeatedLetter] - 3 &&
        repeatedLettersObj[repeatedLetter] > 0
      ) {
        score += repeatedLettersObj[repeatedLetter] - 3;
      }
    }
  }

  //the second condition in the lines below will skip scoring of (repeated) letters that have already been scored above
  if (word.includes(letter1) && !repeatedLetters.includes(letter1)) {
    score++;
  }
  if (word.includes(letter2) && !repeatedLetters.includes(letter2)) {
    score++;
  }
  if (word.includes(letter3) && !repeatedLetters.includes(letter3)) {
    score++;
  }
  if (word.includes(letter4) && !repeatedLetters.includes(letter4)) {
    score++;
  }
  if (word.includes(letter5) && !repeatedLetters.includes(letter5)) {
    score++;
  }
  if (word.includes(letter6) && !repeatedLetters.includes(letter6)) {
    score++;
  }
  if (word.includes(letter7) && !repeatedLetters.includes(letter7)) {
    score++;
  }
  if (word.includes(letter8) && !repeatedLetters.includes(letter8)) {
    score++;
  }
  if (word.includes(letter9) && !repeatedLetters.includes(letter9)) {
    score++;
  }

  return score;
}
