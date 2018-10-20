import React, { Component } from "react";
import Play from "../Images/Playbutton.png";
import Pause from "../Images/Pausebutton.png";

import Button from "../components/button";

class App extends Component {
  
  render() {

    return (
      <div className="App">
        <h1>Welcome to Color</h1>
        
        <Button ButtonImg = {Play} ButtonType = "Play">
        </Button>

		<Button ButtonImg = {Pause} ButtonType = "Pause" >
        </Button>


      </div>
    );
  }
}

export default App;
