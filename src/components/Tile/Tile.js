import { React } from "react";
import css from "./tile.module.css";

function Tile({ letter, setLetter, index, autotab, innerRef }) {
  function handleChange(e) {
    setLetter(e.target.value.toLowerCase());

    autotab(e);
  }

  function handleKeyUp(e) {
    if (e.key === "Backspace") {
      autotab(e);
    }
  }

  return (
    <input
      type="text"
      autoComplete="off"
      className={css.tile}
      maxLength={1}
      onChange={(e) => {
        handleChange(e);
      }}
      ref={innerRef}
      value={letter}
      index={index}
      onKeyUp={(e) => handleKeyUp(e)}
    ></input>
  );
}

export default Tile;
