import React, { Component } from "react";
import Play from "../Images/Playbutton.png";
import Pause from "../Images/Pausebutton.png";

import Button from "../components/button";

class App extends Component {

 activate(text){
 	alert(text);
 }

 

  render() {

    return (
      <div className="App">
        <h1>Welcome to Color</h1>
        
    	<Button ButtonImg = {Pause} ButtonType = "Pause" func = {this.activate}>
        </Button>
        <Button ButtonImg = {Play} ButtonType = "Play" func = {this.activate}>
        </Button>

      </div>
    );
  }
}

export default App;
