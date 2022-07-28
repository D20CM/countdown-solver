import { React, useRef, useState, createRef, useEffect } from "react";
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

  console.log(tileRefs.length);

  function autotab(e) {
    console.log("autotab called");
    let tabIndex = e.target.getAttribute("index");
    tabIndex = Number(tabIndex);

    console.log(tabIndex);
    // console.log(tileRefs);
    // let tile = null;
    // tile = tabIndex < tileRefs.length - 1 && tileRefs[tabIndex + 1];
    let tile = tileRefs[tabIndex + 1];
    console.log(tileRefs);
    console.log(tile);
    if (tile) {
      tile.current.focus();
      // console.log(tile);
    }
  }

  return (
    <>
      <h2>Enter your letters here...</h2>
      <div className={css.letterBoard}>
        <Tile
          letter={letter1}
          setLetter={setLetter1}
          tileNumber={1}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
          index={0}
          autotab={autotab}
          innerRef={letterOneRef}
          key={"tile1"}
        />
        <Tile
          letter={letter2}
          setLetter={setLetter2}
          tileNumber={2}
          className={"letter2"}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
          index={1}
          autotab={autotab}
          innerRef={letterTwoRef}
          key={"tile2"}
        />
        <Tile
          letter={letter3}
          setLetter={setLetter3}
          tileNumber={3}
          className={"letter3"}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
          index={2}
          autotab={autotab}
          innerRef={letterThreeRef}
          key={"tile3"}
        />
        <Tile
          letter={letter4}
          setLetter={setLetter4}
          tileNumber={4}
          className={"letter4"}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
          index={3}
          autotab={autotab}
          innerRef={letterFourRef}
          key={"tile4"}
        />
        <Tile
          letter={letter5}
          setLetter={setLetter5}
          tileNumber={5}
          className={"letter5"}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
          index={4}
          autotab={autotab}
          innerRef={letterFiveRef}
          key={"tile5"}
        />
        <Tile
          letter={letter6}
          setLetter={setLetter6}
          tileNumber={6}
          className={"letter6"}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
          index={5}
          autotab={autotab}
          innerRef={letterSixRef}
          key={"tile6"}
        />
        <Tile
          letter={letter7}
          setLetter={setLetter7}
          tileNumber={7}
          className={"letter7"}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
          index={6}
          autotab={autotab}
          innerRef={letterSevenRef}
          key={"tile7"}
        />
        <Tile
          letter={letter8}
          setLetter={setLetter8}
          tileNumber={8}
          className={"letter8"}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
          index={7}
          autotab={autotab}
          innerRef={letterEightRef}
          key={"tile8"}
        />
        <Tile
          letter={letter9}
          setLetter={setLetter9}
          tileNumber={9}
          className={"letter9"}
          tileRefs={tileRefs}
          setTileRefs={setTileRefs}
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
