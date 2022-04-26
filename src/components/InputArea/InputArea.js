import React from "react";
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
  return (
    <>
      <h2>Enter your letters here...</h2>
      <div className={css.letterBoard}>
        <Tile letter={letter1} setLetter={setLetter1} />
        <Tile letter={letter2} setLetter={setLetter2} />
        <Tile letter={letter3} setLetter={setLetter3} />
        <Tile letter={letter4} setLetter={setLetter4} />
        <Tile letter={letter5} setLetter={setLetter5} />
        <Tile letter={letter6} setLetter={setLetter6} />
        <Tile letter={letter7} setLetter={setLetter7} />
        <Tile letter={letter8} setLetter={setLetter8} />
        <Tile letter={letter9} setLetter={setLetter9} />
      </div>
    </>
  );
}

export default InputArea;
