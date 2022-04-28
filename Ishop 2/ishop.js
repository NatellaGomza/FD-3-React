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
    var initProductList = this.props.products.map(el =>
      React.createElement(Products, {
        key: el.code,
        code: el.code,
        name: el.name,
        price: el.price,
        photo: el.urlPhoto,
        availableAmmount: el.availableAmmount,
        cbSelected: this.selectItem,
        cbDelete: this.deleteItem,
        selectedItemCode: null,
      })
    )

    return {
      productsList: initProductList,
    }
  },

  selectItem: function (code) {
    var productListSelected = this.props.products.map(el =>
      React.createElement(Products, {
        key: el.code,
        code: el.code,
        name: el.name,
        price: el.price,
        photo: el.urlPhoto,
        availableAmmount: el.availableAmmount,
        cbSelected: this.selectItem,
        cbDelete: this.deleteItem,
        selectedItemCode: code,
      })
    );

    this.setState({
      productsList: productListSelected,
    });
  },

  deleteItem: function (code) {
    console.log(code)
    var initList = this.props.products.map(el =>
      React.createElement(Products, {
        key: el.code,
        code: el.code,
        name: el.name,
        price: el.price,
        photo: el.urlPhoto,
        availableAmmount: el.availableAmmount,
        cbSelected: this.selectItem,
        cbDelete: this.deleteItem,
        selectedItemCode: null,
      })
    )

    var deletedItem = initList.filter(el => {
      console.log(el)
      el.key == code
    })
    console.log(initList);

    this.setState({
      productsList: deletedItem,
    });
    console.log(deletedItem);
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

    var productsTable = React.DOM.tbody({}, this.state.productsList);

    return React.DOM.div({ className: 'IShop' },
      React.DOM.table({ className: 'table' }, tableCaption, tableHeader, productsTable),
    );
  },
});