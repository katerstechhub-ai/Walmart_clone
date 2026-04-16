import React, { useState } from 'react';
import YouMayAlsoLikeCard from './YouMayAlsoLikeCard';

const ProductsYouMayAlsoLike = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 4; // Show 4 cards at a time

    // 12 products from your images
    const allProducts = [
        // First 4 products
        {
            id: 1,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Flower-Icon-Cozy-Ankle-Socks-3-pack-Size-Medium-Shoe-Size-10-5-4_b64d0fb7-1309-40a4-b205-cad3d7592926.f9f461bb7d993103c9ddc3345737b79d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "4.98",
            title: "Wonder Nation Girls Flower Icon Cozy Ankle Socks, 3-pack, Size Medium (Shoe Size 10.5-4)",
            rating: 4.0,
            ratingCount: "7",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 2,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Heart-Quarter-Crews-Socks-6-pack-Size-Medium-Shoe-Size-10-5-4_fb129a00-3157-4128-8cae-284339b672ba.f1ffdafc810dbc438ad5e3834409043e.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: null,
            price: "5.98",
            title: "Wonder Nation Girls Heart Quarter Crews Socks, 6-pack, Size Medium (Shoe Size 10.5-4)",
            rating: 4.0,
            ratingCount: "8",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 3,
            image: "https://i5.walmartimages.com/seo/Disney-Lilo-and-Stitch-Girls-Short-Sleeve-T-Shirt-Stitch-Girls-Volleyball-Graphic-Tee-Sizes-4-16-Light-Blue-Lavender-14-16_864398d7-ece2-421d-83a2-647cdc17dcdc.1782889c705ed938a9ff730cd8dbd933.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "16.99",
            title: "Disney Lilo and Stitch Girls Short Sleeve T-Shirt- Stitch Girls Volleyball Graphic Tee...",
            rating: 4.0,
            ratingCount: "13",
            shipping: "Shipping, arrives tomorrow",
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 4,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Teddy-Bear-and-Holiday-Quarter-Crews-Socks-6-pack-Size-Medium-Shoe-Size-10-5-4_5da05af0-f1e1-4a20-bdae-8d3e92240e3c.3050f93118dde2f14d7f4cb39bce5772.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "in 100+ people's carts",
            price: "5.98",
            title: "Wonder Nation Girls Teddy Bear and Holiday Quarter Crews Socks, 6-pack",
            rating: null,
            ratingCount: null,
            shipping: null,
            pickup: null,
            delivery: null,
            size: "Size:"
        },
        // Next 4 products
        {
            id: 5,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Teddy-Bear-and-Holiday-Quarter-Crews-Socks-6-pack-Size-Medium-Shoe-Size-10-5-4_5da05af0-f1e1-4a20-bdae-8d3e92240e3c.3050f93118dde2f14d7f4cb39bce5772.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "in 50+ people's carts",
            price: "7.98",
            title: "Wonder Nation Girls Clustered Arike Socks, 10-Pack",
            rating: null,
            ratingCount: null,
            shipping: null,
            pickup: null,
            delivery: null,
            size: "Size:"
        },
        {
            id: 6,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Cushioned-Ankle-Socks-10-Pack-Sizes-S-6-10-5-L-4-10_91eaae7b-4782-4528-9434-b5bdd65de6fd.22f80a077f50466c40d7a3578d03a0da.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "in 25+ people's carts",
            price: "4.98",
            title: "Wonder Nation Girls Socks, 3 Pack Sizes: S-L",
            rating: null,
            ratingCount: null,
            shipping: null,
            pickup: null,
            delivery: null,
            size: null
        },
        {
            id: 7,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Baby-and-Toddler-Crew-Socks-10-Pack-Size-0M-5T_6845b7e8-0f3c-46a2-ac7b-5395e3d8df85.ac92c1feb1fe681ba647e67cc89d65c1.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: null,
            price: "4.98",
            title: "Wonder Nation Girls Socks, 3 Pack",
            rating: 5.0,
            ratingCount: null,
            shipping: "Shipping arrives tomorrow",
            pickup: "Pickup today",
            delivery: "Delivery today",
            size: null
        },
        {
            id: 8,
            image: "https://i5.walmartimages.com/seo/Wonder-Woman-Girls-4-16-Graphic-Top-and-Logo-Scooter-2-Piece-Outfit-Set_310fe35a-56d6-4a3d-8634-f47cdc16872c_1.36b211c80f28898fc95acfdb6fbc3979.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: null,
            price: "4.98",
            title: "Wonder Nation Girls Socks, 3 Pack",
            rating: 5.0,
            ratingCount: null,
            shipping: "Shipping arrives in 3+ days",
            pickup: null,
            delivery: null,
            size: null
        },
        // Last 4 products
        {
            id: 9,
            image: "https://i5.walmartimages.com/seo/Justice-Girls-Cinch-Front-Top-Sizes-XS-XLP_3e685ae8-f8d1-43e1-8db1-6163f47c5671.bbbb0b93db673f0b12e8663e4aa161fa.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Best seller",
            price: "12.00",
            title: "Justice Girls Cinch Front Top",
            rating: 5.0,
            ratingCount: "16",
            shipping: "Shipping arrives in 3+ days",
            pickup: null,
            delivery: null,
            size: "Sizes XS - XL"
        },
        {
            id: 10,
            image: "https://i5.walmartimages.com/seo/Justice-Girls-Cinch-Front-Top-Sizes-XS-XLP_7c108f42-be39-4258-af5e-cbfd26cceaf2.5e4635521cf12298da422ef3784ad71f.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Best seller",
            price: "12.00",
            title: "Justice Girls Cinch Front Top",
            rating: 5.0,
            ratingCount: "16",
            shipping: "Shipping arrives in 3+ days",
            pickup: null,
            delivery: null,
            size: "Sizes XS, S - XL"
        },
        {
            id: 11,
            image: "https://i5.walmartimages.com/seo/Justice-Girls-Cinch-Front-Top-Sizes-XS-XLP_7c108f42-be39-4258-af5e-cbfd26cceaf2.5e4635521cf12298da422ef3784ad71f.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Sponsored",
            price: "4.98",
            title: "Wonder Nation Girls Cozy Ankle Socks, 3-pack, Size Medium",
            rating: 5.0,
            ratingCount: null,
            shipping: "Shipping arrives tomorrow",
            pickup: null,
            delivery: null,
            size: "Medium (Shoe Size: 105-4)"
        },
        {
            id: 12,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Heart-Icon-Cozy-Ankle-Socks-3-pack-Size-Medium-Shoe-Size-10-5-4_8b1d7a25-a06b-4df1-9960-aedd1c5dee27.940b0a1c4f95958aee3aea0a98146ac5.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "4.98",
            title: "Wonder Nation Girls Cozy Ankle Socks, 3-pack, Size Medium",
            rating: 5.0,
            ratingCount: null,
            shipping: "Shipping arrives tomorrow",
            pickup: null,
            delivery: null,
            size: "Medium Ankle Socks, 3-pack, Size"
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
                <h2 className="text-xl font-bold text-gray-800">Products you may also like</h2>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* 4 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {visibleProducts.map((product) => (
                        <YouMayAlsoLikeCard
                            key={product.id}
                            image={product.image}
                            tag={product.tag}
                            price={product.price}
                            title={product.title}
                            rating={product.rating}
                            ratingCount={product.ratingCount}
                            shipping={product.shipping}
                            pickup={product.pickup}
                            delivery={product.delivery}
                            size={product.size}
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

export default ProductsYouMayAlsoLike;