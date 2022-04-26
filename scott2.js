const sampleDictionaryObject = {
  aardvark: 1,
  aardvarks: 1,
  aardwolf: 1,
  aardwolves: 1,
  aargh: 1,
  aaron: 1,
  aaronic: 1,
  aaronical: 1,
  aaronite: 1,
  aaronitic: 1,
  guitar: 1,
  piano: 1,
  trumpet: 1,
  trombone: 1,
  saxophone: 1,
  percussion: 1,
  drums: 1,
  horn: 1,
  treble: 1,
  middle: 1,
  bass: 1,
  maraccas: 1,
  castanets: 1,
  violin: 1,
  viola: 1,
  cello: 1,
  flute: 1,
  oboe: 1,
  clarinet: 1,
  melodeon: 1,
};

// let words = [];

// for (const word in sampleDictionaryObject) {
//   words.push(word);
// }

const letter1 = "e";
const letter2 = "t";
const letter3 = "f";
const letter4 = "a";
const letter5 = "h";
const letter6 = "i";
const letter7 = "s";
const letter8 = "p";
const letter9 = "w";

const words = Object.keys(sampleDictionaryObject).filter(
  (word) => word.length < 10
);

// console.log(words);
const results = words.filter(
  (word) =>
    word.length === 9 &&
    word.includes(letter1) &&
    word.includes(letter2) &&
    word.includes(letter3) &&
    word.includes(letter4) &&
    word.includes(letter5) &&
    word.includes(letter6) &&
    word.includes(letter7) &&
    word.includes(letter8) &&
    word.includes(letter9)
);
console.log(results);
