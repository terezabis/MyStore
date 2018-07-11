import React, { Component } from 'react';
import observer from '../../infrastructure/observer';
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
        
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome in My Store</h1>           
            </header>
        )
    }
}