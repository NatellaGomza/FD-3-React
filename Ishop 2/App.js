"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IShop from './components/ishop';

var headerText = 'Вас приветствует интернет-магазин IShop';
var productsArr = [

  { name: 'Iphone', code: 0, price: 1000, urlPhoto: 'https://m.media-amazon.com/images/I/71gm8v4uPBL._SX522_.jpg', availableAmmount: 10 },
  { name: 'IPad', code: 1, price: 2000, urlPhoto: 'https://avatars.mds.yandex.net/get-mpic/5252617/img_id4236874559679475681.jpeg/orig', availableAmmount: 7 },
  { name: 'Macbook', code: 2, price: 3000, urlPhoto: 'https://www.apple.com/v/macbook-pro-14-and-16/a/images/meta/macbook-pro-14-and-16_overview__fz0lron5xyuu_og.png?202111170916', availableAmmount: 5 }
];

ReactDOM.render(
  React.createElement(IShop, { header: headerText, products: productsArr }),
  document.getElementById('container')
);