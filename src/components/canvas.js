import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";

var lines = [];       // all lines
var line_count = [];  // stores number of lines for every stroke
var lc = 0;           // line count for current stroke
var sc = 0;           // stroke count
var currentEvent, prevEvent;
var movement_x, movement_y, movement = 5; // base stroke width is 5
var curr_color;
var mu = false;       //mouse up

document.documentElement.onmousemove=function(event){
  currentEvent = event;
}

setInterval(function(){
  if (currentEvent && prevEvent){
    movement_x = Math.abs(currentEvent.screenX - prevEvent.screenX);
    movement_y = Math.abs(currentEvent.screenY - prevEvent.screenY);
    movement = (movement*10 + 5 + Math.sqrt(Math.pow(movement_x,2) + Math.pow(movement_y,2)))/11.;
    // movement is the "smoothed" velocity of the mouse (takes average of 10 * past velocity and current velocity)
    // determines thickness of stroke
  }
  prevEvent = currentEvent;
},5);

const sketch = p5 => {

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
    for (var i = 0; i < lines.length; i++) {
      lines[i].drawLine();
    }
  };

  p5.mousePressed = () => {
    mu = false;
    lc = 0;
  };

  p5.mouseDragged = () => {
    lines.push(new Line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY, movement,curr_color));
    lc++;
  };
  
  p5.mouseReleased = () => {
    line_count[sc] = lc;
    sc++;
    mu = true;
    movement = 5;
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
    
    if (p5.key === "D" || p5.key === "d") {
      if (lines.length > 0 && mu){
          lines.splice(lines.length - line_count[sc-1], line_count[sc-1]); //remove Drawing from array
          sc--;
          p5.clear();
      }
    }
  };

  function Line(x, y, px, py, weight, color) {
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    this.weight = weight;
    this.color = color;

    this.drawLine = () => {
      p5.strokeWeight(weight);
      p5.stroke(color);
      p5.line(this.x, this.y, this.px, this.py);
    };
  }
};

function Canvas(props) {
  return <P5Wrapper sketch={sketch} />;
}

export default Canvas;
