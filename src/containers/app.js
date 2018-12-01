import React, { Component } from "react";
import Button from "../components/button";
import Modal from "../components/modal/modal";
import Canvas from "../components/canvas";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false
    };
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  activate(text) {
    alert(text);
  }

  // shapeRecognition = (pointarray) => {
  //   var _isDown, _points, _r, _g, _rc;

  //   var _r = new DollarRecognizer();

  //   if (pointarray.length >= 10)
  //       {
  //         var result = _r.Recognize(pointarray);
  //         //drawText("Result: " + result.Name + " (" + round(result.Score,2) + ") in " + result.Time + " ms.");
  //       }
  //   /*
  //   function onLoadEvent()
  //   {
  //     _points = new Array();
  //     _r = new DollarRecognizer();

  //     var canvas = document.getElementById('myCanvas');
  //     _g = canvas.getContext('2d');
  //     _g.fillStyle = "rgb(0,0,225)";
  //     _g.strokeStyle = "rgb(0,0,225)";
  //     _g.lineWidth = 3;
  //     _g.font = "16px Gentilis";
  //     _rc = getCanvasRect(canvas); // canvas rect on page
  //     _g.fillStyle = "rgb(255,255,136)";
  //     _g.fillRect(0, 0, _rc.width, 20);

  //     _isDown = false;
  //   }
  //   */
  //   /*already done
  //   function getCanvasRect(canvas)
  //   {
  //     var w = canvas.width;
  //     var h = canvas.height;

  //     var cx = canvas.offsetLeft;
  //     var cy = canvas.offsetTop;
  //     while (canvas.offsetParent != null)
  //     {
  //       canvas = canvas.offsetParent;
  //       cx += canvas.offsetLeft;
  //       cy += canvas.offsetTop;
  //     }
  //     return {x: cx, y: cy, width: w, height: h};
  //   }
  //   function getScrollX()
  //   {
  //     var scrollX = $(window).scrollLeft();
  //     return scrollX;
  //   }
  //   function getScrollY()
  //   {
  //     var scrollY = $(window).scrollTop();
  //     return scrollY;
  //   }
  //   */
  //   //
  //   // Mouse Events
  //   //
  //   /*already done
  //   function mouseDownEvent(x, y, button)
  //   {
  //     document.onselectstart = function() { return false; } // disable drag-select
  //     document.onmousedown = function() { return false; } // disable drag-select
  //     if (button <= 1)
  //     {
  //       _isDown = true;
  //       x -= _rc.x - getScrollX();
  //       y -= _rc.y - getScrollY();
  //       if (_points.length > 0)
  //         _g.clearRect(0, 0, _rc.width, _rc.height);
  //       _points.length = 1; // clear
  //       _points[0] = new Point(x, y);
  //       drawText("Recording unistroke...");
  //       _g.fillRect(x - 4, y - 3, 9, 9);
  //     }
  //     else if (button == 2)
  //     {
  //       drawText("Recognizing gesture...");
  //     }
  //   }
  //   */
  //   /*already done
  //   function mouseMoveEvent(x, y, button)
  //   {
  //     if (_isDown)
  //     {
  //       x -= _rc.x - getScrollX();
  //       y -= _rc.y - getScrollY();
  //       _points[_points.length] = new Point(x, y); // append
  //       drawConnectedPoint(_points.length - 2, _points.length - 1);
  //     }
  //   }
  //   */

  //   function mouseUpEvent(x, y, button)
  //   {
  //     document.onselectstart = function() { return true; } // enable drag-select
  //     document.onmousedown = function() { return true; } // enable drag-select
  //     if (_isDown || button == 2)
  //     {
  //       _isDown = false;
  //       if (_points.length >= 10)
  //       {
  //         var result = _r.Recognize(_points, document.getElementById('useProtractor').checked);
  //         drawText("Result: " + result.Name + " (" + round(result.Score,2) + ") in " + result.Time + " ms.");
  //       }
  //       else // fewer than 10 points were inputted
  //       {
  //         drawText("Too few points made. Please try again.");
  //       }
  //     }
  //   }

  //   /* for the other canvas
  //   function drawText(str)
  //   {
  //     _g.fillStyle = "rgb(255,255,136)";
  //     _g.fillRect(0, 0, _rc.width, 20);
  //     _g.fillStyle = "rgb(0,0,255)";
  //     _g.fillText(str, 1, 14);
  //   }

  //   function drawConnectedPoint(from, to)
  //   {
  //     _g.beginPath();
  //     _g.moveTo(_points[from].X, _points[from].Y);
  //     _g.lineTo(_points[to].X, _points[to].Y);
  //     _g.closePath();
  //     _g.stroke();
  //   }
  //   */
  //   function round(n, d) // round 'n' to 'd' decimals
  //   {
  //     d = Math.pow(10, d);
  //     return Math.round(n * d) / d;
  //   }
  //   //
  //   // Unistroke Adding and Clearing
  //   //
  //   function onClickAddExisting()
  //   {
  //     if (_points.length >= 10)
  //     {
  //       var unistrokes = document.getElementById('unistrokes');
  //       var name = unistrokes[unistrokes.selectedIndex].value;
  //       var num = _r.AddGesture(name, _points);
  //       drawText("\"" + name + "\" added. No. of \"" + name + "\" defined: " + num + ".");
  //     }
  //   }
  //   function onClickAddCustom()
  //   {
  //     var name = document.getElementById('custom').value;
  //     if (_points.length >= 10 && name.length > 0)
  //     {
  //       var num = _r.AddGesture(name, _points);
  //       drawText("\"" + name + "\" added. No. of \"" + name + "\" defined: " + num + ".");
  //     }
  //   }
  //   function onClickCustom()
  //   {
  //     document.getElementById('custom').select();
  //   }
  //   function onClickDelete()
  //   {
  //     var num = _r.DeleteUserGestures(); // deletes any user-defined unistrokes
  //     alert("All user-defined gestures have been deleted. Only the 1 predefined gesture remains for each of the " + num + " types.");
  //   }
  // }

  render() {
    // call here
    return (
      <div className="App">
        <h1>Welcome to Color</h1>
        <audio controls preload="auto"></audio>
        <Button>this is a button</Button>
        {this.state.isShowing ? (
          <div onMouseLeave={this.closeModalHandler} className="back-drop" />
        ) : null}
        <button
          className="open-modal-btn"
          onMouseEnter={this.openModalHandler}
          onMouseLeave={this.closeModalHandler}
        >
          ?
        </button>
        <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}
        >
          This is such a cool project whoo go draw shit and hear it make music
          amazing <br />
          Brought to u by us
        </Modal>
        <Canvas
          id="myCanvas"
          width="420"
          height="400"
          style="background-color:#dddddd"
          onmousedown="mouseDownEvent(event.clientX, event.clientY, event.button)"
          onmousemove="mouseMoveEvent(event.clientX, event.clientY, event.button)"
          onmouseup="mouseUpEvent(event.clientX, event.clientY, event.button)"
          oncontextmenu="return false;"
        >
          <span style="background-color:#ffff88;">
            The &lt;canvas&gt; element is not supported by this browser.
          </span>
        </Canvas>
      </div>
    );
  }
}

export default App;
