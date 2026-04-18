import JustInFoodCard from './JustInFoodCard';
import React, { useState } from 'react';
const NewInFoodBevs = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 6;

    const allProducts = [
        { id: 1, image: "https://i5.walmartimages.com/seo/Crunch-Assorted-Chocolate-Easter-Egg-Fillers-Butterfinger-Baby-Ruth-Crunch-and-Tic-Tac-Chewy-21-6-oz_56550810-83a0-4e5c-8fb4-968a1621cd87.a06d4f66fda5dc6c39ed496c3876d674.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFFE", tag: "Best seller", price: "104.20", unitPrice: "60 Pieces", title: "Crunch Assorted Chocolate Easter Egg Fillers, Butterfinger, Baby Ruth...", rating: 5.0, ratingCount: "94", buttonText: "Options" },
        { id: 2, image: "https://i5.walmartimages.com/seo/SIMPLY-CHEETOS-PUFF-WHITE-CHEDDAR-CHEESE-6OZ_b54f5da5-5473-4820-b377-94f5fd996c23.f8aa15a6cf97ce0b6828fa8567f7448f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", price: "3.12", unitPrice: "+3 options", title: "Simply White Cheddar Cheese Flavored Cheetos Puffs Snacks, 6 oz", rating: 3.0, ratingCount: "716", buttonText: "+ Add" },
        { id: 3, image: "https://i5.walmartimages.com/seo/TIC-TAC-Fresh-Breath-Mints-Dr-Pepper-Hard-Candy-Mints-3-4oz-98g-Bottle-Packs_a4615082-19f0-48d4-bd1a-b823648f9f63.8447394fb6500254c1e79904c189cccf.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", tag: "Best seller", price: "4.52", unitPrice: "200 Tic Tac", title: "Tic Tac Dr Pepper, Pocket-sized Mints, Dr Pepper Flavored On-the-Go...", rating: 5.0, ratingCount: "73", saveWithW: true, buttonText: "Options" },
        { id: 4, image: "https://i5.walmartimages.com/seo/SMARTFOOD-WHITE-CHEDDAR-6-0OZ_bbd3b304-5f1d-4e50-bf0e-9aa383806bf9.195e8598a8cb38155f270b6cacc314f2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", price: "4.52", title: "Smartfood Gluten Free, No Artificial Colors Wholes Cheddar Popcorn Bag, 6 oz", rating: 5.0, ratingCount: "4385", saveWithW: true, buttonText: "+ Add" },
        { id: 5, image: "https://i5.walmartimages.com/seo/C20-Organic-Coconut-Water-Original-16-9-Fl-Oz-Pack-of-12_ff291bc5-d23d-4540-9d50-380897377a82.f3666421540d9d9c113f2ce2206eacfb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", price: "4.52", title: "Tic Tac Dr Pepper, Pocket-sized Mints, Dr Pepper Flavored On-the-Go...", rating: 5.0, ratingCount: "73", buttonText: "Options" },
        { id: 6, image: "https://i5.walmartimages.com/seo/TOSTITOS-CANTINA-THIN-CRISPY-8OZ_293c68bd-11a2-41bb-b82b-031e4d1e4250.4310912f7def24e0efbc2713ddfa472c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", price: "2.92", title: "Smartfood Gluten Free, No Artificial Colors Wholes Cheddar Popcorn Bag, 6 oz", rating: 5.0, ratingCount: "52", saveWithW: true, buttonOptions: "Options from $2.92-" },
        { id: 7, image: "YOUR_IMAGE_URL_HERE", tag: "Best seller", price: "3.97", unitPrice: "+3 options", title: "bubly Sparkling Water, The Super Mario Galaxy Movie Cosmic Swirl, Zero Sugar ...", rating: 4.0, ratingCount: "110", buttonText: "Options" },
        { id: 8, image: "YOUR_IMAGE_URL_HERE", price: "10.23", originalPrice: "43.99", title: "Hershey's Nuggets Milk Chocolate Candy Family Pack, 14.2 oz", rating: 4.0, ratingCount: "248", buttonOptions: "Options from $10.23-$43.99" },
        { id: 9, image: "YOUR_IMAGE_URL_HERE", price: "3.44", title: "Great Value Mandarin Oranges in Light Syrup, 29 oz", rating: 4.0, ratingCount: "1067", buttonText: "Options" },
        { id: 10, image: "YOUR_IMAGE_URL_HERE", price: "3.44", title: "Great Value Mandarin Oranges in Light Syrup, 29 oz", rating: 4.0, ratingCount: "107", buttonText: "+ Add" },
        { id: 11, image: "YOUR_IMAGE_URL_HERE", price: "2.97", title: "Tostitos Cantina Thin and Crispy Tortilla Chips, 8 oz", rating: 5.0, ratingCount: "490", saveWithW: true, shipping: "Pickup today | Delivery today", buttonText: "Options" },
        { id: 12, image: "YOUR_IMAGE_URL_HERE", price: "2.97", title: "Tostitos Cantina Thin and Crispy Tortilla Chips, 8 oz", rating: 5.0, ratingCount: "490", saveWithW: true, shipping: "Pickup today | Delivery today", buttonText: "+ Add" }
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
                <h2 className="text-xl font-bold text-gray-800">New in food & bevs</h2>
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

export default NewInFoodBevs;