import React, { Component } from 'react';
 import { fetchProducts } from '../api/remote';
 import { withRouter } from 'react-router-dom';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

 class DetailsPage extends Component {
     constructor(props) {
         super(props);

         this.state = {
             title: '',
             description: '',
             price: '',
             image: '',
             id: '',
             quantity: 1
         };

         this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleSubmit(event) {
         event.preventDefault();

         if (!this.props.loggedIn) {
             toast.warn('Please login');
             return null;
         }

         if (!window.localStorage.getItem('cart')) {
             window.localStorage.setItem('cart', JSON.stringify([this.state]));
         } else {
             let newCart = JSON.parse(window.localStorage.getItem('cart')).slice(0);
             let index = -5;

             for (let i = 0; i < newCart.length; i++) {
                 if (newCart[i].id === this.state.id) {
                     index = i;
                     break;
                 }
             }
             if (index >= 0) {
                 newCart[index].quantity = +newCart[index].quantity + +this.state.quantity;
             } else {
                 newCart.push(this.state);
             }
             window.localStorage.setItem('cart', JSON.stringify(newCart));

         } toast.success('Product added to cart');
     }

     async componentDidMount() {
         const products = await fetchProducts();

         let found = false;
         let foundProduct = {};
         const id = window.location.pathname.split('products/details/')[1];

         for (const product of products) {
             if (product._id === id) {
                 found = true;
                 foundProduct = product;
                 break;
             }
         }

         if (!found) {
             this.props.history.push('/');
             return null;
         }

         this.setState({
             title: foundProduct.title,
             description: foundProduct.description,
             price: foundProduct.price,
             image: foundProduct.image,
             id: foundProduct._id,
         });
     }

     render() {
         return (
             <div className="w3-row-padding ">

                 <div className="w3-twothird w3-display-position" style={{ top: '100px', right: '300px' }}>
                     <img src={this.state.image} style={{ width: '50%' }} alt='' />
                 </div>

                 <div className="w3-third w3-display-position" style={{ top: '100px', right: '225px' }}>
                     <h1>{this.state.title}</h1><br />
                     <p><h4>{this.state.description}</h4></p><br />
                     <p className="w3-center"><h2>{(+this.state.price).toFixed(2)} лв.</h2></p><br />
                     <p className="w3-center"><h2>Quantity: {this.state.quantity}</h2><br />
                         <button className="w3-btn w3-black w3-text-white w3-display-position" style={{ right: '250px' }}
                             onClick={() => this.setState({ quantity: +this.state.quantity + 1 })}>+</button>
                         <button className="w3-btn w3-black w3-text-white w3-center"
                             onClick={() => { if (+this.state.quantity > 1) { this.setState({ quantity: +this.state.quantity - 1 }); } }}>-</button></p>
                     <p className="w3-center"><h2>Total: {(+this.state.quantity * +this.state.price).toFixed(2)} лв.</h2></p>
                     <p><button className="w3-btn w3-black w3-text-white w3-display-position" style={{ right: '265px' }}
                         onClick={this.handleSubmit}>Add to Cart</button>
                     </p>
                 </div>

             </div>
         );
     }
 }

 export default withRouter(DetailsPage); 