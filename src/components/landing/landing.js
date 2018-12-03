import React, { Component } from "react";
import "./landing.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      order: 1
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ order: 2 });
      }.bind(this),
      5000
    );
    setTimeout(
      function() {
        this.setState({ order: 3 });
      }.bind(this),
      15000
    );
  }

  render() {
    // page layouts
    const landing_page_content = <h1>Color</h1>;
    const description_page_content = (
      <div>
        <h2>
          Turning colorful drawings into musical notes: a visuals music-alizer.
        </h2>
        <h2>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          from Creative Labs
        </h2>
      </div>
    );
    const how_to_page_content = (
      <div>
        <div id="how_to_div">
          <h3 id="how_to">
            <u>How To:</u>
          </h3>
          <img src={require("../../Images/scroll_down.png")} />
        </div>
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
              <tr>SPACE - Play/Pause sounds</tr>
            </table>
          </div>
        </div>
        <div id="next_button_div">
          <button onClick={this.props.app_handler}>Let's draw!</button>
        </div>
      </div>
    );

    let content =
      this.state.order === 1
        ? landing_page_content
        : this.state.order === 2
        ? description_page_content
        : how_to_page_content;
    return (
      <div
        className={
          this.state.order === 1 || this.state.order === 2
            ? "landing_page"
            : "how_to_page_div"
        }
      >
        {content}
      </div>
    );
  }
}

export default Landing;
