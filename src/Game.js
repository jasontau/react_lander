import React, { Component } from 'react';
import logo from './logo.svg';
import './Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      movement: [0, 0], //x,y
      floor: -600,
      ship: 'null',
    }
  }

  // Controls ==============================
  _handleKeyPress(event) {
    if (event.key === 'w'){
      let rect = this.state.ship.getBoundingClientRect();
      let pos = [rect['left'], rect['bottom']];

      let movement = this.state.movement.slice();
      movement[1]++
      console.log(movement)

      this.setState({movement: movement});
    } else if (event.key === 'a') {
      console.log('left')
    } else if (event.key === 's') {
      console.log('down')
      this.setState({movement: 'fall'})
    } else if (event.key === 'd') {
      console.log('right')
    }
  }

  _tick() {

  }

  componentDidMount() {
    window.addEventListener("keydown", this._handleKeyPress.bind(this));
    this.setState({ship:this.refs.ship});
    this.countdown = setInterval(this._tick, 33);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this._handleKeyPress.bind(this));
    clearInterval(this.countdown)
  }

  // =========================================

  render() {
    return (
      <div className="App">
        <img id="ship" ref="ship" style={{bottom:this.state.movement[1]}}src={logo} className={'ship ' + this.state.movement} alt="logo" />
      </div>
    );
  }
}

export default Game;
