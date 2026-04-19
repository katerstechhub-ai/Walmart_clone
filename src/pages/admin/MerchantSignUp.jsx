import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { merchantSignup } from '../../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const MerchantSignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        store_name: '',
        descp: '',
        password: '',
        confirm_password: '',
        phones: []
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('merchantToken');
        const merchantData = localStorage.getItem('merchantData');

        if (token && merchantData) {
            try {
                const parsedData = JSON.parse(merchantData);
                if (parsedData && (parsedData.id || parsedData._id)) {
                    navigate('/admin/dashboard');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                localStorage.removeItem('merchantToken');
                localStorage.removeItem('merchantData');
            }
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error) setError('');
        if (success) setSuccess('');
    };

    const validateForm = () => {
        if (!formData.first_name.trim()) {
            setError('First name is required');
            return false;
        }
        if (!formData.last_name.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!formData.phone.trim()) {
            setError('Phone number is required');
            return false;
        }
        if (!formData.store_name.trim()) {
            setError('Store name is required');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('Please enter a valid phone number');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const submitData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
            store_name: formData.store_name,
            descp: formData.descp || '',
            password: formData.password,
            phones: formData.phones || []
        };

        try {
            const response = await merchantSignup(submitData);

            console.log('Signup response:', response);
            console.log('Signup response data:', response.data);

            // CRITICAL FIX: Check if the response contains an error message
            // even though status is 200
            if (response.data && response.data.type === 'EXISTS') {
                // This is actually an error, not success
                throw new Error(response.data.msg || 'Email already exists');
            }

            // Check if response has success flag or user data
            if (response.data && (response.data.success === false || response.data.error)) {
                throw new Error(response.data.message || response.data.error || 'Signup failed');
            }

            // If we get here, signup was successful
            setSuccess('Account created successfully! Redirecting to sign in page...');

            // Clear form
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                store_name: '',
                descp: '',
                password: '',
                confirm_password: '',
                phones: []
            });

            // Redirect to signin page after 2 seconds
            setTimeout(() => {
                navigate('/admin/signin');
            }, 2000);

        } catch (err) {
            console.error('Signup error details:', err);

            // Handle specific error cases
            if (err.response?.data?.type === 'EXISTS' || err.message === 'Email already exists') {
                setError('An account with this email already exists. Please sign in instead.');
            } else if (err.response?.data?.msg) {
                setError(err.response.data.msg);
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Signup failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col ">
            <div className="flex-1 flex justify-center items-center py-12 px-5">
                <div className="max-w-md w-full bg-white  p-8">
                    <div className="flex justify-center mb-6">
                       
                            <img
                                src="https://i5.walmartimages.com/dfw/4ff9c6c9-af86/k2-_47db52a8-75b4-4c98-868a-4cf9248272c5.v1.svg"
                                alt="Walmart"
                                className="h-16 w-auto"
                            />
                        
                    </div>

                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Admin Account</h1>
                    <p className="text-sm text-gray-600 text-center mb-6">Register to start selling</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                            {error.includes('already exists') && (
                                <div className="mt-2">
                                    <Link to="/admin/signin" className="text-red-700 underline font-medium">
                                        Click here to sign in
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                   
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                   
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                               
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                               
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Store Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="store_name"
                                value={formData.store_name}
                                onChange={handleChange}
                                
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Store Description
                            </label>
                            <textarea
                                name="descp"
                                value={formData.descp}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                  
                                    className="w-full border border-gray-300 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    disabled={loading}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                               
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an admin account?{' '}
                            <Link to="/admin/signin" className="text-blue-600 hover:underline font-medium">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MerchantSignUp;