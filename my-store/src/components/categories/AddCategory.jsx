import React, { Component } from 'react';
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'


export default class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = ev => {
        let name = ev.target.name;
        let value = ev.target.value;
        this.setState({ [name]: value })
    }

    onSubmit = (ev) => {
        ev.preventDefault();

        if (this.state.name === '') {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'Input name for category.'
            });
        } else {
            let category = {
                name: this.state.name
            };
            requester.post('appdata', 'categories', 'Kinvey', category)
                .then(res => {
                    observer.trigger(observer.events.notification, { type: 'success', message: 'Category created.' });
                    this.props.history.push('/categories');
                }).catch(err => {
                    observer.trigger(observer.events.notification,
                        { type: 'error', message: err.responseJSON.description });
                });
        }
    }

    render = () => {
        return (
            <div>
                <h3>Create category</h3>
            <form id="submitForm" className="submitForm" onSubmit={this.onSubmit}>
                <label>Category name:</label>
                <input name="name" onChange={this.handleChange} type="text" />
                <input type="submit" value="Create" />
            </form>
            </div>
        )
    }
}