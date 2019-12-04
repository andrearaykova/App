import * as EmailValidator from 'email-validator';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

 function registerValidator(username, email, password, confirmPassword) {
     if (username.length < 5 || username === '') {
         toast.error('Username must be at least 5 characters long');
         return false;
     }
     if (!EmailValidator.validate(email)) {
         toast.error('Please provide a correct email address');
         return false;
     }
     if (password.length < 8 || password === '') {
         toast.error('Password must be at least 8 characters long');
         return false;
     }
     if (password !== confirmPassword) {
         toast.error('Passwords do not match');
         return false;
     }

     return true;
 }

 export default registerValidator; 