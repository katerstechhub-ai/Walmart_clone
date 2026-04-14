import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategorySlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 8; // Show 8 categories at a time

    // 12 categories
    const categories = [
        { id: 1, name: "Grocery", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-b424/k2-_8c36c2ba-943e-43ab-9ac2-8a1341dbc43a.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/grocery" },
        { id: 2, name: "Home", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-b68b/k2-_fd157f2d-7746-4ce7-9223-60e6cd22a133.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/home" },
        { id: 3, name: "Patio & Garden", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-2385/k2-_bfa20d39-f183-479c-92d3-04a43de976bb.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/patio-garden" },
        { id: 4, name: "Fashion", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-d539/k2-_50fcb91a-55b9-4244-9922-2b6074452772.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/fashion" },
        { id: 5, name: "Tech", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-2388/k2-_b8358caa-7baa-4385-9038-7f5d5f1aaf52.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/tech" },
        { id: 6, name: "Baby", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-6480/k2-_7bb8f708-5008-4714-977f-fa7e471c95a9.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/baby" },
        { id: 7, name: "Toys", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-590b/k2-_edb0c7df-a5ee-4bea-a449-774e1cbb88de.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/toys" },
        { id: 8, name: "Health & wellness", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-d469/k2-_d7222ea4-dc46-43b3-8e87-0ef62fc5b576.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/health-wellness" },
        { id: 9, name: "Personal Care", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-1e0e/k2-_c04f43e8-2f16-4dc5-bb96-223c493309f3.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/personal-care" },
        { id: 10, name: "Beauty", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-b3a4/k2-_e07a3262-1291-4658-a965-c2e97fafe83e.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/beauty" },
        { id: 11, name: "Auto & tires", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-44dd/k2-_a505e49e-9b6b-4b4d-b8fc-e8c6506a9fa8.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/auto-tires" },
        { id: 12, name: "Home Improvement", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-3352/k2-_0ab79831-a2fe-49d4-a3f6-212c790de29c.v1.png?odnHeight=120&odnWidth=120&odnBg=FFFFFF", link: "/home-improvement" }
    ];

    const totalSlides = Math.ceil(categories.length / itemsPerView);
    const maxIndex = totalSlides - 1;

    const startIndex = currentSlide * itemsPerView;
    const visibleCategories = categories.slice(startIndex, startIndex + itemsPerView);

    const nextSlide = () => {
        if (currentSlide < maxIndex) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            {/* Header with Title and View All Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Get it all right here</h2>
                <button className="text-black text-sm font-medium underline underline-offset-4">
                    View all
                </button>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* Categories Grid - Shows 8 at a time */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {visibleCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.link}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            {/* Category Image */}
                            <div className="w-24 h-24 md:w-25 md:h-25 rounded-lg overflow-hidden bg-gray-100 mb-3 ">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover "
                                />
                            </div>
                            {/* Category Name */}
                            <span className="text-sm font-medium text-gray-700 ">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {categories.length > itemsPerView && (
                    <>
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className={`absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <span className="text-xl">❮</span>
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === maxIndex}
                            className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === maxIndex ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <span className="text-xl">❯</span>
                        </button>
                    </>
                )}

                {/* 
                {totalSlides > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                                        ? "bg-blue-600 w-6"
                                        : "bg-gray-300 w-2 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default CategorySlider;