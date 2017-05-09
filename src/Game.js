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

      engines: false,
      turnLeft: false,
      turnRight: false,
      rotation: 0,

      // level
      floor: 600,
      width: 900,

      // game settings
      rotationRate: 5,
      thrust: 0.3,
      gravity: 0.05,
    }
  }

  // Controls ==============================
  _handleKeyPress(event) {
    if (event.key === 'w' && this.state.engines === false){
      this.setState({engines: true});
    }

    if (event.key === 'a') {
      this.setState({turnLeft: true})
    } else if (event.key === 'd') {
      this.setState({turnRight: true})
    }
  }

  _handleKeyUp(event) {
    // keyup events are all independent of each other to prevent key stickiness
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

  // ******** Game Loop function ********
  // all operations on game pawn handled here for consistent player feedback
  // and to minimize any problems with multiple user inputs, eg. turn left and
  // right at the same time.
  _tick() {
    let position = this.state.position.slice();
    let speed = this.state.speed.slice();
    let rotation = this.state.rotation
    let thrust = this.state.engines ? this._getThrust(rotation) : [0,0];

    // -180 to 180 rotation
    if (this.state.turnRight){
      rotation = this.state.rotation + this.state.rotationRate;
      if (rotation > 180) {
        rotation = rotation - 360;
      }
    } else if (this.state.turnLeft){
      rotation = this.state.rotation - this.state.rotationRate;
      if (rotation < -180) {
        rotation = rotation + 360;
      }
    }

    if (this.state.position[1] > this.state.floor * -1){
      speed[1] = speed[1] - this.state.gravity;
    } else {
      speed = [0,0];
    }

    speed[0] = speed[0] + thrust[0];
    speed[1] = speed[1] + thrust[1];

    position[0] = position[0] + speed[0];
    position[1] = position[1] + speed[1];

    this.setState({position: position, speed: speed, rotation: rotation});
  }

  _getThrust(rotation) {
    let y_dir = [1, -1, -1]
    let x_dir = rotation >= 0 ? 1 : -1

    let x_thrust = Math.abs(rotation) > 90 ? 180 - Math.abs(rotation) : Math.abs(rotation)
    x_thrust = x_thrust / 90

    let dir_index = Math.floor(Math.abs(rotation) / 90)

    return [  this.state.thrust * x_thrust * x_dir,
              this.state.thrust * (1-x_thrust) * y_dir[dir_index]
            ]
  }

  componentDidMount() {
    window.addEventListener("keydown", this._handleKeyPress.bind(this));
    window.addEventListener("keyup", this._handleKeyUp.bind(this));
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
        <div className="game"
              style={{  height:this.state.floor+64, // TODO: remove hack for ship height
                        width:this.state.width,
        }}>
          <img  id="ship"
                style={{  bottom:this.state.position[1],
                          left:this.state.position[0],
                          transform:'rotate('+this.state.rotation+'deg)'}}
                src={require("../src/spaceship.png")}
                className={'ship'}
                alt="logo" />
        </div>
      </div>
    );
  }
}

export default Game;
