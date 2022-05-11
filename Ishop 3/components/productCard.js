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
    };

    render() {
        if (this.props.workMode === 2) {
            return (
                <div className='editBlock'>
                    <span> Edit Existing Product</span>
                    <form method="post" id="form">
                        <div>
                            <span> Name </span>
                            <input type="text" defaultValue={this.props.name} />
                        </div>
                        <div>
                            <span> Price </span>
                            <input type="text" defaultValue={this.props.price} />
                        </div>
                        <div>
                            <span> URL </span>
                            <input type="text" defaultValue={this.props.photo} />
                        </div>
                        <div>
                            <span> Quantity </span>
                            <input type="text" defaultValue={this.props.availableAmmount} />
                        </div>
                        <input type="submit" id="submit" value="Save" />
                        <input type="submit" id="submit" value="Cancel" />
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