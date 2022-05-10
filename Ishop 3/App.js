import React from 'react';
import ReactDOM from 'react-dom';

import IShop from './components/ishop';

let headerText = 'Вас приветствует интернет-магазин IShop';
let productsArr = require('./products.json')

ReactDOM.render(
  <IShop
  header={headerText}
  products={productsArr}
  />
  ,  document.getElementById('container')
);