import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Product from './Product';

export default class ProductsByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            name: '',
            products: []
        }
    }

    componentDidMount = () => {
        let categoryId = this.props.match.params.id;
        requester.get('appdata', 'categories/' + categoryId, 'kinvey')
            .then(res => {
                this.setState({
                    _id: res._id,
                    name: res.name,
                })
            })
            .catch(console.log());
        requester.get('appdata', 'products?query={"category_id":"' + categoryId + '"}', 'kinvey')
            .then(res => {
                this.setState({ products: res })
            });
    }



    render = () => {
        const noProductsMessage = <p className="no-prod-mess">Sorry... No products in the category...</p>

        return (
            <section id="viewProductsByCategory">
                <div className="title-page">
                    <h3>All products in "{this.state.name}"</h3>
                </div>
                {this.state.products.length > 0 ? this.state.products.map((p, i) => <Product key={p._id} index={i} {...p} />) : noProductsMessage}
            </section>
        )
    }
}