import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import './style/site.css'
import Home from './components/home/Home';
import Header from './components/common/Header';
import Notification from './components/common/Notification';
import Navigation from './components/common/Navigation';
import Logout from './components/user/Logout';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import { withAdminAuthorization } from './hocs/withAuthorization';
import Products from './components/products/Products'
import AddProduct from './components/products/AddProduct';
import Categories from './components/categories/Categories'
import AddCategory from './components/categories/AddCategory';
import ProductsByCategory from './components/categories/ProductsByCategory';
import EditProduct from './components/products/EditProduct';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="content">
          <Navigation />
          <Notification />
          <Route path='/' exact component={Home} />
          <Route path='/products' exact component={Products} />          
          <Route path='/categories' exact component={Categories} />
          <Route path='/category/:id' exact component={ProductsByCategory} />
          <Route path='/add-product' exact component={withAdminAuthorization(AddProduct)} />
          <Route path='/add-category' exact component={withAdminAuthorization(AddCategory)} />
          <Route path='/edit-product/:id' exact component={withAdminAuthorization(EditProduct)} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/logout' component={Logout} />
        </main>
      </div>
    );
  }
}

export default App;
