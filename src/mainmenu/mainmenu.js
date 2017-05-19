import React, { Component } from 'react';

export default class MainMenu extends Component {
  render() {
    return(
      <div style={{visibility: this.props.mainMenu ? "visible" : "hidden"}} className="main-menu">
        <h2>Controls</h2>
        <div>W = Thrust (uses fuel)</div>
        <div>A/D = Rotation</div>
        <div>Objective: Land in the red dotted square.</div>
        <button className="start-button" onClick={() => this.props.start()}>START GAME</button>
      </div>
    )
  }
}
