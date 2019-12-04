import React, { Component, Fragment } from 'react';
 import { submitOrder } from '../api/remote';
 import { withRouter } from 'react-router-dom';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import errorHandler from '../utils/errorHandler';

 class Cart extends Component {
     constructor(props) {
         super(props);

         this.state = {};

         this.handleDetails = this.handleDetails.bind(this);
         this.handleRemove = this.handleRemove.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleDetails(id) {
         this.props.history.push(`/products/details/${id}`);
     }

     handleRemove(id) {
         let newCart = JSON.parse(window.localStorage.getItem('cart'));

         for (let i = 0; i < newCart.length; i++) {
             if (id === newCart[i].id) {
                 newCart.splice(i, 1);
                 break;
             }
         }

         if (newCart.length === 0) {
             window.localStorage.removeItem('cart');
         } else {
             window.localStorage.setItem('cart', JSON.stringify(newCart));
         }
         this.props.history.push('/cart');
     }

     handleSubmit(event) {
         event.preventDefault();

         submitOrder(JSON.parse(window.localStorage.getItem('cart')))
             .then(json => {
                 if (json.success) {
                     window.localStorage.removeItem('cart');
                     this.props.history.push('/orders');
                 } else {
                     const error = errorHandler(json);
                     toast.error(error);
                 }
             });
     }

     render() {
         if (!this.props.loggedIn) {
             this.props.history.push('/');
             return null;
         }

         if (!window.localStorage.getItem('cart')) {
             return (
                 <h1 className="w3-center">Your cart is empty</h1>
             );
         }

         return (
             <Fragment>
                 <div className="w3-container w3-xxxlarge w3-padding-32">
                     <ul className="w3-ul w3-card-4">
                         {JSON.parse(window.localStorage.getItem('cart')).map(product => {
                             return (
                                 <li key={product.id} className="w3-bar w3-large">
                                     <span onClick={() => this.handleRemove(product.id)} className="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span>
                                     <img src={product.image} className="w3-bar-item w3-circle w3-hide-small" style={{ width: '85px', cursor: 'pointer' }}
                                         onClick={() => this.handleDetails(product.id)} alt='' />
                                     <div className="w3-bar-item">
                                         <span className="w3-large">{product.title}</span><br />
                                         <span>{product.description}</span>
                                         <span className="w3-display-position" style={{ right: '150px' }}>{(+product.price).toFixed(2)} лв X {product.quantity} = {
                                             (+product.price * +product.quantity).toFixed(2)} лв</span>
                                     </div>
                                 </li>
                             );
                         })}
                     </ul>
                 </div>
                 <br /><br /><button className="w3-btn w3-black w3-large w3-text-white w3-display-position" style={{ right: '900px' }}
                     onClick={this.handleSubmit}>Order</button>
             </Fragment>
         );
     }
 }

 export default withRouter(Cart); 