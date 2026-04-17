import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductCard = ({ image, price, title, subtitle, rating, ratingCount, tag }) => {
    const renderStars = (rating) => {
        let stars = [];
        let fullStars = Math.floor(rating);
        let hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500 text-sm" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-sm" />);
        }
        let emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500 text-sm" />);
        }
        return stars;
    };

    return (
        <div className="bg-gray-100 rounded-lg p-4 w-300 max-w-[calc(100vw-2rem)]">
            <div className="flex p-2 gap-3 items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="w-24 h-24 object-cover rounded flex-shrink-0"
                />
                <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-base font-bold">${price}</span>
                    <p className="text-xs text-gray-800 line-clamp-3 break-words">{title}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-800 line-clamp-3 break-words">{subtitle}</p>
                    )}
                    <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                            {renderStars(rating)}
                        </div>
                        <span className="text-xs text-gray-600">{ratingCount}</span>
                    </div>
                    {tag && (
                        <span className="text-xs text-gray-500">{tag}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const DisneysectionSection = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            <ProductCard
                image="https://i5.walmartimages.com/seo/Disney-Lilo-and-Stitch-Girls-Short-Sleeve-T-Shirt-Stitch-Girls-Volleyball-Graphic-Tee-Sizes-4-16-Light-Blue-Lavender-14-16_864398d7-ece2-421d-83a2-647cdc17dcdc.1782889c705ed938a9ff730cd8dbd933.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF"
                price="16.99"
                title="Disney Lilo and Stitch Girls Short Sleeve T-Shirt - Stitch"
                subtitle="Girls Volleyball Graphic Tee Sizes 4-16, Light Blue/Lavender, 14-16"
                rating={4.0}
                ratingCount="13"
                tag="Sponsored"
            />
        </div>
    );
};

export default DisneysectionSection;