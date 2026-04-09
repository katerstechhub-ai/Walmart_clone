import React, { useState } from 'react';

const Navigation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            
                {/* Top Bar */}
                <div className="bg-[#0071dc] text-white">
                    <div className="max-w-[1400px] mx-auto px-5 py-3 flex items-center gap-8">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2 text-2xl font-bold no-underline text-white">
                            <span className="text-3xl">🛒</span>
                            <span>Walmart</span>
                        </a>

                        {/* Search Bar */}
                        <div className={`flex - 1 max-w-[600px] ${isSearchFocused ? 'ring-2 ring-yellow-300 rounded-lg' : ''}`}>
                        <form onSubmit={handleSearch} className="flex w-full">
                            <input
                                type="text"
                                placeholder="Search everything at Walmart..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className="flex-1 px-4 py-3 border-none rounded-l-lg text-gray-800 text-base outline-none"
                            />
                            <button
                                type="submit"
                                className="px-6 bg-[#ffc220] border-none rounded-r-lg cursor-pointer text-xl hover:bg-[#ffb300] transition-colors"
                            >
                                🔍
                            </button>
                        </form>
                    </div>

                    {/* Cart Icon - Simple */}
                    <a href="/cart" className="flex items-center gap-2 no-underline text-white">
                        <span className="text-2xl">🛒</span>
                        <span className="font-medium">Cart</span>
                    </a>
                </div>
            </div>

            {/* Category Bar */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-5">
                    <ul className="flex gap-8 py-3 m-0 list-none">
                        <li><a href="#" className="no-underline text-gray-700 text-sm font-medium hover:text-[#0071dc]">Departments</a></li>
                        <li><a href="#" className="no-underline text-gray-700 text-sm font-medium hover:text-[#0071dc]">Electronics</a></li>
                        <li><a href="#" className="no-underline text-gray-700 text-sm font-medium hover:text-[#0071dc]">Clothing</a></li>
                        <li><a href="#" className="no-underline text-gray-700 text-sm font-medium hover:text-[#0071dc]">Home & Furniture</a></li>
                        <li><a href="#" className="no-underline text-gray-700 text-sm font-medium hover:text-[#0071dc]">Grocery</a></li>
                        <li><a href="#" className="no-underline text-gray-700 text-sm font-medium hover:text-[#0071dc]">Toys</a></li>
                        <li><a href="#" className="no-underline text-gray-700 text-sm font-medium hover:text-[#0071dc]">Seasonal</a></li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default Navigation;