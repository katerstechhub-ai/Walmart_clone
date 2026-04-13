import React, { useState } from 'react';
import Card3 from './Card3';

const EventSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 3; // Show 3 products at a time

    // All products for the event section
    const allProducts = [
        {
            id: 1,
            image: "https://i5.walmartimages.com/seo/Fantaslook-Blouses-for-Women-Dressy-Casual-3-4-Length-Sleeve-Womens-Tops-with-Smocked-Cuffs-Fashion-Shirts_97d4753f-8f76-4f8a-9946-236dd6f08b3e.5ff095e7c6dab03fdf0b132e6866dfe4.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Fantastook Blouses for Women Dressy Casual 3/...",
            price: "11.59",
            originalPrice: "12.99",
            shipping: "+$3.00 shipping"
        },
        {
            id: 2,
            image: "https://i5.walmartimages.com/seo/Daystry-Smooth-Wireless-Bras-for-Women-No-Underwire-Comfort-Seamless-Bras-Full-Coverage-Everyday-Bra_a8e81837-7860-4afb-83c3-42e1633f0ee7.53d68f2fdb3ae149e79777000217058c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Daestry Smooth Wireless Bras for Women No...",
            price: "9.85",
            originalPrice: "15.78",
            shipping: null
        },
        {
            id: 3,
            image: "https://i5.walmartimages.com/seo/Ecetana-Slippers-for-Women-Fuzzy-Slippers-Warm-Slip-On-House-Sock-Shoes-with-Hook-Loop_dec6c0d1-41e8-4735-a153-7f28974d9754.57f288da5d468035020f199ad4d9276c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Ecatana Slippers for Women Fuzzy Slippers...",
            price: "9.85",
            originalPrice: "12.89",
            shipping: "+$3.99 shipping"
        },
        {
            id: 4,
            image: "https://i5.walmartimages.com/seo/Nike-Air-Max-Plus-Black-Blue-Kid-s-Size-6-5Y-CD0609-032-New-Authentic_51fcff70-4967-4d92-b9bd-f995f0d179e5.ed4cb0bfe0c4b67a14b562499c57c670.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Nike Air Max Plus Big Kids' Shoes (CD0609-032,...",
            price: "94.25",
            originalPrice: "130.97",
            shipping: null
        },
        {
            id: 5,
            image: "https://i5.walmartimages.com/seo/Nike-Varsity-Elite-Unisex-Backpacks-32L-White-Black-Gold_7647075b-e11c-4a66-a5c1-e754ae7a653b.3bf897cd8dc94dafe8272fdd29aa4cee.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Nike Varsity Elite Unisex Backpacks (32L)...",
            price: "72.00",
            originalPrice: "95.00",
            shipping: "Options from $72.00 – $85.00"
        },
        {
            id: 6,
            image: "https://i5.walmartimages.com/seo/MINTREUS-Women-s-Seamless-Bras-No-Underwire-Scalloped-Push-Up-Bras-Soft-Wireless-Comfort-Bralettes-Full-Coverage_1fde625f-0762-478c-99d5-8ac3cf9f3c5d.b4abda63df5f3d4d665591c7953e201f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "MINTREUS Women's Seamless Bras No...",
            price: "12.99",
            originalPrice: "14.99",
            shipping: "Options from $12.99 – $14.99"
        },
        {
            id: 7,
            image: "https://i5.walmartimages.com/seo/Cushionaire-Pool-Slides-For-Women-Waterproof-Double-Buckle-Adjustable-Slip-On-Womens-Sandals-For-Beach-Shower-Casual-Wear_891c1d48-a601-4700-bfa4-905968249b70.d5a3cd23641507eea3ddd2ae3fd4c8a4.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Cushionaire Pool Slides for Women Waterproof...",
            price: "44.99",
            originalPrice: "54.99",
            shipping: null
        },
        {
            id: 8,
            image: "https://i5.walmartimages.com/seo/ASUDESIRE-5-Pack-Men-s-Athletic-Shorts-Mesh-Workout-Gym-Activewear-Basketball-Shorts-8-Inseam-With-Pockets_59b8010e-dac9-4995-a03e-503ea37b11cd.8e59cb1608f1443b75a93638b8b9c231.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "ASUDESIRE 5 Pack Men's Athletic Shorts Mesh...",
            price: "27.59",
            originalPrice: "49.99",
            shipping: null
        },
        {
            id: 9,
            image: "https://i5.walmartimages.com/seo/DOKOTOO-Linen-Pants-Women-Casual-Lightweight-Drawstring-Pants-Elastic-Waist-Pants-with-Pockets-Size-M_faea9795-2cb9-4c36-ba67-df968760312f.82a530ada6f01a98844bee7b42900e2b.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            title: "DOKOTOO Linen Cotton Pants Women Casual...",
            price: "21.99",
            originalPrice: "31.99",
            shipping: "Options from $21.99 – $25.99"
        },
        {
            id: 10,
            image: "https://i5.walmartimages.com/seo/UVN-Summer-Dresses-for-Women-Short-Sleeve-V-Neck-A-Line-Midi-Dress-Boho-Beach-Floral-Print-Sundress_911bb385-ee5e-4690-a3d8-67a36e2869af.9e7828d04fcd39faacf2c9966e7973c3.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "UVM Summer Dresses for Women Short Sleeve V...",
            price: "14.49",
            originalPrice: "15.99",
            shipping: "+$3.00 shipping"
        },
        {
            id: 11,
            image: "https://i5.walmartimages.com/seo/Michael-Kors-Women-s-Adult-Two-inside-pockets-leather-East-West-Chain-Crossbody-Bag-Black-Large_f0a6dbf2-e4eb-443d-8dd3-abfa40a63a77.a01369ce2a76fe011aa4881169580e09.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Michael Kors Women's Adult Two inside pockets...",
            price: "53.06",
            originalPrice: "54.88",
            shipping: "More options from $53.06"
        },
        {
            id: 12,
            image: "https://i5.walmartimages.com/seo/Michael-Kors-Women-s-Adjustable-Strap-Signature-Coated-Canvas-Crossbody-Bag-Vanilla_45658e12-ab48-4479-a5a3-c8e05c8a5e73.5898034ec232cd61f8041ffa8bec3c7a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Michael Kors Women's Jet Set Large East West...",
            price: "43.99",
            originalPrice: "157.92",
            shipping: "Options from $43.99 – $157.92"
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

                {/* Left Div - Event Section */}
                <div className="w-full md:w-[55%] scale-90 origin-top-left">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-gray-800">Event ends 4/14</h2>
                        <button className="text-black text-sm underline underline-offset-4">View all</button>
                    </div>
                    <p className="text-gray-600 mb-4">Nike to MICHELE, save big.</p>

                    {/* Slider Container */}
                    <div className="relative">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {visibleProducts.map((product) => (
                                <Card3
                                    key={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
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
                    </div>
                </div>

                {/* Right Div - Background Image */}
                <div
                    className="rounded-lg w-full md:w-[60%] flex flex-col justify-start gap-3 min-h-[350px] bg-cover bg-top relative overflow-hidden"
                    style={{ backgroundImage: "url('https://i5.walmartimages.com/dfw/4ff9c6c9-13d2/k2-_d45f7472-378b-4fb1-9126-9ca2ca1fed65.v1.jpg?odnHeight=894&odnWidth=1588&odnBg=&odnDynImageQuality=70')" }}
                >
                    <div className="relative z-10 p-6">
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">Up to 30% off</h3>
                        <p className="text-xl text-blue-900 mb-4">brands you love</p>
                        <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                            Shop now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EventSection;