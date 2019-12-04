import React, { Component, Fragment } from 'react';
 import { fetchProducts } from '../api/remote';
 
 class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            activePage: 1
        };

        this.createInterior = this.createInterior.bind(this);
    }

    async componentDidMount() {
        const response = await fetchProducts();
        this.setState({ products: response });
    }

    createInterior() {
        let interior = [];

        let curProducts = this.state.products.slice(+this.state.activePage * 8 - 8, +this.state.activePage * 8 - 4);
        let curProducts2 = this.state.products.slice(+this.state.activePage * 8 - 4, +this.state.activePage * 8);

        interior.push(
            <div className="w3-main w3-content w3-padding" style={{ 'maxWidth': '1200px', 'margin-top': '100px' }}>
                <div className="w3-row-padding w3-padding-16 w3-center" id="food">
                    {curProducts.map(product => {
                        if (typeof product !== 'undefined') {
                            interior.push(
                                <div className="w3-quarter">
                                    <img src={product.image} style={{ 'maxWidth': '450px' }} />
                                    <h3>{product.title}</h3>
                                    <p>{product.price}лв.</p>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );

        if (typeof curProducts2[0] !== 'undefined') {
            interior.push(
                <div className="w3-main w3-content w3-padding" style={{ 'maxWidth': '1200px', 'margin-top': '100px' }}>
                    <div className="w3-row-padding w3-padding-16 w3-center">
                        {curProducts2.map(product => {
                            if (typeof product !== 'undefined') {
                                interior.push(
                                    <div className="w3-quarter">
                                        <img src={product.image} style={{ 'maxWidth': '450px' }} />
                                        <h3>{product.title}</h3>
                                        <p>{product.price} BGN</p>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            );
        }

        interior.push(
            <div className="w3-center w3-padding-32">
                <div className="w3-bar">
                    {this.state.products.map((product, i) => {
                        if (i % 8 === 0) {
                            if (i + 1 === this.state.activePage) {
                                return (
                                    <a href="#" className="w3-bar-item w3-button w3-black">{i + 1}</a>
                                );
                            } else {
                                return (
                                    <a href="#" className="w3-bar-item w3-button w3-hover-black">{i + 1}</a>
                                );
                            }
                        }
                    })}
                </div>
            </div>
        );

        return interior;
    }

    render() {
        return (
            <Fragment>
                {this.createInterior()}
            </Fragment>
        );
    }
}

 export default HomePage; 