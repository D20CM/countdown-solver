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
  console.log("first few words:  ", words.slice(0, 10));

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
    if (
      letter1 === "" ||
      letter2 === "" ||
      letter3 === "" ||
      letter4 === "" ||
      letter5 === "" ||
      letter6 === "" ||
      letter7 === "" ||
      letter8 === "" ||
      letter9 === ""
    ) {
      return null;
    }

    let results = words.filter(
      (word) => word.length === 9 && wordscore(word) === 9
    );

    results = await filterWordsByPresenceOfDefinition(results);

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
    setResults(results);
    setDisplayResults(true);
  }

  // async function setDefinitions(results) {
  //   results.forEach(async (result) => {
  //     const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${result}?key=${process.env.REACT_APP_API_KEY}`;
  //     const response = await fetch(url);
  //     const wordInfo = await response.json();
  //     const definition = wordInfo[0].shortdef;
  //     console.log(definition);
  //     return definition;
  //   });
  // }

  // useEffect(() => {
  //   console.log("Results are: " + results);
  //   results.forEach(async (result, index) => {
  //     const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${result}?key=${process.env.REACT_APP_API_KEY}`;
  //     const response = await fetch(url);
  //     const wordInfo = await response.json();
  //     console.log(wordInfo);
  //     const definition = `${result}: ` + wordInfo[0].shortdef;
  //     setDefinitions([...definitions, definition]);
  //     // console.log(definitions);
  //   });
  // }, [displayResults, results]);

  // console.log(definitions);

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
