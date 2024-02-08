import React, { useEffect , useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../Functions/Constants';
import Spinner from '../ShimmerAndSpinner/Spinner';
import Api from '../../Functions/api';

const Login = ({path}) => {

     const navigate = useNavigate();
     const {login , isLoading} = Api();

     // * Function to check if the user is already logged in, if already logged in then redirect to the home page
     useEffect(() => {
          const checkAndNavigate = async () => {
               const token = localStorage.getItem('token');
               if (token) {
                    navigate('/');
               }
          };
          checkAndNavigate();
     }, [navigate]);

     const initialValues = {
          email: '',
          password: '',
     };

     const validationSchema = Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
     });


     const onSubmit = async (values) => {
          login(values);
     };

     return (
          <div className={`flex justify-center items-center h-screen bg-gray-100  `}>
              { 
              isLoading ? <div className=' absolute z-30'><Spinner /> </div>: <div></div>
              }
              <div className={`w-96 h-96 bg-white p-5 rounded-lg shadow-lg ${isLoading ? 'opacity-70': `opacity-100`}`}>
                    <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                         <Form className="mt-5">
                              <div className="mb-5">
                                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                                   <Field type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" autoComplete="email" />
                                   <ErrorMessage name="email" component="div" />
                              </div>
                              <div className="mb-5">
                                   <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                                   <Field type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" autoComplete="new-password"/>
                                   <ErrorMessage name="password" component="div" />
                              </div>
                         <button type="submit" className="w-full py-2 px-3 bg-blue-500 text-white rounded-md focus:outline-none" disabled={isLoading}>
                              Login
                         </button>
                         </Form>
                    </Formik>
                    <div className="mt-4 text-center">
                         <Link to="/registration" className="text-blue-500 hover:underline">Don't have an account? Sign up</Link>
                    </div>
               </div>
          </div>
     );
};

export default Login;