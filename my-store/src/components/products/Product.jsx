import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Product extends Component {
    render = () => (
        <div className="product">
            <div className="col rank">
                <span>{this.props.index + 1}</span>
            </div>
            <div className="col thumbnail">
                    <img src={this.props.image_url} alt="" />
            </div>
            <div className="product-content">
                <div className="title">
                    <a href={this.props.url}>
                        {this.props.title}
                    </a>
                </div>
                <div className="info">
                    {this.props.description}
                </div>
                <div className="controls">
                    <ul>
                        <li className="action">
                            <Link to={'/product/details/' + this.props._id}>Details</Link>
                        </li>
                        <li className="action">
                            <Link to={'/product/buy/' + this.props._id}>Buy</Link>
                        </li>
                        <li className="action">
                            <Link to='/' className="editProduct">Edit</Link>
                        </li>
                        <li className="action">
                            <Link to="/" className="deleteProduct">Delete</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}