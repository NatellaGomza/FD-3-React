import React from 'react';
import PropTypes from 'prop-types';

var Products = React.createClass({

  displayName: 'Products',

  propTypes: {
    code: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    availableAmmount: PropTypes.number.isRequired,
    cbSelected: PropTypes.func.isRequired,
    cbDelete: PropTypes.func.isRequired,
    selectedItemCode: PropTypes.number,
  },

  productChoosen: function (event) {
    if (event.target.value !== 'Delete') {
      console.log(1);
    this.props.cbSelected(this.props.code);
    }
  },

  productForDelete: function (event) {
    console.log(this.props.code);
    this.props.cbDelete(this.props.code);
    
  },

  render: function () {
    return React.DOM.tr({ className: 'productsTable', onClick: this.productChoosen,  style:{backgroundColor:(this.props.selectedItemCode===this.props.code)?'red':'white' }},
      React.DOM.td({ className: 'name' }, this.props.name),
      React.DOM.td({ className: 'price' }, this.props.price),
      React.DOM.td({ className: 'photo' }, React.DOM.img({ src: this.props.photo })),
      React.DOM.td({ className: 'availableAmmount' }, this.props.availableAmmount),
      React.DOM.td({ className: 'button' },
        React.DOM.input({ type: 'button', value: 'Delete', onClick: this.productForDelete })
      ),
    );
  },
});

export default Products;