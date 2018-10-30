import React, { Component } from "react";

/*

*/

class Button extends Component {


 
 render() {

    const {ButtonImg,func} = this.props;

    return (
      <div>
       	<img src={ButtonImg} onClick = {(e) => { func("argument")}} >
      	</img>

      </div>
    );

  }
}

export default Button;
