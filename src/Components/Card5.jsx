import React from 'react';
import { Link } from 'react-router-dom';

const Card5 = ({ image, title, price, originalPrice, buttonText, id }) => {
    return (
        <Link to={`/product/${id}`} className="block bg-white overflow-hidden cursor-pointer group ">
            {/* Product Image */}
            <div className="relative overflow-hidden bg-gray-50 ">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover "
                />
                {/* Button */}
                <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black border border-black px-3 py-1 rounded-full text-xs font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {buttonText || "Options"}
                </button>
            </div>

            {/* Product Info */}
            <div className="p-2">
                {/* Price */}
                <div className="flex items-baseline gap-1">
                    <span className="text-md font-bold text-green-700">${price}</span>
                    {originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            ${originalPrice}
                        </span>
                    )}
                </div>
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-md t-1 line-clamp-2 min-h-[32px]">
                    {title}
                </h3>
            </div>
        </Link>
    );
};

export default Card5;