﻿import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };
  
  render() {
    let result;
    let divItem;
    for (var i = 0; i <this.props.colors.length; i++ ) {
      if (i === 0) {
        divItem = this.props.children;
      }
      result = <div style={{border:"solid 5px "+this.props.colors[i],padding:"5px", textAlign: "center"}}>
        {divItem}
      </div>
      divItem = result;
    }

    return (    
      result
    );
  }

}

export default RainbowFrame;