import React, { useState } from 'react';
import PopularItemsCard from './PopularItemsCard';

const PopularItemsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 4; // Show 4 cards at a time

    // 8 products from your images
    const allProducts = [
        // First 4 products
        {
            id: 1,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Little-Girl-Flounce-Sleeve-Blouse-Sizes-4-10_e7aff313-b487-4f59-9888-1882f88013fc.5958be629f75902b9cd57c0e480a89f9.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Best seller",
            price: "7.98",
            originalPrice: null,
            youSave: null,
            title: "Wonder Nation Girls Blouse with Short Flounce Sleeves, Sizes 4-10",
            rating: 5.0,
            ratingCount: "21",
            shipping: "Shipping, arrives today",
            moreOptions: null,
            saveWithW: true
        },
        {
            id: 2,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Ruffle-Trend-Top-Sizes-4-18-Plus_f3010def-2b31-4b80-93c4-72951192367d.76034badbaaa84e9a3f0a066d05786d4.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "11.89",
            originalPrice: "16.98",
            youSave: "5.09",
            title: "Wonder Nation Girls Fashion Knit Sweater, Sizes 4-18 & Plus",
            rating: 5.0,
            ratingCount: "23",
            shipping: null,
            moreOptions: "More options from $7.94",
            saveWithW: false
        },
        {
            id: 3,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Little-Girl-Puff-Sleeve-Blouse-Sizes-4-10_43970f4e-4102-4e22-9305-bc254a469fe6.2ad6128a80eb71316d5232c1a863202a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "5.95",
            originalPrice: "11.98",
            youSave: "6.03",
            title: "Wonder Nation Girls' Cami and Cardigan Set, Sizes 4-18 & Plus",
            rating: 5.0,
            ratingCount: "12",
            shipping: null,
            moreOptions: null,
            saveWithW: false
        },
        {
            id: 4,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Big-Girls-Rib-Sweater-Sizes-4-18-Plus_dcc8094c-962f-4132-8511-c574e931b598.0c920df7dafac8f8e1aacea04989d4f9.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: null,
            price: "5.55",
            originalPrice: "6.98",
            youSave: "1.43",
            title: "Wonder Nation Girls Tulip Sleeve Top, Sizes 4-18 & Plus",
            rating: 5.0,
            ratingCount: "8",
            shipping: null,
            moreOptions: null,
            saveWithW: false
        },
        // Next 4 products (Clearance items)
        {
            id: 5,
            image: "https://i5.walmartimages.com/seo/WONDER-NATION-GIRLS_bc92a7e4-1ad6-4ff5-974e-4852d46c39fd.b8c0d0eab79a90ad76af736556241dd8.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Clearance",
            price: "New $9.83",
            originalPrice: "69.98",
            youSave: "71.55",
            title: "Wonder Nation Girls Top, Sizes 4-18 & Plus",
            rating: null,
            ratingCount: null,
            shipping: null,
            moreOptions: "More options from $8.14",
            saveWithW: false
        },
        {
            id: 6,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Embellished-Sweater-Sizes-4-18-Plus_ac8587a8-af9d-4c64-8f67-d78fdf1538e7.8e777a0620a5d420a6740fcbcc3680ea.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Clearance",
            price: "New $5.47",
            originalPrice: "69.98",
            youSave: "5.51",
            title: "Wonder Nation Girls Top, Sizes 4-18 & Plus",
            rating: null,
            ratingCount: null,
            shipping: null,
            moreOptions: "More options from $4.18 & Plus",
            saveWithW: false
        },
        {
            id: 7,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Cami-and-Cardigan-Set-Sizes-4-18-Plus_1a5c82e0-a517-4d8e-9f01-05c597e9e590.190682f01f15dd6fe85a26aa30f2c807.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Clearance",
            price: "2.74",
            originalPrice: "69.98",
            youSave: null,
            title: "Wonder Nation Girls Top, Sizes 4-18 & Plus",
            rating: null,
            ratingCount: null,
            shipping: null,
            moreOptions: "More options from $4.18 & Plus",
            saveWithW: false
        },
        {
            id: 8,
            image: "https://i5.walmartimages.com/seo/WN-CORE-DENIM-SHORT_d7741bc6-8b10-46c0-9313-d378a565eaaa.a72e44a9ede67e8184a549a4574b569e.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Clearance",
            price: "17.00",
            originalPrice: null,
            youSave: null,
            title: "Graphic Tank Top, Sizes 4-18 & Plus",
            rating: null,
            ratingCount: null,
            shipping: null,
            moreOptions: null,
            saveWithW: true
        }
    ];

    const totalSlides = Math.ceil(allProducts.length / itemsPerView);
    const maxIndex = totalSlides - 1;

    const startIndex = currentSlide * itemsPerView;
    const visibleProducts = allProducts.slice(startIndex, startIndex + itemsPerView);

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
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Popular items in this category</h2>
                <p className="text-sm text-gray-600 mt-1">Best selling items that customers love</p>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* 4 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {visibleProducts.map((product) => (
                        <PopularItemsCard
                            key={product.id}
                            image={product.image}
                            tag={product.tag}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            youSave={product.youSave}
                            title={product.title}
                            rating={product.rating}
                            ratingCount={product.ratingCount}
                            shipping={product.shipping}
                            moreOptions={product.moreOptions}
                            saveWithW={product.saveWithW}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                {allProducts.length > itemsPerView && (
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

                {/* Dots Indicator */}
                {/* {totalSlides > 1 && (
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

export default PopularItemsSection;