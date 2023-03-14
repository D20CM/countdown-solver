import InputArea from "../InputArea/InputArea.js";
import "./App.css";
import Button from "../Button/Button.js";
import { useState } from "react";
import dictionaryObject from "../../data/dictionaryObject.js";

function App() {
  const [letter1, setLetter1] = useState("");
  const [letter2, setLetter2] = useState("");
  const [letter3, setLetter3] = useState("");
  const [letter4, setLetter4] = useState("");
  const [letter5, setLetter5] = useState("");
  const [letter6, setLetter6] = useState("");
  const [letter7, setLetter7] = useState("");
  const [letter8, setLetter8] = useState("");
  const [letter9, setLetter9] = useState("");
  const [results, setResults] = useState([]);
  const [definitions, setDefinitions] = useState({});
  const [displayResults, setDisplayResults] = useState(false);

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

  console.log(letters);

  //create an array of any letters that are repeated
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

  //create an object of repeated letters (key) and how many times they occur (value)
  let repeatedLettersObj = {};
  for (let i = 0; i < repeatedLetters.length; i++) {
    if (repeatedLettersObj.hasOwnProperty(repeatedLetters[i])) {
      repeatedLettersObj[repeatedLetters[i]] =
        repeatedLettersObj[repeatedLetters[i]] + 1;
    } else {
      repeatedLettersObj[repeatedLetters[i]] = 1;
    }
  }

  //limit words to 9 letters or less
  let words = Object.keys(dictionaryObject).filter((word) => word.length < 10);

  //api call
  async function checkDefinition(word) {
    console.log("Looking up definition of: " + word);
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const wordInfo = await response.json();
    const definition = wordInfo[0].shortdef;
    console.log("Definition of '" + word + "' is: " + definition);

    if (definition === undefined) {
      console.log("falsie log");
      return false;
    } else {
      console.log("New definitions are: ", definitions);
      setDefinitions((definitions) => {
        return { ...definitions, [word]: definition };
      });
      console.log("truthie log");
      console.log(definitions);
      return true;
    }
  }

  //filter out any words that are not defined by the Mirriam-Webster dictionary

  async function filterWordsByPresenceOfDefinition(words) {
    //combine map and filter to achieve async filtering - https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/ (Tamas Sallai)
    //create an array of true/false from checkDefinition (actually promises) myUnresolvedPromises = words.map(checkDefinition)
    //Promise all to await resolutions wordsThatHaveDefinitions = await Promise.all(words.map(checkDefinition))
    //filter the words array by index of checked words filteredWords = words.filter((word, index) => wordsThatHaveDefinitions[index])

    let wordsThatHaveDefinitions = await Promise.all(
      words.map((word) => checkDefinition(word))
    );
    console.log("Words that have definitions: ", wordsThatHaveDefinitions);

    const definedWords = words.filter(
      (word, index) => wordsThatHaveDefinitions[index]
    );
    console.log("Defined words are: ", definedWords);
    return definedWords;
  }

  async function startChecking() {
    //clear previous definitions
    setDefinitions([]);

    //check that all 9 tiles have a letter in them
    if (letters.some((letter) => letter === "")) {
      console.log("one or more letters is empty");
      return null;
    }

    //remove all words longer than 9 letters as they are irrelevant
    let results = words.filter(
      (word) => word.length === 9 && wordscore(word) === 9
    );

    //call function to check for definitions and filter out any words without a definition
    results = await filterWordsByPresenceOfDefinition(results);
    console.log("nine-letter filtered by definition results: ", results);

    //starting with 9 letter words, if none are present then progressively check for smaller words
    if (results.length === 0) {
      results = words.filter(
        (word) => word.length === 8 && wordscore(word) === 8
      );
      results = await filterWordsByPresenceOfDefinition(results);
    }
    if (results.length === 0) {
      results = words.filter(
        (word) => word.length === 7 && wordscore(word) === 7
      );
      results = await filterWordsByPresenceOfDefinition(results);
    }
    if (results.length === 0) {
      results = words.filter(
        (word) => word.length === 6 && wordscore(word) === 6
      );
      results = await filterWordsByPresenceOfDefinition(results);
    }
    if (results.length === 0) {
      results = words.filter(
        (word) => word.length === 5 && wordscore(word) === 5
      );
      results = await filterWordsByPresenceOfDefinition(results);
    }
    if (results.length === 0) {
      results = words.filter(
        (word) => word.length === 4 && wordscore(word) === 4
      );
      results = await filterWordsByPresenceOfDefinition(results);
    }

    //score the words taking into account repeated letters
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
      //skip scoring of letters already scored as repeated letters, otherwise score a letter
      for (let i = 0; i < letters.length; i++) {
        if (
          word.includes(letters[i]) &&
          !repeatedLetters.includes(letters[i])
        ) {
          score++;
        }
      }

      return score;
    }

    setResults(results);
    setDisplayResults(true);
  }

  //reset
  function resetGame() {
    setLetter1("");
    setLetter2("");
    setLetter3("");
    setLetter4("");
    setLetter5("");
    setLetter6("");
    setLetter7("");
    setLetter8("");
    setLetter9("");
    setDisplayResults(false);
    setResults([]);
    setDefinitions([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Countdown</h1> */}
        {/* <img
          src="https://upload.wikimedia.org/wikipedia/en/1/1d/Countdown_titles_2012.png"
          alt="Countdown clock and title on a blue background"
        ></img> */}
      </header>
      <section className="gameArea">
        <InputArea
          letter1={letter1}
          setLetter1={setLetter1}
          letter2={letter2}
          setLetter2={setLetter2}
          letter3={letter3}
          setLetter3={setLetter3}
          letter4={letter4}
          setLetter4={setLetter4}
          letter5={letter5}
          setLetter5={setLetter5}
          letter6={letter6}
          setLetter6={setLetter6}
          letter7={letter7}
          setLetter7={setLetter7}
          letter8={letter8}
          setLetter8={setLetter8}
          letter9={letter9}
          setLetter9={setLetter9}
        />
        <Button
          buttonText="Get the best words!"
          onClick={() => startChecking()}
          className="gobutton"
        ></Button>
        {displayResults && (
          <>
            <h4>Your best words are...</h4>
            <div className="resultsArea">
              {results.map((word, index) => {
                console.log(word);
                return (
                  <div
                    key={index}
                    className="resultWord"
                    tooltip={`${word}: ${definitions[word]}`}
                  >
                    {word + " (" + word.length + ")"}
                  </div>
                );
              })}
            </div>
          </>
        )}
        <Button buttonText="RESET" onClick={() => resetGame()}></Button>
        <div>
          {letter1}
          {letter2}
          {letter3}
          {letter4}
          {letter5}
          {letter6}
          {letter7}
          {letter8}
          {letter9}
        </div>
      </section>
    </div>
  );
}

export default App;
