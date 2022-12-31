import dictionaryObject from "./data/dictionaryObject.js";

const words = Object.keys(dictionaryObject).filter((word) => word.length < 10);

const startingLetter = "d";
const finishingLetter = "e";
console.log(
  words
    .filter((word) => word[0] === startingLetter)
    .filter((word) => word[word.length - 1] === finishingLetter)
    .filter((word) => word[word.length - 2] === "n")
);
