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
        workMode: PropTypes.number.isRequired,
        cbRefreshInfo: PropTypes.func,
    };

    refreshInfo = (event) => {
        event.preventDefault();

        let name = event.target.name.value;
        let price = +event.target.price.value;
        let url = event.target.url.value;
        let quantity = +event.target.quantity.value;

        this.props.cbRefreshInfo(name, price, url, quantity, this.props.code)

    }

    render() {
        if (this.props.workMode === 2) {
            return (
                <div className='editBlock'>
                    <span> Edit Existing Product</span>
                    <form method="post" id="form" onSubmit={this.refreshInfo}>
                        <div>
                            <span> Name </span>
                            <input type="text" name="name" defaultValue={this.props.name} onChange={this.itemChanged} />
                        </div>
                        <div>
                            <span> Price </span>
                            <input type="text" name="price" defaultValue={this.props.price} />
                        </div>
                        <div>
                            <span> URL </span>
                            <input type="text" name="url" defaultValue={this.props.photo} />
                        </div>
                        <div>
                            <span> Quantity </span>
                            <input type="text" name="quantity" defaultValue={this.props.availableAmmount} />
                        </div>
                        <input type="submit" value="Save" />
                        <input type="button" value="Cancel" />
                    </form>
                </div>
            );
        } else {
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