import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import DropDownCategories from '../categories/DropdownCategories';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            image_url: '',
            price: '',
            description: '',
            category_id: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleCatChange(newValue) {
        console.log("start");
        this.setState({category_id: newValue});
        this.forceUpdate();
        console.log("stop");
        console.log(this.state);
    }

    handleChange = ev => {
        let name = ev.target.name;
        let value = ev.target.value;

        this.setState({
            [name]: value
        });
    }

    onSubmit(ev) {
        ev.preventDefault();
        if (this.state.title === '') {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'Title can not be empty.'
            });
        } else if (this.state.image_url === '') {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'Image URL can not be empty.'
            });
        } else if (!this.state.image_url.startsWith('http')) {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'URL is not a valid link.'
            });
        } else if (this.state.price === '') {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'The price can not be empty.'
            });
          }  else if (this.state.category_id === '') {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'Please add category.'
            }); 
        } else {
            let product = {
                title: this.state.title,
                image_url: this.state.image_url,
                price: this.state.price,
                description: this.state.description,
                category_id: this.state.category_id
            };

            const productId = this.props.match.params.id;
            if (productId) {
                requester.update('appdata', `products/${productId}`, 'Kinvey', product).then(res => {
                    observer.trigger(observer.events.notification, { type: 'success', message: 'Product edited.' });
                    this.props.history.push('/products');
                }).catch(err => {
                    observer.trigger(observer.events.notification,
                        { type: 'error', message: err.responseJSON.description });
                });

                return;
            }

            requester.post('appdata', 'products', 'Kinvey', product)
                .then(res => {
                    observer.trigger(observer.events.notification, { type: 'success', message: 'Product created.' });
                    this.props.history.push('/products');
                }).catch(err => {
                    observer.trigger(observer.events.notification,
                        { type: 'error', message: err.responseJSON.description });
                });
        }
    }

    componentDidMount() {
        const productId = this.props.match.params.id;
        if (productId) {
            requester.get('appdata', `products/${productId}`, 'Kinvey').then(res => {
                let product = {
                    title: res.title,
                    image_url: res.image_url,
                    price: res.price,
                    description: res.description,
                    category_id: res.category_id
                };

                this.setState(product);
                this.refs.catDropDown.setDropDownValue(res.category_id);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    render = () => {
        return (
            <div className="submitArea">
                <form id="createProductForm" className="submitForm" onSubmit={this.onSubmit}>
                    <label>Title:</label>
                    <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                    <label>Image URL:</label>
                    <input name="image_url" type="text"  value={this.state.image_url} onChange={this.handleChange} />
                    <label>Price:</label>
                    <input name="price" type="text"  value={this.state.price} onChange={this.handleChange} />
                    <label>Description (optional):</label>
                    <textarea name="description"  value={this.state.description} onChange={this.handleChange}></textarea>
                    <label>Category:</label>
                    <DropDownCategories name="category_id" ref='catDropDown' value={this.state.category_id}  onSelectChange={this.handleCatChange}/>
                    <input type="submit" value={this.props.productId ? "Edit" : "Create"} />
                </form>
            </div>
        )
    }
}

export default withRouter(ProductForm);