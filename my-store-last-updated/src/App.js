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
import ProductsByCategory from './components/products/ProductsByCategory';
import EditProduct from './components/products/EditProduct';
import ProductDetails from './components/products/ProductDetails';
import EditCategory from './components/categories/EditCategory';

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
          <Route path='/category/add' exact component={withAdminAuthorization(AddCategory)} />
          <Route path='/categories/:id' exact component={ProductsByCategory} />
          <Route path='/category/edit/:id' exact component={withAdminAuthorization(EditCategory)} />
          
          <Route path='/product/add' exact component={withAdminAuthorization(AddProduct)} />
          <Route path='/product/edit/:id' exact component={withAdminAuthorization(EditProduct)} />
          <Route path='/product/details/:id' exact component={ProductDetails} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/logout' component={Logout} />
        </main>
      </div>
    );
  }
}

export default App;
