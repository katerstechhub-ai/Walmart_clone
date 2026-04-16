import React, { useState } from 'react';
import RatingCard from './RatingCard';

const RatingsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 4; // Show 4 cards at a time

    // 12 products from your images with image URLs
    const allProducts = [
        // Slide 1 - First 4 products
        {
            id: 1,
            image: "https://i5.walmartimages.com/seo/Justice-Girl-s-Peplum-Pretty-Top-Sizes-XS-XLP_667ce4c9-8ee0-4257-ae9c-e27575d4e651.8f7338e4b4f7b8e66eebfac80916b5f9.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Clearance",
            price: "12.60",
            originalPrice: "18.00",
            title: "Justice Girl's Peplum Pretty Top, Sizes XS - XLP",
            rating: 4.0,
            ratingCount: "37",
            shipping: "Shipping, arrives in 2 days"
        },
        {
            id: 2,
            image: "https://i5.walmartimages.com/seo/Justice-Girl-s-Off-the-Shoulder-Top-Sizes-XS-XL_2e9d7db4-301b-4233-83bd-61fa61ec96ff.821e7ce09ac4479be1d8d9d0f0825534.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Best seller",
            price: "7.20",
            originalPrice: "15.00",
            title: "Justice Girl's Off the Shoulder Top, Sizes XS - XL",
            rating: 4.0,
            ratingCount: "37",
            shipping: "Pickup today | Delivery today"
        },
        {
            id: 3,
            image: "https://i5.walmartimages.com/seo/Justice-Girl-s-Off-the-Shoulder-Top-Sizes-XS-XL_2e9d7db4-301b-4233-83bd-61fa61ec96ff.821e7ce09ac4479be1d8d9d0f0825534.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Best seller",
            price: "7.32",
            originalPrice: "15.00",
            title: "Justice Girl's Off the Shoulder Top, Sizes XS - XL",
            rating: 4.0,
            ratingCount: "37",
            shipping: "Pickup today | Delivery today"
        },
        {
            id: 4,
            image: "https://i5.walmartimages.com/seo/Justice-Girl-s-Off-the-Shoulder-Top-Sizes-XS-XL_2e9d7db4-301b-4233-83bd-61fa61ec96ff.821e7ce09ac4479be1d8d9d0f0825534.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Clearance",
            price: "8.45",
            originalPrice: "15.00",
            title: "Justice Girl's Off the Shoulder Top, Sizes XS - XL",
            rating: 4.0,
            ratingCount: "37",
            shipping: "Pickup today | Delivery today"
        },
        // Slide 2 - Next 4 products
        {
            id: 5,
            image: "https://i5.walmartimages.com/seo/MISS-POPULAR-Girls-4-Pack-Super-Soft-Short-Sleeve-T-Shirts-Rainbow-Butterfly-Glitter-Print-Cute-Design-Sizes-7-16_20de33e5-a0c7-4555-9bde-f32113c81314.bc6fe64053d3e50382515a04470265ad.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Best seller",
            price: "32.99",
            originalPrice: null,
            title: "HILDELLANG Big Girl Short Sleeve Tees Summer Purple Black Green Girl Cotton Tops...",
            rating: 5.0,
            ratingCount: "219",
            shipping: "Shipping, arrives in 3+ days"
        },
        {
            id: 6,
            image: "https://i5.walmartimages.com/seo/MISS-POPULAR-Girls-4-Pack-Super-Soft-Short-Sleeve-T-Shirts-Rainbow-Butterfly-Glitter-Print-Cute-Design-Sizes-7-16_1e86e301-cb22-4423-83ba-d041d324afff.b4a3d8a018312b69a1d6b3604e4137eb.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Best seller",
            price: "18.99",
            originalPrice: "23.99",
            title: "HILEELANG Big Girl Short Sleeve Tees Summer Purple Black Green Girl Cotton Tops...",
            rating: 5.0,
            ratingCount: "93",
            shipping: "Shipping, arrives tomorrow"
        },
        {
            id: 7,
            image: "https://i5.walmartimages.com/seo/HILEELANG-Little-Girl-Short-Sleeve-Tees-Summer-Easter-Purple-Black-Green-Girl-Cotton-Tops-Shirts-3-Packs-Size-8_df42821a-8e0a-4831-85cb-a17bb81bf51d.076ef36617aecdaa561794470ca042d2.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Best seller",
            price: "18.99",
            originalPrice: "23.99",
            title: "HILEELANG Little Girl Cotton Short Sleeve Tees, Summer Tops, Unicorn Design, 3 Pack,...",
            rating: 5.0,
            ratingCount: "93",
            shipping: "Shipping, arrives tomorrow"
        },
        {
            id: 8,
            image: "https://i5.walmartimages.com/seo/MISS-POPULAR-Girls-3-Pack-Super-Soft-Short-Sleeve-T-Shirts-Unicorn-Butterfly-Glitter-Print-Cute-Design-Sizes-7-16-Combo-C-14-16_0891b63e-b529-4a29-a9a2-60d34cf7d6a3.df3326561849b5687f2cee279718c63d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Best seller",
            price: "18.99",
            originalPrice: "23.99",
            title: "MISS POPULAR Girls 3-Pack Super Soft Short Sleeve T-Shirts Unicorn Butterfly Glitter...",
            rating: 5.0,
            ratingCount: "100",
            shipping: "Shipping, arrives in 3+ days"
        },
        // Slide 3 - Last 4 products
        {
            id: 9,
            image: "https://i5.walmartimages.com/seo/HILEELANG-Little-Girl-Short-Sleeve-Tees-Summer-Easter-Pink-Navy-Green-Unicorn-Cotton-Tops-Shirts-3-Packs-Size-8_650af6c2-65c0-41ca-bf09-d624f76b058f.a3428367c0f15128e4a82b3ea9fe116b.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "In 50+ people's carts",
            price: "4.98",
            originalPrice: null,
            title: "Wonder Nation Girls Dress Socks, 3 Pack, Sizes S-L",
            rating: 4.0,
            ratingCount: "596",
            shipping: "Shipping, arrives in 3+ days",
            unitPrice: "$1.66/ea"
        },
        {
            id: 10,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Dress-Socks-3-Pack-Sizes-S-L_4b67c103-1553-45ac-8c9a-33db43eb4d2c.67598d7f0981cf52ce856cbc1e388eaf.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "In 50+ people's carts",
            price: "4.98",
            originalPrice: null,
            title: "Wonder Nation Girls Dress Socks, 3 Pack, Sizes S-L",
            rating: 4.0,
            ratingCount: "596",
            shipping: "Shipping, arrives tomorrow",
            unitPrice: "$1.66/ea"
        },
        {
            id: 11,
            image: "https://i5.walmartimages.com/seo/Roaman-s-Women-s-Plus-Size-Floral-Lace-Crochet-Duster_51664bf8-228b-4425-b71c-138793b7bf31.2149f821a2c104196cac21c5063a2a9c.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Sponsored",
            price: "78.99",
            originalPrice: null,
            title: "Roaman's Women's Plus Size Floral Lace Crochet Duster",
            rating: 5.0,
            ratingCount: "22",
            shipping: "Shipping, arrives in 3+ days",
            unitPrice: "$78.99/count"
        },
          {
            id: 10,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Dress-Socks-3-Pack-Sizes-S-L_4b67c103-1553-45ac-8c9a-33db43eb4d2c.67598d7f0981cf52ce856cbc1e388eaf.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "In 50+ people's carts",
            price: "4.98",
            originalPrice: null,
            title: "Wonder Nation Girls Dress Socks, 3 Pack, Sizes S-L",
            rating: 4.0,
            ratingCount: "596",
            shipping: "Shipping, arrives tomorrow",
            unitPrice: "$1.66/ea"
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
                <h2 className="text-xl font-bold text-gray-800">4 stars and above</h2>
                <p className="text-sm text-gray-600 mt-1">Based on customer ratings and number of reviews</p>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* 4 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {visibleProducts.map((product) => (
                        <RatingCard
                            key={product.id}
                            image={product.image}
                            tag={product.tag}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            title={product.title}
                            rating={product.rating}
                            ratingCount={product.ratingCount}
                            shipping={product.shipping}
                            unitPrice={product.unitPrice}
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

export default RatingsSection;
