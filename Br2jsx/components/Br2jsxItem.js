﻿﻿import React from 'react';
import PropTypes from 'prop-types';

class Br2jsxItem extends React.Component {

  render() {
    var receivedArr = this.props.text.split(/\<.*?\>/);
    var result = [];
    for (var i = 0; i < receivedArr.length; i++) {
      if (i) {
        result.push(<br key = {i} />);
        result.push(receivedArr[i]);
       
      } else {
        result.push(receivedArr[i]);
      }
    }

    for (var i = 0; i < result.length; i++) {
      result[i]
    }

    return (
      <div className="result">{result}</div>
    )
  }

}

export default Br2jsxItem;