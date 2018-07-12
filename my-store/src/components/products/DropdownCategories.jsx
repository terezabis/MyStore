import React, { Component } from 'react';
import requester from '../../infrastructure/requester';


export default class SelectBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'Select an Option',
            categories: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getCategories = () =>
        requester.get('appdata', 'categories', 'kinvey')
            .then(res => {
                //console.log(res)
                this.setState({ categories: res })
            });

    componentDidMount = () => this.getCategories();

    handleChange(e) {
        console.log(e.target.value)
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <select name="category_id" onChange={this.handleChange} className="form-control">
                {this.state.categories.map((c, i) => {
                    return <option value={c._id} key={c._id} >{c.name}</option>
                })}
            </select>

        )
    }
}
