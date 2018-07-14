import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'


class CategoryForm extends Component {
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

            const categoryId = this.props.categoryId;
            // check if there is 'id' of category
            if (categoryId) {
                //update the category in database
                requester.update('appdata', `categories/${categoryId}`, 'Kinvey', category).then(res => {
                    observer.trigger(observer.events.notification, { type: 'success', message: 'Category edited.' });
                    this.props.history.push('/categories');
                }).catch(err => {
                    observer.trigger(observer.events.notification,
                        { type: 'error', message: err.responseJSON });
                });

                return;
            }

            // not id -> create new category in database
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

    componentDidMount() {
        const categoryId = this.props.categoryId;
        // if category's id exist: get data from database and set state
        if (categoryId) {
            requester.get('appdata', `categories/${categoryId}`, 'Kinvey').then(res => {
                let category = {
                    name: res.name
                };

                this.setState(category);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    render = () => {
        return (
            <div className="submitArea">
                <form className="submitForm" onSubmit={this.onSubmit}>
                    <label>Category name:</label>
                    <input name="name" value={this.state.name} onChange={this.handleChange} type="text" />
                    <input type="submit" value={this.props.categoryId ? "Edit" : "Create"} />
                </form>
            </div>
        )
    }
}

export default withRouter(CategoryForm);