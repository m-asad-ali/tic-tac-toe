import React from "react";
import "../App.css";

const Square = (props) => {
  return (
    <div className="board">
      {props.clickedArray.map((item, index) => {
        if (item === "") {
          return (
            <div
              key={index}
              className="square"
              onClick={() => props.handleClick(index)}
            >
              {item}
            </div>
          );
        } else {
          return (
            <div key={index} className="square clicked">
              {item}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Square;
