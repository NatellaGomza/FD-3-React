import React from 'react';

import './ishop.css';
import Products from './products';

var IShop = React.createClass({

  displayName: 'IShop',

  propTypes: {
    header: React.PropTypes.string.isRequired,
    products: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        code: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        urlPhoto: React.PropTypes.string.isRequired,
        availableAmmount: React.PropTypes.number.isRequired,
      })
    ),
  },

  getInitialState: function () {
    var initProductList = this.props.products.map((el) => {
      let item = {...el};
      item.cbSelected = this.selectItem;
      console.log(code);
      item.cbDelete = this.deleteItem;
      item.selectedItemCode = null;

      return item;
    });

    return {
      productsList: initProductList,
    }
  },

  selectItem: function (code) {
    var selectedItemList = this.state.productsList.map(function (el) {
      let item = {...el};
      item.selectedItemCode = code;

      return item;
    });

    this.setState({ productsList: selectedItemList });
  },

  deleteItem: function (code) {
    var question = confirm('Are you sure?');
    if (question) {
      var itemList = [];
      var initList = this.state.productsList.map(el => {
        if (code == el.code) {
          return { ...el };
        }

        return itemList.push(el);
      })
      this.setState({ productsList: itemList });
    }
  },

  render: function () {

    var tableCaption = React.DOM.caption({ className: 'header' }, this.props.header);

    var heading = React.DOM.tr({ className: 'tableHeader' },
      React.DOM.td({}, 'Name of product'),
      React.DOM.td({}, 'Price, y.e'),
      React.DOM.td({}, 'Photo'),
      React.DOM.td({}, 'Quantity'),
      React.DOM.td({}, 'Control'),
    );

    var tableHeader = React.DOM.thead({}, heading);

    var initProductList = this.state.productsList.map(el =>
      React.createElement(Products, {
        key: el.code,
        code: el.code,
        name: el.name,
        price: el.price,
        photo: el.urlPhoto,
        availableAmmount: el.availableAmmount,
        cbSelected: el.cbSelected,
        cbDelete: el.cbDelete,
        selectedItemCode: el.selectedItemCode,
      })
    )

    var productsTable = React.DOM.tbody({}, initProductList);

    return React.DOM.div({ className: 'IShop' },
      React.DOM.table({ className: 'table' }, tableCaption, tableHeader, productsTable),
    );
  },
});

export default IShop;