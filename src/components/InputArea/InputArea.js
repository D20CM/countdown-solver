import { React, useRef, useState } from "react";
import Tile from "../Tile/Tile.js";
import css from "./InputArea.module.css";

function InputArea({
  letter1,
  setLetter1,
  letter2,
  setLetter2,

  letter3,
  setLetter3,

  letter4,
  setLetter4,

  letter5,
  setLetter5,

  letter6,
  setLetter6,

  letter7,
  setLetter7,

  letter8,
  setLetter8,

  letter9,
  setLetter9,
}) {
  const letterOneRef = useRef();
  const letterTwoRef = useRef();
  const letterThreeRef = useRef();
  const letterFourRef = useRef();
  const letterFiveRef = useRef();
  const letterSixRef = useRef();
  const letterSevenRef = useRef();
  const letterEightRef = useRef();
  const letterNineRef = useRef();

  // const [tileRefs, setTileRefs] = useState([...Array(9)]);
  const [tileRefs, setTileRefs] = useState([
    letterOneRef,
    letterTwoRef,
    letterThreeRef,
    letterFourRef,
    letterFiveRef,
    letterSixRef,
    letterSevenRef,
    letterEightRef,
    letterNineRef,
  ]);

  function autotab(e) {
    //get index of tile that calls this function
    let tabIndex = e.target.getAttribute("index");
    tabIndex = Number(tabIndex);
    //tile is the variable that we will use to focus
    let tile = null;
    //conditionals check for first or last tile
    if (e.key && e.key === "Backspace") {
      tile = tabIndex > 0 && tileRefs[tabIndex - 1];
    } else {
      tile = tabIndex < tileRefs.length - 1 && tileRefs[tabIndex + 1];
    }
    if (tile) {
      tile.current.focus();
    }
  }

  return (
    <>
      <h2>Enter your letters here...</h2>
      <div className={css.letterBoard}>
        <Tile
          letter={letter1}
          setLetter={setLetter1}
          index={0}
          autotab={autotab}
          innerRef={letterOneRef}
          key={"tile1"}
        />
        <Tile
          letter={letter2}
          setLetter={setLetter2}
          className={"letter2"}
          index={1}
          autotab={autotab}
          innerRef={letterTwoRef}
          key={"tile2"}
        />
        <Tile
          letter={letter3}
          setLetter={setLetter3}
          className={"letter3"}
          index={2}
          autotab={autotab}
          innerRef={letterThreeRef}
          key={"tile3"}
        />
        <Tile
          letter={letter4}
          setLetter={setLetter4}
          className={"letter4"}
          index={3}
          autotab={autotab}
          innerRef={letterFourRef}
          key={"tile4"}
        />
        <Tile
          letter={letter5}
          setLetter={setLetter5}
          className={"letter5"}
          index={4}
          autotab={autotab}
          innerRef={letterFiveRef}
          key={"tile5"}
        />
        <Tile
          letter={letter6}
          setLetter={setLetter6}
          className={"letter6"}
          index={5}
          autotab={autotab}
          innerRef={letterSixRef}
          key={"tile6"}
        />
        <Tile
          letter={letter7}
          setLetter={setLetter7}
          className={"letter7"}
          index={6}
          autotab={autotab}
          innerRef={letterSevenRef}
          key={"tile7"}
        />
        <Tile
          letter={letter8}
          setLetter={setLetter8}
          className={"letter8"}
          index={7}
          autotab={autotab}
          innerRef={letterEightRef}
          key={"tile8"}
        />
        <Tile
          letter={letter9}
          setLetter={setLetter9}
          className={"letter9"}
          index={8}
          autotab={autotab}
          innerRef={letterNineRef}
          key={"tile9"}
        />
      </div>
    </>
  );
}

export default InputArea;
