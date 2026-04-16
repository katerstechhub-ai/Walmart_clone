import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, title, price, originalPrice, description, buttonText, id, tag, rating, ratingCount, saveWithW }) => {

    const addToRecentlyViewed = () => {
        const stored = localStorage.getItem('recentlyViewed');
        let recentItems = stored ? JSON.parse(stored) : [];

        // Remove if already exists
        recentItems = recentItems.filter(item => item.id !== id);

        // Add full product data to beginning
        recentItems.unshift({
            id,
            image,
            title,
            nowPrice: price,
            originalPrice: originalPrice || null,
            youSave: originalPrice ? (parseFloat(originalPrice) - parseFloat(price)).toFixed(2) : null,
            tag: tag || null,
            rating: rating || 0,
            ratingCount: ratingCount || null,
            saveWithW: saveWithW || false
        });

        // Keep only last 8
        recentItems = recentItems.slice(0, 8);
        localStorage.setItem('recentlyViewed', JSON.stringify(recentItems));
    };

    return (
        <Link
            to={`/product/${id}`}
            onClick={addToRecentlyViewed}
            className="block bg-white rounded-lg overflow-hidden cursor-pointer group"
        >
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black border border-black px-4 py-2 rounded-full text-sm font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {buttonText || "+ Add to Cart"}
                </button>
            </div>
            <div className="flex items-baseline gap-2 px-4 pt-3">
                <span className="text-xl font-bold text-black">${price}</span>
                {originalPrice && (
                    <span className="text-xs text-gray-400 line-through">${originalPrice}</span>
                )}
            </div>
            <div className="p-4 pt-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px]">
                    {title}
                </h3>
            </div>
        </Link>
    );
};

export default Card;