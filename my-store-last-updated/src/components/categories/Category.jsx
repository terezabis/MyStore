import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isAdmin } from '../../hocs/withAuthorization';

export default class Category extends Component {
    render = () => {

        const adminNav =
                <Link to={'/category/edit/' + this.props._id} className="editCategory">
                    <button className="action btn-edit">Edit</button>
                </Link>

        return (
            <div className="category">
                <div className="category-name">
                    {this.props.name}
                </div>
                <div className="category-controls">
                    <Link to={'/categories/' + this.props._id}>
                        <button className="action btn-details">Products</button>
                    </Link>
                    {isAdmin() ? adminNav : null}
                </div>
            </div>
        )
    }
}