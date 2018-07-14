import React, { Component } from 'react';
import CategoryForm from './CategoryForm';

export default class EditCategory extends Component {
    render = () => {
        let categoryId = this.props.match.params.id;

        return (
            <div>
                <div className="title-page">
                    <h3>Edit category</h3>
                    <button className="action btn-back" onClick={this.props.history.goBack}>Back</button>
                </div>
                <CategoryForm categoryId={categoryId} />
            </div>
        )
    }
}