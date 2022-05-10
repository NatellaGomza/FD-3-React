import React from 'react';
import PropTypes from 'prop-types';

class Products extends React.Component {

  static propTypes = {
    code: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    availableAmmount: PropTypes.number.isRequired,
    cbSelected: PropTypes.func.isRequired,
    cbDelete: PropTypes.func.isRequired,
    selectedItemCode: PropTypes.number,
  };

  productChoosen = (event) => {
    if (event.target.value !== 'Delete') {
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