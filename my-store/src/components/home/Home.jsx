import React, {Component} from 'react';
import Product from '../products/Product'
import requester from '../../infrastructure/requester';

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [] }
    }

    getProducts = () =>
        requester.get('appdata', 'products', 'basic')
            .then(res => {
               this.setState({ products: res })
            });

    componentDidMount = () => this.getProducts();

    render = () => {
        return (
            <section id="welcome">
                    <div>
                        <h1>Welcome in the site where you can find exact you want!</h1>
                        <h4>Now you see last added products. If you want to check out our entire stock of products, you need to log in or register for free.</h4>
                    </div>
                    <div>
                        {this.state.products.slice(-3).map((p, i) => <Product key={p._id} index={i} {...p} />)}
                    </div>
            </section>
        )
    }
}