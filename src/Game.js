import React, { Component } from 'react';
import logo from './logo.svg';
import './Game.css';

class Game extends Component {
  // Controls ==============================
  _handleKeyPress(event) {
    if (event.key === 'w'){
      console.log('up')
    } else if (event.key === 'a') {
      console.log('left')
    } else if (event.key === 's') {
      console.log('down')
    } else if (event.key === 'd') {
      console.log('right')
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this._handleKeyPress.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this._handleKeyPress.bind(this));
  }

  // =========================================

  render() {
    return (
      <div className="App">
        <div className="App-header" >
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <input type="text" id="one" onKeyDown={this._handleKeyPress} />
        </p>
      </div>
    );
  }
}

export default Game;
