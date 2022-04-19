
var IShop = React.createClass({

  displayName: 'IShop',

  propTypes: {
    header: React.PropTypes.string.isRequired,
    products: React.PropTypes.array.isRequired,
  },

  render: function () {

    var tableCaption = React.DOM.caption({ className: 'header' }, this.props.header);

    var heading = React.DOM.tr({ className: 'tableHeader' },
      React.DOM.td({}, 'Name of product'),
      React.DOM.td({}, 'Price, y.e'),
      React.DOM.td({}, 'Photo'),
      React.DOM.td({}, 'Available ammount'),
    );

    var tableHeader = React.DOM.thead({}, heading);

    var productsCode = this.props.products.map(el =>
      React.DOM.tr({ key: el.code, className: 'productsTable' },
        React.DOM.td({ className: 'name' }, el.name),
        React.DOM.td({ className: 'price' }, el.price),
        React.DOM.td({ className: 'photo' }, React.DOM.img({ src: el.urlPhoto })),
        React.DOM.td({ className: 'availableAmmount' }, el.availableAmmount),
      )
    );  

    var productsTable = React.DOM.tbody({}, productsCode);

    return React.DOM.div({ className: 'IShop' },
      React.DOM.table({ className: 'table' }, tableCaption, tableHeader, productsTable),
    );
  },
});