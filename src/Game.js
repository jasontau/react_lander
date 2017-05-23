import React, { Component } from 'react';
import {gameSettings, gameStartState} from './gameSettings/gameSettings';
import Hud from './hud/hud';
import MainMenu from './mainmenu/mainmenu';
import Controller from './controller/controller';
import logo from './assets/logo.svg';
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
      ship: null,
      gameState: "",
      shipSrc: require("../src/assets/spaceship.png"),
      fuel: 900,

      // menu
      mainMenu: true,

      // crash states
      onPad: false,
      onSpeed: false,
      onRotation: false,
    }
  }

  // Controls ==============================
  // _handleKeyPress = (event) => {
  //   if (event.key === 'w' && this.state.engines === false){
  //     this.setState({engines: true});
  //   }
  //
  //   if (event.key === 'a') {
  //     this.setState({turnLeft: true})
  //   } else if (event.key === 'd') {
  //     this.setState({turnRight: true})
  //   }
  // }
  //
  // _handleKeyUp = (event) => {
  //   // keyup events are all independent of each other to prevent key stickiness
  //   if (event.key === 'w' && this.state.engines){
  //     this.setState({engines: false})
  //   }
  //
  //   if (event.key === 'a' && this.state.turnLeft){
  //     this.setState({turnLeft: false})
  //   }
  //
  //   if (event.key === 'd' && this.state.turnRight){
  //     this.setState({turnRight: false})
  //   }
  // }

  // _updateCrashStates(){
  //   let shipPosition = this.state.ship.getBoundingClientRect()["left"];
  //   this.setState({
  //     onPad:      shipPosition+10 > gameSettings.PAD_LOCATION
  //                 && (shipPosition+gameSettings.SHIP_SIZE-17) < gameSettings.PAD_LOCATION + gameSettings.PAD_SIZE,
  //     onSpeed:    this.state.speed[1] >= -gameSettings.MAX_LANDING_SPEED,
  //     onRotation: Math.abs(this.state.rotation) <= gameSettings.MAX_LANDING_ROTATION,
  //   });
  // }

  // =========== Game Loop function ===========
  // all operations on game pawn handled here for consistent player feedback
  // and to minimize any problems with multiple user inputs, eg. turn left and
  // right at the same time.
  _tick() {
    let position = this.state.position.slice();
    let speed = this.state.speed.slice();
    let rotation = this.state.rotation;
    let thrust = [0,0];
    let fuel = this.state.fuel;

    // this._updateCrashStates()

    // Handle rotation: -180 to 180 rotation
    if (this.state.turnRight){
      rotation = this.state.rotation + gameSettings.ROTATION_RATE;
      if (rotation > 180) {
        rotation = rotation - 360;
      }
    } else if (this.state.turnLeft){
      rotation = this.state.rotation - gameSettings.ROTATION_RATE;
      if (rotation < -180) {
        rotation = rotation + 360;
      }
    }

    // Handle fuel
    if (this.state.engines && fuel > 0) {
      fuel = fuel - 5
      thrust = this._getThrust(rotation)
    }


    // Handle position
    if (this.state.position[1] > gameSettings.LEVEL_HEIGHT * -1){
      speed[1] = speed[1] - gameSettings.GRAVITY;
    } else {
      let gameState = null;
      if (this.state.onSpeed && this.state.onPad && this.state.onRotation){
        gameState = {gameState: "You Win!"};
      } else {
        gameState = {gameState: "You Crashed!", shipSrc:require("../src/assets/Explosion.png")};
      }

      let endState = Object.assign({}, gameState, { mainMenu: true });
      this.setState(endState);
      clearInterval(this.tick);
      speed = [0,0];
    }

    speed[0] = speed[0] + thrust[0];
    speed[1] = speed[1] + thrust[1];

    position[0] = position[0] + speed[0];
    position[1] = position[1] + speed[1];

    this.setState({position: position, speed: speed, rotation: rotation, fuel: fuel});
  }

  _checkWin(){
    let shipPosition = this.state.ship.getBoundingClientRect()["left"];
    //TODO: remove hack as the ship graphic is a few pixels in from the borders
    let onPad = shipPosition+10 > gameSettings.PAD_LOCATION && (shipPosition+gameSettings.SHIP_SIZE-17) < gameSettings.PAD_LOCATION + gameSettings.PAD_SIZE;
    let didNotCrash = this.state.speed[1] <= gameSettings.MAX_LANDING_SPEED;
    return onPad && didNotCrash;
  }

  _getThrust(rotation) {
    // rotation multiplied by directional matrices
    let y_dir = [1, -1, -1]
    let x_dir = rotation >= 0 ? 1 : -1

    let x_thrust = Math.abs(rotation) > 90 ? 180 - Math.abs(rotation) : Math.abs(rotation)
    x_thrust = x_thrust / 90

    let dir_index = Math.floor(Math.abs(rotation) / 90)

    return [  gameSettings.THRUST * x_thrust * x_dir,
              gameSettings.THRUST * (1-x_thrust) * y_dir[dir_index]
            ]
  }

  _generatePad = (levelWidth, padSize) => {
    return Math.floor(Math.random() * (levelWidth - padSize))
  }

  _startGame = () => {
    let startState = Object.assign({}, {mainMenu: false, pad: this._generatePad(gameSettings.LEVEL_HEIGHT, gameSettings.PAD_SIZE)}, gameStartState);
    this.setState(startState);
    this.tick = setInterval(this._tick.bind(this), 33);
  }

  // TODO: look for alternatives to attaching to window DOM
  // componentDidMount() {
  //   window.addEventListener("keydown", this._handleKeyPress);
  //   window.addEventListener("keyup", this._handleKeyUp);
  //   this.setState({ship:this.refs.ship});
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener("keydown", this._handleKeyPress);
  //   window.removeEventListener("keyup", this._handleKeyUp);
  //   clearInterval(this.tick)
  // }

  // =========================================

  render() {
    return (
      <div className="App">

        <div className="game"
              style={{  height:gameSettings.LEVEL_HEIGHT+gameSettings.SHIP_SIZE,
                        width:gameSettings.LEVEL_WIDTH,}}>
          <img  id="ship" ref="ship"
                style={{  bottom:this.state.position[1],
                          left:this.state.position[0],
                          transform:'rotate('+this.state.rotation+'deg)',
                          height: gameSettings.SHIP_SIZE,
                        }}
                src={this.state.shipSrc}
                className={'ship'}
                alt="logo" />
          <Controller/>
          <Hud  mainMenu={this.state.mainMenu}
                hvel={this.state.speed[0]}
                vvel={this.state.speed[1]}
                rotation={this.state.rotation}
                onPad={this.state.onPad}
                onSpeed={this.state.onSpeed}
                onRotation={this.state.onRotation}
                fuel={this.state.fuel}/>
          <div className="pad" style={{ marginLeft: gameSettings.PAD_LOCATION+"px", width:gameSettings.PAD_SIZE}}/>
          <div className="game-over">{this.state.gameState}</div>
          <MainMenu start={this._startGame} mainMenu={this.state.mainMenu}/>
        </div>
        <div className="moon" style={{width:gameSettings.LEVEL_WIDTH}}></div>

      </div>
    );
  }
}

export default Game;
