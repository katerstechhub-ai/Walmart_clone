import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartFooter from '../Components/CartFooter';

const BASE_URL = 'http://ecommerce.reworkstaging.name.ng/v2';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in">
            {message}
        </div>
    );
};

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [toast, setToast] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('All fields are required');
            return;
        }

        setLoading(true);

        try {
            const resp = await axios.post(`${BASE_URL}/users/login`, {
                email: email.trim(),
                password: password
            });

            if (resp.data && (resp.data.id || resp.data._id || resp.data.token)) {
                localStorage.setItem('walmart_user', JSON.stringify(resp.data));
                if (resp.data.token) {
                    localStorage.setItem('token', resp.data.token);
                }
                setToast('Login successful!');
                setTimeout(() => navigate('/'), 1500);
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 404) {
                setError('Invalid email or password');
            } else {
                setError(err.response?.data?.message || 'Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {toast && <Toast message={toast} onClose={() => setToast('')} />}

            <div className="max-w-[1400px] mx-auto px-5 py-4">
                <img
                    src="https://i5.walmartimages.com/dfw/4ff9c6c9-af86/k2-_47db52a8-75b4-4c98-868a-4cf9248272c5.v1.svg"
                    alt="Walmart"
                    className="h-17 w-17"
                />
            </div>

            <div className="flex-1 flex justify-center items-center px-5 py-8">
                <div className="max-w-md w-80">
                    <h1 className="text-xl text-center font-bold text-gray-800 mb-2">Sign in to your account</h1>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                </div>
            </div>

            <CartFooter />
        </div>
    );
};

export default SignInPage;