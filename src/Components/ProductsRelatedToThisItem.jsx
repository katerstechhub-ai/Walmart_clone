import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RelatedItemCard from './RelatedItemCard';

const ProductsRelatedToThisItem = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 6; // Show 6 cards at a time

    // Products from your images
    const allProducts = [
        // Slide 1 - First 6 products
        {
            id: 1,
            image: "https://i5.walmartimages.com/seo/Sweet-Hearts-3-Pack-Girls-Leggings-Foldover-Pants-Wide-Leg-Flare-Leggings-for-Girls-Clothes-Made-in-USA_124da31a-99ea-45b0-85aa-6c234fd1cc38.93d670da2f9b440b48d3c9008b9e84d1.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Best seller",
            price: "24.99",
            originalPrice: "32.99",
            title: "Sweet Hearts 3-Pack Girls Leggings-Foldover Pants Wide Leg Flare Leggings...",
            rating: 3.0,
            ratingCount: "15",
            shipping: "Shipping, arrives tomorrow",
            size: null,
            isSponsored: false
        },
        {
            id: 2,
            image: "https://i5.walmartimages.com/seo/Women-s-Padded-Softball-Sliding-Shorts-Moisture-Wicking-Compression-Sliders-with-5-6mm-Padding-for-Baseball-Sports-Black-XL_16ba5424-8f69-4e0d-9c57-b1fad5bf2522.45a920384b642ea100a343ecc874d1cb.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Reduced price",
            price: "19.99",
            originalPrice: "22.89",
            title: "Women's Padded Softball Sliding Shorts, Moisture-Wicking Compression...",
            rating: null,
            ratingCount: null,
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 3,
            image: "https://i5.walmartimages.com/seo/Fdqin-Girls-Skirts-3pcs-Elastic-High-Waisted-Tennis-Skirts-Kids-Athletic-Running-Flowy-Mini-Skirt-Pink-White-Black-7-8-Years_e9d3f213-1d08-43cb-9f24-2cc44b7953a7.3d17182df0afb83c604d56eabcd4aa9c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Best seller",
            price: "14.99",
            originalPrice: "24.99",
            title: "Fdgin Girls Skirts 3pcs Elastic High Waisted Tennis Skirts Kids Athletic Runnin...",
            rating: null,
            ratingCount: null,
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 4,
            image: "https://i5.walmartimages.com/seo/PatPat-Toddler-Girl-Clothes-Kids-Girls-Outfits-Floral-Bowknot-Flutter-Sleeve-Tops-with-Polka-Dot-Leggings-2-Piece-Outfit-Set-Pink-2-Years_ba75a361-31b5-444c-bcbb-9eac3a7ec008.a51c9bf800d762b6c288176124972f4f.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Best seller",
            price: "14.99",
            originalPrice: "24.99",
            title: "PatPat Toddler Girl Clothes Kids Gifts Outfits Floral Bowknot Flutter Sleeve...",
            rating: 4.0,
            ratingCount: "207",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 5,
            image: "https://i5.walmartimages.com/seo/Sweet-Hearts-3-Pack-Girls-Leggings-Elastic-Waist-Soft-Leggings-for-Girls-Clothes-Made-in-USA_3db8e397-4306-4a1e-838a-a2cf16a6575f.c9e595c8d954c41a5e0bc69f80a0be3d.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Best seller",
            price: "19.99",
            originalPrice: "24.99",
            title: "Sweet Hearts 3-Pack Girls Leggings-Elastic Waist Soft Leggings for Girls...",
            rating: 4.0,
            ratingCount: "175",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 6,
            image: "https://i5.walmartimages.com/seo/RATED-EXCLUSIVE-MELANIN-Hoodie-Graphite-Heather-S_5a3125f9-e30b-41a8-8a79-938ed07c6996.b3ac5d31c49a056e2f59ef3ec72e06ac.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Sponsored",
            price: "66.00",
            originalPrice: null,
            title: "RATED EXCLUSIVE MELANIN Hoodie (Graphite Heather, S)",
            rating: null,
            ratingCount: null,
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: true
        },
        // Slide 2 - Next 6 products
        {
            id: 7,
            image: "https://i5.walmartimages.com/seo/DURASACK-Large-Collapsible-Totes-All-Purpose-25-L-x-12-W-x-14-H-Blue-Daisies-3-Pack_f9af8451-874e-4703-8c50-8f1c8476d7e2.670a08d991c381824cd64d79561f00b1.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
            tag: "Clearance",
            price: "44.99",
            originalPrice: null,
            title: "DURASACK® Large Collapsible Totes, All-Purpose, 25\"L x 12\"W x 14\"...",
            rating: 5.0,
            ratingCount: "112",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 8,
            image: "https://i5.walmartimages.com/seo/LuckLilac-Women-s-2inch-Pumps-Black-Pointed-Toe-Dress-Shoes-Kitten-Heel_f8fd243c-2915-4f0d-a6fd-f80fa659513f.cb9bf51a2da2cae1898eb20cebfbed88.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "39.99",
            originalPrice: null,
            title: "LuckLiac Women's Pumps 2.1inch Shoes Slip-Resistant Dress Shoes, Low Kitten...",
            rating: 5.0,
            ratingCount: "3",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 9,
            image: "https://i5.walmartimages.com/seo/Girls-Leggings-Toddler-Pants-Leggings-for-Girls-School-Uniform-Tutu-Kids-Ruffle-Skirt-3-Pack-Sizes-3-10_6e64f3ae-a6b3-4b27-8527-eee01c2ac302.e0fa36e745dd38899e44a8b17a5a64c4.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "26.72",
            originalPrice: "46.99",
            title: "Girls Leggings Toddler Pants Leggings for Girls School Uniform Tutu Kids...",
            rating: 5.0,
            ratingCount: "3",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 10,
            image: "https://i5.walmartimages.com/seo/Diufon-Kids-Pants-Boys-Girls-Elastic-Waist-Cotton-Pant-Quick-Dry-Lantern-Yoga-Trousers-Spring-Summer-Clothes_66c3dbd5-0715-480a-9f22-74712f490051.97cbf34165817b6df82201dd45a375d6.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "3.98",
            originalPrice: "49.98",
            title: "Diufon Kids Pants Boys Girls Elastic Waist Cotton Pant Quick Dry Lantern...",
            rating: 5.0,
            ratingCount: "3",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 11,
            image: "https://i5.walmartimages.com/seo/LEDREM-30-Pack-Adjustable-Velvet-Hangers-with-Non-Slip-Clips-Space-Saving-Heavy-Duty-Pants-Skirt-Hangers-for-Dresses-Coats-Trousers-White_99f91b30-561d-4560-a407-f7d474d2e845.edb45777f1add709238f999cbdcdae66.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "28.99",
            originalPrice: "49.98",
            title: "LEDREM 30-Pack Adjustable Velvet Hangers, Heavy-Duty Non-Slip Skirt...",
            rating: 5.0,
            ratingCount: "71",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 12,
            image: "https://i5.walmartimages.com/asr/282cc955-7441-4433-8a30-d3acda8603d4.c822ff5b570b1a6c911183d49af207ab.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: "Sponsored",
            price: "36.12",
            originalPrice: null,
            title: "Tribe Kids' Essential Fleece Hoodie",
            rating: null,
            ratingCount: null,
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: true
        },
        // Slide 3 - Last 6 products
        {
            id: 13,
            image: "https://i5.walmartimages.com/seo/AK-TRADING-CO-60-Wide-100-Polyester-Panne-Velvet-Perfect-for-backdrops-Clothing-Home-Furnishing-and-Many-More-Mocha-5-Yards_2d3ce0ff-05e2-438e-92b8-c56c80f0b91a.ce011db0c5fef7200762815d1d6cd9e9.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "44.95",
            originalPrice: null,
            title: "AK TRADING CO. 60\" Wide-100% Polyester Panné Velvet - Perfect for...",
            rating: 5.0,
            ratingCount: "16",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 14,
            image: "https://i5.walmartimages.com/seo/Girls-Ballet-Mary-Jane-Flats-Toddler-Kids-Flower-Girls-Party-Dress-Shoes-AH22-Pink-6M_6d01dea8-c3b8-488f-90d3-b0ecec827794.91bb52b45366db2b6feed2bbc93ad6f7.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "16.99",
            originalPrice: null,
            title: "Girls Ballet Mary Jane Flats Toddler Kids Flower Girls Party Dress Shoes (AH22...)",
            rating: 5.0,
            ratingCount: "9",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 15,
            image: "https://i5.walmartimages.com/seo/AK-TRADING-CO-90-Inch-Wide-Natural-Burlap-Fabric-Perfect-for-Weddings-Events-Home-Crafts-Gardening-90-Wide-x-50-Yards_9e6a5999-8c0b-40ae-a745-4b22b33f679f.8643f99474fc1b2e0333897f705f0ed5.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "299.95",
            originalPrice: null,
            title: "AK TRADING CO. 90-Inch Wide Natural Burlap Fabric - Perfect for Weddings...",
            rating: 5.0,
            ratingCount: "1",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 16,
            image: "https://i5.walmartimages.com/seo/DREAM-PAIRS-Women-s-Slingback-Kitten-Heels-2-36-Inch-Low-Heel-Pointed-Toe-Pumps-Comfortable-Closed-Toe-Dress-Shoes-Office-Work-Classic-Holiday-Heels_0e5c2ae7-c581-4100-a38b-2d0dc87f4086.642cbb34c30deff19cd8b1d662292994.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "32.99",
            originalPrice: null,
            title: "DREAM PAIRS Women's Slingback Kitten Heels - 2.36 Inch Low Heel Pointe...",
            rating: 5.0,
            ratingCount: "1",
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 17,
            image: "https://i5.walmartimages.com/seo/FYEGRE-Girls-Uniform-Pants-Teen-School-Flare-Bell-Bottoms-Girls-School-Flare-Trousers-Classic-Flared-Bottoms-Academic-Wear-Casual-Outfits-Khaki-14-15_4b98062b-6ff8-4e9b-b254-82295e26e16a.15dfc1a55885c343a2acaaed9251950c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "16.79",
            originalPrice: null,
            title: "FYEGRE Girls Uniform Pants Teen School Flare Bell Bottoms Girls School...",
            rating: null,
            ratingCount: null,
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
        },
        {
            id: 18,
            image: "https://i5.walmartimages.com/seo/Tribe-Kids-Essential-Fleece-Hoodie_d4683d7e-3ff9-407d-9616-d202d7e841d0.4f7468773765ea63a9a42348971ae261.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            tag: null,
            price: "36.12",
            originalPrice: null,
            title: "Tribe Kids' Essential Fleece Hoodie",
            rating: null,
            ratingCount: null,
            shipping: "Shipping, arrives in 3+ days",
            size: null,
            isSponsored: false
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
            <div className='mb-3'>
                <h2 className="text-xl font-bold text-gray-800">Products related to this item</h2>
            </div>
            {/* Slider Container */}
            <div className="relative">
                {/* 6 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {visibleProducts.map((product) => (
                        <RelatedItemCard
                            key={product.id}
                            image={product.image}
                            tag={product.tag}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            title={product.title}
                            rating={product.rating}
                            ratingCount={product.ratingCount}
                            shipping={product.shipping}
                            size={product.size}
                            isSponsored={product.isSponsored}
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
            {/* Header with Links at the far left */}
            <div className="mb-6">

                {/* Links below the title - far left */}
                <div className="flex gap-3 mt-3 underline">
                    <Link to="/category/leggings" className="text-black text-sm ">Clothing</Link>
                    <Link to="/category/shorts" className="text-black text-sm">Kids Clothing</Link>
                    <Link to="/category/skirts" className="text-black text-sm ">Girls Clothing</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductsRelatedToThisItem;