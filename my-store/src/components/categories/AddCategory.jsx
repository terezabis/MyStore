import React, { Component } from 'react';
import CategoryForm from './CategoryForm';


export default class AddCategory extends Component {
    
    render = () => {
        return (
            <div>
                <h3>Create new category</h3>
                <CategoryForm />
            </div>
        )
    }
}