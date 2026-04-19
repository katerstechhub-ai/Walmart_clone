import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { merchantLogin } from '../../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const MerchantSignIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Check if user is already logged in
    useEffect(() => {
        const checkLoggedIn = () => {
            const merchantData = localStorage.getItem('merchantData');

            if (merchantData) {
                try {
                    const parsedData = JSON.parse(merchantData);
                    if (parsedData && (parsedData.id || parsedData._id)) {
                        navigate('/admin/dashboard');
                    }
                } catch (error) {
                    console.error('Error checking login status:', error);
                    localStorage.removeItem('merchantData');
                    localStorage.removeItem('merchantToken');
                }
            }
        };

        checkLoggedIn();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.email.trim()) {
            setError('Email is required');
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
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await merchantLogin(formData);

            console.log('Login response:', response);
            console.log('Login data:', response.data);

            if (!response || !response.data) {
                throw new Error('No response from server');
            }

            // Your backend returns merchant data directly
            const merchantData = response.data;

            // Check if we have merchant data with an ID
            if (!merchantData.id && !merchantData._id) {
                throw new Error('Invalid response: No merchant ID found');
            }

            // Store merchant data (no token needed for this backend)
            localStorage.setItem('merchantData', JSON.stringify(merchantData));

            // Create a simple session identifier (optional, for consistency)
            const sessionId = `session_${merchantData.id || merchantData._id}_${Date.now()}`;
            localStorage.setItem('merchantToken', sessionId);

            console.log('Login successful for:', merchantData.email || merchantData.store_name);

            // Small delay to ensure storage is complete
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 100);

        } catch (err) {
            console.error('Login error:', err);

            if (err.response) {
                switch (err.response.status) {
                    case 401:
                        setError('Invalid email or password. Please try again.');
                        break;
                    case 404:
                        setError('Account not found. Please sign up first.');
                        break;
                    case 400:
                        setError(err.response.data?.message || 'Invalid request. Please check your credentials.');
                        break;
                    default:
                        setError(err.response.data?.message || 'Login failed. Please try again later.');
                }
            } else if (err.request) {
                setError('Cannot connect to server. Please check your internet connection.');
            } else {
                setError(err.message || 'An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex justify-center items-center py-12 px-5">
                <div className="max-w-md w-full bg-white  p-8">
                    <div className="flex justify-center mb-6">
                       
                            <img
                                src="https://i5.walmartimages.com/dfw/4ff9c6c9-af86/k2-_47db52a8-75b4-4c98-868a-4cf9248272c5.v1.svg"
                                alt="Walmart"
                                className="h-16 w-auto"
                            />
                       
                    </div>

                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Sign In</h1>
                    <p className="text-sm text-gray-600 text-center mb-6">Sign in to manage your store</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    
                                    className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an admin account?{' '}
                            <Link to="/admin/signup" className="text-blue-600 hover:underline font-medium">
                                Create account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MerchantSignIn;