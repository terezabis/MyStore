import React, { Component } from 'react';
import requester from '../../infrastructure/requester';


export default class SelectBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category_id: '',
            categories: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getCategories = () =>
        requester.get('appdata', 'categories', 'kinvey')
            .then(res => {
                this.setState({ categories: res })
            });

    componentDidMount = () => this.getCategories();

    handleChange(ev) {
        let name = ev.target.name;
        let value = ev.target.value;
        
        this.setState({
            category_id: value
        });
        console.log(this.state)
    }
    render() {
        return (
            <select name="category_id" value={this.state.category_id} onChange={this.handleChange} className="form-control">
                {this.state.categories.map((c, i) => {
                    return <option value={c._id} key={c._id} >{c.name}</option>
                })}
            </select>

        )
    }
}
