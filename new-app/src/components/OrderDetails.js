import React, { Component, Fragment } from 'react';
 import { fetchUserOrders, fetchAllOrders } from '../api/remote';
 import { withRouter } from 'react-router-dom';

 class OrderDetails extends Component {
     constructor(props) {
         super(props);

         this.state = {
             order: {}
         };

         this.handleDetails = this.handleDetails.bind(this);
     }

     async componentDidMount() {
         let orders;
         let found = false;
         let foundOrder = {};
         const id = window.location.pathname.split('orders/details/')[1];

         if (!this.props.isAdmin) {
             orders = await fetchUserOrders();
         } else {
             orders = await fetchAllOrders();
         }

         for (const order of orders) {
             if (order._id === id) {
                 found = true;
                 foundOrder = order;
                 break;
             }
         }

         if (!found) {
             this.props.history.push('/');
             return null;
         }

         this.setState({ order: foundOrder });
     }

     handleDetails(id) {
         this.props.history.push(`/products/details/${id}`);
     }

     render() {
         if (!this.props.loggedIn) {
             this.props.history.push('/');
             return null;
         }

         if (!this.state.order.products) {
             return null;
         }

         return (
             <Fragment>
                 <div className="w3-container w3-xxxlarge w3-padding-32">
                     <ul className="w3-ul w3-card-4">
                         {this.state.order.products.map(product => {
                             return (
                                 <li key={product.id} className="w3-bar w3-large">
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
             </Fragment>
         );
     }
 }

 export default withRouter(OrderDetails); 