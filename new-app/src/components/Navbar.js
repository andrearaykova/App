import React, { Fragment } from 'react';
 import LoginPopup from './LoginPopup';
 import RegisterPopup from './RegisterPopup';

 const Navbar = (props) => {
     const { loggedIn, isAdmin, logout, users, products } = props;

     return (
         <Fragment>
             <LoginPopup />
             <RegisterPopup />

             <div className="w3-top">
                 <div className="w3-bar w3-card w3-large w3-light-grey">
                     <a href='/' className="w3-bar-item w3-button w3-grey w3-text-white w3-display-position" style={{ left: "250px" }}><i className="fa fa-home"></i> Home</a>
                     <a href='/store' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-display-middle">Store</a>
                     {loggedIn ?
                         <Fragment>
                             <a href='#' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right"
                                 onClick={() => logout()}>Logout</a>
                             <a href='/orders' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right">My orders</a>
                             <a href='/cart' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right">Cart</a>
                         </Fragment>
                         : <Fragment>
                             <a href='#' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right"
                                 onClick={() => { document.getElementById('id02').style.display = 'block'; }}>Register</a>
                             <a href='#' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right"
                                 onClick={() => { document.getElementById('id01').style.display = 'block'; }}>Login</a>
                         </Fragment>
                     }
                     {isAdmin ?
                         <Fragment>

                         </Fragment>
                         : <Fragment>

                         </Fragment>
                     }
                     <input type="text" className="w3-bar-item w3-input w3-right" placeholder="Search.." />
                 </div>
             </div>
         </Fragment>
     );
 }

 export default Navbar; 