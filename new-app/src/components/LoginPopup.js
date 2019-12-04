import React, { Component } from 'react';
 import { login } from '../api/remote';
 import loginValidator from '../utils/loginValidator';
 import errorHandler from '../utils/errorHandler';
 import { toast } from 'react-toastify';
 import { withRouter } from 'react-router-dom';

 class LoginPopup extends Component {
     constructor(props) {
         super(props);

         this.state = {
             emailLogin: '',
             passwordLogin: ''
         };

         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleChange(event) {
         this.setState({
             [event.target.name]: event.target.value
         });
     }

     handleSubmit(event) {
         event.preventDefault();

         const email = this.state.emailLogin;
         const password = this.state.passwordLogin;

         if (loginValidator(email, password)) {
             login(email, password)
                 .then(json => {
                     if (json.success) {
                         this.authenticateUser(json);
                         this.props.history.push('/');
                     } else {
                         const error = errorHandler(json);
                         toast.error(error);
                     }
                 });
         }
     }

     authenticateUser(json) {
         window.localStorage.setItem('authToken', json.token);
         window.localStorage.setItem('username', json.user.username);
         if (json.user.roles && json.user.roles.length > 0) {
             window.localStorage.setItem('roles', json.user.roles);
         }
     }

     render() {
         return (
             <div className="w3-container">
                 <div id="id01" className="w3-modal">
                     <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ 'maxWidth': '600px' }}>

                         <div className="w3-center"><br />
                             <span onClick={() => { document.getElementById('id01').style.display = 'none'; }}
                                 className="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                             <img src={require('../resources/images/img_avatar4.png')} alt="Avatar" style={{ width: '30%' }} className="w3-circle w3-margin-top"></img>
                         </div>

                         <form className="w3-container" onSubmit={this.handleSubmit}>
                             <div className="w3-section">
                                 <label><b>E-mail</b></label>
                                 <input className="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter e-mail..." name="emailLogin" required
                                     value={this.state.username} onChange={this.handleChange} />
                                 <label><b>Password</b></label>
                                 <input className="w3-input w3-border" type="password" placeholder="Enter password..." name="passwordLogin" required
                                     value={this.state.password} onChange={this.handleChange} />
                                 <button className="w3-button w3-block w3-green w3-section w3-padding" type="submit">Login</button>
                             </div>
                         </form>

                         <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
                             <button onClick={() => { document.getElementById('id01').style.display = 'none'; }}
                                 type="button" className="w3-button w3-red">Cancel</button>
                         </div>

                     </div>
                 </div>
             </div>
         );
     };
 }

 export default withRouter(LoginPopup); 