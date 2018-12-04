import React, { Component } from "react";
import "./landing.css";

let first_landing_page;
let second_landing_page;

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      order: 1
    };
    this.skip_landings = this.skip_landings.bind(this);
  }

  componentDidMount() {
    first_landing_page = setTimeout(
      function() {
        this.setState({ order: 2 });
      }.bind(this),
      5000
    );
    second_landing_page = setTimeout(
      function() {
        this.setState({ order: 3 });
      }.bind(this),
      15000
    );
    document.addEventListener("click", this.skip_landings);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.skip_landings);
  }

  skip_landings(e) {
    clearTimeout(first_landing_page);
    clearTimeout(second_landing_page);
    this.setState({
      order: 3
    });
  }

  render() {
    // page layouts
    const landing_page_content = (
      <h1>
        <span id="color_1">C</span>
        <span id="color_2">o</span>
        <span id="color_3">l</span>
        <span id="color_4">o</span>
        <span id="color_5">r</span>
      </h1>
    );
    const description_page_content = (
      <div>
        <h2>
          Turning <span id="colorful_1">c</span>
          <span id="colorful_2">o</span>
          <span id="colorful_3">l</span>
          <span id="colorful_4">o</span>
          <span id="colorful_5">r</span>
          <span id="colorful_6">f</span>
          <span id="colorful_7">u</span>
          <span id="colorful_8">l</span> drawings into{" "}
          <span id="musical_1">m</span>
          <span id="musical_2">u</span>
          <span id="musical_3">s</span>
          <span id="musical_4">i</span>
          <span id="musical_5">c</span>
          <span id="musical_6">a</span>
          <span id="musical_7">l</span> notes: a{" "}
          <span id="visuals">visuals</span>{" "}
          <span id="musicalizer">music-alizer</span>.
        </h2>
        <h2>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          from <span id="creative_1">C</span>
          <span id="creative_2">r</span>
          <span id="creative_3">e</span>
          <span id="creative_4">a</span>
          <span id="creative_5">t</span>
          <span id="creative_6">i</span>
          <span id="creative_7">v</span>
          <span id="creative_8">e</span> <span id="labs_1">L</span>
          <span id="labs_2">a</span>
          <span id="labs_3">b</span>
          <span id="labs_4">s</span>
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
      <span ref={node => (this.node = node)}>
        <div
          className={
            this.state.order === 1 || this.state.order === 2
              ? "landing_page"
              : "how_to_page_div"
          }
        >
          {content}
        </div>
      </span>
    );
  }
}

export default Landing;
