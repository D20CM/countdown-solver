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
};

// let words = [];

// for (const word in sampleDictionaryObject) {
//   words.push(word);
// }

const words = Object.keys(sampleDictionaryObject);

console.log(words);
const results = words.filter(
  (word) => word.includes("w") && word.includes("v")
);
console.log(results);
