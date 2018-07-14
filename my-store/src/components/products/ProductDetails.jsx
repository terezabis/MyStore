import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import { isAdmin } from '../../hocs/withAuthorization';

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
        this.OnDeleted = this.OnDeleted.bind(this);
    }

    // show message when product is bought
    onBuy(ev) {
        observer.trigger(observer.events.notification, {
            type: 'success',
            message: 'Product is added to your order.'
        });
    }

    // delete product and show message
    OnDeleted(ev) {
        let id = this.props.match.params.id;
        requester.remove('appdata', `products/${id}`, 'kinvey').then(res => {
            observer.trigger(observer.events.notification, {
                type: 'success',
                message: 'Product is deleted.'
            });
        }).catch(err => {
            console.log(err);
        });
    }
    
    // load data
    componentDidMount() {
        let productId = this.props.match.params.id;
        console.log(this.props.match.params.id)
        if (productId) {
            // get data for product from database if exist
            requester.get('appdata', `products/${productId}`, 'Kinvey').then(res => {
                let product = {
                    title: res.title,
                    image_url: res.image_url,
                    price: res.price,
                    description: res.description,
                    category_id: res.category_id
                };
                // get products's category information from databse
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

        // create section for user with 'Admin' role only
        const adminNav =
            <div className="admin-nav">
                <Link to={'/product/edit/' + this.props.match.params.id} className="editProduct">
                    <button className="action btn-edit">Edit</button>
                </Link>
                <Link to="/products" className="deleteProduct">
                    <button className="action btn-delete" onClick={this.OnDeleted}>Delete</button>
                </Link>
            </div>

        return (
            <div>
                <div className="title-page">
                    <h3>Product details</h3>
                    <button className="action btn-back" onClick={this.props.history.goBack}>Back</button>
                </div>
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
                        <button className="action btn-buy" onClick={this.onBuy}>Buy</button>
                    </div>
                    {/* check if logged in user has a role 'Admin' and show appropriate section  */}
                    {isAdmin() ? adminNav : null}
                </div>
            </div>
        )
    }
}