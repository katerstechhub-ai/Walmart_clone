import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const PopularItemsCard = ({ tag, image, price, originalPrice, youSave, title, rating, ratingCount, shipping, moreOptions, saveWithW }) => {
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
        <div className=" rounded-lg p-3 bg-white">
            {/* Product Image */}
            <div className="mb-2">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-32 object-cover rounded"
                />
            </div>

            {/* Tag */}
            {tag && (
                <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-semibold mb-2 ${tag === 'Best seller' ? 'bg-blue-200 text-blue-900' :
                        tag === 'Clearance' ? 'bg-red-500 text-white' :
                            'bg-gray-200 text-gray-700'
                    }`}>
                    {tag}
                </span>
            )}

            {/* Save with W+ badge */}
            {saveWithW && (
                <span className="inline-block bg-blue-100 text-blue-800 text-[9px] px-2 py-0.5 rounded font-semibold mb-2 ml-1">
                    Save with W+
                </span>
            )}

            {/* Price */}
            <div className="mb-1">
                {price.includes('New') ? (
                    <span className="text-lg font-bold">{price}</span>
                ) : (
                    <span className="text-lg font-bold">${price}</span>
                )}
                {originalPrice && (
                    <span className="text-xs text-gray-400 line-through ml-1">${originalPrice}</span>
                )}
            </div>

            {/* You Save */}
            {youSave && (
                <p className="text-[10px] text-green-600 font-semibold">You save: ${youSave}</p>
            )}

            {/* More Options */}
            {moreOptions && (
                <p className="text-[10px] text-gray-500">{moreOptions}</p>
            )}

            {/* Title */}
            <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] mb-1 mt-1">
                {title}
            </p>

            {/* Rating */}
            {rating && (
                <div className="flex items-center gap-1 mt-1">
                    <div className="flex gap-0.5">
                        {renderStars(rating)}
                    </div>
                    {ratingCount && (
                        <span className="text-[9px] text-gray-500">{ratingCount}</span>
                    )}
                </div>
            )}

            {/* Shipping Info */}
            {shipping && (
                <p className="text-[9px] text-gray-500 mt-1">{shipping}</p>
            )}
        </div>
    );
};

export default PopularItemsCard;