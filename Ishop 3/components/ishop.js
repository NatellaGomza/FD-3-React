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
      item.selectedItemCode = this.selectItem;
      item.color = {
        backgroundColor:"white"
      };
      return item;
    }),
    
  }

  selectItem = (code) => {

    let selectedItemList = this.state.productsList.map(function (el) {
      let item = [];
      el.selectedItemCode = code;
      item.push(el);

      return item;
    });

    return this.setState({ productsList: selectedItemList }), this.changeColor(code);
  }

  changeColor = (code) =>{
    let selectedItem = this.state.productsList.map(function (el) {
      let item = { ...el };
    
      if (item.selectedItemCode === item.code) {
        item.color = {
          backgroundColor:"red",
        }
      } else {
        item.color = {
          backgroundColor:"white",
        }
      }

      return item;
    });

    console.log(selectedItem );

    this.setState({productsList: selectedItem })
  }

  deleteItem = (code) => {
    var question = confirm('Are you sure?');
    if (question) {
      var itemList = [];
      var initList = this.state.productsList.map(el => {
        if (code == el.code) {
          return { ...el };
        }
console.log(code);
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
        cbSelected={this.selectItem}
        cbDelete={this.deleteItem}
        selectedItemCode={el.selectedItemCode}
        color={el.color}
      />
    );

    return (
      <div className='IShop'>
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