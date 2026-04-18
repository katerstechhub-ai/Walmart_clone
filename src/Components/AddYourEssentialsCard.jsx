import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const AddEssentialsCard = ({ image, tag, unitPrice, title, price, unit, rating, ratingCount, saveWithW, pickup, delivery, shipping, buttonText, rollback }) => {
    // Render stars based on rating
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
        
        <div className=" p-3  bg-white ">
            {/* Product Image */}
            <div className="mb-2">
                <img src={image} alt={title} className="w-full h-32 object-cover rounded" />
            </div>
            {buttonText && (
                <button className="w-20 bg-blue-600 border rounded-full py-1 px-2 text-xs font-medium text-white mt-2">
                    {buttonText}
                </button>
            )}

            {/* Tag */}
            {tag && (
                <span className="inline-block bg-blue-200 text-blue-900 text-[9px] px-2 py-0.5 rounded font-semibold mb-2">
                    {tag}
                </span>
            )}

            {/* Rollback tag */}
            {rollback && (
                <span className="inline-block bg-red-500 text-white text-[9px] px-2 py-0.5 rounded font-semibold mb-2 ml-1">
                    Rollback
                </span>
            )}

            {/* Unit / Quantity Info */}
            {unitPrice && (
                <p className="text-[10px] text-gray-500 mb-1">{unitPrice}</p>
            )}

            {/* Title */}
            <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] mb-1">
                {title}
            </p>

            {/* Price */}
            <div className="mb-1">
                <span className="text-sm font-bold text-gray-800">${price}</span>
                {unit && <span className="text-[10px] text-gray-500 ml-1">{unit}</span>}
            </div>

            {/* Rating */}
            {rating && (
                <div className="flex items-center gap-1 mt-1">
                    <div className="flex gap-0.5">{renderStars(rating)}</div>
                    {ratingCount && <span className="text-[9px] text-gray-500">{ratingCount}</span>}
                </div>
            )}

            {/* Save with W+ */}
            {saveWithW && (
                <p className="text-[10px] text-blue-600 font-semibold mt-1">Save with W+</p>
            )}

            {/* Pickup / Delivery / Shipping */}
            <div className="flex flex-wrap gap-1 mt-1">
                {pickup && <p className="text-[9px] text-gray-500">{pickup}</p>}
                {delivery && <p className="text-[9px] text-gray-500">{delivery}</p>}
                {shipping && <p className="text-[9px] text-gray-500">{shipping}</p>}
            </div>


        </div>
    );
};

export default AddEssentialsCard;