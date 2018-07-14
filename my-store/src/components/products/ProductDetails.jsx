import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

export default class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            image_url: '',
            price: '',
            description: '',
            category_id: '',
            category_name: ''
        }

        this.onBuy = this.onBuy.bind(this);
    }

    onBuy(ev) {
        observer.trigger(observer.events.notification, {
            type: 'success',
            message: 'Product is added to your order.'
        });
    }

    componentDidMount() {
        let productId = this.props.match.params.id;
        console.log(this.props.match.params.id)
        if (productId) {
            requester.get('appdata', `products/${productId}`, 'Kinvey').then(res => {
                let product = {
                    title: res.title,
                    image_url: res.image_url,
                    price: res.price,
                    description: res.description,
                    category_id: res.category_id
                };
                requester.get('appdata', `categories/${res.category_id}`, 'Kinvey').then(result => {
                    this.setState({ category_name: result.name });
                })
                this.setState(product);

            }).catch(err => {
                console.log(err);
            });
        }
    }

    render = () => {

        return (
            <div>
                <h3>Product details</h3>
                <div className="product-details">
                    <div className="title-details tit">
                        <span className="label-details"></span>{this.state.title}
                    </div>
                    <div className="title-details prc">
                        <span className="label-details">Price: </span>{this.state.price} €
                </div>
                    <div className="title-details imag">
                        <span className="label-details"></span>
                        <img src={this.state.image_url} alt={this.state.title} />
                    </div>
                    <div className="title-details cat">
                        <span className="label-details">Category: </span>{this.state.category_name}
                    </div>
                    <div className="title-details desc">
                        <span className="label-details">Description: </span>{this.state.description}
                    </div>
                    <div>
                        <Link to={'/products'}>
                            <button className="action btn-buy" onClick={this.onBuy}>Buy</button>
                        </Link>
                        <Link to="/products">
                            <button className="action btn-back" >Back</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/product/edit/' + this.props.match.params.id} className="editProduct">
                            <button className="action btn-edit">Edit</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}