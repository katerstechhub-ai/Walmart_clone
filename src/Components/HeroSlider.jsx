import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            imageUrl: "https://i5.walmartimages.com/dfw/4ff9c6c9-abd8/k2-_f110b6fb-23e8-46ac-9791-4572e2cf2818.v1.jpg?odnHeight=300&odnWidth=1612&odnBg=&odnDynImageQuality=70",
            title: "For your family, home & beyond",
            subtitle: "Allergy relief, all in 1 place",
            buttonText: "Shop now"
        },
        {
            id: 2,
            imageUrl: "https://i5.walmartimages.com/dfw/4ff9c6c9-c887/k2-_153d8943-4586-4c7b-aa27-5dd466148e3a.v1.jpg?odnHeight=300&odnWidth=1612&odnBg=&odnDynImageQuality=70",
            title: "Free Delivery is always a plus.",
            subtitle: "Try Walmart+ now",
            buttonText: "Try Walmart+ now",
           
        },
        {
            id: 3,
            imageUrl: "https://i5.walmartimages.com/dfw/4ff9c6c9-fb64/k2-_8a519fcd-62a0-4c17-8b8e-a346c052e22d.v1.jpg?odnHeight=300&odnWidth=1612&odnBg=&odnDynImageQuality=70",
            title: "More in stores & online",
            subtitle: "La Roche-Posay — derms love it",
            buttonText: "Shop now"
        },
        {
            id: 4,
            imageUrl: "https://i5.walmartimages.com/dfw/4ff9c6c9-2daa/k2-_0f2a8885-dc02-4b14-914e-3be038fb406a.v1.jpg?odnHeight=300&odnWidth=1612&odnBg=&odnDynImageQuality=70",
            title: "Time for a spring refresh",
            subtitle: "Save on 1,000s of must-haves",
            buttonText: "Shop now",
            badge: "Rollbacks & more"
        },
        {
            id: 5,
            imageUrl: "https://i5.walmartimages.com/dfw/4ff9c6c9-172d/k2-_1c17101b-8a67-47c5-a1dc-0bd29d3772d6.v1.jpg?odnHeight=300&odnWidth=1612&odnBg=&odnDynImageQuality=70",
            title: "Jewelry, beauty, home & more for May 10",
            subtitle: "Mother's Day gifts that are so her",
            buttonText: "Shop now"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => setCurrentSlide(index);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const current = slides[currentSlide];

    return (
        <div className="relative px-4 mt-4 p-6 w-full overflow-hidden">
            <div
                className="relative h-[300px] md:h-[200px] lg:h-[250px] w-full bg-gray-200 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: current.imageUrl ? `url(${current.imageUrl})` : 'none' }}
            >
                {/* Text content */}
                <div className="absolute inset-0 flex flex-col justify-center">
                    <div className="container mx-auto px-5">
                        <div className="max-w-lg text-gray-800">

                            {current.badge && (
                                <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                                    {current.badge}
                                </span>
                            )}

                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                                {current.title}
                            </h1>

                            <p className="text-base md:text-lg lg:text-xl mb-4">
                                {current.subtitle}
                            </p>

                            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold cursor-pointer border border-black transition-colors">
                                {current.buttonText}
                            </button>

                            {current.footerText && (
                                <p className="text-xs mt-3 opacity-70">
                                    {current.footerText}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 w-8 h-8 rounded-full hover:bg-white transition-colors flex items-center justify-center shadow-md"
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 w-8 h-8 rounded-full hover:bg-white transition-colors flex items-center justify-center shadow-md"
                    >
                        ❯
                    </button>
                </>
            )}

            {/* Dots */}
            {/* {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all ${currentSlide === index ? "bg-gray-600 w-4" : "bg-gray-400 w-2"}`}
                        />
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default HeroSlider;