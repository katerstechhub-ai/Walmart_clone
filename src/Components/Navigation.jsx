import React, { useState } from 'react';

const Navigation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <nav className="sticky top-0 z-50 shadow-sm">
            {/* Top Row - BLUE BACKGROUND */}
            <div className="bg-[#0071dc]">
                <div className="max-w-[1400px] mx-auto px-5 py-3">
                    {/* Main Row - Logo + Mobile Elements + Desktop Elements */}
                    <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                        {/* Logo - Left side */}
                        <div className="flex-shrink-0">
                            <img
                                src="/walmart-logo.png"
                                alt="Walmart"
                                className="h-8 lg:h-10 w-auto"
                            />
                        </div>

                        {/* DESKTOP ONLY - Pickup/Delivery Button */}
                        <button className="hidden lg:flex items-center w-[20%] gap-2 bg-blue-800 border  rounded-full px-4 py-2 border-blue-500 transition-colors">
                            <img
                                src="/location-icon.png"
                                alt="Location"
                                className="w-6 h-6 rounded-full"
                            />
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
                                <button
                                    type="submit"
                                    className="px-6 bg-white rounded-r-full hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    <img
                                        src="/user-icon.png"
                                        alt="Search"
                                        className="w-6 h-6"
                                    />
                                </button>
                            </form>
                        </div>

                        {/* DESKTOP ONLY - Right Icons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <button className="flex flex-col items-center text-white hover:text-yellow-200">
                                <img
                                    src="/heart-icon.png"
                                    alt="Favorites"
                                    className="w-6 h-6"
                                />
                                <span className="text-xs mt-1">Favorites</span>
                            </button>

                            <button className="flex flex-col items-center text-white hover:text-yellow-200">
                                <img
                                    src="/user-icon.png"
                                    alt="Sign In"
                                    className="w-6 h-6"
                                />
                                <span className="text-xs mt-1">Sign In</span>
                            </button>

                            <button className="flex flex-col items-center text-white hover:text-yellow-200">
                                <img
                                    src="/cart-icon.png"
                                    alt="Cart"
                                    className="w-6 h-6"
                                />
                                <span className="text-xs mt-1">$5.22</span>
                            </button>
                        </div>

                        {/* MOBILE ONLY - Hamburger Menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-white text-2xl"
                        >
                            ☰
                        </button>

                        {/* MOBILE ONLY - Search Text and Cart */}
                        <div className="flex items-center gap-3 lg:hidden">
                            <span className="text-white text-sm">Search Walmart</span>
                            <button className="text-white text-xl">🔍</button>
                            <button className="text-white font-bold text-sm">$0.00</button>
                        </div>
                    </div>

                    {/* MOBILE ONLY - Pickup/Delivery Row */}
                    <div className="lg:hidden mt-2">
                        <div className="text-white text-xs">
                            Pickup or delivery? <span className="font-medium">Sacramento, 95829</span>
                        </div>
                    </div>

                    {/* MOBILE ONLY - Search Bar (hidden, just showing text as per your screenshot) */}
                    <div className="lg:hidden mt-2">
                        <form onSubmit={handleSearch} className="flex w-full">
                            <input
                                type="text"
                                placeholder="Search Walmart"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-4 py-2 bg-white border border-blue-600 border-r-0 rounded-l-full text-blue-800 placeholder:text-blue-400 text-sm outline-none"
                            />
                            <button
                                type="submit"
                                className="px-4 bg-white rounded-r-full flex items-center justify-center"
                            >
                                <span className="text-blue-600 text-xl">🔍</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU - Shows when hamburger is clicked */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg max-h-96 overflow-y-auto">
                    <div className="px-5 py-3">
                        <div className="flex flex-col gap-2">
                            {/* Departments */}
                            <button
                                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                            >
                                <span>Departments</span>
                                <span>▼</span>
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

                            {/* Services */}
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                            >
                                <span>Services</span>
                                <span>▼</span>
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
                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">New Arrivals</button>
                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">bettergoods</button>
                            <button className="px-3 py-2 text-left rounded-lg hover:bg-gray-100">Walmart+</button>

                            {/* More */}
                            <button
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                            >
                                <span>More</span>
                                <span>▼</span>
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

            {/* DESKTOP BOTTOM NAVIGATION - Hidden on mobile */}
            <div className="hidden lg:block bg-blue-50 border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-5">
                    <div className="flex items-center gap-3 py-2">
                        {/* Departments Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                                className="flex items-center gap-1 px-2 py-1 rounded-full hover:border-blue-500 bg-white transition-colors border border-transparent text-gray-700"
                            >
                                <span className="text-sm">Departments</span>
                                <img
                                    src="/cart-icon.png"
                                    alt="drop"
                                    className="w-6 h-6"
                                />
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

                        {/* Services Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className="flex items-center gap-1 px-2 py-1 rounded-full hover:border-blue-500 bg-white transition-colors border border-transparent text-gray-700"
                            >
                                <span className="text-sm">Services</span>
                                <img
                                    src="/cart-icon.png"
                                    alt="drop"
                                    className="w-6 h-6"
                                />
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

                        {/* Regular Buttons */}
                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white transition-colors text-sm border border-transparent text-gray-700">
                            Rollbacks & More
                        </button>

                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">
                            Mother's Day
                        </button>

                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">
                            Get it Fast
                        </button>

                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">
                            Pharmacy
                        </button>

                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">
                            New Arrivals
                        </button>

                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">
                            bettergoods
                        </button>

                        <button className="px-2 py-1 rounded-full hover:border-blue-500 bg-white text-sm transition-colors border border-transparent text-gray-700">
                            Walmart+
                        </button>

                        {/* More Dropdown */}
                        <div className="relative mx-auto">
                            <button
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className="flex items-center gap-1 px-2 py-1 rounded-full hover:border-blue-500 bg-white transition-colors border border-transparent text-gray-700"
                            >
                                <span className="text-sm">More</span>
                                <img
                                    src="/cart-icon.png"
                                    alt="drop"
                                    className="w-6 h-6"
                                />
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