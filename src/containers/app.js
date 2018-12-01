import React, { Component } from "react";
import Button from "../components/button";
import Modal from "../components/modal/modal";
import Canvas from "../components/canvas";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false
    };
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  activate(text) {
    alert(text);
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to Color</h1>
        {this.state.isShowing ? (
          <div onMouseLeave={this.closeModalHandler} className="back-drop" />
        ) : null}
        <Button
          OnMouseEnter={this.openModalHandler}
          OnMouseLeave={this.closeModalHandler}
          ButtonText="?"
        />
        <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}
        >
          <p>
            Turning colorful drawings into musical notes. A visuals
            music-alizer.
          </p>
          <p> Made with ❤ from Creative Labs</p>
        </Modal>
        <Canvas
          id="myCanvas"
          width="420"
          height="400"
          style="background-color:#dddddd"
          onmousedown="mouseDownEvent(event.clientX, event.clientY, event.button)"
          onmousemove="mouseMoveEvent(event.clientX, event.clientY, event.button)"
          onmouseup="mouseUpEvent(event.clientX, event.clientY, event.button)"
          oncontextmenu="return false;"
        >
          <span style="background-color:#ffff88;">
            The &lt;canvas&gt; element is not supported by this browser.
          </span>
        </Canvas>
      </div>
    );
  }
}

export default App;
