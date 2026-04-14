import React from 'react';
import { Link } from 'react-router-dom';

const Card4 = ({ image, title, price, originalPrice, buttonText, id, shipping, unit }) => {
    return (
        <Link to={`/product/${id}`} className="block bg-white rounded-lg overflow-hidden cursor-pointer group  ">
            {/* Product Image */}
            <div className="relative overflow-hidden ">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover "
                />
                {/* Add to Cart Button */}
                <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black border border-black px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {buttonText || "+ Add"}
                </button>
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
                {unit && (
                    <p className="text-xs text-gray-500 mt-0.5">{unit}</p>
                )}
                {shipping && (
                    <p className="text-xs text-gray-500 mt-0.5">{shipping}</p>
                )}
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-xs mt-2 line-clamp-2 min-h-[32px]">
                    {title}
                </h3>
            </div>
        </Link>
    );
};

export default Card4;