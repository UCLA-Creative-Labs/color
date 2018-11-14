import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import Tone from "tone";

// window dimensions
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let curr_color;

// tone.js
// note scale must be backwards
const note_duration = "4n";
const scale = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];

const sketch = p5 => {
  //array of Grid objects
  let gridArr = [];

  //stroke start location
  let stroke_start;

  // grid class
  class Grid {
    constructor(boundaries, note_freq) {
      this.boundary_xstart = boundaries.xstart;
      this.boundary_xend = boundaries.xend;
      this.boundary_ystart = boundaries.ystart;
      this.boundary_yend = boundaries.yend;
      // sound init
      this.synth = new Tone.Synth().toMaster();
      this.note_freq = note_freq;
    }

    check_bound(x, y) {
      return (
        x >= this.boundary_xstart &&
        x <= this.boundary_xend &&
        y >= this.boundary_ystart &&
        y <= this.boundary_yend
      );
    }

    play_sound() {
      this.synth.triggerAttackRelease(this.note_freq, note_duration);
    }
  }

  // color schemes
  const color_options = {
    scheme_1: ["#94EBD8", "#00B349"],
    scheme_2: ["#983275", "#FF6F01"],
    scheme_3: ["#C3A706", "#329290"]
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    curr_color = p5.color("#000000");

    //initialize Grid objects
    for (let j = 0; j < 8; j++) {
      const g = new Grid(
        {
          xstart: 0,
          xend: windowWidth,
          ystart: (windowHeight * j) / 8,
          yend: (windowHeight * (j + 1)) / 8
        },
        scale[j]
      );
      //push to grid array
      gridArr.push(g);
    }
  };

  p5.draw = () => {};

  p5.mousePressed = () => {
    // store stroke start for playing at end of stroke
    stroke_start = [p5.mouseX, p5.mouseY];
  };

  p5.mouseDragged = () => {
    p5.strokeWeight(10);
    p5.stroke(curr_color);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  };

  p5.mouseReleased = () => {
    // check stroke click and play both sounds
    gridArr.forEach(element => {
      if (element.check_bound(p5.mouseX, p5.mouseY)) {
        element.play_sound();
      }
      if (element.check_bound(stroke_start[0], stroke_start[1])) {
        element.play_sound();
      }
    });
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
