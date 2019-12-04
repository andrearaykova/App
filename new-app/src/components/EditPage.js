import React, { Component } from 'react';
 import errorHandler from '../utils/errorHandler';
 import createProductValidator from '../utils/createProductValidator';
 import { editProduct, fetchProducts } from '../api/remote';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { withRouter } from 'react-router-dom';

 class EditPage extends Component {
     constructor(props) {
         super(props);

         this.state = {
             title: '',
             description: '',
             price: '',
             image: '',
             id: ''
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
         const id = this.state.id;

         if (createProductValidator(title, description, image, price)) {
             editProduct(id, { title, description, image, price })
                 .then(json => {
                     if (json.success) {
                         this.props.history.push('/');
                     } else {
                         const error = errorHandler(json);
                         toast.error(error);
                     }
                 });
         }
     }

     async componentDidMount() {
         const products = await fetchProducts();

         let found = false;
         let foundProduct = {};
         const id = window.location.pathname.split('edit/')[1];

         for (const product of products) {
             if (product._id === id) {
                 found = true;
                 foundProduct = product;
                 break;
             }
         }

         if (!found) {
             this.props.history.push('/');
             return null;
         }

         this.setState({
             title: foundProduct.title,
             description: foundProduct.description,
             price: foundProduct.price,
             image: foundProduct.image,
             id: foundProduct._id,
         });
     }

     render() {
         if (!this.props.isAdmin) {
             this.props.history.push('/');
             return null;
         }

         return (
             <div class="w3-content" style={{ maxWidth: '1100px', 'margin-top': '80px', 'margin-bottom': '80px' }}>
                 <div class="w3-center w3-padding-64">
                     <span class="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">Edit Product</span>
                 </div>
                 <form className="w3-container" onSubmit={this.handleSubmit}>
                     <input className="w3-input" type="text" placeholder="Title" name="title"
                         value={this.state.title} onChange={this.handleChange} /><br />
                     <input className="w3-input" type="text" placeholder="Description" name="description"
                         value={this.state.description} onChange={this.handleChange} /><br />
                     <input className="w3-input" type="number" placeholder="Price in BGN" name="price"
                         value={this.state.price} onChange={this.handleChange} /><br />
                     <input className="w3-input" type="text" placeholder="Image URL" name="image"
                         value={this.state.image} onChange={this.handleChange} /><br />
                     <button className="w3-button w3-block w3-black" type="submit">Edit</button>
                 </form>
             </div>
         );
     }
 }

 export default withRouter(EditPage); 