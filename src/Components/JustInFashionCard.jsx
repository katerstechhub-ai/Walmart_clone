import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const JustInFashionCard = ({ tag, image, price, originalPrice, youSave, unitPrice, title, rating, ratingCount, shipping, pickup, delivery, size }) => {
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
        <div className="p-3 bg-white">
            {/* Product Image */}
            <div className="mb-2">
                <img
                    src={image}
                    alt={title}
                    className="w-50 h-50 object-cover rounded"
                />
            </div>

            {/* Tag */}
            {tag && (
                <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-semibold mb-2 ${tag === 'Best seller' ? 'bg-blue-200 text-blue-900' :
                    tag === 'Sponsored' ? 'bg-gray-200 text-gray-700' :
                        tag === 'In 100+ people\'s carts' ? 'bg-orange-200 text-blue-900' :
                            tag === 'In 50+ people\'s carts' ? 'bg-orange-200 text-blue-900' :
                                tag === 'In 25+ people\'s carts' ? 'bg-orange-200 text-blue-900' :
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
                {youSave && (
                    <span className="text-[10px] text-green-600 ml-1">You save ${youSave}</span>
                )}
            </div>

            {/* Unit Price / Options */}
            {unitPrice && (
                <p className="text-[10px] text-gray-500">{unitPrice}</p>
            )}

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

            {/* Shipping / Pickup / Delivery */}
            {shipping && (
                <p className="text-[9px] text-gray-500 mt-1">{shipping}</p>
            )}
            {pickup && (
                <p className="text-[9px] text-gray-500">{pickup}</p>
            )}
            {delivery && (
                <p className="text-[9px] text-gray-500">{delivery}</p>
            )}
        </div>
    );
};

export default JustInFashionCard;
