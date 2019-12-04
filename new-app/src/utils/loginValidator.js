import * as EmailValidator from 'email-validator';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

 function loginValidator(email, password) {
     if (!EmailValidator.validate(email)) {
         toast.error('Please provide a correct email address');
         return false;
     }
     if (password.length < 8 || password === '') {
         toast.error('Password must be at least 8 characters long');
         return false;
     }

     return true;
 }

 export default loginValidator; 