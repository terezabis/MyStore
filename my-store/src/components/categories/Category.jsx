import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Category extends Component {
    render = () => {
        return (
            <div className="category">
                <div className="category-name">
                    {this.props.name}
                </div>
                <div className="category-controls">
                    <Link to={'/category/' + this.props._id}>
                        <button className="action btn-details">Products</button>
                    </Link>
                    <Link to={'/category/edit/' + this.props._id} className="editCategory">
                        <button className="action btn-edit">Edit</button>
                    </Link>
                </div>
            </div>
        )
    }
}