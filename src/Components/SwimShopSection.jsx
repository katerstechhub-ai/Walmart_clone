import React, { useState } from 'react';
import Card6 from './Card6';

const SwimShopSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 3; // Show 3 products at a time

    // All products for the swim shop section from your screenshots
    const allProducts = [
        {
            id: 601,
            image: "https://i5.walmartimages.com/seo/WN-QDRY-STRETCH-SWIM_0b30f943-c38f-43e5-8c28-de39419f4d92.970cba080dcc45a7c8b05cc2987d2427.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Wonder Nation Boys Quick Dry Stretch Swim Trunks...",
            price: "10.98",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 602,
            image: "https://i5.walmartimages.com/seo/TT-PAREOS_abdca278-ccf4-4768-9beb-27bc83bbabdf.958385a0354bb35441d800893a27d281.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Time and Tru Women's Printed Pareo, One Size...",
            price: "17.97",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 603,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Baby-and-Toddler-Long-Sleeve-Rash-Guard-Sizes-12M-5T_4b7e603a-2f9a-4592-a543-25f8c83f024f.dac761965272df1544fd37c4bb8d82fa.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Wonder Nation Baby and Toddler Boys Rash Guard...",
            price: "6.98",
            originalPrice: "8.98",
            buttonText: "Options",
            shipping: "Options from $6.98 – $8.98"
        },
        {
            id: 604,
            image: "https://i5.walmartimages.com/seo/No-Boundaries-Women-s-Knotty-by-Nature-Macrame-Triangle-Top-Sizes-XXS-XXL_1d2c4691-ef14-4c2c-980b-73c94cf9ae7b.1a0a6ce5993f19c779a1a61cca3faea1.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            title: "No Boundaries Macrame Triangle Bikini Top,...",
            price: "13.98",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 605,
            image: "https://i5.walmartimages.com/seo/Jessica-Simpson-Women-s-Gingham-Underwire-One-Piece-Swimwear-Sizes-XS-2XL_c90175c8-3385-4887-88aa-365a70d932b0.9bfd4d1f2edf74ecf1ad1c8f6527d601.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Jessica Simpson Women's Gingham Underwire One...",
            price: "32.00",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 606,
            image: "https://i5.walmartimages.com/seo/No-Boundaries-Women-s-Heart-Breaker-Underwire-One-Piece-Sizes-XXS-XXL_f6ce861d-7cc7-4ee4-88f1-b10dcd6f2c40.91fb080715c4e9dafa488c3c97650af2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "No Boundaries Underwire One-Piece Swimsuit,..",
            price: "22.98",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 607,
            image: "https://i5.walmartimages.com/seo/TT-WRAP-SWIM-DRESS-MELON-DELIGHT-L_dd730b97-12de-4f6a-b93a-15f8dfef0051.41d7966ede8ce25fc3872f6045d61bfb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Time and Tru Women's and Women's Plus Size Wrap...",
            price: "26.98",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 608,
            image: "https://i5.walmartimages.com/seo/George-Men-s-Big-Men-s-Novelty-Swim-Trunks-with-UPF-50-7-Inseam-Sizes-S-3XL_77e360c8-a7dd-42d8-8b61-6887cbf2a51f.892f9b46abca6d6b0b30c59af93c30c6.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "George Men's and Big Men's Novelty Swim...",
            price: "12.98",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 609,
            image: "https://i5.walmartimages.com/seo/No-Boundaries-Women-s-Scenic-Route-Lettuce-Edge-String-Bottom-Sizes-XXS-XXL_92ea3b5f-02dc-4e91-9881-38976ba742f2.b25e4db98ad97dad1216ce4ecc1a541e.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "No Boundaries Scenic Route String Bikini...",
            price: "13.98",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 610,
            image: "https://i5.walmartimages.com/seo/No-Boundaries-Women-s-Geo-Jam-Strapless-Keyhole-One-Piece-Sizes-XXS-XXL_2eaad47b-b085-49b5-b8f6-1e5ade8ef0a8.babe30f8d57a431b158e7c07b7173923.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "No Boundaries Keyhole One-Piece Swimsuits, ...",
            price: "19.98",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
        },
        {
            id: 611,
            image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Floral-One-Piece-Swimsuit-with-Bows-and-UPF-50-Sizes-4-18-Plus_976cc198-6417-44db-9cd0-c4ec054ee3ec.ba506045a8953e5b22443f800198c5fb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Wonder Nation Girls Floral One Piece Swimsuits with...",
            price: "11.98",
            originalPrice: null,
            buttonText: "Options",
            shipping: null
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
        <div className="w-full px-12 p-12">
            <div className="flex flex-col md:flex-row gap-3">

                {/* Left Div - Background Image (NOW ON LEFT) */}
                <div
                    className="rounded-lg w-full md:w-[60%] flex flex-col justify-start gap-3 min-h-[350px] bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: "url('https://i5.walmartimages.com/dfw/4ff9c6c9-141f/k2-_8d6dc240-439a-4ca4-bda4-4fcccf20a5a9.v1.jpg?odnHeight=894&odnWidth=1588&odnBg=&odnDynImageQuality=70')" }}
                >
                    <div className="relative z-10 p-6">
                        <h2 className="text-3xl font-bold text-white mb-2">The Swim Shop is open</h2>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                            Shop now
                        </button>
                    </div>
                </div>

                {/* Right Div - Product Slider (NOW ON RIGHT) */}
                <div className="w-full md:w-[55%]">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Ready to dive in?</h3>
                            <p className="text-gray-600">Suits to shorts for the fam.</p>
                        </div>
                        <button className="text-black text-sm underline underline-offset-4">View all</button>
                    </div>

                    {/* Slider Container */}
                    <div className="relative mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {visibleProducts.map((product) => (
                                <Card6
                                    key={product.id}
                                    id={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    buttonText={product.buttonText}
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
                                    className={`absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="text-xl">❮</span>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    disabled={currentSlide === maxIndex}
                                    className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="text-xl">❯</span>
                                </button>
                            </>
                        )}

                        {/* Dots Indicator */}
                        {/* {totalSlides > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
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
            </div>
        </div>
    );
};

export default SwimShopSection;