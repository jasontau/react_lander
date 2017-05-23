export const gameSettings = {
    ROTATION_RATE: 5,
    THRUST: 0.3,
    GRAVITY: 0.05,

    // Win Conditions
    MAX_LANDING_SPEED:5,
    MAX_LANDING_ROTATION: 20,

    // Level Settings
    LEVEL_HEIGHT: 600,
    LEVEL_WIDTH: 900,
    PAD_SIZE: 100,
    PAD_LOCATION: 100,
    SHIP_SIZE: 64,
}

export const gameStartState = {
  position: [0, 0], //x,y
  speed: [0, 0],

  engines: false,
  turnLeft: false,
  turnRight: false,
  rotation: 0,
  shipSize: 64,
  gameState: "",
  shipSrc: require("../assets/spaceship.png"),
  fuel: 900,
}
