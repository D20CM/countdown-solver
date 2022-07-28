import { React, useRef, forwardRef, createRef, useEffect } from "react";
import css from "./tile.module.css";

function Tile({
  letter,
  setLetter,
  index,
  tileRefs,
  setTileRefs,
  autotab,
  innerRef,
}) {
  function handleChange(e) {
    setLetter(e.target.value);
    autotab(e);
  }

  return (
    <input
      className={css.tile}
      maxLength={1}
      onChange={(e) => {
        handleChange(e);
      }}
      ref={innerRef}
      value={letter}
      index={index}
    ></input>
  );
}

export default Tile;
