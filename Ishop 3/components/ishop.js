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
    startWorkMode: PropTypes.string.isRequired,
  };

  state = {
    productsList: this.props.products.map((el) => {
      let item = { ...el };
    
      item.color = {
        backgroundColor: "white"
      };
      return item;
    }),
    workMode: this.props.startWorkMode,
    cbWorkMode: this.changeWorkMode,
    beginEditing: false,
    isFormValid: false,
    isValidProduct: {
      isValidName: false,
      isValidPrice: false,
      isValidUrl: false,
      isValidQuantity: false
    }
  }

  selectItem = (code) => {
    let selectedItemList = this.state.productsList.map(function (el) {
      let item = { ...el };
      el.selectedItemCode = code;

      return item;
    });

    if (this.state.workMode === 'init') {
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

  changeWorkMode = (code, event) => {
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
      return item;
    });

    if (event === 'button') {
      this.setState({ productsList: editedItemList, workMode: 'edit' });
    } else {
      this.setState({ productsList: editedItemList, workMode: 'card' });
    }
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

    this.setState({ productsList: itemEditedName, workMode: 'init' });
  }

  beginEditing = (event) => {
    event === 'submit' ? this.setState({ beginEditing: false }) : this.setState({ beginEditing: true });
    if (event === 'Cancel') {
      this.setState({ beginEditing: false, workMode: 'init' });
    }
  }

  openFormForNewProduct = () => {
    let selectedItem = this.state.productsList.map(function (el) {
      let item = { ...el };
        item.color = {
          backgroundColor: "white",
        }

      return item;
    });

    this.setState({ productsList: selectedItem, workMode: 'new', beginEditing: true });
  }

  addNewProduct = (event) => {
    event.preventDefault();


    let name = event.target.name.value;
    let price = +event.target.price.value;
    let url = event.target.url.value;
    let quantity = +event.target.quantity.value;

    let product = Object.assign({}, this.state.productsList[0]);
    product.code = this.state.productsList.length + 1;
    product.name = name;
    product.price = price;
    product.urlPhoto = url;
    product.availableAmmount = quantity;

    this.setState({
      productList: this.state.productsList.push(product), workMode: 'init', beginEditing: false, isFormValid: false,
      isValidProduct: {
        isValidName: false,
        isValidPrice: false,
        isValidUrl: false,
        isValidQuantity: false
      }
    });
  }

  cancelChanges = () => {
    this.setState({ workMode: 'init', beginEditing: false })
  }

  isValidForm = () => {
    if (!this.state.isValidProduct.isValidName || !this.state.isValidProduct.isValidUrl || !this.state.isValidProduct.isValidPrice || !this.state.isValidProduct.isValidQuantity) {
      this.setState({ isFormValid: false })
    } else {
      this.setState({ isFormValid: true })
    }
  }

  itemNameChanged = (event) => {
    console.log(event.target.value)
    if (event.target.name === "name" && !event.target.value) {
      this.state.isValidProduct.isValidName = false;
    } else {
      this.state.isValidProduct.isValidName = true;
    }

    this.isValidForm();
  }

  itemUrlChahged = (event) => {
    if (event.target.name === "url" && !event.target.value) {
      this.state.isValidProduct.isValidUrl = false;
    } else {
      this.state.isValidProduct.isValidUrl = true;
    }

    this.isValidForm();
  }

  itemPriceChanged = (event) => {
    if (event.target.name === "price" && !parseInt(event.target.value) || parseInt(event.target.value) <= 0) {
      this.state.isValidProduct.isValidPrice = false;
    } else {
      this.state.isValidProduct.isValidPrice = true;
    }

    this.isValidForm();
  }

  itemQuantityChanged = (event) => {
    if (event.target.name === "quantity" && !parseInt(event.target.value) || parseInt(event.target.value) <= 0) {
      this.state.isValidProduct.isValidQuantity = false;
    } else {
      this.state.isValidProduct.isValidQuantity = true;
    }

    this.isValidForm();
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
        cbBeginEditing={this.beginEditing}
        beginEditing={this.state.beginEditing}
      />
    );

    var initProduct;

    if (this.state.workMode === 'edit') {
      initProduct = this.state.productsList.map((el) => {
        if (el.itemToBeChanged === el.code) {
          return <ProductCard key={el.code}
            code={el.code}
            name={el.name}
            price={el.price}
            photo={el.urlPhoto}
            availableAmmount={el.availableAmmount}
            workMode={this.state.workMode}
            cbWorkMode={this.changeWorkMode}
            cbRefreshInfo={this.refreshInfo}
            cbBeginEditing={this.beginEditing}
            beginEditing={this.state.beginEditing}
          />
        }
      })
    } else if (this.state.workMode === 'card') {
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
        <div>  <input type="button" value="New Product" onClick={this.openFormForNewProduct} disabled={this.state.beginEditing === true} ></input> </div>
        <div className='productCard'>{initProduct}</div>
        {
          (this.state.workMode === "new") &&
          <div className='editBlock'>
            <span> Add New Product</span>
            <form method="post" id="form" onSubmit={this.addNewProduct}>
              <div>
                <span> Name </span>
                <input type="text" name="name" onChange={this.itemNameChanged} />
                {(!this.state.isValidProduct.isValidName) &&
                  <span> Please, fill the field </span>}
              </div>
              <div>
                <span> Price </span>
                <input type="text" name="price" onChange={this.itemPriceChanged} />
                {(!this.state.isValidProduct.isValidPrice) &&
                  <span> Please, fill the field. Field should be a number </span>}
              </div>
              <div>
                <span> URL </span>
                <input type="url" name="url" onChange={this.itemUrlChahged} />
                {(!this.state.isValidProduct.isValidUrl) &&
                  <span> Please, fill the field </span>}
              </div>
              <div>
                <span> Quantity </span>
                <input type="text" name="quantity" onChange={this.itemQuantityChanged} />
                {(!this.state.isValidProduct.isValidQuantity) &&
                  <span> Please, fill the field. Field should be a number </span>}
              </div>
              <input type="submit" value="Add" disabled={this.state.isFormValid === false} />
              <input type="button" value="Cancel" onClick={this.cancelChanges} />
            </form>
          </div>
        }
      </div>
    );
  }
};

export default IShop;