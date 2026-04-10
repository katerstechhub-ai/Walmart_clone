import React, { useState } from 'react';
import Navigation from '../Components/Navigation';
import HeroSlider from '../Components/heroslider';
import Card from '../Components/Card';
import { FiPlus } from "react-icons/fi";

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 6; // Show 6 cards at a time

    // All 12 products
    const allProducts = [
        // First 6 Products
        {
            id: 1,
            image: "https://i5.walmartimages.com/seo/KONG-Flexball-Sport-Ball-Dog-Toy-1ea-XL_d2583a3b-4719-4959-a49b-96403c108e64.e5011afb10a9c7334edd285919d57295.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "KONG® Flexball Sport Waterproof Dog Toy, Extreme...",
            price: "22.96",
            originalPrice: "27.99",
            description: "KONG® Flexball Sport Waterproof Dog Toy, Extra durable for aggressive chewers",
            buttonText: "+Add",
            badge: "Best Seller",
            rating: "4.5"
        },
        {
            id: 2,
            image: "https://i5.walmartimages.com/seo/Molly-s-Suds-Natural-Liquid-Laundry-Detergent-High-Efficiency-HE-Peppermint-100-Loads_f544e775-aa07-4211-8192-b458a1b622cc.ab46f37d4261a037ea5a8be0b3ee75dd.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Molly's Suds Natural Liquid Laundry Detergent | High...",
            price: "22.99",
            originalPrice: "29.99",
            description: "Molly's Suds Natural Liquid Laundry Detergent | High efficiency, plant-based formula",
            buttonText: "Options",
            badge: "New",
            rating: "4.8"
        },
        {
            id: 3,
            image: "https://i5.walmartimages.com/seo/Nutricost-Methylated-Vitamin-B-Complex-120-Capsules-60-Servings-Gluten-Free_ed084274-7533-4e51-9739-0b2d5913508d.d543046db96a11ca193b5982ca61c769.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Nutricost Methylated Vitamin B Complex 120 capsules",
            price: "15.95",
            originalPrice: "19.99",
            description: "Nutricost Methylated Vitamin B Complex 120 capsules, active B vitamins for energy",
            buttonText: "+Add",
            rating: "4.6"
        },
        {
            id: 4,
            image: "https://i5.walmartimages.com/seo/Papatui-Full-Body-Aluminum-Free-Men-s-Spray-Deodorant-Cedar-Sport_ac37eb5b-7c57-4ba4-b3a5-d49c06866b24.6ad2191dd9ce0e68598b66820f19118d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Papati Men's Deodorant Spray, Full Body, Cedar...",
            price: "13.62",
            originalPrice: "16.99",
            description: "Papati Men's Deodorant Spray, Full Body, Cedar wood scent, 24-hour protection",
            buttonText: "+Add ",
            rating: "4.3"
        },
        {
            id: 5,
            image: "https://i5.walmartimages.com/seo/Creatine-Monohydrate-Gain-Lean-Muscle-Improve-Performance-and-Strength-500g_a2af36c0-8dda-48ad-9dbe-961b998e778c.03f5ec0f06c9b05e37e3460d012ebfde.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Sports Research® Creatine Monohydrate - Gain Lean...",
            price: "27.95",
            originalPrice: "34.99",
            description: "Sports Research® Creatine Monohydrate - Gain lean muscle, improve athletic performance",
            buttonText: "Options",
            badge: "Top Rated",
            rating: "4.7"
        },
        {
            id: 6,
            image: "https://i5.walmartimages.com/seo/Pure-Encapsulations-OptiFerin-C-Overall-Immune-System-Health-60-Capsules_37a65360-23b2-47e1-9821-4f4052b36390.59f8dc5fef0533f2fca4b71e09ac8c79.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Pure Encapsulations OptiFerin-C, Iron with Vitamin C",
            price: "16.00",
            originalPrice: "19.99",
            description: "Pure Encapsulations OptiFerin-C, Iron with Vitamin C for optimal absorption",
            buttonText: "+Add",
            rating: "4.9"
        },
        // Next 6 Products
             {
            id: 7,
            image: "https://i5.walmartimages.com/seo/Creatine-Monohydrate-Gain-Lean-Muscle-Improve-Performance-and-Strength-500g_a2af36c0-8dda-48ad-9dbe-961b998e778c.03f5ec0f06c9b05e37e3460d012ebfde.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Sports Research® Creatine Monohydrate - Gain Lean...",
            price: "27.95",
            originalPrice: "34.99",
            description: "Sports Research® Creatine Monohydrate - Gain lean muscle, improve athletic performance",
            buttonText: "Options",
            badge: "Top Rated",
            rating: "4.7"
        },
        {
            id: 8,
            image: "https://i5.walmartimages.com/seo/Pure-Encapsulations-OptiFerin-C-Overall-Immune-System-Health-60-Capsules_37a65360-23b2-47e1-9821-4f4052b36390.59f8dc5fef0533f2fca4b71e09ac8c79.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Pure Encapsulations OptiFerin-C, Iron with Vitamin C",
            price: "16.00",
            originalPrice: "19.99",
            description: "Pure Encapsulations OptiFerin-C, Iron with Vitamin C for optimal absorption",
            buttonText: "+Add",
            rating: "4.9"
        },
        {
            id: 9,
            image: "https://i5.walmartimages.com/seo/Sol-de-Janeiro-Brazilian-Crush-Cheirosa-40-Hair-Body-Mist-3-oz_cd72426e-a8d8-415d-9dfc-ad5f4b67436a.3020ccd20f52f810c19897f1e557e822.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            title: "Sol de Janeiro Brazilian Crush Cheirosa 40 Hair & Body...",
            price: "27.31",
            originalPrice: "32.00",
            description: "Sol de Janeiro Brazilian Crush Cheirosa 40 Hair & Body Fragrance Mist",
            buttonText: "Options",
            badge: "Limited Time",
            rating: "4.7"
        },
        {
            id: 10,
            image: "https://i5.walmartimages.com/seo/K18-Professional-Molecular-Repair-Hair-Mask-5-oz_be81c98a-66d4-4ef1-af8c-f002413dd69d.3b4a24179416e2cc72e5c10d5d821192.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "K18 Professional Molecular Repair Hair Mask 5 oz",
            price: "87.99",
            originalPrice: "95.00",
            description: "K18 Professional Molecular Repair Hair Mask 5 oz, restores hair in 4 minutes",
            buttonText: "Options",
            rating: "4.8"
        },
        {
            id: 11,
            image: "https://i5.walmartimages.com/seo/Nutricost-Methylated-Multivitamin-120-capsules-60-servings-23-Vitamin-Minerals-Per-Serving_7d7eab71-a53f-424b-a413-7a2f26e665e2.b398bfd3b75a8f5a9fa7d3dc7570cb37.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Nutricost Methylated Multivitamin 120 capsules",
            price: "15.95",
            originalPrice: "19.99",
            description: "Nutricost Methylated Multivitamin 120 capsules, complete daily nutrition",
            buttonText: "+Add",
            rating: "4.5"
        },
        {
            id: 12,
            image: "https://i5.walmartimages.com/seo/Momcozy-Portable-Bottle-Warmer-17oz-Travel-Milk-Warmer-with-Dual-Heating-Modes_7d1f7755-2a44-4bd1-ae2a-034cfdc007c0.cfba71a5a93bd266488ebf41df4cc674.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Momcozy Portable Bottle Warmer, 17oz Travel Milk...",
            price: "79.99",
            originalPrice: "99.99",
            description: "Momcozy Portable Bottle Warmer, 17oz Travel Milk Warmer for babies",
            buttonText: "Options",
            badge: "Sale",
            rating: "4.6"
        }
    ];

    // Get current products to display (6 at a time)
    const startIndex = currentSlide * itemsPerView;
    const visibleProducts = allProducts.slice(startIndex, startIndex + itemsPerView);
    const totalSlides = Math.ceil(allProducts.length / itemsPerView); // 12/6 = 2 slides
    const maxIndex = totalSlides - 1;

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
        <div>
            <Navigation />
            <HeroSlider />

            {/* Discover Great Brands Section */}
            <div className="max-w-[1400px] mx-auto px-5 py-8">
                {/* Header with Title and Shop All Link */}
                <div className="flex justify-between items-center mb-6 pb-3">
                    <h2 className="text-2xl font-bold text-gray-800">Discover Great Brands</h2>
                    <button className="text-black cursor-pointer text-sm font-medium underline underline-offset-4">
                        Shop all 
                    </button>
                </div>

                {/* Slider Container */}
                <div className="relative">
                    {/* Products Grid - Shows 6 products at a time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {visibleProducts.map((product) => (
                            <Card
                                key={product.id}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                // originalPrice={product.originalPrice}
                                buttonText={product.buttonText}
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;