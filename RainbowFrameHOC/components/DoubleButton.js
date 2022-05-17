﻿﻿import React from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css';

class DoubleButton extends React.Component {

  static propTypes = {
    caption1:  PropTypes.string.isRequired,
    caption2:  PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired
  };

  button1Clicked = (EO) => {
    this.props.cbPressed(1);
  }

  button2Clicked = (EO) => {
    this.props.cbPressed(2);
  }


 render () {
  return (
    <div className="Double-button">
      <input type="button" value={this.props.caption1} onClick={this.button1Clicked}></input>       
       {this.props.children}
      <input type="button" value={this.props.caption2} onClick={this.button2Clicked}></input>
    </div>
  )
  }
};

export default DoubleButton;