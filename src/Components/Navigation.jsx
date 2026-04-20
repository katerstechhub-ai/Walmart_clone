import React, { useState, useEffect } from 'react';
import { BsSearch, BsHeart, BsPerson, BsCart, BsGeoAlt, BsChevronDown, BsList } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { getCart } from '../api';

const Navigation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUserId = () => {
        try {
            const userData = localStorage.getItem('walmart_user');
            if (userData) {
                const parsed = JSON.parse(userData);
                return parsed.id || parsed._id;
            }
            return null;
        } catch {
            return null;
        }
    };

    const getCartExtras = () => {
        return JSON.parse(localStorage.getItem('cartExtras') || '{}');
    };

    // Get current user
    const getCurrentUser = () => {
        try {
            const userData = localStorage.getItem('walmart_user');
            if (userData) {
                return JSON.parse(userData);
            }
            return null;
        } catch {
            return null;
        }
    };

    const updateCartInfo = async () => {
        const userId = getUserId();

        if (!userId) {
            setCartCount(0);
            setCartTotal(0);
            return;
        }

        try {
            const response = await getCart(userId);
            const data = response.data?.data || response.data;
            const extras = getCartExtras();

            let count = 0;
            let total = 0;

            if (data && Array.isArray(data)) {
                data.forEach(cartItem => {
                    const quantity = cartItem.quantity || 1;
                    count += quantity;

                    if (cartItem.products && Array.isArray(cartItem.products)) {
                        cartItem.products.forEach(product => {
                            const productId = product.id || product._id;
                            const extra = extras[productId] || {};
                            const price = extra.price || parseFloat(product.price) || 0;
                            total += price * quantity;
                        });
                    }
                });
            }

            setCartCount(count);
            setCartTotal(total);
        } catch (err) {
            console.error('Error fetching cart for navigation:', err);
            // Fallback to localStorage only
            const extras = getCartExtras();
            const count = Object.keys(extras).length;
            let total = 0;
            Object.values(extras).forEach(item => {
                total += (item.price || 0);
            });
            setCartCount(count);
            setCartTotal(total);
        }
    };

    // Check user authentication status
    const checkUserAuth = () => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    };

    // Handle sign out
    const handleSignOut = () => {
        localStorage.removeItem('walmart_user');
        localStorage.removeItem('cartExtras');
        setUser(null);
        setIsUserMenuOpen(false);
        setCartCount(0);
        setCartTotal(0);

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('userSignedOut'));
        window.dispatchEvent(new Event('cartUpdated'));

        // Navigate to home page
        navigate('/');
    };

    useEffect(() => {
        updateCartInfo();
        checkUserAuth();

        const handleCartUpdate = () => {
            updateCartInfo();
        };

        const handleUserAuthChange = () => {
            checkUserAuth();
            updateCartInfo();
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('storage', handleCartUpdate);
        window.addEventListener('userSignedIn', handleUserAuthChange);
        window.addEventListener('userSignedOut', handleUserAuthChange);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('storage', handleCartUpdate);
            window.removeEventListener('userSignedIn', handleUserAuthChange);
            window.removeEventListener('userSignedOut', handleUserAuthChange);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <nav className="sticky top-0 z-50 shadow-sm">
            <div className="bg-[#0071dc]">
                <div className="max-w-[1400px] mx-auto px-5 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/">
                                <img
                                    src="https://i5.walmartimages.com/dfw/4ff9c6c9-af86/k2-_47db52a8-75b4-4c98-868a-4cf9248272c5.v1.svg"
                                    alt="Walmart"
                                    className="h-8 lg:h-10 w-auto"
                                />
                            </Link>
                        </div>

                        {/* DESKTOP ONLY - Pickup/Delivery Button */}
                        <button className="hidden lg:flex items-center w-[20%] gap-2 bg-blue-800 border rounded-full px-4 py-2 border-blue-500 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-blue-800">
                                <BsGeoAlt className="w-4 h-4 text-blue-800" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-white">Pickup or delivery?</div>
                                <div className="text-sm text-white font-medium">Sacramento, 95829</div>
                            </div>
                        </button>

                        {/* DESKTOP ONLY - Search Bar */}
                        <div className="hidden lg:block flex-1 max-w-[700px]">
                            <form onSubmit={handleSearch} className="flex w-[80%]">
                                <input
                                    type="text"
                                    placeholder="Search everything at Walmart online and in store"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 px-5 py-3 bg-white border border-blue-600 border-r-0 rounded-l-full text-blue-800 placeholder:text-blue-800 text-md outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <button type="submit" className="px-4 bg-white rounded-r-full transition-colors flex items-center justify-center">
                                    <BsSearch className="w-5 h-5 text-blue-600" />
                                </button>
                            </form>
                        </div>

                        {/* DESKTOP ONLY - Right Icons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <button className="flex flex-col items-center text-white hover:text-yellow-200">
                                <BsHeart className="w-6 h-6" />
                                <span className="text-xs mt-1">Favorites</span>
                            </button>

                            {/* User Section - Changes based on auth status */}
                            <div className="relative">
                                {user ? (
                                    <>
                                        <button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex flex-col items-center text-white hover:text-yellow-200"
                                        >
                                            <BsPerson className="w-6 h-6" />
                                            <span className="text-xs mt-1">{user.name || user.email?.split('@')[0]}</span>
                                        </button>

                                        {isUserMenuOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                />
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                                    <div className="px-4 py-2 border-b border-gray-200">
                                                        <p className="text-sm font-medium text-gray-900">{user.name || user.email}</p>
                                                        <p className="text-xs text-gray-500">{user.email}</p>
                                                    </div>
                                                    <Link
                                                        to="/account"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                    >
                                                        My Account
                                                    </Link>
                                                    <Link
                                                        to="/orders"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                    >
                                                        My Orders
                                                    </Link>
                                                    <button
                                                        onClick={handleSignOut}
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-200 mt-1 pt-2"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <Link to="/signin" className="flex flex-col items-center text-white hover:text-yellow-200">
                                        <BsPerson className="w-6 h-6" />
                                        <span className="text-xs mt-1">Sign In</span>
                                    </Link>
                                )}
                            </div>

                            <Link to="/cart" className="flex flex-col items-center text-white hover:text-yellow-200 relative">
                                <div className="relative">
                                    <BsCart className="w-6 h-6" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-3 bg-yellow-400 text-blue-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs mt-1">${cartTotal.toFixed(2)}</span>
                            </Link>
                        </div>

                        {/* MOBILE ONLY - Right side icons */}
                        <div className="flex items-center gap-3 lg:hidden">
                            <button className="text-white">
                                <BsSearch className="w-5 h-5" />
                            </button>

                            {/* Mobile User Section */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="text-white"
                                    >
                                        <BsPerson className="w-5 h-5" />
                                    </button>
                                    {isUserMenuOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            />
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                                <div className="px-4 py-2 border-b border-gray-200">
                                                    <p className="text-sm font-medium text-gray-900">{user.name || user.email}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <Link to="/signin" className="text-white">
                                    <BsPerson className="w-5 h-5" />
                                </Link>
                            )}

                            <Link to="/cart" className="text-white relative">
                                <BsCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-yellow-400 text-blue-800 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white"
                            >
                                <BsList className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* MOBILE ONLY - Pickup/Delivery Row */}
                    <div className="lg:hidden mt-2">
                        <div className="text-white text-xs">
                            Pickup or delivery? <span className="font-medium">Sacramento, 95829</span>
                        </div>
                    </div>

                    {/* MOBILE ONLY - Search Bar */}
                    <div className="lg:hidden mt-2">
                        <form onSubmit={handleSearch} className="flex w-full">
                            <input
                                type="text"
                                placeholder="Search Walmart"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-4 py-2 bg-white border border-blue-600 border-r-0 rounded-l-full text-blue-800 placeholder:text-blue-400 text-sm outline-none"
                            />
                            <button type="submit" className="px-4 bg-white rounded-r-full flex items-center justify-center">
                                <BsSearch className="text-blue-600 w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg max-h-96 overflow-y-auto">
                    <div className="px-5 py-3">
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                            >
                                <span>Departments</span>
                                <BsChevronDown className="w-4 h-4" />
                            </button>
                            {isDepartmentsOpen && (
                                <div className="pl-4 space-y-1">
                                    <a href="#" className="block py-1 text-sm text-gray-700">Electronics</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">Clothing</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">Home & Furniture</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">Grocery</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">Toys</a>
                                </div>
                            )}

                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                            >
                                <span>Services</span>
                                <BsChevronDown className="w-4 h-4" />
                            </button>
                            {isServicesOpen && (
                                <div className="pl-4 space-y-1">
                                    <a href="#" className="block py-1 text-sm text-gray-700">Auto Care</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">Pharmacy</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">Vision & Optical</a>
                                </div>
                            )}

                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">Rollbacks & More</button>
                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">Mother's Day</button>
                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">Get it Fast</button>
                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">Pharmacy</button>
                            <Link to="/new-arrivals" className="px-3 py-2 text-left rounded-lg hover:bg-gray-100 text-sm text-gray-700">New Arrivals</Link>
                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">bettergoods</button>
                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">Walmart+</button>

                            <button
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                            >
                                <span>More</span>
                                <BsChevronDown className="w-4 h-4" />
                            </button>
                            {isMoreOpen && (
                                <div className="pl-4 space-y-1">
                                    <a href="#" className="block py-1 text-sm text-gray-700">Meals Made Easy</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">My Items</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">Only at Walmart</a>
                                    <a href="#" className="block py-1 text-sm text-gray-700">Credit Card</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* DESKTOP BOTTOM NAVIGATION */}
            <div className="hidden lg:block bg-blue-50 border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-5">
                    <div className="flex items-center gap-3 py-2">
                        <div className="relative">
                            <button
                                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                                className="flex items-center gap-1 px-2 py-1 rounded-full hover:border-blue-500 bg-white transition-colors border border-transparent text-gray-700"
                            >
                                <span className="text-sm">Departments</span>
                                <BsChevronDown className="w-4 h-4" />
                            </button>
                            {isDepartmentsOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                    <div className="p-3">
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Electronics</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Clothing</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Home & Furniture</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Grocery</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Toys</a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className="flex items-center gap-1 px-2 py-1 rounded-full hover:border-blue-500 bg-white transition-colors border border-transparent text-gray-700"
                            >
                                <span className="text-sm">Services</span>
                                <BsChevronDown className="w-4 h-4" />
                            </button>
                            {isServicesOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                    <div className="p-3">
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Auto Care</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Pharmacy</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Vision & Optical</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Financial Services</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Photo Services</a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white transition-colors text-sm border border-transparent text-gray-700">Rollbacks & More</button>
                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">Mother's Day</button>
                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">Get it Fast</button>
                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">Pharmacy</button>
                        <Link to="/new-arrivals" className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">New Arrivals</Link>
                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">bettergoods</button>
                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">Walmart+</button>

                        <div className="relative mx-auto">
                            <button
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className="flex items-center gap-1 px-2 py-1 rounded-full hover:border-blue-500 bg-white transition-colors border border-transparent text-gray-700"
                            >
                                <span className="text-sm">More</span>
                                <BsChevronDown className="w-4 h-4" />
                            </button>
                            {isMoreOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                    <div className="p-3">
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Meals Made Easy</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">My Items</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Only at Walmart</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Credit Card</a>
                                        <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 text-xs">Gift Cards</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;