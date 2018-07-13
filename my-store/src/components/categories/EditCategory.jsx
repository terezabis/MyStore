import React, { Component } from 'react';
import CategoryForm from './CategoryForm';

export default class EditCategory extends Component {
    render = () => {
        let categoryId = this.props.match.params.id;

        return (
            <div>
                <h3>Edit category</h3>
                <CategoryForm categoryId={categoryId}/>
            </div>
        )
    }
}