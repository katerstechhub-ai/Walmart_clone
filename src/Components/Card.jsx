import React from 'react';

const Card = ({ image, title, price, originalPrice, description, buttonText }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden ">
            {/* Product Image */}
            <div className="relative overflow-hidden ">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover "
                />
                {/* Add to Cart Button */}
                <button className=" bg-white text-black border border-black px-4 py-2 rounded-full  text-sm font-semibold cursor-pointer">
                    {buttonText || "+ Add to Cart"}
                </button>
            </div>
               {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-black">${price}</span>
                    {/* {originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            ${originalPrice}
                        </span>
                    )} */}
                </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px]  cursor-pointer">
                    {title}
                </h3>

               
            </div>
        </div>
    );
};

export default Card;