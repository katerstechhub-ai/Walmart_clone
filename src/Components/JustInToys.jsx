import React, { useState } from 'react';
import JustInFoodCard from './JustInFoodCard';

const JustInToys = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 6;

    const allProducts = [
        { id: 1, image: "https://i5.walmartimages.com/seo/Dc-7in-Action-Figure-MCE-Supergirl-Movie-Figure-4-McFarlane-Toys_6507697c-4e4f-4261-9f03-2b531352de6a.c54e0a7847681d927fd92962e1a257e1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", tag: "Preorder", price: "34.99", title: "Supergirl and Baby Krypto (DC Multiverse: Supergirl Movie) 7\" Action Figure...", rating: 5.0, ratingCount: "1", shipping: "Shipping, arrives in 3+ days", pickup: "Pickup today", buttonText: "Options" },
        { id: 2, image: "https://i5.walmartimages.com/seo/Apple-Shape-Stress-Ball_7f422b62-f653-4302-b516-30738c69efdb.291bdf0ccbe865407acf2f0727804685.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF", tag: "Best seller", price: "9.99", title: "Apple Shape Stress Ball for Classroom & Office - Soft Squeeze Comfort", rating: 5.0, ratingCount: "1", saveWithW: true, buttonText: "Options" },
        { id: 3, image: "https://i5.walmartimages.com/seo/BARBIE-BASIC-DOLL-7_c30f13ce-f841-45e5-aace-4579c2b52f4b.cba52eaf5cc63e69eef642df3fabcd8d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", tag: "Best seller", price: "19.99", title: "Barbie Basics Collectible Doll, Model O7 with Blonde Hair in White Pants with...", rating: 5.0, ratingCount: "21", saveWithW: true, buttonText: "Options" },
        { id: 4, image: "https://i5.walmartimages.com/seo/Hedgehog-The-Minifigures-Collection-Custom-24-Set_d4c0e528-ff12-43e4-b96a-2fc8a63b9da6.a843b1bc1bbed949239fad2e659567b0.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF", tag: "Best seller", price: "29.99", title: "Hedgehog The Minifigures Collection Custom 24 Set", shipping: "Shipping, arrives in 3+ days", buttonText: "Options" },
        { id: 5, image: "https://i5.walmartimages.com/seo/CYBIC-Mountain-Bikes-20-Inch-21-Speed-Boys-Girls-Bicycle-High-Carboon-Frame-Front-Suspension-and-Disc-Brakes-MTB_881b94e3-39b3-4a60-862d-ab86d8859b26.ee95a55887765f03af4f1c4f7fb28125.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF", price: "59.99", title: "Neo Doh Swirlin Usa Nice Cube, 1 pc", shipping: "Shipping, arrives in 3+ days", buttonText: "+ Add" },
        { id: 6, image: "https://i5.walmartimages.com/seo/Nee-Doh-Swirlin-Usa-Nice-Cube-1-pc_b287ed30-90ea-4652-b8cd-78c77a3c5e6d.690357663a2a4b81b43280b02c2a6503.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF", tag: "Best seller", price: "10.97", title: "Hyojo Creamsicle Series, Blind Box Collectible Plush, Limited Edition Toy Gift for...", rating: 4.0, ratingCount: "26", saveWithW: true, shipping: "Shipping, arrives today", buttonText: "Options" },
        { id: 7, image: "YOUR_IMAGE_URL_HERE", tag: "Best seller", price: "9.98", title: "Little Kids Inc. Spiderman Bubble Slinger Blowing Toy", rating: 4.0, ratingCount: "24", saveWithW: true, shipping: "Shipping, arrives today", buttonText: "+ Add" },
        { id: 8, image: "YOUR_IMAGE_URL_HERE", price: "12.99", title: "Amazing Digital Circus Gummigoo Vinyl Figure, 4\" Collectible with Luminous...", rating: 4.0, ratingCount: "43", saveWithW: true, shipping: "Shipping, arrives in 3+ days", buttonText: "Options" },
        { id: 9, image: "YOUR_IMAGE_URL_HERE", price: "119.99", title: "VortexRider Electric Scooter 350W 8.5' Foldable Scooter for Adults with AP...", rating: 4.0, ratingCount: "2", saveWithW: true, shipping: "Shipping, arrives in 3+ days", buttonText: "Options" },
        { id: 10, image: "YOUR_IMAGE_URL_HERE", price: "12.97", title: "Arkitec 108-Piece New York CityVision 3D Build Wooden Puzzle", rating: 4.0, ratingCount: "188", saveWithW: true, buttonText: "+ Add" },
        { id: 11, image: "YOUR_IMAGE_URL_HERE", price: "12.97", title: "Bubble Slinger", buttonText: "Options" },
        { id: 12, image: "YOUR_IMAGE_URL_HERE", price: "12.97", title: "BUBBLE SLINGER", buttonText: "+ Add" }
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
                <h2 className="text-xl font-bold text-gray-800">Just in: toys</h2>
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

export default JustInToys;