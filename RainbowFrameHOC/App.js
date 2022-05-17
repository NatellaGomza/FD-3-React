﻿"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {withRainbowFrame} from './components/withRainbowFrame';
import DoubleButton from './components/DoubleButton';


let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedDoubleButton=withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
  <div className="main-block">
    <DoubleButton caption1="однажды" caption2="пору" cbPressed={ num => alert(num) }>в студёную зимнюю</DoubleButton>
    <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={ num => alert(num) }>вышел, был сильный</FramedDoubleButton>
    
  </div>,document.getElementById("container")
);