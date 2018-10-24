import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";

const sketch = p5 => {
  let curr_color;

  const color_options = {
    scheme_1: ["#94EBD8", "#00B349"],
    scheme_2: ["#983275", "#FF6F01"],
    scheme_3: ["#C3A706", "#329290"]
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    curr_color = p5.color("#000000");
  };

  p5.draw = () => {
    // do nothing
  };

  p5.mouseDragged = () => {
    p5.strokeWeight(10);
    p5.stroke(curr_color);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  };

  p5.keyPressed = () => {
    switch (p5.key) {
      case "R":
      case "r":
        p5.clear();
        curr_color = p5.color("#000000");
        break;
      case "T":
        curr_color = p5.color(color_options.scheme_1[0]);
        break;
      case "G":
        curr_color = p5.color(color_options.scheme_1[1]);
        break;
      case "Y":
        curr_color = p5.color(color_options.scheme_2[0]);
        break;
      case "H":
        curr_color = p5.color(color_options.scheme_2[1]);
        break;
      case "U":
        curr_color = p5.color(color_options.scheme_3[0]);
        break;
      case "J":
        curr_color = p5.color(color_options.scheme_3[1]);
        break;
    }
  };
};

function Canvas(props) {
  return <P5Wrapper sketch={sketch} />;
}

export default Canvas;
