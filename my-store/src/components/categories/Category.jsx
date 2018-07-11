import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Category extends Component {
    render = () => {
        return (
            <div className="category">
                <div className="col rank">
                    <span>{this.props.index + 1}</span>
                </div>
                <div className="name">
                    {this.props.name}
                </div>
                <div className="controls">
                    <ul>
                        <li className="action">
                            <Link to={'/category/' + this.props._id}>View products</Link>
                        </li>                        
                        <li className="action">
                            <Link to='/' className="editCategory">Edit</Link>
                        </li>
                        <li className="action">
                            <Link to="/" className="deleteCategory">Delete</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}