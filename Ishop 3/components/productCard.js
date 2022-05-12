import React from 'react';
import PropTypes from 'prop-types';

import './productCard.css';

class ProductCard extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        photo: PropTypes.string.isRequired,
        availableAmmount: PropTypes.number.isRequired,
        workMode: PropTypes.string.isRequired,
        cbWorkMode: PropTypes.func,
        cbRefreshInfo: PropTypes.func,
        cbBeginEditing: PropTypes.func,
        beginEditing: PropTypes.bool,
    };

    state = {
        isFormValid: true,
        isValidProduct: {
            isValidName: true,
            isValidPrice: true,
            isValidUrl: true,
            isValidQuantity: true
        }
    }

    refreshInfo = (event) => {
        event.preventDefault();        

        let name = event.target.name.value;
        let price = +event.target.price.value;
        let url = event.target.url.value;
        let quantity = +event.target.quantity.value;

        this.props.cbRefreshInfo(name, price, url, quantity, this.props.code);
        this.props.cbBeginEditing(event.type);
    }

    cancelChanges =(event) => {
        console.log(event.target.value);
        this.props.cbBeginEditing(event.target.value);
    }

    isValidForm = () => {
        if (!this.state.isValidProduct.isValidName || !this.state.isValidProduct.isValidUrl || !this.state.isValidProduct.isValidPrice || !this.state.isValidProduct.isValidQuantity) {
            this.setState({ isFormValid: false })
        } else {
            this.setState({ isFormValid: true })
        }

        this.props.cbBeginEditing();
    }

    itemNameChanged = (event) => {
        if (event.target.name === "name" && !event.target.value) {
            this.state.isValidProduct.isValidName = false;
        } else {
            this.state.isValidProduct.isValidName = true;
        }
        console.log(this.props.beginEditing)
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
        if (this.props.workMode === 'edit') {
            return (
                <div className='editBlock'>
                    <span> Edit Existing Product</span>
                    <form method="post" id="form" onSubmit={this.refreshInfo}>
                        <div>
                            <span> Name </span>
                            <input type="text" name="name" defaultValue={this.props.name} onChange={this.itemNameChanged} />
                            {(!this.state.isValidProduct.isValidName) && <span> Please, fill the field </span>}
                        </div>
                        <div>
                            <span> Price </span>
                            <input type="text" name="price" defaultValue={this.props.price} onChange={this.itemPriceChanged} />
                            {(!this.state.isValidProduct.isValidPrice) && <span> Please, fill the field. Field should be a number </span>}
                        </div>
                        <div>
                            <span> URL </span>
                            <input type="text" name="url" defaultValue={this.props.photo} onChange={this.itemUrlChahged} />
                            {(!this.state.isValidProduct.isValidUrl) && <span> Please, fill the field </span>}
                        </div>
                        <div>
                            <span> Quantity </span>
                            <input type="text" name="quantity" defaultValue={this.props.availableAmmount} onChange={this.itemQuantityChanged} />
                            {(!this.state.isValidProduct.isValidQuantity) && <span> Please, fill the field. Field should be a number </span>}
                        </div>
                        <input type="submit" value="Save" disabled={this.state.isFormValid === false} />
                        <input type="button" value="Cancel" onClick={this.cancelChanges}/>
                    </form>
                </div>
            );
        } else if (this.props.workMode === 'card') {
            return (
                <div className='productCard'>
                    <div className='productInfo'>
                        <div> {this.props.name} </div>
                        <div> {this.props.price} </div>
                        <div> {this.props.availableAmmount} </div>
                    </div>
                    <div> <img src={this.props.photo} /> </div>
                </div>
            );
        }
    }
};

export default ProductCard;