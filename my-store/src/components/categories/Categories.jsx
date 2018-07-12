import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Category from './Category';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [] }
    }

    getCategories = () =>
        requester.get('appdata', 'categories', 'kinvey')
            .then(res => {
               this.setState({ categories: res })
            });

    componentDidMount = () => this.getCategories();

    render = () => {
        console.log(this.state);
        return (
            <div id="viewCategories">
                <h3>All products</h3>
                {this.state.categories.map((c, i) => <Category key={c._id} index={i} {...c} />)}
            </div>
        )
    }
}