import React, { Component, Fragment } from 'react';
 import { fetchAllOrders, approveOrder } from '../api/remote';
 import { withRouter } from 'react-router-dom';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import errorHandler from '../utils/errorHandler';

 class AllOrders extends Component {
     constructor(props) {
         super(props);

         this.state = {
             orders: false
         };

         this.handleDetails = this.handleDetails.bind(this);
         this.handleApprove = this.handleApprove.bind(this);
     }

     handleDetails(id) {
         this.props.history.push(`/orders/details/${id}`);
     }

     handleApprove(id) {
         approveOrder(id)
             .then(json => {
                 if (json.success) {
                     this.props.history.push('/orders/all');
                 } else {
                     const error = errorHandler(json);
                     toast.error(error);
                 }
             });
     }

     async componentDidMount() {
         const orders = await fetchAllOrders();
         this.setState({ orders });
     }

     render() {
         if (!this.props.isAdmin) {
             this.props.history.push('/');
             return null;
         }

         if (!this.state.orders) {
             return (
                 <h1 className="w3-center">There are no orders</h1>
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
                             <th>Approve</th>
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
                                         <td>{order.status === 'Pending' ? <button className="w3-btn w3-large w3-black w3-text-white"
                                             onClick={() => this.handleApprove(order._id)}> Approve</button> : null}</td>
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

 export default withRouter(AllOrders); 