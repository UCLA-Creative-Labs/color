import React, { Component } from "react";
import Button from "../components/button";
import Canvas from "../components/canvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Color</h1>
        <Button>this is a button</Button>

        <Canvas />
      </div>
    );
  }
}

export default App;