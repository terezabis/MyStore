import React, { Component } from 'react';
import CreateProductForm from '../products/ProductForm';

export default class EditProduct extends Component {
    render = () => {
        let productId = this.props.match.params.id;

        return (
            <div>
                <h3>Edit product</h3>
                <CreateProductForm productId={productId}/>
            </div>
        )
    }
}