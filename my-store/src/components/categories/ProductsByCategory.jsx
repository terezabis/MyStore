import React, { Component, Fragment } from 'react';
import requester from '../../infrastructure/requester';
import Products from './../products/Products';

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
            .catch(console.log("here"));
        requester.get('appdata', 'products?query={"category_id":"' + categoryId + '"}', 'kinvey')
            .then(res => {
                this.setState({ products: res })
            });
    }
    

    render = () => {
        return (
            <Fragment>
                <section id="viewProductsByCategory">
                    <div className="title">
                        <strong>{this.state.name}</strong>
                    </div>

                    <Products products={this.state.products} />

                </section>
            </Fragment>
        )
    }
}