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
        return (
            <section id="viewProducts">
                <h3>All products</h3>
                {this.state.products.map((p, i) => <Product key={p._id} index={i} {...p} />)}
            </section>
        )
    }
}