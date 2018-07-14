import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import observer from '../../infrastructure/observer'
import { isAdmin } from '../../hocs/withAuthorization';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };

        let tempUser = sessionStorage.getItem('username');
        if (tempUser) {
            this.state = { username: tempUser };
        }

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
    }

    userLoggedIn = username =>
        this.setState({ username });

    render = () => {

        // create constants for different access
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
                {/* check if there is user logged and show appropriate navigation tab */}
                {this.state.username ? logedInNav : notLogedInNav}
                {/* check if the user logged is with 'Admin' role and show appropriate navigation tab */}
                {isAdmin() ? adminNav : null}
                {/* check if there is user logged and show greeting */}
                {this.state.username ? loggedInSection : null}                
            </div>
        )
    }
}