import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import observer from '../../infrastructure/observer';
import requester from '../../infrastructure/requester';

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.OnDeleted = this.OnDeleted.bind(this);
        this.onBuy = this.onBuy.bind(this);
    }

    onBuy(ev) {
        observer.trigger(observer.events.notification, {
            type: 'success',
            message: 'Product is added to your order.'
        });
    }

    OnDeleted(ev) {
        let id = this.props._id;
        requester.remove('appdata', `products/${id}`, 'Kinvey').then(res => {
            observer.trigger(observer.events.notification, {
                type: 'success',
                message: 'Product is deleted.'
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render = () => (
        <div className="product">
            <div className="thumbnail">
                <img src={this.props.image_url} alt="" />
            </div>
            <div className="product-content">
                <div className="title">
                    {this.props.title} - {this.props.price} €
                </div>

                <div className="controls">

                    <Link to={'/product/details/' + this.props._id}>
                        <button className="action btn-details">Details</button>
                    </Link>
                    <Link to={'/products'}>
                        <button className="action btn-buy" onClick={this.onBuy}>Buy</button>
                    </Link>
                    <Link to={'/product/edit/' + this.props._id} className="editProduct">
                        <button className="action btn-edit">Edit</button>
                    </Link>
                    <Link to="/products" className="deleteProduct">
                        <button className="action btn-delete" onClick={this.OnDeleted}>Delete</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}