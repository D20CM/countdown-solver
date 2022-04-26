import React from "react";
import css from "./tile.module.css";

function Tile({ letter, setLetter }) {
  function handleChange(e) {
    setLetter(e.target.value);
  }
  return (
    <input
      className={css.tile}
      maxLength="1"
      onChange={(e) => {
        handleChange(e);
      }}
      value={letter}
    ></input>
  );
}

export default Tile;
