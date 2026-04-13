import React from 'react';
import { Link } from 'react-router-dom';

const Card2 = ({ image, title, price, originalPrice, badge, id }) => {
    return (
        <Link to={`/product/${id}`} className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer">
            {/* Product Image */}
            <div className="relative overflow-hidden bg-gray-50">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-32 object-cover cursor-pointer"
                />
                {/* Badge */}
                {badge && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                        {badge}
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div className="p-2">
                {/* Price */}
                <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-black">${price}</span>
                    {originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            ${originalPrice}
                        </span>
                    )}
                </div>
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-[15px] mb-1 line-clamp-2 min-h-[32px]">
                    {title}
                </h3>
            </div>
        </Link>
    );
};

export default Card2;