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
      engines: false,
      rotation: 0,
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

      this.setState({movement: movement, engines: true});
    } else if (event.key === 'a') {
      let rotation = this.state.rotation;
      rotation--
      this.setState({rotation: rotation})
    } else if (event.key === 's') {
      console.log('down')
      this.setState({movement: 'fall'})
    } else if (event.key === 'd') {
      let rotation = this.state.rotation;
      rotation++
      this.setState({rotation: rotation})
    }
  }

  _tick() {
    if (this.state.engines == false) {
      let movement = this.state.movement.slice();
      movement[1]--
      this.setState({movement: movement});
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this._handleKeyPress.bind(this));
    this.setState({ship:this.refs.ship});
    this.countdown = setInterval(this._tick.bind(this), 33);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this._handleKeyPress.bind(this));
    clearInterval(this.countdown)
  }

  // =========================================

  render() {
    return (
      <div className="App">
        <img id="ship" ref="ship" style={{bottom:this.state.movement[1], transform:'rotate('+this.state.rotation+'deg)'}} src={logo} className={'ship ' + this.state.movement} alt="logo" />
      </div>
    );
  }
}

export default Game;
