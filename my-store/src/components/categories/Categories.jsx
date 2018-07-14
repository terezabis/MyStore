import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Category from './Category';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [] }
    }

    // get all categories from database
    getCategories = () =>
        requester.get('appdata', 'categories', 'kinvey')
            .then(res => {
               this.setState({ categories: res })
            });

    componentDidMount = () => this.getCategories();

    render = () => {
        return (
            <section id="viewCategories">
                <h3>All categories</h3>
                {this.state.categories.map((c, i) => <Category key={c._id} index={i} {...c} />)}
            </section>
        )
    }
}