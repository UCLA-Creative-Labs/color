import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";

//array of drawings to push and splice
//var drawings = [];

const sketch = p5 => {
  let curr_color;
  //let prevX;
  //let prevY;
  //let md = false; //mouse dragged

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
    //for (var i = 0; i < drawings.length; i++) {
    //  drawings[i].update();
    //}
    // if (drawings.length){
    //   drawings[drawings.length-1].update();
    // }
  };

  p5.mousePressed = () => {
    // prevX = p5.pmouseX;
    // prevY = p5.pmouseY;
  };

  p5.mouseDragged = () => {
    p5.strokeWeight(10);
    p5.stroke(curr_color);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    //prevX = p5.pmouseX;
    //prevY = p5.pmouseY;
    //drawings[drawings.length-1].update();
  };

  /*
  p5.mouseReleased = () => {
    drawings.push(new Drawing(prevX, prevY, p5.mouseX, p5.mouseY));
    console.log(drawings);
  };
  */

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
    /*
    if (p5.key === "D" || p5.key === "d") {
      if (drawings.length > 0){
        drawings[drawings.length-1].undo();
        console.log(drawings);
      }
    }
    */
  };

  /*
  function Drawing(x, y, px, py) {
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    let linesArr = [];
    this.la = linesArr;

    this.update = () => {
      let l = new Line(this.x, this.y, this.px, this.py);
      l.drawLine();
      linesArr.push(l);

      p5.strokeWeight(10);
      p5.stroke(curr_color);
      // if (p5.mouseIsPressed === true) {
      p5.line(this.x, this.y, this.px, this.py);
      // }
    };

    this.undo = () => {
      drawings.splice(drawings.length - 1, 1); //remove Drawing from array
      p5.clear();
    };
  }
  */

  /*
  function Line(x, y, px, py) {
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;

    this.drawLine = () => {
      p5.strokeWeight(10);
      p5.stroke(curr_color);
      p5.line(this.x, this.y, this.px, this.py);
    };
  }
  */
};

function Canvas(props) {
  return <P5Wrapper sketch={sketch} />;
}

export default Canvas;
