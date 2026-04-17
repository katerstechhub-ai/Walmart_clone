import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RelatedItemCard = ({ tag, image, price, originalPrice, title, rating, ratingCount, shipping, size, isSponsored }) => {
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
        <div className=" p-3 bg-white ">
            {/* Product Image */}
            <div className="mb-2">
                <img
                    src={image}
                    alt={title}
                    className="w-55 h-50 object-cover rounded"
                />
            </div>

            {/* Tag */}
            {tag && (
                <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-semibold mb-2 ${tag === 'Best seller' ? 'bg-blue-200 text-blue-900' :
                        tag === 'Sponsored' ? 'bg-gray-200 text-gray-700' :
                            tag === 'Clearance' ? 'bg-red-200 text-blue-900' :
                                tag === 'Reduced price' ? 'bg-green-200 text-blue-900' :
                                    'bg-gray-200 text-gray-700'
                    }`}>
                    {tag}
                </span>
            )}

            {/* Price */}
            <div className="mb-1">
                {price.includes('Now') ? (
                    <span className="text-lg font-bold">{price}</span>
                ) : (
                    <span className="text-lg font-bold">${price}</span>
                )}
                {originalPrice && (
                    <span className="text-xs text-gray-400 line-through ml-1">${originalPrice}</span>
                )}
            </div>

            {/* Title */}
            <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] mb-1">
                {title}
            </p>

            {/* Size */}
            {size && (
                <p className="text-[10px] text-gray-500 mt-1">{size}</p>
            )}

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

            {/* Sponsored flag */}
            {isSponsored && (
                <p className="text-[8px] text-gray-400 mt-1">Sponsored</p>
            )}
        </div>
    );
};

export default RelatedItemCard;