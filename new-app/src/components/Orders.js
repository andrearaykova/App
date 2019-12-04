import React, { Component, Fragment } from 'react';
 import { fetchUserOrders } from '../api/remote';
 import { withRouter } from 'react-router-dom';

 class Cart extends Component {
     constructor(props) {
         super(props);

         this.state = {
             orders: false
         };

         this.handleDetails = this.handleDetails.bind(this);
     }

     handleDetails(id) {
         this.props.history.push(`/orders/details/${id}`);
     }

     async componentDidMount() {
         const orders = await fetchUserOrders();
         this.setState({ orders });
     }

     render() {
         if (!this.props.loggedIn) {
             this.props.history.push('/');
             return null;
         }

         if (!this.state.orders || Object.entries(this.state.orders).length === 0) {
             return (
                 <h1 className="w3-center">You have no orders</h1>
             );
         }

         return (
             <Fragment>
                 <table className="w3-table w3-centered w3-bordered">
                     <tbody>
                         <tr>
                             <th>Date</th>
                             <th>Items</th>
                             <th>Total Price</th>
                             <th>Status</th>
                             <th></th>
                         </tr>
                         {this.state.orders.map(order => {
                             let totalPrice = 0;
                             for (let product of order.products) {
                                 totalPrice += +product.price * +product.quantity;
                             }

                             return (
                                 <Fragment>
                                     <tr>
                                         <td><h4>{order.date.substring(0, 10) + ' ' + order.date.substring(11, 19)}</h4></td>
                                         <td><h4>{order.products.length}</h4></td>
                                         <td><h4>{totalPrice}</h4></td>
                                         <td><h4>{order.status}</h4></td>
                                         <td><button className="w3-btn w3-large w3-black w3-text-white"
                                             onClick={() => this.handleDetails(order._id)}>Details</button></td>
                                     </tr>
                                 </Fragment>
                             );
                         })}
                     </tbody>
                 </table>
             </Fragment>
         );
     }
 }

 export default withRouter(Cart); 