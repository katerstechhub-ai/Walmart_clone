import React, { useState } from 'react';
import AddEssentialsCard from "./AddYourEssentialsCard";

const AddYourEssentialsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 5; // Show 5 cards at a time

    // 10 products (2 slides of 5 products each)
    const allProducts = [
        // First 5 products
        {
            id: 1,
            image: "https://i5.walmartimages.com/seo/Great-Value-Everyday-Disposable-Paper-Plates-8-5-100-Count_c8a31a8b-d814-4db9-993b-c781eb93d9c9.2bfecad7b07aa43ae59f085630d7ba14.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Best seller",
            unitPrice: "8.5\" Paper Plates",
            title: "Great Value Disposable Paper Plates, 8.5\", 100...",
            price: "5.58",
            unit: "$5.58/100 ct",
            rating: 5.0,
            ratingCount: "155625",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            shipping: "Shipping, arrives today",
            buttonText: "+ Add"
        },
        {
            id: 2,
            image: "https://i5.walmartimages.com/seo/Equate-Flushable-Wipes-Fresh-Scent-5-packs-of-48-wipes-240-Total-Wipes_a845197e-aafe-483e-a86a-2d9aaa1ec417.c198ed157fc272ba229c258d2895ba55.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Best seller",
            title: "Special Kitty Clumping Clay Cat Litter, Fresh...",
            price: "6.00",
            rating: 5.0,
            ratingCount: "27484",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            shipping: "Shipping, arrives today",
            buttonText: "+ Add"
        },
        {
            id: 3,
            image: "https://i5.walmartimages.com/seo/Core-Power-Protein-Shake-with-26g-Protein-by-fairlife-Milk-Chocolate-14-fl-oz_cbde3cb0-2183-423a-a06d-5ed43a9575eb.f7bba1590c293d0b106a9d13451794e5.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: null,
            rollback: true,
            title: "Great Value Lemon Scent Disinfecting...",
            price: "3.13",
            originalPrice: "3.94",
            unit: "$4.17/100 ct",
            rating: 5.0,
            ratingCount: "27015",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            shipping: "Shipping, arrives today",
            buttonText: "+ Add"
        },
        {
            id: 4,
            image: "https://assets.eko.com/image/c65fc510-a5ee-11f0-a84a-a7aea37a311d/0?startOffset=0&width=1024",
            tag: "Best seller",
            unitPrice: "2 Pack",
            title: "Crest Toothpaste, 3D White Advanced Teeth...",
            price: "30.00",
            rating: 5.0,
            ratingCount: "19009",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            shipping: "Shipping, arrives today",
            buttonText: "+ Add"
        },
        {
            id: 5,
            image: "https://i5.walmartimages.com/seo/Special-Kitty-Scoopable-Tight-Clumping-Cat-Litter-Fresh-Scent-20-lb_c7a041d5-151b-4a0a-88b6-ceda8e3c89db.cbc6039d1fd7013ff7ddca1c1a064aff.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Equate Makeup Remover Cleansing...",
            price: "4.97",
            rating: 5.0,
            ratingCount: "935",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            buttonText: "+ Add"
        },
        // Next 5 products (Slide 2)
        {
            id: 6,
            image: "",
            tag: "Best seller",
            title: "Bounty White Paper Towels, 8 ct",
            price: "12.97",
            rating: 5.0,
            ratingCount: "84562",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            buttonText: "+ Add"
        },
        {
            id: 7,
            image: "YOUR_IMAGE_URL_HERE",
            tag: "Best seller",
            title: "Tide PODS Laundry Detergent Pacs, 81 ct",
            price: "19.97",
            rating: 5.0,
            ratingCount: "123456",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            buttonText: "+ Add"
        },
        {
            id: 8,
            image: "YOUR_IMAGE_URL_HERE",
            rollback: true,
            title: "Dawn Dish Soap, Original Scent, 24 oz",
            price: "3.97",
            originalPrice: "5.99",
            rating: 5.0,
            ratingCount: "98765",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            buttonText: "+ Add"
        },
        {
            id: 9,
            image: "YOUR_IMAGE_URL_HERE",
            tag: "Best seller",
            title: "Clorox Disinfecting Wipes, 75 ct",
            price: "6.97",
            rating: 5.0,
            ratingCount: "54321",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            buttonText: "+ Add"
        },
        {
            id: 10,
            image: "YOUR_IMAGE_URL_HERE",
            title: "Scotch-Brite Heavy Duty Scrub Sponges, 6 ct",
            price: "4.97",
            rating: 4.5,
            ratingCount: "3210",
            saveWithW: true,
            pickup: "Pickup today",
            delivery: "Delivery today",
            buttonText: "+ Add"
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
      <div className="w-full px-5 py-8 rounded-lg shadow-2xl ">
            {/* Header */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add your essentials</h2>

            {/* Slider Container */}
            <div className="relative">
                {/* 5 Column Grid */}
                
                    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
                        {visibleProducts.map((product) => (
                            <AddEssentialsCard
                                key={product.id}
                                image={product.image}
                                tag={product.tag}
                                rollback={product.rollback}
                                unitPrice={product.unitPrice}
                                title={product.title}
                                price={product.price}
                                unit={product.unit}
                                rating={product.rating}
                                ratingCount={product.ratingCount}
                                saveWithW={product.saveWithW}
                                pickup={product.pickup}
                                delivery={product.delivery}
                                shipping={product.shipping}
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


            </div>
        </div>
    );
};

export default AddYourEssentialsSection;