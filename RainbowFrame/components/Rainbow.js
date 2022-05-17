﻿import React from 'react';
import PropTypes from 'prop-types';

import RainbowFrame from './RainbowFrame';

class Rainbow extends React.Component {
  render() {
    let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
    return (
      <RainbowFrame colors={colors}>
        Hello!
      </RainbowFrame>
    );
  }
}

export default Rainbow;