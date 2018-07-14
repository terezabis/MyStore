import React, { Component } from 'react';
import ProductForm from '../products/ProductForm';

export default class EditProduct extends Component {
    
    render = () => {
        let productId = this.props.match.params.id;

        return (
            <div>
                <h3>Edit product</h3>
                <ProductForm productId={productId} />
            </div>
        )
    }
}