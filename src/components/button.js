import React, { Component } from "react";
import Play from "../Images/Playbutton.png";

/*

*/

class Button extends Component {


 
 render() {

    const {ButtonImg, ButtonType,func} = this.props;

    return (
      <div>
       	<img src={ButtonImg} onClick = {(e) => { func("argument")}} >
      	</img>

      </div>
    );

  }
}

export default Button;
