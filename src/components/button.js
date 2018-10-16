import React, { Component } from "react";

class Button extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <input type="button" value={children} />
      </div>
    );
  }
}

export default Button;
