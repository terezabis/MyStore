import React, { Component } from 'react';
import CreateProductForm from '../products/ProductForm';

export default class AddProduct extends Component {
    render = () => {
        return (
            <div>
                <h3>Create new product</h3>
                <CreateProductForm />
            </div>
        )
    }
}