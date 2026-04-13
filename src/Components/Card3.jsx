import React from 'react';
import { Link } from 'react-router-dom';

const Card3 = ({ image, title, price, originalPrice, shipping, id }) => {
    return (
        <Link to={`/product/${id}`} className="block bg-white rounded-lg  overflow-hidden group cursor-pointer">
            {/* Product Image */}
            <div className="relative overflow-hidden bg-gray-50">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="p-3">
                {/* Price */}
                <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-lg font-bold text-black">${price}</span>
                    {originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            ${originalPrice}
                        </span>
                    )}
                </div>
                {shipping && (
                    <p className="text-xs text-gray-500 mt-0.5">{shipping}</p>
                )}
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-sm mt-2 line-clamp-2 min-h-[40px]">
                    {title}
                </h3>
            </div>
        </Link>
    );
};

export default Card3;