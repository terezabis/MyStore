import React, { Component } from 'react';
import ProductForm from '../products/ProductForm';

export default class EditProduct extends Component {

    render = () => {
        let productId = this.props.match.params.id;

        return (
            <div>
                <div className="title-page">
                    <h3>Edit product</h3>
                </div>
                <button className="action btn-back" onClick={this.props.history.goBack}>Back</button>
                <ProductForm productId={productId} />
            </div>
        )
    }
}