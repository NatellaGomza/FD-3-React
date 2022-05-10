import React from 'react';
import PropTypes from 'prop-types';

import './ishop.css';

import Products from './products';

class IShop extends React.Component {

  static propTypes = {
    header: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        urlPhoto: PropTypes.string.isRequired,
        availableAmmount: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    productsList: this.props.products.map((el) => {
      let item = { ...el };
      item.cbSelected = this.selectItem;
      item.cbDelete = this.deleteItem;
      item.selectedItemCode = null;
console.log(this.props.products);
      return item;
    }),
  }

  selectItem = (code) => {
    var selectedItemList = this.state.productsList.map(function (el) {
      let item = { ...el };
      item.selectedItemCode = code;

      return item;
    });

    this.setState({ productsList: selectedItemList });
  }

  deleteItem = (code) => {
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
  }

  render() {

    var initProductList = this.state.productsList.map(el =>
      <Products key={el.code}
        code={el.code}
        name={el.name}
        price={el.price}
        photo={el.urlPhoto}
        availableAmmount={el.availableAmmount}
        cbSelected={el.cbSelected}
        cbDelete={el.cbDelete}
        selectedItemCode={el.selectedItemCode}
      />
    );

    return (
      <div className='Ishop'>
        <table className='table'>
          <caption className='header'>{this.props.header}</caption>
          <thead>
            <tr className='tableHeader'>
              <td>Name of product</td>
              <td>Price, y.e</td>
              <td>Photo</td>
              <td>Quantity</td>
              <td>Control</td>
            </tr>
          </thead>
          <tbody>{initProductList}</tbody>
        </table>
      </div>
    );
  }
};

export default IShop;