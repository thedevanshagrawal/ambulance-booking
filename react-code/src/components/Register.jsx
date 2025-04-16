import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    const response = await axios.post("import.meta.env.BACKEND_API/api/users/register", formData)

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        navigate('/login')
        setFormData({
          fullName: '',
          email: '',
          password: ''
        });
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-8 text-center text-purple-400">
              Create an Account
            </h2>
            
            {isSubmitted ? (
              <div className="text-center py-8 text-green-400 animate-pulse">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-xl">Registration Successful!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
                    placeholder="Create a strong password"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-md px-4 py-3 text-white font-medium transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-purple-700 cursor-not-allowed' 
                        : 'bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
                
                <p className="text-sm text-gray-400 text-center mt-6">
                  Already have an account?{' '}
                  <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;