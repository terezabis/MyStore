import React, { Component } from 'react';
import requester from '../../infrastructure/requester';


export default class DropdownCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category_id: '',
            categories: []
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.setDropDownValue = this.setDropDownValue.bind(this);
    }

    getCategories = () =>
        requester.get('appdata', 'categories', 'kinvey')
            .then(res => {
                this.setState({ categories: res })
            });

    componentDidMount = () => this.getCategories();

    handleSelectChange(ev) {
        let value = this.refs.dropdown.value;
        this.setState({category_id: this.refs.dropdown.value});
        this.props.onSelectChange(value);    
    }

    setDropDownValue(newVal) {
        this.setState({category_id: newVal});
    }
    render() {
        return (
            <select name="category_id" ref='dropdown' value={this.state.category_id} onChange={this.handleSelectChange} className="form-control">
                {this.state.categories.map((c, i) => {
                    return <option value={c._id} key={c._id} >{c.name}</option>
                })}
            </select>

        )
    }
}
