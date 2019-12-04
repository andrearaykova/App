import React, { Component } from 'react';
 import errorHandler from '../utils/errorHandler';
 import createProductValidator from '../utils/createProductValidator';
 import { createProduct } from '../api/remote';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { withRouter } from 'react-router-dom';

 class CreatePage extends Component {
     constructor(props) {
         super(props);

         this.state = {
             title: '',
             description: '',
             price: '',
             image: ''
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

         const title = this.state.title;
         const description = this.state.description;
         const image = this.state.image;
         const price = this.state.price;

         if (createProductValidator(title, description, image, price)) {
             createProduct({ title, description, image, price })
                 .then(json => {
                     if (json.success) {
                         toast.success('Product added!');
                         this.setState({
                             title: '',
                             description: '',
                             price: '',
                             image: ''
                         });
                     } else {
                         const error = errorHandler(json);
                         toast.error(error);
                     }
                 });
         }
     }

     render() {
         if (!this.props.isAdmin) {
             this.props.history.push('/');
             return null;
         }

         return (
             <div class="w3-content" style={{ maxWidth: '1100px', 'margin-top': '80px', 'margin-bottom': '80px' }}>
                 <div class="w3-center w3-padding-64">
                     <span class="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">Create Product</span>
                 </div>
                 <form className="w3-container" onSubmit={this.handleSubmit}>
                     <input className="w3-input" type="text" placeholder="Title" name="title"
                         value={this.state.title} onChange={this.handleChange} style={{ width: '100%' }} /><br />
                     <input className="w3-input" type="text" placeholder="Description" name="description"
                         value={this.state.description} onChange={this.handleChange} /><br />
                     <input className="w3-input" type="number" placeholder="Price in BGN" name="price"
                         value={this.state.price} onChange={this.handleChange} /><br />
                     <input className="w3-input" type="text" placeholder="Image URL" name="image"
                         value={this.state.image} onChange={this.handleChange} /><br />
                     <button className="w3-button w3-block w3-black" type="submit">Create</button>
                 </form>
             </div>
         );
     }
 }

 export default withRouter(CreatePage); 