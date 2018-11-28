import React, { Component } from "react";
import Button from "../components/button";
import Modal from "../components/modal/modal";
import Canvas from "../components/canvas";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
      undo: false,
      redo: false
    };
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true,
      undo: this.state.undo,
      redo: this.state.redo
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
      undo: this.state.undo,
      redo: this.state.redo
    });
  };

  activate(text) {
    alert(text);
  }

  UndoUp = () => {
    this.setState({
      isShowing: this.state.isShowing,
      undo: false,
      redo: this.state.redo
    });
    //console.log("undoup");
    //console.log(this.state);
  };

  UndoDown = () => {
    this.setState({
      isShowing: this.state.isShowing,
      undo: true,
      redo: this.state.redo
    });
    //console.log("undodown");
    //console.log(this.state);
  };

  RedoUp = () => {
    this.setState({
      isShowing: this.state.isShowing,
      undo: this.state.undo,
      redo: false
    });
    //console.log(this.state);
  };

  RedoDown = () => {
    this.setState({
      isShowing: this.state.isShowing,
      undo: this.state.undo,
      redo: true
    });
  };

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
        <Button
          OnMouseDown={this.UndoDown}
          OnMouseUp={this.UndoUp}
          ButtonText="Undo"
        />
        <Button
          OnMouseDown={this.RedoDown}
          OnMouseUp={this.RedoUp}
          ButtonText="Redo"
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
          undo={this.state.undo}
          redo={this.state.redo}
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
