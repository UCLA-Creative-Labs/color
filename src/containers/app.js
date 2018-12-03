import React, { Component } from "react";
import Button from "../components/button";
import Modal from "../components/modal/modal";
import Canvas from "../components/canvas";
import Landing from "../components/landing/landing";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
      app_loaded: false
    };

    this.load_app = this.load_app.bind(this);
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true,
      app_loaded: this.state.app_loaded
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
      app_loaded: this.state.app_loaded
    });
  };

  activate(text) {
    alert(text);
  }

  load_app() {
    this.setState({
      isShowing: this.state.isShowing,
      app_loaded: true
    });
  }

  render() {
    const landing = <Landing app_handler={this.load_app} />;
    const app = (
      <div>
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
    const content = this.state.app_loaded ? app : landing;
    return <div className="App">{content}</div>;
  }
}

export default App;
