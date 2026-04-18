import React, { useState } from 'react';
import JustInFoodCard from './JustInFoodCard';

const JustInHome = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 6;

    const allProducts = [
        { id: 1, image: "YOUR_IMAGE_URL_HERE", tag: "Best seller", price: "129.99", unitPrice: "$2.36/lb", title: "Antique white Sideboard with Glass Door, Farmhouse Buffet Cabinet...", saveWithW: true, shipping: "Shipment arrives in 3+ days", buttonText: "+ Add" },
        { id: 2, image: "YOUR_IMAGE_URL_HERE", price: "2.08", title: "Clear Plastic Finger Bowls, 3.54\", 12 Count, by Way to Celebrate", rating: 5.0, ratingCount: "1", saveWithW: true, buttonText: "Options" },
        { id: 3, image: "YOUR_IMAGE_URL_HERE", price: "164.99", unitPrice: "+6 options", title: "King Size Mattress, Bitsky 12 inch Memory Foam Mattress in a Box with...", buttonText: "Options" },
        { id: 4, image: "YOUR_IMAGE_URL_HERE", price: "25.99", title: "Anyrose 59.2\"x16\" Arched Full Length Mirror Free", buttonOptions: "Options from $25.99 - $49.99" },
        { id: 5, image: "YOUR_IMAGE_URL_HERE", price: "177.99", unitPrice: "+4 options", title: "Jopath 3 in 1 Convertible Sofa Bed, Modern Pull Out Couch Sleeper Bed with...", buttonText: "Options" },
        { id: 6, image: "YOUR_IMAGE_URL_HERE", price: "1.00", title: "Purple Plastic Table Cover 54\" x 108\" by Way To Celebrate", saveWithW: true, pickup: "Pickup today", buttonText: "Options" },
        { id: 7, image: "YOUR_IMAGE_URL_HERE", price: "25.69", title: "My Texas House Brown 9\" Mango Wood Scallop Decorative Bowl", saveWithW: true, buttonText: "+ Add" },
        { id: 8, image: "YOUR_IMAGE_URL_HERE", price: "48.86", title: "ProKeeper Plastic 9-Piece Professional Baker's Storage Container Set wit...", saveWithW: true, buttonText: "Options" },
        { id: 9, image: "YOUR_IMAGE_URL_HERE", price: "72.99", unitPrice: "+2 options", title: "Casabay Dual Basket Air Fryer, 9.5 Qt Large Capacity Oven, 10-in-1 Functions...", buttonText: "Options" },
        { id: 10, image: "YOUR_IMAGE_URL_HERE", price: "12.97", title: "Better Homes & Gardens Stainless Steel Hammered Oval Tub, 20.27 in x 11.22 in", rating: 3.0, ratingCount: "30", saveWithW: true, buttonText: "Options" },
        { id: 11, image: "YOUR_IMAGE_URL_HERE", price: "9.99", unitPrice: "+3 options", title: "Walsunny Over the Toilet Storage Cabinets with Doors Side Shelves Toilet...", buttonText: "Options" },
        { id: 12, image: "YOUR_IMAGE_URL_HERE", price: "299.99", title: "Neche 100° PU Faux Leather Sofa with Movable ...", buttonOptions: "More options from $299.99" }
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
                <h2 className="text-xl font-bold text-gray-800">Just in: home</h2>
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

export default JustInHome;