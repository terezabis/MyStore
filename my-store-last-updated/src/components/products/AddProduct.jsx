import React, { Component } from 'react';
import ProductForm from '../products/ProductForm';

export default class AddProduct extends Component {
    render = () => {
        return (
            <div>
                <div className="title-page">
                    <h3>Create new product</h3>
                </div>
                <ProductForm />
            </div>
        )
    }
}