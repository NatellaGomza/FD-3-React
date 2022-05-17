﻿import React from 'react';
import PropTypes from 'prop-types';

import './Br2jsx.css';

import Br2jsxItem from './Br2jsxItem';

class Br2jsx extends React.Component {
    render() {
      let text="первый<br>второй<br/>третий<br />последний";
      return <Br2jsxItem text={text} />;
  }
}

export default Br2jsx;