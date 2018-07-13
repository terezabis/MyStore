import React, { Component } from 'react';

export default class ProductHome extends Component {


    render = () => (
        <section id="home-page" className="product-home">
            <div className="thumbnail">
                <img src={this.props.image_url} alt= {this.props.title} />
            </div>
            <div className="product-content">
                <div className="title">
                    {this.props.title} - {this.props.price} €
                </div>
            </div>
        </section>
    )
}