import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteBrandsSection = () => {
    const brands = [
        { id: 1, name: "ARIH", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-cc5e/k2-_dcd83e5e-0a40-41bc-9912-f02b67172aa4.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF", link: "/brand/arih" },
        { id: 2, name: "Apple", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-92f4/k2-_e95a21dd-f7c2-4919-aa58-afe1a5d9df2a.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF", link: "/brand/apple" },
        { id: 3, name: "LEGO", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-7910/k2-_82a33e1b-69bf-4311-97b5-20d3fadce2f2.v1.png?odnHeight=290&odnWidth=290&odnBg=FFFFFF", link: "/brand/lego" },
        { id: 4, name: "SCOOP", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-7d1e/k2-_dbb6eebf-bf71-4689-8009-a15c48099c33.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF", link: "/brand/scoop" },
        { id: 5, name: "The Farmer's Dog", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-d928/k2-_e05b20c3-3db9-4b59-b35c-f19c99370753.v1.png?odnHeight=290&odnWidth=290&odnBg=FFFFFF", link: "/brand/farmers-dog" },
        { id: 6, name: "FOREVER 21", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-8e6e/k2-_68bb1ead-764a-43c7-a298-fec85d5d47a3.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF", link: "/brand/forever21" }
    ];

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-6">New arrivals from your favorite brands</h2>

            {/* 6 Column Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {brands.map((brand) => (
                    <Link
                        key={brand.id}
                        to={brand.link}
                        className="flex flex-col items-center text-center group cursor-pointer"
                    >
                        {/* Brand Image - Circular */}
                        <div className="w-26 h-26 md:w-50 md:h-50 rounded-sm overflow-hidden  mb-1 ">
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="w-45 h-45 object-cover"
                            />
                        </div>
                        {/* Brand Text */}
                        <span className="text-sm font-medium text-gray-700">
                            New from {brand.name}
                        </span>
                    </Link>
                ))}
            </div>
            <div className="border-b border-gray-200 mb-6 mt-6"></div>
        </div>
    );
};

export default FavoriteBrandsSection;