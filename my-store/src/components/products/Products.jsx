import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Product from './Product';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [] }
    }

    //get all products from database
    getProducts = () =>
        requester.get('appdata', 'products', 'kinvey')
            .then(res => {
                this.setState({ products: res })
            });

    // load data
    componentDidMount = () => {
        this.getProducts();
        this.forceUpdate();
    } 

    render = () => {
        return (
            <section id="viewProducts">
                <div className="title-page">
                    <h3>All products</h3>
                </div>
                {this.state.products.map((p, i) => <Product key={p._id} index={i} {...p} />)}
            </section>
        )
    }
}