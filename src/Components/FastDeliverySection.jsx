import React, { useState } from 'react';
import Card4 from './Card4';

const FastDeliverySection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 6; // Show 6 products at a time

    // 12 products from your screenshots
    const allProducts = [
        // First 6 Products
        {
            id: 401,
            image: "https://i5.walmartimages.com/seo/Bar-Keepers-Friend-Soft-Cleanser-26-oz-Squeeze-Bottle-Citrus-6-Carton_0341a4f3-8da6-41b1-9fc6-1896cdd0d482_1.54bfd40734263d7a61b02aaaf02ddb42.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Bar Keepers Friend Soft Cleanser, 26 oz Squeeze...",
            price: "2.72",
            originalPrice: null,
            buttonText: "+ Add",
            unit: null,
            shipping: null
        },
        {
            id: 402,
            image: "https://i5.walmartimages.com/seo/Black-and-White-2-Ply-Paper-Towels-88-Sheets_298c79bd-3b00-4786-81d5-3adc14df37ba_1.fc28f7779507266219d2ee3125054fce.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Black and White, 2-Ply Paper Towels, White, 88...",
            price: "0.78",
            originalPrice: null,
            buttonText: "+ Add",
            unit: null,
            shipping: null
        },
        {
            id: 403,
            image: "https://assets.eko.com/image/890cdde0-1125-11f1-8236-854dbf93968c/0?startOffset=0&width=1024",
            title: "Dove Crumb Limited Edition Liquid Hand Soap...",
            price: "3.97",
            originalPrice: null,
            buttonText: "Options",
            unit: null,
            shipping: null
        },
        {
            id: 404,
            image: "https://i5.walmartimages.com/seo/Scent-Theory-Hand-Sanitizer-Spray-Brazilian-Coconut-1-fl-oz_b6c82a98-ad8f-42f0-8cfe-b8f450639297.87d135868cedb449beb9705ae03f698d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Scent Theory Hand Sanitizer Spray, Brazilian...",
            price: "3.14",
            originalPrice: null,
            buttonText: "Options",
            unit: null,
            shipping: null
        },
        {
            id: 405,
            image: "https://i5.walmartimages.com/seo/Equate-91-Isopropyl-Alcohol-First-Aid-Antiseptic-Topical-Solution-Spray-10-fl-oz_ef4b845f-8858-406a-a4c5-825129e3553c.df889836b71337141fa1614f23baa1d7.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Equate 91% Isopropyl Alcohol First Aid Antiseptic...",
            price: "1.56",
            originalPrice: null,
            buttonText: "+ Add",
            unit: "15.6 c/fl oz",
            shipping: null
        },
        {
            id: 406,
            image: "https://i5.walmartimages.com/seo/Tree-Hut-Watermelon-Shea-Sugar-Exfoliating-and-Hydrating-Body-Scrub-18-oz_f8bd3ec5-b720-4e3a-86e1-53785b17b967.2cb2d2b3b30daad3a998d35abf434544.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Tree Hut Watermelon Shea Sugar Exfoliating and...",
            price: "8.94",
            originalPrice: null,
            buttonText: "+ Add",
            unit: "49.7 c/oz",
            shipping: null
        },
        // next4
        {
            id: 407,
            image: "https://i5.walmartimages.com/seo/Great-Value-Pack-of-10-Puncture-Resistant-Nitrile-Disposable-Multipurpose-Cleaning-Gloves-Blue_9a0a6785-e1be-4e48-9e6b-ba1f470d03ad.9d7dd231b22fe32106706475c9045020.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Great Value Puncture Resistant Nitrile Disposable...",
            price: "1.98",
            originalPrice: null,
            buttonText: "+ Add",
            unit: null,
            shipping: "Options from $1.98 – $29.33"
        },
        {
            id: 408,
            image: "https://i5.walmartimages.com/seo/No-Boundaries-Women-s-Low-Cut-Socks-10-Pack-Sock-Sizes-4-10_40a5fccd-b162-4a21-adf3-19460fe12ece.e650fe976fbe73e79d679a32d5d48927.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "No Boundaries Women's Low-Cut Socks, 10-Pack...",
            price: "6.97",
            originalPrice: null,
            buttonText: "Options",
            unit: null,
            shipping: "More options from $6.47"
        },
        {
            id: 409,
            image: "https://assets.eko.com/image/1062d420-d170-11f0-94e8-af1f783360de/0?startOffset=0&width=1024",
            title: "Equate Mobility Aluminum Offset Handle Cane with...",
            price: "9.97",
            originalPrice: null,
            buttonText: "+ Add",
            unit: null,
            shipping: null
        },
        {
            id: 410,
            image: "https://i5.walmartimages.com/seo/Band-Aid-Brand-Flexible-Fabric-Adhesive-Bandages-Assorted-100-Ct_d0725168-6cc3-402f-ae38-6928bc8c091e.048c9f53a867f2f57c61f8d42f3431b5.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Band-Aid Brand Flexible Fabric Adhesive Bandage...",
            price: "8.97",
            originalPrice: "15.64",
            buttonText: "Options",
            unit: null,
            shipping: "Options from $8.97 – $19.74"
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

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            {/* Header with Title */}
            <div className="mb-6 flex justify-between items-start">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800">Get it as fast as an hour</h2>
                    <p className="text-gray-600 mt-1">Your faves, straight to your door.</p>
                </div>
                <button className="text-black cursor-pointer text-sm font-medium underline underline-offset-4">
                    View all
                </button>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* Products Grid - Shows 6 products at a time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {visibleProducts.map((product) => (
                        <Card4
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            buttonText={product.buttonText}
                            unit={product.unit}
                            shipping={product.shipping}
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
            </div>
        </div>
    );
};

export default FastDeliverySection;