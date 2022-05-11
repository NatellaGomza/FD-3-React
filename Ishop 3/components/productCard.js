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
        // if (this.props.workMode === 2) {
        //     console.log('ok')
        // } else {
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
    //}
};

export default ProductCard;