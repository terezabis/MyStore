import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Home from './components/home/Home';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome in My Store</h1>
        </header>
        <div className="App">
        <main className="content">
                    <Route path='/' exact component={Home} />
                </main>
                </div>
      </div>
    );
  }
}

export default App;
