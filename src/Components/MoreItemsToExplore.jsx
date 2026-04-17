import React, { useState } from 'react';
import MoreItemsCard from './MoreItemsCard';

const MoreItemsToExplore = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 6; // Show 6 cards at a time

    // Products from your images
    const allProducts = [
        // First 6 products
        {
            id: 1,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Dress-Socks-3-Pack-Sizes-S-L_4b67c103-1553-45ac-8c9a-33db43eb4d2c.67598d7f0981cf52ce856cbc1e388eaf.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "In 100+ people's carts",
            price: "4.98",
            originalPrice: null,
            youSave: null,
            unitPrice: null,
            title: "Wonder Nation Girls Heart Icon Cozy Ankle Socks, 3-pack, Size Medium (Shoe...)",
            rating: 5.0,
            ratingCount: "7",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 2,
            image: "https://i5.walmartimages.com/seo/Wonder-Woman-Girls-4-16-Graphic-Top-and-Logo-Scooter-2-Piece-Outfit-Set_310fe35a-56d6-4a3d-8634-f47cdc16872c_1.36b211c80f28898fc95acfdb6fbc3979.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "5.98",
            originalPrice: null,
            youSave: null,
            unitPrice: null,
            title: "Wonder Nation Girls Heart Quarter Crews Socks, 6-pack, Size Medium (Shoe...)",
            rating: 5.0,
            ratingCount: "8",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 3,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Dress-Socks-3-Pack-Sizes-S-L_4b67c103-1553-45ac-8c9a-33db43eb4d2c.67598d7f0981cf52ce856cbc1e388eaf.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "4.98",
            originalPrice: null,
            youSave: null,
            unitPrice: null,
            title: "Wonder Nation Girls Flower Icon Cozy Ankle Socks, 3-pack, Size Medium (Shoe...)",
            rating: 5.0,
            ratingCount: "7",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 4,
            image: "https://i5.walmartimages.com/seo/Wonder-Woman-Girls-4-16-Graphic-Top-and-Logo-Scooter-2-Piece-Outfit-Set_310fe35a-56d6-4a3d-8634-f47cdc16872c_1.36b211c80f28898fc95acfdb6fbc3979.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "5.98",
            originalPrice: null,
            youSave: null,
            unitPrice: null,
            title: "Wonder Nation Girls Stripe and Bow Quarter Crews Socks, 6-pack, Size Medium...",
            rating: 5.0,
            ratingCount: "8",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 5,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Boys-Ankle-Socks-10-Pack-Size-0M-5T_c8a9d99d-d11d-4b24-bd07-95ae9841fc4b.0f852a9c284783f8daddb61cdf8ac9ef.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "7.98",
            originalPrice: null,
            youSave: null,
            unitPrice: null,
            title: "Wonder Nation Girls Stripe Cushioned Ankle Socks, 10-pack",
            rating: 5.0,
            ratingCount: "1695",
            shipping: "Shipping, arrives tomorrow",
            pickup: "Pickup today",
            delivery: "Delivery today",
            size: null
        },
        {
            id: 6,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Flower-Icon-Cozy-Ankle-Socks-3-pack-Size-Medium-Shoe-Size-10-5-4_b64d0fb7-1309-40a4-b205-cad3d7592926.f9f461bb7d993103c9ddc3345737b79d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "5.98",
            originalPrice: null,
            youSave: null,
            unitPrice: null,
            title: "Wonder Nation Girls Teddy Bear and Holiday Quarter Crews Socks, 6-pack, Size...",
            rating: 5.0,
            ratingCount: "8",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        // Next 6 products
        {
            id: 7,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Baby-and-Toddler-Crew-Socks-10-Pack-Size-0M-5T_6845b7e8-0f3c-46a2-ac7b-5395e3d8df85.ac92c1feb1fe681ba647e67cc89d65c1.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "In 25+ people's carts",
            price: "4.98",
            originalPrice: null,
            youSave: null,
            unitPrice: "$1.66/ea",
            title: "Wonder Nation Girls Dress Socks, 3 Pack, Sizes S-L",
            rating: 5.0,
            ratingCount: "599",
            shipping: "Shipping, arrives in 3+ days",
            pickup: null,
            delivery: null,
            size: null
        },
       {
            id: 8,
            image: "https://i5.walmartimages.com/seo/Self-Esteem-Juniors-Crochet-Trim-Babydoll-Top_b9616db2-a62d-41c7-abd3-ded011a6dcfa.6258830dfe937b02db85a28032ba78cb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Sponsored",
            price: "13.39",
            originalPrice: "14.99",
            youSave: "1.60",
            unitPrice: null,
            title: "Self Esteem Juniors Crochet Trim Babydoll Top",
            rating: 1.0,
            ratingCount: "13",
            shipping: "Shipping, arrives in 3+ days",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 9,
            image: "https://i5.walmartimages.com/seo/DOKOTOO-Summer-Tops-for-Women-3-4-Sleeve-Crochet-Hollow-Out-Knit-Shirts-Crew-Neck-Swimsuit-Cover-Up-Soft-Lightweight_191d4469-c832-46c9-9e0f-f7afdfa6c9be.7d7593cfc0b504bae800d6928ffd2097.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "In 100+ people's carts",
            price: "7.98",
            originalPrice: null,
            youSave: null,
            unitPrice: "$1.99/ea",
            title: "DOKOTOO Swim Cover Up for Women Summer Tops 3/4 Sleeve Crochet Hollow Out Knit Shirts Crew Neck Swimsuit Cover Up Soft Lightweight",
            rating: 5.0,
            ratingCount: "2219",
            shipping: "Shipping, arrives in 3+ days",
            pickup: "Pickup today",
            delivery: "Delivery today",
            size: null
        },
         {
            id: 10,
            image: "https://i5.walmartimages.com/seo/Self-Esteem-Juniors-Crochet-Trim-Babydoll-Top_e86c0e26-d481-4449-b118-1e6fae066313.220e5792f37fbf013cc6e7f37ed9e438.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Sponsored",
            price: "13.39",
            originalPrice: "14.99",
            youSave: "1.60",
            unitPrice: null,
            title: "Self Esteem Juniors Crochet Trim Babydoll Top",
            rating: 1.0,
            ratingCount: "13",
            shipping: "Shipping, arrives in 3+ days",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 11,
            image: "https://i5.walmartimages.com/seo/WIHOLL-Women-s-Blouses-Tops-Short-Sleeve-Knit-Crochet-Sweater-Lightweight-Pullover-Crewneck-for-Spring-Summer_261b0c29-bf44-4eb5-9b01-62dff0bb9268.d25495179ac9238a6f4b6896fc1c69a9.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFFE",
            tag: "Best seller",
            price: "14.28",
            originalPrice: "29.98",
            youSave: "15.70",
            unitPrice: null,
            title: "UVN Summer Shirts for Women Short Sleeve Blouses Ladies Crewneck...",
            rating: 1.0,
            ratingCount: "1354",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 12,
            image: "https://i5.walmartimages.com/seo/Self-Esteem-Juniors-Crochet-Trim-Babydoll-Top_e86c0e26-d481-4449-b118-1e6fae066313.220e5792f37fbf013cc6e7f37ed9e438.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Sponsored",
            price: "13.39",
            originalPrice: "14.99",
            youSave: "1.60",
            unitPrice: null,
            title: "Self Esteem Juniors Crochet Trim Babydoll Top",
            rating: 1.0,
            ratingCount: "13",
            shipping: "Shipping, arrives in 3+ days",
            pickup: null,
            delivery: null,
            size: null
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
            <div className="mb-3">
                <h2 className="text-xl font-bold text-gray-800">More items to explore</h2>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* 6 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {visibleProducts.map((product) => (
                        <MoreItemsCard
                            key={product.id}
                            image={product.image}
                            tag={product.tag}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            youSave={product.youSave}
                            unitPrice={product.unitPrice}
                            title={product.title}
                            rating={product.rating}
                            ratingCount={product.ratingCount}
                            shipping={product.shipping}
                            pickup={product.pickup}
                            delivery={product.delivery}
                            size={product.size}
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

export default MoreItemsToExplore;