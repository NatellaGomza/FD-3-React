import React from 'react';
import PropTypes from 'prop-types';

import './ishop.css';

class Products extends React.Component {

  static propTypes = {
    code: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    availableAmmount: PropTypes.number.isRequired,
    cbSelected: PropTypes.func,
    cbDelete: PropTypes.func,
    selectedItemCode: PropTypes.func,
  };

  productChoosen = (event) => {
    if (event.target.value !== 'Delete') {
      console.log(this.props.code);
      this.props.cbSelected(this.props.code);
    }
  }

  productForDelete = () => {
    this.props.cbDelete(this.props.code);
  }

  render() {
    return (
      <tr className="productsTable" onClick={this.productChoosen} backgroundcolor={this.props.selectedItemCode === this.props.code ? 'red' : 'white'}>
        <td className="name">{this.props.name}</td>
        <td className="price">{this.props.price}</td>
        <td className="photo">
         <img src = {this.props.photo}/>
         </td>
        <td className="availableAmmount">{this.props.availableAmmount}</td>
        <td className="button">
          <input type="button" value="Delete" onClick={this.productForDelete}></input></td>
      </tr>
    );
  }
};

export default Products;