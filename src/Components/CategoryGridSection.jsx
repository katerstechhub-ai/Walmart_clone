import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryGridSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 11; // Show 11 categories at a time

    // 22 categories from your images
    const categories = [
        { id: 1, name: "New in home improvement", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-d32c/k2-_1e90db53-5845-4b21-9d46-5d1d3332d859.v1.png", link: "/product" },
        { id: 2, name: "New in food & beverage", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-4b89/k2-_4a865535-c6e6-4786-85f6-fd564eaabc5f.v1.png", link: "/new-in-food-beverage" },
        { id: 3, name: "New in tech", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-c201/k2-_1689ae41-b2f9-4c70-a963-166cb76071cb.v1.png", link: "/new-in-tech" },
        { id: 4, name: "New in office & art supplies", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-6feb/k2-_a1ea1355-ed02-40f7-8221-0269ff29f1cb.v1.png", link: "/new-in-office-art-supplies" },
        { id: 5, name: "New in beauty & personal care", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-6c47/k2-_e4ecfc8c-5eca-4f27-8a37-bc0f85047e56.v1.png", link: "/new-in-beauty-personal-care" },
        { id: 6, name: "New in music", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-d85c/k2-_b33da3e8-7570-4719-a475-dcc1f254b5c6.v1.png", link: "/product" },
        { id: 7, name: "New in toys", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-a84a/k2-_a988a74e-b5db-4109-84b0-f0a7edfe64fc.v1.png", link: "/new-in-toys" },
        { id: 8, name: "New in health & wellness", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-be1b/k2-_8c5679d0-ee5d-495d-94ce-8cca80f3c193.v1.png", link: "/new-in-health-wellness" },
        { id: 9, name: "New in Camping", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-2a92/k2-_02b7d4af-22a4-46ae-8071-5d2e661dad50.v1.png", link: "/product" },
        { id: 10, name: "New in Sports", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-9257/k2-_0aa5e3ef-f0a8-4cc7-ab56-3770c6a27e1b.v1.png", link: "/product" },
        { id: 11, name: "New in books", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-a722/k2-_2db03027-e94e-4355-97bf-6c37ed60065f.v1.png", link: "/new-in-books" },
        { id: 12, name: "New in fitness", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-104c/k2-_eb1d85f2-88a1-4d1f-b959-3f10b15b4ea8.v1.png", link: "/new-in-fitness" },
        { id: 13, name: "New in patio", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-44cf/k2-_1e0d4c20-fb3c-4220-9cfa-2754f5e776e2.v1.png", link: "/new-in-patio" },
        { id: 14, name: "New in garden center", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-6a95/k2-_04af2eaa-2e3c-4a4b-828c-c2dd4ac8ad87.v1.png", link: "/new-in-garden-center" },
        { id: 15, name: "New in household essentials", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-8fe5/k2-_da5cfd0a-cb7c-4ded-ade3-a66fe06605b8.v1.png", link: "/new-in-household-essentials" },
        { id: 16, name: "New in baby", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-27e0/k2-_10317e9f-dee2-4ff4-abc7-c3de2d3845a4.v1.png", link: "/new-in-baby" },
        { id: 17, name: "New in pets", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-1363/k2-_b4a1d818-28f1-41fa-8080-b5ec91179693.v1.png", link: "/new-in-pets" },
        { id: 18, name: "New in party supplies", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-621b/k2-_132251af-d429-4d4f-959d-a5a1f0d72af7.v1.png", link: "/new-in-party-supplies" },
        { id: 19, name: "New in auto power gear", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-92bd/k2-_66d92faf-720c-45b4-b72b-2cafa2807503.v1.png", link: "/new-in-auto-power-gear" },
        { id: 20, name: "New in outdoor luggage", image: "https://i5.walmartimages.com/dfw/4ff9c6c9-56d7/k2-_36352683-68a1-40ed-92fc-e7ef92025179.v1.png", link: "/new-in-outdoor-luggage" }
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
            {/* Slider Container */}
            <div className="relative">
                {/* 11 Column Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-11 gap-4">
                    {visibleCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.link}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            {/* Circular Image */}
                            <div className="w-15 h-15 md:w-17 md:h-17 rounded-lg overflow-hidden bg-gray-100 mb-2">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Category Name */}
                            <span className="text-sm font-medium text-gray-700 line-clamp-2 text-center">
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
            </div>

            {/* Bottom Border */}
            <div className="border-b border-gray-200 mt-8"></div>
        </div>
    );
};

export default CategoryGridSection;