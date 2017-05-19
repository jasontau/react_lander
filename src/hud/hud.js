import React, { Component } from 'react';

export default class Hud extends Component {
  _getStatusStyle(bool){
    return bool ? "status-good" : "status-bad"
  }

  render() {
    return(
      <div className="hud" style={{visibility: this.props.mainMenu ? "hidden" : "visible"}}>
        <div>Hor. Vel:{parseFloat(this.props.hvel).toFixed(1)}</div>
        <div>Ver. Vel:{parseFloat(this.props.vvel).toFixed(1)}</div>
        <div>Rotation:{parseFloat(this.props.rotation).toFixed(1)}</div>
        <div>Fuel:{parseFloat(this.props.fuel).toFixed(0)}</div>
        <div>
          <span className="">Status:   </span>
          <span className={this._getStatusStyle(this.props.onSpeed)}>Speed   </span>
          <span className={this._getStatusStyle(this.props.onRotation)}>Rotation   </span>
          <span className={this._getStatusStyle(this.props.onPad)}>Target   </span>
        </div>
      </div>
    )
  }
}
