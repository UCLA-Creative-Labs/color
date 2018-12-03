import React from "react";
import "./modal.css";

//how to use: paste the stuff below into app.js under <Button>
// use Ctrl / to block uncomment
// { this.state.isShowing ? <div onMouseLeave={this.closeModalHandler} className="back-drop"></div> : null }
// <button className="open-modal-btn" onMouseEnter={this.openModalHandler} onMouseLeave={this.closeModalHandler}>?</button>
// <Modal
//    className="modal"
//    show={this.state.isShowing}
//    close={this.closeModalHandler}>
//        This is such a cool project whoo go draw shit and hear it make music amazing <br/>
//        Brought to u by us
// </Modal>

const modal = props => {
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          opacity: props.show ? "1" : "0"
        }}
      >
        <div>
          <div id="how_to_div_modal">
            <h3 id="how_to_modal">
              <u>How To:</u>
            </h3>
            <h3 id="drag_to_draw">Drag to draw!</h3>
          </div>
          <div id="press_div_modal">
            <h3>Keyboard Controls:</h3>
            <div id="press_options_modal">
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
        </div>
      </div>
    </div>
  );
};

export default modal;
