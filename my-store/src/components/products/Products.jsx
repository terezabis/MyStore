import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Product from './Product';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [] }
    }

    getProducts = () =>
        requester.get('appdata', 'products', 'kinvey')
            .then(res => {
               this.setState({ products: res })
            });

    componentDidMount = () => this.getProducts();

    render = () => {
        console.log(this.state);
        return (
            <section id="viewProducts">
                {this.state.products.map((p, i) => <Product key={p._id} index={i} {...p} />)}
            </section>
        )
    }
}