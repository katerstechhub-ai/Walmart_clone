import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RatingCard = ({
    id,
    tag,
    tagColor,
    image,
    price,
    originalPrice,
    title,
    rating,
    ratingCount,
    shipping,
    unitPrice,
    saveWithW // Add this if needed
}) => {

    // Use the exact same method from Card component
    const addToRecentlyViewed = () => {
        const stored = localStorage.getItem('recentlyViewed');
        let recentItems = stored ? JSON.parse(stored) : [];

        recentItems = recentItems.filter(item => item.id !== id);

        // Add full product data to beginning
        recentItems.unshift({
            id, // Make sure ID is included
            image: image,
            title: title,
            nowPrice: price,
            originalPrice: originalPrice || null,
            youSave: originalPrice ? (parseFloat(originalPrice) - parseFloat(price)).toFixed(2) : null,
            tag: tag || null,
            rating: rating || 0,
            ratingCount: ratingCount || null,
            saveWithW: saveWithW || false,
            shipping: shipping || null,
            unitPrice: unitPrice || null,
            timestamp: Date.now() // Add timestamp to track when it was viewed
        });

        // Keep only last 8 
        recentItems = recentItems.slice(0, 8);

        localStorage.setItem('recentlyViewed', JSON.stringify(recentItems));

        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event('storage'));

        console.log('Added to recently viewed:', id, title);
        console.log('Total items in recently viewed:', recentItems.length);
    };

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
        <Link
            to={`/product/${id}`}
            onClick={addToRecentlyViewed}
            className="block bg-white rounded-lg overflow-hidden cursor-pointer group"
        >
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
                    <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-bold mb-2 ${tag === 'Best seller' ? 'bg-blue-200 text-blue-900' :
                        tag === 'Clearance' ? 'bg-red-200 text-blue-900 font-bold' :
                            tag === 'Sponsored' ? 'bg-gray-200 text-gray-700' :
                                tag === 'In 50+ people\'s carts' ? 'bg-orange-500 text-white' :
                                    'bg-gray-200 text-gray-700'
                        }`}>
                        {tag}
                    </span>
                )}

                {/* Price */}
                <div className="mb-1">
                    <span className="text-lg font-bold">${price}</span>
                    {originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-1">${originalPrice}</span>
                    )}
                    {unitPrice && (
                        <p className="text-[10px] text-gray-500">{unitPrice}</p>
                    )}
                </div>

                {/* Title */}
                <p className="text-xs font-medium text-gray-800 line-clamp-2 min-h-[32px] mb-1">
                    {title}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                    <div className="flex gap-0.5">
                        {renderStars(rating)}
                    </div>
                    {ratingCount && (
                        <span className="text-[9px] text-gray-500">{ratingCount}</span>
                    )}
                </div>

                {/* Shipping Info */}
                <p className="text-[9px] text-gray-500 mt-1">{shipping}</p>
            </div>
        </Link>
    );
};

export default RatingCard;