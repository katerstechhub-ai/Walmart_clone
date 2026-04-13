import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, title, price, originalPrice, description, buttonText, id }) => {
    return (
        <Link to={`/product/${id}`} className="block bg-white rounded-lg overflow-hidden cursor-pointer group">
            {/* Product Image */}
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Add to Cart Button */}
                <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black border border-black px-4 py-2 rounded-full text-sm font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {buttonText || "+ Add to Cart"}
                </button>
            </div>
            {/* Price */}
            <div className="flex items-baseline gap-2 px-4 pt-3">
                <span className="text-xl font-bold text-black">${price}</span>
                {originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                        ${originalPrice}
                    </span>
                )}
            </div>
            {/* Product Info */}
            <div className="p-4 pt-1">
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px]">
                    {title}
                </h3>
            </div>
        </Link>
    );
};

export default Card;
