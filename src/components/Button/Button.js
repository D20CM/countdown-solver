import React from "react";
import css from "./Button.module.css";

function Button({ buttonText, onClick }) {
  return (
    <button className={css.button} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default Button;
