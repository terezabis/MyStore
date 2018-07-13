import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import observer from '../../infrastructure/observer'

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
    }

    userLoggedIn = username =>
        this.setState({ username });

    render = () => {

        const adminNav =
            <div className="admin-nav">
                <NavLink className="nav" to='/category/add'>Add Category</NavLink>
                <NavLink className="nav" to='/product/add'>Add Product</NavLink>
            </div>

        const notLogedInNav =
            <div className="nav-items">
                <NavLink className="nav" to='/login'>Log in</NavLink>
                <NavLink className="nav" to='/register'>Register</NavLink>
            </div>
        const logedInNav =
            <div className="nav-items">
                <NavLink className="nav" to='/products'>Products</NavLink>
                <NavLink className="nav" to='/categories'>Categories</NavLink>                
            </div>

        const loggedInSection =
            <div id="profile">
                <span id="username">Hello, {this.state.username}! |</span>
                <Link to="/logout">logout</Link>
            </div>

        return (
            <div id="menu">
                <NavLink className="nav" to='/'>Home</NavLink>
                {this.state.username ? logedInNav : notLogedInNav}
                {this.state.username === 'admin' ? adminNav : null}
                {this.state.username ? loggedInSection : null}                
            </div>
        )
    }
}