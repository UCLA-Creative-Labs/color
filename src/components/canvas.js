import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";

const sketch = p5 => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    // do nothing
  };

  p5.mouseDragged = () => {
    p5.strokeWeight(10);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  };

  p5.keyPressed = () => {
    if (p5.key === "R" || p5.key === "r") {
      p5.clear();
    }
  };
};

function Canvas(props) {
  return <P5Wrapper sketch={sketch} />;
}

export default Canvas;
