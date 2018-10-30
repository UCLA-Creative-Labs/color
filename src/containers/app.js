import React, { Component } from "react";
import Button from "../components/button";
import Modal from '../components/modal/modal';
import Canvas from "../components/canvas";

class App extends Component {

  constructor() {
    super();

    this.state = {
        isShowing: false
    }
  }

  openModalHandler = () => {
    this.setState({
        isShowing: true
    });
}

closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
}

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
