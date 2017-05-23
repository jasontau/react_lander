import React, { Component } from 'react';
import {gameSettings} from '../gameSettings/gameSettings';

// TODO:
//

const controls = [
  ['w','engines'],
  ['a','turnLeft'],
  ['d','turnRight'],
]

export default class Controller extends Component {
  constructor() {
    super();

    this.state = {
      position: [0, 0], //x,y
      speed: [0, 0],

      engines: false,
      turnLeft: false,
      turnRight: false,
      rotation: 0,
      ship: null,
      shipSrc: require("../assets/spaceship.png"),
      fuel: 900,
    }
  }

  _updateCrashStates(){
    let shipPosition = this.state.ship.getBoundingClientRect()["left"];
    this.setState({
      onPad:      shipPosition+10 > gameSettings.PAD_LOCATION
                  && (shipPosition+gameSettings.SHIP_SIZE-17) < gameSettings.PAD_LOCATION + gameSettings.PAD_SIZE,
      onSpeed:    this.state.speed[1] >= -gameSettings.MAX_LANDING_SPEED,
      onRotation: Math.abs(this.state.rotation) <= gameSettings.MAX_LANDING_ROTATION,
    });
  }

  componentDidMount() {
    window.addEventListener("keydown", this._handleKeyPress);
    window.addEventListener("keyup", this._handleKeyUp);
    this.setState({ship:this.refs.ship});
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this._handleKeyPress);
    window.removeEventListener("keyup", this._handleKeyUp);
    clearInterval(this.tick)
  }

  // Controls ==============================
  _handleKeyPress = (event) => {
    for (let [button, state] of controls){
      if (event.key === button) {
        let a = {};
        a[state] = true;
        this.setState(a);
      }
    }
  }

  _handleKeyUp = (event) => {
    for (let [button, state] of controls){
      if (event.key === button) {
        let a = {};
        a[state] = false;
        this.setState(a);
      }
    }
  }

  render() {
    const {position, rotation, shipSize, shipSrc} = this.state;

    return (
      <img  id="ship" ref="ship"
            style={{  bottom:position[1],
                      left:position[0],
                      transform:'rotate('+rotation+'deg)',
                      height: shipSize,
                    }}
            src={shipSrc}
            className={'ship'}
            alt="logo" />
    )
  }
}
