import React, { Component } from "react";

import Button from "../components/button";
import Modal from '../components/modal/modal';

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

        { this.state.isShowing ? <div onMouseLeave={this.closeModalHandler} className="back-drop"></div> : null }

        <button className="open-modal-btn" onMouseEnter={this.openModalHandler} onMouseLeave={this.closeModalHandler}>?</button>

        <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}>
                This is such a cool project whoo go draw shit and hear it make music amazing <br/>
                Brought to u by us
        </Modal>
      </div>      
    );
  }
}

export default App;
