import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
 import { ToastContainer } from 'react-toastify';
 import { isUserAuthenticated, getToken, getUsername, isUserAdmin } from './utils/auth';
 import HomePage from './components/HomePage';
 import CreatePage from './components/CreatePage';
 import Navbar from './components/Navbar';
 import EditPage from './components/EditPage';
 import DetailsPage from './components/DetailsPage';
 import Cart from './components/Cart';
 import Orders from './components/Orders';
 import OrderDetails from './components/OrderDetails';
 import AllOrders from './components/AllOrders';

 class App extends Component {
   constructor(props) {
     super(props);

     this.state = {
       loggedIn: false
     };

     this.logout = this.logout.bind(this);
   }

   componentWillMount() {
     if (isUserAuthenticated()) {
       this.setState({ loggedIn: true });
     }
   }

   logout() {
     this.setState({ loggedIn: false });
     window.localStorage.clear();
     this.props.history.push('/');
   }

   render() {
    const isAdmin = isUserAdmin();
    const loggedIn = this.state.loggedIn;

     return (
       <Fragment>
         <Navbar
           loggedIn={loggedIn}
           isAdmin={isAdmin}
           logout={this.logout}
         />
         <Switch>
         <Route exact path='/' render={() => <HomePage isAdmin={isAdmin} />} />
           <Route exact path='/create' render={() => <CreatePage isAdmin={isAdmin} />} />
           <Route exact path='/edit/:id' render={() => <EditPage isAdmin={isAdmin} />} />
           <Route exact path='/products/details/:id' render={() => <DetailsPage loggedIn={loggedIn} />} />
           <Route exact path='/cart' render={() => <Cart loggedIn={loggedIn} />} />
           <Route exact path='/orders' render={() => <Orders loggedIn={loggedIn} />} />
           <Route exact path='/orders/details/:id' render={() => <OrderDetails loggedIn={loggedIn} isAdmin={isAdmin} />} />
           <Route exact path='/orders/all' render={() => <AllOrders isAdmin={isAdmin} />} />
           <Redirect to='/' />
         </Switch>
         <ToastContainer
           position="top-center"
           autoClose={5000}
           hideProgressBar
           newestOnTop
           closeOnClick
           rtl={false}
           pauseOnVisibilityChange
           draggable
           pauseOnHover
         />
       </Fragment>
     );
   }
 }

 export default withRouter(App); 