import React, { Component } from 'react';
import observer from '../../infrastructure/observer';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
    }

    userLoggedIn = username =>
        this.setState({ username });

    render = () => {
        const loggedInSection =
            <div id="profile">
                <span id="username">Hello, {this.state.username}!</span>|
                <Link to="/logout">logout</Link>
            </div>

        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome in My Store</h1>
                {this.state.username ? loggedInSection : null}               
            </header>
        )
    }
}