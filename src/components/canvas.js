import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";

//array of drawings to push and splice
var drawings = [];

const sketch = p5 => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    // do nothing
    for (var i = 0; i < drawings.length; i++) {
      drawings[i].display();
    }
  };

  p5.mousePressed = () => {
    drawings.push(new Drawing(p5.mouseX, p5.mouseY));;
    console.log(drawings);
  }

  p5.mouseDragged = () => {
    // p5.strokeWeight(10);
    // p5.stroke(51);
    // p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  };

  p5.keyPressed = () => {
    if (p5.key === "R" || p5.key === "r") {
      p5.clear();
    }
    if (p5.key === "U" || p5.key === "u") {
      if (drawings.length > 0){
        drawings[drawings.length-1].undo();
        console.log(drawings);
        p5.loop();
      }
    }
  };

  function Drawing(x, y) {
    this.x = x;
    this.y = y;

    this.display = () => {
      p5.strokeWeight(10);
      p5.stroke(0);
      if (p5.mouseIsPressed === true) {
        p5.line(this.x, this.y, p5.pmouseX, p5.pmouseY);
        // p5.ellipse(this.x, this.y, 50, 50);
      }
    }

    this.undo = () => {
      drawings.splice(drawings.length-1, 1);  //remove Drawing from array
      p5.clear();
    }
  };
};



function Canvas(props) {
  return <P5Wrapper sketch={sketch} />;
}

export default Canvas;
