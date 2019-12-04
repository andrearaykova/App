import React, { Fragment } from 'react';
 import LoginPopup from './LoginPopup';
 import RegisterPopup from './RegisterPopup';

 const Navbar = (props) => {
     const { loggedIn, isAdmin, logout } = props;

     return (
         <Fragment>
             <LoginPopup />
             <RegisterPopup />

             <div className="w3-bar w3-card w3-large w3-light-grey">
                 <a href='/' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-display-position"
                     style={{ left: "600px" }}><i className="fa fa-home"></i> Store</a>
                 {loggedIn && !isAdmin ?
                     <Fragment>
                         <a className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right"
                             onClick={() => logout()}>Logout</a>
                         <a href='/orders' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right">My orders</a>
                         <a href='/cart' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right">Cart</a>
                     </Fragment>
                     : loggedIn && isAdmin ?
                         <Fragment>
                             <a className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right"
                                 onClick={() => logout()}>Logout</a>
                             <a href='/create' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right">Create product</a>
                             <a href='/orders/all' className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right">All orders</a>
                         </Fragment> :
                         <Fragment>
                             <a className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right"
                                 onClick={() => { document.getElementById('id02').style.display = 'block'; }}>Register</a>
                           <a className="w3-bar-item w3-button w3-light-grey w3-hover-grey w3-hover-text-white w3-right"
                                 onClick={() => { document.getElementById('id01').style.display = 'block'; }}>Login</a>
                         </Fragment>
                    
                 }
                 </div>
         </Fragment>
     );
 }

 export default Navbar; 