import React, { Component } from "react";
import Play from "../Images/Playbutton.png";

/*

*/

class Button extends Component {

activate(text,type){
 	if (type === 'Play'){
 		return alert(text + "play");
 	}
 	else if(type === 'Pause') {
 		return alert(text + "pause");
 	}
 }
 
 render() {

    const {ButtonImg, ButtonType} = this.props;

    return (
      <div>
      	<button 
      	onClick = {(e) => { this.activate("test ",ButtonType)}} >
      	{<img src={ButtonImg} />}
      	</button>
      </div>
    );

  }
}

export default Button;
