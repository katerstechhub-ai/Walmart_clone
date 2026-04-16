import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const CustomerRatingsSection = () => {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500 text-sm" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-sm" />);
        }
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500 text-sm" />);
        }
        return stars;
    };

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            <div className="text-left mb-4">
                <button className="text-black text-xs underline hover:text-blue-800">
                    Report incorrect product information
                </button>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 w-full">
                <div className="flex p-2 gap-3 items-center justify-center">
                    <img
                        src="https://i5.walmartimages.com/seo/Disney-Lilo-and-Stitch-Girls-Short-Sleeve-T-Shirt-Stitch-Girls-Volleyball-Graphic-Tee-Sizes-4-16-Light-Blue-Lavender-14-16_864398d7-ece2-421d-83a2-647cdc17dcdc.1782889c705ed938a9ff730cd8dbd933.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF"
                        alt="Product"
                        className="w-26 h-26 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1">
                        <span className="text-base font-bold">$16.99</span>
                        <p className="text-xs text-gray-800 line-clamp-3">
                            Disney Lilo and Stitch Girls Short Sleeve T-Shirt - Stitch
                        </p>
                        <p className="text-xs text-gray-800 line-clamp-3">
                            Girls Volleyball Graphic Tee Sizes 4-16, Light Blue/Lavender, 14-16
                        </p>
                        <div className="flex items-center gap-1">
                            <div className="flex gap-0.5">
                                {renderStars(4.0)}
                            </div>
                            <span className="text-xs text-gray-600">13</span>
                        </div>
                        <span className="text-xs text-gray-500">Sponsored</span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-md font-bold text-gray-800 mb-3">Customer ratings & reviews</h3>

                <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-0.5">
                        <FaRegStar className="text-yellow-500 text-xl" />
                        <FaRegStar className="text-yellow-500 text-xl" />
                        <FaRegStar className="text-yellow-500 text-xl" />
                        <FaRegStar className="text-yellow-500 text-xl" />
                        <FaRegStar className="text-yellow-500 text-xl" />
                    </div>
                    <span className="text-xs text-gray-600">0 ratings | 0 reviews</span>
                </div>

                <div className="border-t border-gray-300 pt-4">
                    <p className="text-sm text-gray-500 ">
                        This item does not have any reviews yet
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerRatingsSection;