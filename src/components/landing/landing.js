import React, { Component } from "react";
import "./landing.css";

// page layouts
const landing_page_content = <h1>Color</h1>;
let description_page_content = (
  <div>
    <h2>
      Turning colorful drawings into musical notes: a visuals music-alizer.
    </h2>
    <h2>Made with ❤ from Creative Labs</h2>
  </div>
);

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      order: 4
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ order: 4 });
      }.bind(this),
      5000
    );
  }

  render() {
    let content =
      this.state.order === 1 ? landing_page_content : description_page_content;
    return (
      <div
        className={
          this.state.order === 1 || this.state.order === 2
            ? "landing_page"
            : "how_to_page_div"
        }
      >
        <h3 id="how_to">
          <u>How To:</u>
        </h3>
        <div id="drag_to_draw_div">
          <img src={require("../../Images/drag.png")} />
          <h3>Drag to draw</h3>
        </div>
        <div id="press_div">
          <h3>Keyboard Controls:</h3>
          <div id="press_options">
            <table>
              <tr>D - Undo last stroke</tr>
              <tr>Q - Redo last erased stroke</tr>
              <tr>R - Reset canvas and color</tr>
              <tr>T - Teal color</tr>
              <tr>G - Green color</tr>
              <tr>Y - Purple color</tr>
              <tr>H - Orange color</tr>
              <tr>U - Gold color</tr>
              <tr>J - Blue color</tr>
            </table>
          </div>
        </div>
        <div id="next_button_div">
          <button>Okay, take me to the app!</button>
        </div>
      </div>
    );
  }
}

export default Landing;

// {content}
