import React, { useState } from 'react';
import Card2 from './Card2';

const MothersDaySection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 1; // Show 1 set of 3 columns at a time

    // Slide 1 - Everything Mom wants, Gotta-have gift sets, Fashion & accessories
    const slide1 = {
        everythingMom: [
            { id: 1, image: "https://i5.walmartimages.com/seo/GVDV-Raised-Garden-Bed-Outdoor-4x2x1ft-Backyard-Oval-Metal-Raised-Bed-Easy-Assembly-Garden-Bed-Gardening-Vegetables-Fruits-Flowers-Dark-Gray_e9c72249-e83a-4ef1-85c6-0598201c5faa.8670645080f735ec24360a7bc034c993.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "GVDV Galvanized", price: "28.99", originalPrice: "59.99", badge: "Rollback" },
            { id: 2, image: "https://i5.walmartimages.com/seo/Tropical-Plants-of-Florida-36-to-42-Braided-3-to-4-Mixed-Color-Hibiscus-Tree-10-in-Grower-Pot-1-Count-Attract-Bees_41ca9906-627a-4960-b32b-c8b70acd5f57.0d8e2486858d6e8e9b01a967571abedb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Tropical Plants of...", price: "59.99", originalPrice: null, badge: null },
            { id: 3, image: "https://i5.walmartimages.com/seo/Time-and-Tru-Short-Sleeve-Empire-Midi-Dress-Sizes-XS-XXXL_d643d7f9-4713-4099-b760-9017c16cefe7.0fab2dcf10bdeb5d05e8af9c9ae8f484.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Time and Tru Women", price: "12.99", originalPrice: "24.98", badge: "Clearance" },
            { id: 4, image: "https://i5.walmartimages.com/asr/999d4f13-ce10-48da-b914-71b570081573.7b4c507e0f8de25a7de3588a76e695b8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Fantaslook Blouses f...", price: "9.99", originalPrice: "11.99", badge: null }
        ],
        giftSets: [
            { id: 1, image: "https://i5.walmartimages.com/seo/Bath-Gift-Baskets-for-Women-12-Pcs-Ocean-Spa-Gift-Sets-Luxury-Holiday-Birthday-Gifts-for-Her_d0697732-5de3-4f32-a522-2ba0be1d69ad.5834e6762e02ff72f28ded2abad2e260.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF", title: "Bath Gift Baskets for...", price: "29.99", originalPrice: "65.99", badge: null },
            { id: 2, image: "https://i5.walmartimages.com/seo/Burt-s-Bees-4-in-1-Mask-Bundle-Gift-Set-Face-Mask-Lip-Mask-and-Lip-Balm-1-Gift-Set_2c93baa4-460e-4068-8fce-ac25e9f15511.732169712c8638e4d4310ca8a6f101c2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Burt's Bees 4-in-1 Ma...", price: "12.99", originalPrice: null, badge: null },
            { id: 3, image: "https://i5.walmartimages.com/seo/Billie-Eilish-Perfume-Gift-Set-for-Women-2-Pieces_a828a021-bb03-4bee-adc5-105443f2403a.87ca387d621abf531aa57ba4ba5fc240.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Billie Eilish Perfume...", price: "29.89", originalPrice: null, badge: null },
            { id: 4, image: "https://i5.walmartimages.com/seo/Donna-Karan-Cashmere-Mist-3-Piece-Gift-Set-For-Women_0320361c-7517-4641-978e-c260eb21b000.417e253fda1b1b5bc0019e53de2d623b.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Cashmere Mist by...", price: "88.25", originalPrice: null, badge: null }
        ],
        fashion: [
            { id: 1, image: "https://i5.walmartimages.com/seo/DALIX-Worlds-Best-Grandma-Hat-Gift-Embroidered-Cotton-Cap-in-Black_5bbba299-2292-4bb1-9180-235aa04a0e80.a16301696ad96177465277c2a543f1a5.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "DALIX Worlds Best...", price: "19.95", originalPrice: null, badge: null },
            { id: 2, image: "https://i5.walmartimages.com/seo/PRETTYGARDEN-Women-s-Summer-Midi-Tulle-Dress-Sleeveless-Smocked-Square-Neck-Ruffle-Flowy-Party-Wedding-Guest-Sundress_b501f3d0-c6ef-423a-8116-7d4010b58f8e.2c1dffd0485d14c4a4c6d476e6ca2c7a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "PRETTYGARDEN...", price: "59.99", originalPrice: "79.99", badge: null },
            { id: 3, image: "https://i5.walmartimages.com/seo/Pompeii-1-4-Ct-TDW-Genuine-Diamond-Studs-in-14k-White-Gold-IJ-I2-I3_d1df8b50-1525-43d2-b843-26fa6dda5626.9f6c34752c8970408d1cb4791b4c21b4.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Pompeii 1/4 Ct TDW...", price: "122.99", originalPrice: null, badge: null },
            { id: 4, image: "https://i5.walmartimages.com/asr/f3eb552c-a7e6-4bd3-9c29-90cb0757dac1.9dba07a304cd433849b22f2fe5ea0023.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "PRETTYGARDEN...", price: "42.99", originalPrice: null, badge: null }
        ]
    };

    // Slide 2 - Jewelry & watches, Beauty & fragrances
    const slide2 = {
        jewelry: [
            { id: 1, image: "https://i5.walmartimages.com/seo/Natalia-Drake-1-10-Cttw-Diamond-Two-Tone-Heart-Mother-Child-Necklace-for-Women-in-Rhodium-Plated-Sterling-Silver_c6cc44a8-5ce8-4a47-9a69-779190e3ba0a.2e4f9d09cfb532c1672c28f460cb825c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Natalia Drake 1/10...", price: "66.99", originalPrice: null, badge: null },
            { id: 2, image: "https://i5.walmartimages.com/seo/Brilliance-Fine-Jewelry-Mama-Heart-Charm-in-14KT-Gold-Plated-Sterling-Silver_6fb396b1-8d23-4a29-8ab9-d7ee7d9a0ea6.80e8a835f0eabf39ad2c50d7cf193aed.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Brilliance Fine...", price: "24.00", originalPrice: null, badge: null },
            { id: 3, image: "https://i5.walmartimages.com/seo/MomentWish-Pearl-Necklaces-for-Women-Round-Cut-Simulated-Diamond-Necklace-925-Sterling-Silver-Moissanite-Heart-Necklace-Wedding-Gift-for-Her_c5a31800-b8c7-42d8-866a-9b3b04ffc430.4f0d0553a64b9eed617b8e0e76f325c6.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "MomentWish...", price: "75.99", originalPrice: "151.98", badge: "Now" },
            { id: 4, image: "https://i5.walmartimages.com/seo/JeenMata-1-Carat-Lab-Grown-Diamond-Bezel-Station-Bracelet-Elegant-Gift-Jewelry-in-18K-White-Gold-Plating-for-Women_a3849a83-ecb2-4459-be43-be59a057574b.0fd0b5332bb94e79c6f2ce1fffc05872.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "JeenMata 1 Carat Lab...", price: "129.00", originalPrice: "259.00", badge: null }
        ],
        beauty: [
            { id: 1, image: "https://i5.walmartimages.com/seo/Marc-Jacobs-Honey-Eau-De-Parfum-Spray-for-Women-3-4-oz_c8a4e9b6-f73d-4e13-8cb1-fc94349897b7.1463bd145f144bd145c7513edb0f30f6.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Marc Jacobs Home...", price: "33.44", originalPrice: null, badge: null },
            { id: 2, image: "https://i5.walmartimages.com/seo/Gucci-Bloom-Eau-De-Parfum-Perfume-for-Women-3-3-Oz_d40c9979-047c-4d1e-8eda-06f9c552aab8_1.88073c0e96cfbf0e993ffa4e6ea44b95.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Gucci Bloom Eau...", price: "51.00", originalPrice: null, badge: null },
            { id: 3, image: "https://i5.walmartimages.com/asr/b9c52acf-8aab-4561-96c7-13f39a1c49f5.37038108c21131bb24b39164ec4dadaa.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Dossier Ambery...", price: "28.94", originalPrice: null, badge: null },
            { id: 4, image: "https://i5.walmartimages.com/seo/DOLCE-GABBANA-Light-Blue-Summer-Vibes-EDT-Spray-3-3-oz-For-Women_4881e222-ec75-466d-833e-fda88abc71ce.608369e6f91212508d9cd33021b2a5c4.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "DOLCE & GABBANA...", price: "44.30", originalPrice: "259.00", badge: null }
        ],
        // Empty third column for slide 2
        fashion2: [
            { id: 1, image: "https://i5.walmartimages.com/seo/Coach-Wild-Rose-Eau-De-Parfum-Spray-Perfume-for-Women-3-oz_d9b0886f-114b-4c1a-b1a6-7abaf5110df4.a5510c1c0b9a872e12a84b53e739befa.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Coach Wild Rose Eau...", price: "59.99", originalPrice: "107.00", badge: null },
            { id: 2, image: "https://i5.walmartimages.com/seo/Free-Assembly-Women-s-Clutch-Red-Engine_be38350e-262f-414a-b1f8-7bce1b58b7a9.e8e3d408f7546d8cdd46a009d36be7d7.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Free Assembly...", price: "20.00", originalPrice: null, badge: null },
            { id: 3, image: "https://i5.walmartimages.com/seo/Burberry-Women-s-Gradient-BE4160-34338G-58-Black-Square-Sunglasses_554e83e5-8cad-4817-aa7e-9164d60e74fa.db187655166ce6637d745e0d6366b205.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Burberry Women's...", price: "121.21", originalPrice: "284.00", badge: null },
            { id: 4, image: "https://i5.walmartimages.com/seo/Versace-VE-4387-Plastic-Womens-Rectangle-Sunglasses-Havana-56mm-Adult_d8baa20e-f850-46cb-affc-c36b70f5abc7.4b5379d145b7d8f03d21f96f9099ad64.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Versace VE 4387...", price: "143.16", originalPrice: "354.00", badge: null }
        ]
    };

    // Slide 3 - Hottest home finds, Departments
    const slide3 = {
        homeFinds: [
            { id: 1, image: "https://i5.walmartimages.com/seo/The-Pioneer-Woman-Vintage-Lace-6-Piece-Rectangular-Ceramic-Nesting-Bowls_0e8d6986-69c8-4dea-a066-b36ffde06274.3f1f100f4f1a5e245c8f8a390cb41a0c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "The Pioneer Women", price: "21.97", originalPrice: null, badge: null },
            { id: 2, image: "https://i5.walmartimages.com/seo/Almond-Cow-The-Milk-Maker-Plant-Based-Milk-Maker_9bb87a3a-e441-4888-8a89-e49c7cf84a54.52f48407c51d02bfa291f65743ef0202.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Milk Maker Machine", price: "274.95", originalPrice: null, badge: null },
            { id: 3, image: "https://i5.walmartimages.com/seo/Beautiful-4-Slice-Toaster-with-Touch-Activated-Display-White-Icing-by-Drew-Barrymore_8bb2ff36-3ef3-471c-8448-80a2d877cc09.99e0382b718d65628000b96f98d0c2b3.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Beautiful 4-Slice...", price: "69.00", originalPrice: null, badge: "Clearance" },
            { id: 4, image: "https://i5.walmartimages.com/seo/Beautiful-Rotating-Belgian-Waffle-Maker-Cornflower-Blue-by-Drew-Barrymore_793e1d58-9179-40c3-93cd-c25acab28634.2420e002d340a614b334a9420147e186.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF", title: "Beautiful Rotating...", price: "37.46", originalPrice: null, badge: null }
        ],
        homeFinds2: [
            { id: 1, image: "https://i5.walmartimages.com/seo/Goose-Outfit-Garden-Set-of-2_b17a7c01-c5e8-4f08-81ad-26e402fcfff6.249f4552a71fe0e3437ee16f04130887.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Mainstays Spring Rai...", price: "19.97", originalPrice: null, badge: null },
            { id: 2, image: "https://i5.walmartimages.com/seo/Beautiful-Rotating-Waffle-Maker-White-Icing-by-Drew-Barrymore_a2a23ae7-6531-47e1-888b-52ab9fd0b0aa.53e27751fa04ea6ed118daef2944474c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Beautiful Rotating...", price: "37.46", originalPrice: null, badge: null },
            { id: 3, image: "https://i5.walmartimages.com/seo/20L-Electric-Towel-Warmer-for-Bathroom-450W-Wooden-Lid-Bucket-Towel-Warmer-Suitable-for-Two-40X70-Oversized-Towels-White_56f9b891-9277-4c5b-82df-49e6b70b67db.8103b2c16ee1947ba6ad8db747ab67e8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Large Towel Warmer...", price: "99.99", originalPrice: null, badge: null },
            { id: 4, image: "https://i5.walmartimages.com/seo/Beautiful-2-Speed-Immersion-Blender-with-Chopper-Measuring-Cup-White-Icing-by-Drew-Barrymore_7e124889-feac-4127-ac0b-f4986cae333e.bfc154e4f581f30ad49b4140b72e1f13.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Beautiful 2-Speed...", price: "37.46", originalPrice: null, badge: "Rollback" }
        ],
        departments: [
            { id: 1, image: "https://i5.walmartimages.com/seo/Lindt-Lindor-Sea-Salt-Milk-Chocolate-Candy-Truffles-5-1-oz-Bag_659803a4-49d7-40d3-acfa-002ec5b43875.0a7d249fe35068403b983f5b0eb2e249.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Lindt Lindor Sea Salt...", price: "7.12", originalPrice: null, badge: null },
            { id: 2, image: "https://i5.walmartimages.com/seo/Winemakers-Selection-Brut-Classic-Series-Spain-750-ml-Bottle-11-ABV_1a6f7655-fbc2-40b7-a0f0-eef00086bfb0.46a0a4175ca25794db7ca139e65eb98d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Winemakers Selection...", price: "4.98", originalPrice: null, badge: null },
            { id: 3, image: "https://i5.walmartimages.com/seo/Mainstays-8-5-x-11-Molded-Document-Certificate-Picture-Frame-Tabletop-or-Wall-Display-Walnut_e02b6c9f-a588-470b-81bd-b4f081ab23ca.54bbd1be05fce332d9727c0feeafc8e9.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Mainstays - 8.5x11...", price: "6.78", originalPrice: null, badge: null },
            { id: 4, image: "https://i5.walmartimages.com/seo/Mainstays-Celestial-Candle-Charms-6-Piece-Set_07b58516-f07b-4a88-8670-66cb193df710.84fe9372ebbc8a3c5aaaa28c06835e5b.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", title: "Mainstays Celestia...", price: "4.86", originalPrice: null, badge: null }
        ]
    };

    const slides = [slide1, slide2, slide3];
    const totalSlides = slides.length;
    const maxIndex = totalSlides - 1;

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

    const current = slides[currentSlide];

    // Determine which columns to show based on slide
    const getColumn1 = () => {
        if (currentSlide === 0) return { title: "Everything Mom wants", products: current.everythingMom };
        if (currentSlide === 1) return { title: "Jewelry & watches", products: current.jewelry };
        return { title: "Hottest home finds", products: current.homeFinds };
    };

    const getColumn2 = () => {
        if (currentSlide === 0) return { title: "Gotta-have gift sets", products: current.giftSets };
        if (currentSlide === 1) return { title: "Beauty & fragrances", products: current.beauty };
        return { title: "Departments", products: current.departments };
    };

    const getColumn3 = () => {
        if (currentSlide === 0) return { title: "Fashion & accessories", products: current.fashion };
        if (currentSlide === 1) return { title: "More finds", products: current.fashion2 };
        return { title: "More home finds", products: current.homeFinds2 };
    };

    const col1 = getColumn1();
    const col2 = getColumn2();
    const col3 = getColumn3();

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-6">Mother's Day gifts</h2>

            {/* Slider Container */}
            <div className="relative">
                {/* 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* First Column */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md font-bold text-gray-800">{col1.title}</h3>
                            <button className="text-black text-sm underline underline-offset-4">View all</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {col1.products.map((product) => (
                                <Card2
                                    key={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    badge={product.badge}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Second Column */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md font-bold text-gray-800">{col2.title}</h3>
                            <button className="text-black text-sm underline underline-offset-4">View all</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {col2.products.map((product) => (
                                <Card2
                                    key={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    badge={product.badge}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Third Column */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md font-bold text-gray-800">{col3.title}</h3>
                            <button className="text-black text-sm underline underline-offset-4">View all</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {col3.products.map((product) => (
                                <Card2
                                    key={product.id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    badge={product.badge}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                {totalSlides > 1 && (
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
    );
};

export default MothersDaySection;