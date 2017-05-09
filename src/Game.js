import React, { Component } from 'react';
import logo from './logo.svg';
import './Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      // state
      position: [0, 0], //x,y
      speed: [0, 0],
      floor: -600,
      ship: 'null',
      engines: false,
      turnLeft: false,
      turnRight: false,
      rotation: 0,

      // game settings
      rotationRate: 5,
      thrust: 0.5,
      gravity: 0.1,
    }
  }

  // Controls ==============================
  _handleKeyPress(event) {
    if (event.key === 'w' && this.state.engines === false){
      // let rect = this.state.ship.getBoundingClientRect();
      // let pos = [rect['left'], rect['bottom']];
      //
      // let position = this.state.position.slice();
      // position[1]++
      // console.log(position)

      this.setState({engines: true});
    }

    if (event.key === 'a') {
      this.setState({turnLeft: true})
      let rotation = this.state.rotation - this.state.rotationRate;
      this.setState({rotation: rotation})
    } else if (event.key === 'd') {
      this.setState({turnRight: true})
      let rotation = this.state.rotation + this.state.rotationRate;
      this.setState({rotation: rotation})
    }
  }

  _handleKeyUp(event) {
    if (event.key === 'w' && this.state.engines){
      this.setState({engines: false})
    }

    if (event.key === 'a' && this.state.turnLeft){
      this.setState({turnLeft: false})
    }

    if (event.key === 'd' && this.state.turnRight){
      this.setState({turnRight: false})
    }
  }

  _tick() {
    let position = this.state.position.slice();
    let speed = this.state.speed.slice();
    let thrust = this.state.engines ? this.state.thrust : 0;
    if (this.state.position[1] > this.state.floor){
      speed[1] = speed[1] - this.state.gravity + thrust;
    } else {
      speed[1] = 0 + thrust;
    }
    position[1] = position[1] + speed[1];
    this.setState({position: position, speed: speed});
  }

  componentDidMount() {
    window.addEventListener("keydown", this._handleKeyPress.bind(this));
    window.addEventListener("keyup", this._handleKeyUp.bind(this));
    this.setState({ship:this.refs.ship});
    this.countdown = setInterval(this._tick.bind(this), 33);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this._handleKeyPress.bind(this));
    window.removeEventListener("keyup", this._handleKeyUp.bind(this));
    clearInterval(this.countdown)
  }

  // =========================================

  render() {
    return (
      <div className="App">
        <img  id="ship" ref="ship"
              style={{  bottom:this.state.position[1],
                        transform:'rotate('+this.state.rotation+'deg)'}}
              src={require("../src/spaceship.png")}
              className={'ship'}
              alt="logo" />
      </div>
    );
  }
}

export default Game;
