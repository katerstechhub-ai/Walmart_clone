import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const RecentlyViewedSection = () => {
    const [recentItems, setRecentItems] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 4;

    const loadRecentlyViewed = () => {
        const stored = localStorage.getItem('recentlyViewed');
        if (stored) {
            const items = JSON.parse(stored);
            console.log('Loading recently viewed:', items.length, 'items');
            setRecentItems(items);
        } else {
            setRecentItems([]);
        }
    };

    useEffect(() => {
        loadRecentlyViewed();

        // Listen for both storage events and custom events
        const handleStorageChange = (e) => {
            if (e.key === 'recentlyViewed' || !e.key) {
                console.log('Storage changed, reloading...');
                loadRecentlyViewed();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('recentlyViewedUpdated', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('recentlyViewedUpdated', handleStorageChange);
        };
    }, []);

    // Reset slide when items change
    useEffect(() => {
        setCurrentSlide(0);
    }, [recentItems.length]);

    const renderStars = (rating) => {
        let stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500 text-[10px]" />);
        }
        for (let i = 0; i < 5 - fullStars; i++) { // Changed from 4 to 5 for proper 5-star rating
            stars.push(<FaRegStar key={`e-${i}`} className="text-yellow-500 text-[10px]" />);
        }
        return stars;
    };

    const totalSlides = Math.ceil(recentItems.length / itemsPerView);
    const maxIndex = totalSlides - 1;
    const visibleItems = recentItems.slice(currentSlide * itemsPerView, currentSlide * itemsPerView + itemsPerView);

    const nextSlide = () => { if (currentSlide < maxIndex) setCurrentSlide(currentSlide + 1); };
    const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };

    if (recentItems.length === 0) return null;

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recently viewed items</h2>
                <p className="text-sm text-gray-600 mt-1">Based on your most recent browse history</p>
            </div>

            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {visibleItems.map((item) => (
                        <Link
                            key={`${item.id}-${item.timestamp || Date.now()}`} // Better key with timestamp
                            to={`/product/${item.id}`}
                            className="rounded-lg p-3 bg-white block "
                            onClick={() => {
                                // Optional: Update recently viewed again when clicked
                                console.log('Clicked on recently viewed item:', item.id);
                            }}
                        >
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-50 object-cover rounded mb-2" 
                                onError={(e) => {
                                    e.target.src = 'fallback-image-url.jpg'; // Add fallback image
                                }}
                            />

                            {item.tag && (
                                <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-semibold mb-2 ${
                                    item.tag === 'Best seller' ? 'bg-blue-200 font-bold text-blue-900' :
                                    item.tag === 'Clearance' ? 'bg-red-200 text-blue-900 font-bold' :
                                    'bg-gray-200 text-gray-700'
                                }`}>
                                    {item.tag}
                                </span>
                            )}

                            <div className="mb-1">
                                <span className="text-xs text-gray-500">Now</span>
                                <span className="text-lg font-bold ml-1">${item.nowPrice}</span>
                                {item.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through ml-1">${item.originalPrice}</span>
                                )}
                                {item.youSave && (
                                    <p className="text-[10px] text-green-600">You save ${item.youSave}</p>
                                )}
                            </div>

                            <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] mb-1">{item.title}</p>

                            <div className="flex items-center gap-1 mt-1">
                                <div className="flex gap-0.5">{renderStars(item.rating)}</div>
                                {item.ratingCount && <span className="text-[9px] text-gray-500">{item.ratingCount}</span>}
                            </div>

                            {item.saveWithW && (
                                <p className="text-[9px] text-blue-600 font-semibold mt-1">Save with W+</p>
                            )}
                        </Link>
                    ))}
                </div>

                {recentItems.length > itemsPerView && (
                    <>
                        <button onClick={prevSlide} disabled={currentSlide === 0}
                            className={`absolute -left-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <span className="text-xl">❮</span>
                        </button>
                        <button onClick={nextSlide} disabled={currentSlide === maxIndex}
                            className={`absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 z-10 ${currentSlide === maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <span className="text-xl">❯</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RecentlyViewedSection;