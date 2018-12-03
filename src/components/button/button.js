import React, { Component } from "react";
import "./button.css";

/* 

relevant props:
  -ImgSrc = rel. address of button image
  -OnClick = function to run on click
  -ButtonText = text of button
  -OnMouseEnter = function to run on mouse over
  -OnMouseLeave = function to run on mouse exit

*/

class Button extends Component {
  render() {
    const {
      ImgSrc,
      OnClick,
      ButtonText,
      OnMouseEnter,
      OnMouseLeave,
      OnMouseDown,
      OnMouseUp
    } = this.props;

    return (
      <button
        type="button"
        onClick={OnClick}
        onMouseEnter={OnMouseEnter}
        onMouseLeave={OnMouseLeave}
        onMouseDown={OnMouseDown}
        onMouseUp={OnMouseUp}
        id="modal_button"
      >
        <img src={ImgSrc} />
        {ButtonText}
      </button>
    );
  }
}

export default Button;
