import React, { Component } from 'react';

export default class Hud extends Component {
  render() {
    return(
      <div className="hud">
        <div>Hor. Vel:{parseFloat(this.props.hvel).toFixed(1)}</div>
        <div>Ver. Vel:{parseFloat(this.props.vvel).toFixed(1)}</div>
        <div>Fuel:</div>
      </div>
    )
  }
}
