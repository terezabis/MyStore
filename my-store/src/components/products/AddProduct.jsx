import React, { Component } from 'react';
import ProductForm from '../products/ProductForm';

export default class AddProduct extends Component {
    render = () => {
        return (
            <div>
                <h3>Create new product</h3>
                <ProductForm />
            </div>
        )
    }
}