import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Header from './components/common/Header';
import Notification from './components/common/Notification';
import Logout from './components/user/Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Notification />
          <main className="content">
            <Route path='/' exact component={Home} />
            <Route path='/logout' component={Logout} />
          </main>
      </div>
    );
  }
}

export default App;
