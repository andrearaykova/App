import React, { Component, Fragment } from 'react';
import { fetchProducts, deleteProduct } from '../api/remote';
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            activePage: 1,
            search: ''
        };

        this.createInterior = this.createInterior.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const response = await fetchProducts();
        this.setState({ products: response });
    }

    handleDelete(id) {
        deleteProduct(id);
        this.props.history.push('/');
    }

    handleEdit(id) {
        this.props.history.push(`/edit/${id}`);
    }

    handleDetails(id) {
        this.props.history.push(`/products/details/${id}`);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createInterior() {
        let interior = [];

        let pageCounter = 0;
        let curProducts = this.state.products.slice(+this.state.activePage * 8 - 8, +this.state.activePage * 8 - 4);
        let curProducts2 = this.state.products.slice(+this.state.activePage * 8 - 4, +this.state.activePage * 8);

        interior.push(
            <div className="w3-main w3-content w3-padding" style={{ 'maxWidth': '1200px', 'marginTop': '50px' }}>
                <div className="w3-row-padding w3-padding-16 w3-center">
                    {curProducts.map(product => {
                        if (typeof product !== 'undefined') {
                            if (product.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
                                product.description.toLowerCase().includes(this.state.search.toLowerCase())) {
                                return (
                                    <div className="w3-quarter">
                                        <a onClick={() => this.handleDetails(product._id)}>
                                            <h4>{product.title}</h4>
                                            <img src={product.image} style={{ width: '100%', cursor: 'pointer' }} />
                                        </a>
                                        <h5>{product.price.toFixed(2)} лв.</h5>
                                        {this.props.isAdmin ?
                                            <Fragment>
                                                <a onClick={() => this.handleEdit(product._id)}><i className="fa fa-edit"></i></a>
                                                <a onClick={() => this.handleEdit(product._id)}>Edit</a>&nbsp;&nbsp;
                                            <a onClick={() => this.handleDelete(product._id)}><i className="fa fa-trash"></i></a>
                                                <a onClick={() => this.handleDelete(product._id)}>Delete</a>
                                            </Fragment> : null}
                                    </div>
                                );
                            }
                        }
                        return null;
                    })}
                    <div className="w3-row-padding w3-padding-16 w3-center">
                        {curProducts2.map(product => {
                            if (typeof product !== 'undefined') {
                                if (product.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
                                    product.description.toLowerCase().includes(this.state.search.toLowerCase())) {
                                    return (
                                        <div className="w3-quarter">
                                            <a onClick={() => this.handleDetails(product._id)}>
                                                <h4>{product.title}</h4>
                                                <img src={product.image} style={{ width: '100%', cursor: 'pointer' }} />
                                            </a>
                                            <h5>{product.price.toFixed(2)} лв.</h5>
                                            {this.props.isAdmin ?
                                                <Fragment>
                                                    <a onClick={() => this.handleEdit(product._id)}><i className="fa fa-edit"></i></a>
                                                    <a onClick={() => this.handleEdit(product._id)}>Edit</a>&nbsp;&nbsp;
                                                <a onClick={() => this.handleDelete(product._id)}><i className="fa fa-trash"></i></a>
                                                    <a onClick={() => this.handleDelete(product._id)}>Delete</a>
                                                </Fragment> : null}
                                        </div>
                                    );
                                }
                            }
                            return null;
                        })}
                    </div>
                </div>

                <div className="w3-center w3-padding-32">
                    <div className="w3-bar">
                        {this.state.products.map((product, i) => {
                            if (i % 8 === 0) {
                                pageCounter++;
                                if (Math.floor(i / 8) + 1 === this.state.activePage) {
                                    const toSet = pageCounter;
                                    return (
                                        <button className="w3-bar-item w3-button w3-black"
                                            onClick={() => { this.setState({ activePage: toSet }); }}>{toSet}</button>
                                    );
                                } else {
                                    const toSet = pageCounter;
                                    return (
                                        <button className="w3-bar-item w3-button w3-hover-black"
                                            onClick={() => { this.setState({ activePage: toSet }); }}>{toSet}</button>
                                    );
                                }
                            }
                        })}
                    </div>
                </div>
            </div>
        );

        return interior;
    }

    render() {
        return (
            <Fragment>
                <input type="text" className="w3-xlarge w3-display-position" style={{ top: '65px', left: '800px' }}
                    placeholder="Search products.." value={this.state.search} name='search'
                    onChange={this.handleChange} />
                {this.createInterior()}
            </Fragment>
        );
    }
}

export default withRouter(HomePage);
