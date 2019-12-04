import React, { Component, Fragment } from 'react';
 import { Switch, Route, withRouter } from 'react-router-dom';
 import { ToastContainer } from 'react-toastify';
 import { isUserAuthenticated, getToken, getUsername, isUserAdmin } from './utils/auth';
 import HomePage from './components/HomePage';
 import Navbar from './components/Navbar';

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
     {/*this.props.fetchStats()
     this.props.fetchProducts()*/}
   }

   logout() {
     this.setState({ loggedIn: false });
     window.localStorage.clear();
     this.props.history.push('/');
   }

   render() {
     return (
       <Fragment>
         <Navbar
           /*products={productsCount}
           users={usersCount}*/
           loggedIn={this.state.loggedIn}
           isAdmin={isUserAdmin()}
           logout={this.logout}
         />
         <Switch>
           <Route exact path='/' component={HomePage} />
           {/*<Route exact path='/store' component={StorePage} />
           */}
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