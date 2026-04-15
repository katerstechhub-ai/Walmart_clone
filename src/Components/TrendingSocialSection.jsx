import React, { useState } from 'react';
import Card7 from './Card7';

const TrendingSocialSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 3; // Show 3 cards at a time

    // All slides with products from your exact images
    const slides = [
        // Slide 1
        [
            {
                id: 701,
                image: "https://i5.walmartimages.com/dfw/605847c-40a5/k2-_9505b28d-f158-49b7-8dbc-f4e70571a84a.v1.jpg?odnHeight=520&odnWidth=520",
                username: "@shanon_montipaya",
                products: [
                    { id: 7011, title: "Fuggler Fuggalicious 9...", price: "9.97" },
                ]
            },
            {
                id: 702,
                image: "https://i5.walmartimages.com/dfw/605847c-a355/k2-_3325dd9a-cdd8-418a-9ee0-3c049d7712af.v1.jpg?odnHeight=520&odnWidth=520",
                username: "@reabeautyfinds",
                products: [
                    { id: 7022, title: "Hask sooth + Tea Tree Oil Scal...", price: "7.97" },
                ]
            },
            {
                id: 703,
                image: "https://i5.walmartimages.com/dfw/605847c-9b34/k2-_931caf59-eea0-4b82-835f-fdb74af92c71.v1.jpg?odnHeight=520&odnWidth=520",
                username: "@tonya_lynn_baker716",
                products: [
                    { id: 7032, title: "Freshpet Fresh Dog Food, small..", price: "8.46" },
                ]
            }
        ],
        // Slide 2
        [
            {
                id: 704,
                image: "https://i5.walmartimages.com/dfw/605847c-24b1/k2-_fd008c2e-7cde-4bcd-98f6-0e1c9b908317.v1.jpg?odnHeight=520&odnWidth=520",
                username: "@hannaheenderson",
                products: [
                    { id: 7041, title: "Free Assembly Women's...", price: "26.00" },
                ]
            },
            {
                id: 705,
                image: "https://i5.walmartimages.com/dfw/605847c-4a6f/k2-_6f0c0ac4-5aba-48f8-a767-f09f64273c31.v1.jpg?odnHeight=520&odnWidth=520",
                username: "@livesofwalmartwives",
                products: [
                    { id: 7051, title: "Bridgerton Celebrity Pink...", price: "29.50" },
                   
                ]
            },
            {
                id: 706,
                image: "https://i5.walmartimages.com/dfw/605847c-f384/k2-_c2a4ca5f-22e6-49e1-9923-f037d709ac08.v1.jpg?odnHeight=520&odnWidth=520",
                username: "@sweetpstyles_",
                products: [
                    { id: 7061, title: "No Boundaries Halter One-piece...", price: "19.98" },
                ]
            }
        ],
    ];

    const totalSlides = slides.length;
    const maxIndex = totalSlides - 1;
    const currentItems = slides[currentSlide];

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
            {/* Header - LEFT ALIGNED */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Trending on social</h2>
                <p className="text-gray-600 mt-1">Shop creator faves</p>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentItems.map((item) => (
                        <Card7
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            username={item.username}
                            products={item.products}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className={`absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-4 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <span className="text-xl">❮</span>
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === maxIndex}
                            className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-4 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === maxIndex ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <span className="text-xl">❯</span>
                        </button>
                    </>
                )}

                {/* Dots Indicator for Slides */}
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

export default TrendingSocialSection;