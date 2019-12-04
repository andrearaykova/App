import React, { Component } from 'react';
 import { login, register } from '../api/remote';
 import registerValidator from '../utils/registerValidator';
 import errorHandler from '../utils/errorHandler';
 import { toast } from 'react-toastify';
 import { withRouter } from 'react-router-dom';

 class RegisterPopup extends Component {
     constructor(props) {
         super(props);

         this.state = {
             emailRegister: '',
             passwordRegister: '',
             passwordConfirm: '',
             username: '',
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

         const email = this.state.emailRegister;
         const username = this.state.username;
         const password = this.state.passwordRegister;
         const confirmPassword = this.state.passwordConfirm;

         if (registerValidator(username, email, password, confirmPassword)) {
             register(username, email, password)
                 .then(json => {
                     if (json.success) {
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
                 <div id="id02" className="w3-modal">
                     <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ 'maxWidth': '600px' }}>

                         <div className="w3-center"><br />
                             <span onClick={() => { document.getElementById('id02').style.display = 'none'; }}
                                 className="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                             <img src={require('../resources/images/img_avatar4.png')} alt="Avatar" style={{ width: '30%' }} className="w3-circle w3-margin-top"></img>
                         </div>

                         <form className="w3-container" onSubmit={this.handleSubmit}>
                             <div className="w3-section">
                                 <label><b>Username</b></label>
                                 <input className="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter username..." name="username" required
                                     value={this.state.username} onChange={this.handleChange} />
                                 <label><b>E-mail</b></label>
                                 <input className="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter e-mail..." name="emailRegister" required
                                     value={this.state.emailRegister} onChange={this.handleChange} />
                                 <label><b>Password</b></label>
                                 <input className="w3-input w3-border w3-margin-bottom" type="password" placeholder="Enter password..." name="passwordRegister" required
                                     value={this.state.passwordRegister} onChange={this.handleChange} />
                                 <label><b>Confirm Password</b></label>
                                 <input className="w3-input w3-border w3-margin-bottom" type="password" placeholder="Confirm password..." name="passwordConfirm" required
                                     value={this.state.passwordConfirm} onChange={this.handleChange} />
                                 <button className="w3-button w3-block w3-green w3-section w3-padding" type="submit">Register</button>
                             </div>
                         </form>

                         <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
                             <button onClick={() => { document.getElementById('id02').style.display = 'none'; }}
                                 type="button" className="w3-button w3-red">Cancel</button>
                         </div>

                     </div>
                 </div>
             </div>
         );
     }
 }

 export default withRouter(RegisterPopup); 