import React, { useState } from 'react';
import JustInFoodCard from './JustInFoodCard';

const JustInTech = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 6;

    const allProducts = [
        { id: 1, image: "https://i5.walmartimages.com/seo/Samsung-Galaxy-Buds4-Pro-Black_a15892d4-41ca-4839-9ac1-57aed4181ae6.3c234a07110bf2964c4dd6f62a36083a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", tag: "Best seller", price: "249.99", unitPrice: "+2 options", title: "Samsung Galaxy Buds4 Pro Bluetooth Headphones and Charging Case, Black", buttonText: "Options" },
        { id: 2, image: "https://i5.walmartimages.com/seo/Chheart-15-6-Inch-Laptop-Computer-8-8-GB-2-x-DDR3-SODIMM-256GB-SSD-M3-Processor-up-to-2-2-GHz-Windows-11-Pro-Wifi-5-BT-4-2-Silver_f45cb7a2-28a5-4bb5-b1a8-b1b729f63aa6.d636e50cf0ac33fcfdca784367165fed.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF", tag: "Reduced price", price: "116.00", title: "TCL TAB 8 Gen 2 8.7\" Display Tablet with 64GB Storage, 6000mAh Battery...", buttonText: "Options" },
        { id: 3, image: "https://i5.walmartimages.com/seo/TCL-TAB-8-Gen-2-Tablet-8-7-in-90Hz-IPS-Display-HD-Resolution-6000mAh-Reverse-Charging-Octa-core-Processor-4GB-64GB-1TB-5MP-Front-8MP-Rear-Cameras_48f83ee2-e48e-4e92-86bd-d3292c834301.0c42e3b1a2fcf2fba37c72d4243f2941.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", tag: "Best seller", price: "899.99", unitPrice: "+3 options", title: "PlayStation 5 Pro Console", rating: 5.0, ratingCount: "1464", shipping: "Shipping, arrives in 3+ days", buttonText: "Options" },
        { id: 4, image: "https://i5.walmartimages.com/seo/Arcade-Classics-Atari-Centipede-Ultra-Series-Arcade-Game-Cabinet-with-17-Screen_707bff75-daca-4e21-9126-25bbce1b3645.47cfbe3744ab98933b3d04d6e51bb8a1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", price: "389.00", title: "2026 vSeeBox V6 Plus Android 14.0, vSee Box Smart Digital Device for...", rating: 5.0, ratingCount: "19", shipping: "Shipping, arrives in 3+ days", buttonText: "+ Add" },
        { id: 5, image: "https://i5.walmartimages.com/seo/Xbox-Game-Pass-Premium-1-Month-Digital_05fc07e1-b4bd-497b-ae2a-f614a16c9b00.e150f2ccfac619670ec698cee2193704.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", price: "389.00", title: "New TEC Meta Quest 3S VR Bundle – 128GB All-in-One Headset with Protective...", rating: 5.0, ratingCount: "14", shipping: "Shipping, arrives in 3+ days", buttonText: "Options" },
        { id: 6, image: "https://i5.walmartimages.com/seo/Sony-PlayStation-5-Pro-Console-PS5-Pro_4d0b2f4c-4d75-453f-99d9-47d2ee4460fb.22c0c50a6e80e0fb409944fbb789b3ca.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", price: "38.90", title: "AI Smart Glasses, AI Chat Deepseek R1 and Gemini-2.5 with 164 Translations...", buttonText: "Options" },
        { id: 7, image: "YOUR_IMAGE_URL_HERE", price: "9.99", title: "Extreme 10-Pack Universe Silicone Smart Watch Bands - Adjustable...", rating: 3.0, ratingCount: "280", saveWithW: true, shipping: "Pickup today | Delivery today | Shipping, arrives today", buttonText: "Options" },
        { id: 8, image: "YOUR_IMAGE_URL_HERE", price: "59.99", title: "Arcade Classics Atari Centipede Ultra Series", buttonText: "Options" },
        { id: 9, image: "YOUR_IMAGE_URL_HERE", price: "59.99", title: "RAM, 256GB SSD, M3...", buttonOptions: "More options from $59999" },
        { id: 10, image: "YOUR_IMAGE_URL_HERE", price: "59.99", title: "GAME PASS Premium", buttonText: "Options" },
        { id: 11, image: "YOUR_IMAGE_URL_HERE", price: "59.99", title: "vSeeBox V6 Plus", buttonText: "+ Add" },
        { id: 12, image: "YOUR_IMAGE_URL_HERE", price: "59.99", title: "Samsung Galaxy Buds4 Pro", buttonText: "Options" }
    ];

    const totalSlides = Math.ceil(allProducts.length / itemsPerView);
    const maxIndex = totalSlides - 1;
    const startIndex = currentSlide * itemsPerView;
    const visibleProducts = allProducts.slice(startIndex, startIndex + itemsPerView);

    const nextSlide = () => { if (currentSlide < maxIndex) setCurrentSlide(currentSlide + 1); };
    const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };
    const goToSlide = (index) => setCurrentSlide(index);

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Just in: tech</h2>
                <button className="text-black text-sm underline underline-offset-4">View all</button>
            </div>
            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {visibleProducts.map((product) => (<JustInFoodCard key={product.id} {...product} />))}
                </div>
                {allProducts.length > itemsPerView && (
                    <>
                        <button onClick={prevSlide} disabled={currentSlide === 0} className={`absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>❮</button>
                        <button onClick={nextSlide} disabled={currentSlide === maxIndex} className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}>❯</button>
                    </>
                )}
                {/* {totalSlides > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-blue-600 w-6" : "bg-gray-300 w-2 hover:bg-gray-400"}`} />
                        ))}
                    </div>
                )} */}
            </div>
              <div className="border-b border-gray-200 mt-14"></div>
        </div>
    );
};

export default JustInTech;
