import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import observer from '../../infrastructure/observer';
import requester from '../../infrastructure/requester';

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.OnDeleted = this.OnDeleted.bind(this);
    }

    OnDeleted(ev) {
        // TODO: There is a error when a product is deleted
        let id = this.props._id;
        requester.remove('appdata', `products/${id}`, 'Kinvey').then(res => {
            this.props.isDeleted(true);
            observer.trigger(observer.events.notification, {
                type: 'success',
                message: 'Product deleted.'
            });
            // this.props.history.push('/');
            // this.props.history.push(`/comments/${this.props.postId}`);
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
                    <a href={this.props.url}>
                        {this.props.title}
                    </a>
                </div>

                <div className="controls">

                    <Link to={'/product/details/' + this.props._id}>
                        <button className="action btn-details">Details</button>
                    </Link>
                    <Link to={'/product/buy/' + this.props._id}>
                        <button className="action btn-buy">Buy</button>
                    </Link>
                    <Link to={'/edit-product/' + this.props._id} className="editProduct">
                        <button className="action btn-edit">Edit</button>
                    </Link>
                    <Link to="/" className="deleteProduct">
                        <button className="action btn-delete" onClick={this.OnDeleted}>Delete</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}