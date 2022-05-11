import React from 'react';
import PropTypes from 'prop-types';

import './ishop.css';

import Products from './products';
import ProductCard from './productCard';

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
    startWorkMode: PropTypes.number.isRequired,
  };

  state = {
    productsList: this.props.products.map((el) => {
      let item = { ...el };
      item.cbSelected = this.selectItem;
      item.cbDelete = this.deleteItem;
      item.selectedItemCode = null;
      item.itemToBeChanged = null;
      item.color = {
        backgroundColor: "white"
      };
      return item;
    }),
    workMode: this.props.startWorkMode,
    cbWorkMode: this.changeWorkMode,
  }

  selectItem = (code) => {
    let selectedItemList = this.state.productsList.map(function (el) {
      let item = { ...el };
      el.selectedItemCode = code;

      return item;
    });

    if (this.state.workMode === 1) {
      return this.setState({ productsList: selectedItemList }), this.changeColor(code);
    } else {
      return this.setState({ productsList: selectedItemList })
    }
  }

  changeColor = () => {
    let selectedItem = this.state.productsList.map(function (el) {
      let item = { ...el };

      if (item.selectedItemCode === item.code) {
        item.color = {
          backgroundColor: "red",
        }
      } else {
        item.color = {
          backgroundColor: "white",
        }
      }

      return item;
    });

    this.setState({ productsList: selectedItem })
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

  changeWorkMode = (code) => {
    let editedItemList = this.state.productsList.map(function (el) {
      let item = { ...el };
      item.itemToBeChanged = code;
      if (item.itemToBeChanged === item.code) {
        item.color = {
          backgroundColor: "red",
        }
      } else {
        item.color = {
          backgroundColor: "white",
        }
      }
      console.log(code);
      return item;
    });
    console.log(editedItemList);
    this.setState({ productsList: editedItemList, workMode: 2 });
  }

  refreshInfo = (name, price, url, quantity, code) => {
    let itemEditedName = this.state.productsList.map(function (el) {
      let item = { ...el };
      if (item.code === code) {
        item.name = name;
        item.price = price;
        item.photo = url;
        item.availableAmmount = quantity;
      }

      return item;
    })
    this.setState({ productsList: itemEditedName,  workMode: 1 })
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
        workMode={this.state.workMode}
        cbWorkMode={this.changeWorkMode}
      />
    );

    var initProduct;

    if (this.state.workMode === 2) {
      initProduct = this.state.productsList.map((el) => {
        if (el.itemToBeChanged === el.code) {
          return <ProductCard key={el.code}
            code={el.code}
            name={el.name}
            price={el.price}
            photo={el.urlPhoto}
            availableAmmount={el.availableAmmount}
            workMode={this.state.workMode}
            cbRefreshInfo={this.refreshInfo}
          />
        }
      })
    } else {
      initProduct = this.state.productsList.map((el) => {
        if (el.selectedItemCode === el.code) {
          return <ProductCard key={el.code}
            code={el.code}
            name={el.name}
            price={el.price}
            photo={el.urlPhoto}
            availableAmmount={el.availableAmmount}
            workMode={this.state.workMode}
          />
        }
      });
    }

    return (
      <div className='page'>
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
        <div>  <input type="button" value="New Product" disabled={this.state.workMode === 2} ></input> </div>
        <div className='productCard'>{initProduct}</div>
      </div>
    );
  }
};

export default IShop;