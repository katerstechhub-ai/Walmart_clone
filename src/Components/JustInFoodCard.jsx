import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const JustInFoodCard = ({ tag, image, price, originalPrice, youSave, unitPrice, title, rating, ratingCount, shipping, pickup, delivery, size, saveWithW, buttonText, buttonOptions }) => {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500 text-[10px]" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-[10px]" />);
        }
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500 text-[10px]" />);
        }
        return stars;
    };

    return (
        <div className="p-3 bg-white">
            <div className="mb-2">
                <img src={image} alt={title} className="w-50 h-50 object-cover rounded" />
            </div>
            <button className="w-20 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 rounded-full mb-2 transition-colors">
                {buttonText || buttonOptions || '+ Add'}
            </button>


            <div className="mb-1">
                <span className="text-lg font-bold">${price}</span>
                {unitPrice && <span className="text-xs text-gray-500 ml-1">{unitPrice}</span>}
                {originalPrice && <span className="text-xs text-gray-400 line-through ml-1">${originalPrice}</span>}
                {youSave && <span className="text-[10px] text-green-600 ml-1">You save ${youSave}</span>}
            </div>

            <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] mb-1">{title}</p>

            {size && <p className="text-[10px] text-gray-500 mt-1">{size}</p>}

            {rating && (
                <div className="flex items-center gap-1 mt-1">
                    <div className="flex gap-0.5">{renderStars(rating)}</div>
                    {ratingCount && <span className="text-[9px] text-gray-500">{ratingCount}</span>}
                </div>
            )}

            {saveWithW && <p className="text-[10px] text-blue-600 font-semibold mt-1">Save with W+</p>}

            {shipping && <p className="text-[9px] text-gray-500 mt-1">{shipping}</p>}
            {pickup && <p className="text-[9px] text-gray-500">{pickup}</p>}
            {delivery && <p className="text-[9px] text-gray-500">{delivery}</p>}
        </div>
    );
};

export default JustInFoodCard;