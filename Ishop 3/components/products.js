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
    selectedItemCode: PropTypes.number,
    color: PropTypes.object.isRequired,
    workMode: PropTypes.number.isRequired,
    cbWorkMode: PropTypes.func,
    cbBeginEditing: PropTypes.func,
    beginEditing: PropTypes.bool.isRequired
  };

  productChoosen = (event) => {
    console.log(event.target.name)
    if (this.props.beginEditing === false) {
      if (event.target.name !== "button") {
        this.props.cbSelected(this.props.code);
      }
      this.changeWorkMode(event);
    }
  }

  productForDelete = () => {
    this.props.cbDelete(this.props.code);
  }

  changeWorkMode = (event) => {
    this.props.cbWorkMode(this.props.code, event.target.name);
  }

  render() {
    return (
      <tr className="productsTable" onClick={this.productChoosen} style={this.props.color}>
        <td className="name">{this.props.name}</td>
        <td className="price">{this.props.price}</td>
        <td className="photo">
          <img src={this.props.photo} />
        </td>
        <td className="availableAmmount">{this.props.availableAmmount}</td>
        <td className="button">
          <input type="button" name="button" value="Edit" disabled={this.props.beginEditing === true} onClick={this.changeWorkMode}></input>
          <input type="button" name="button" value="Delete" disabled={this.props.beginEditing === true} onClick={this.productForDelete}></input>
        </td>
      </tr>
    );
  }
};

export default Products;