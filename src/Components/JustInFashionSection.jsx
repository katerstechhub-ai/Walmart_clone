// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import JustInFashionCard from './JustInFashionCard';

// const RECENTLY_VIEWED_KEY = 'recentlyViewed';

// const getRecentlyViewed = () => {
//     let stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
//     if (!stored) return [];
//     return JSON.parse(stored);
// };

// const addToRecentlyViewed = (product) => {
//     let existing = getRecentlyViewed();
//     // Remove if already exists
//     existing = existing.filter(p => p.id !== product.id);
//     // Add to front
//     existing.unshift(product);
//     // Keep only last 6
//     existing = existing.slice(0, 6);
//     localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(existing));
// };

// const JustInFashionSection = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [recentlyViewed, setRecentlyViewed] = useState([]);
//     const itemsPerView = 6;



//     const allProducts = [
//         {
//             id: 1,
//             image: "https://i5.walmartimages.com/seo/TT-AMERICANA-BANDANA_1709d5cd-aa13-42c3-b3d6-b36d7c7b82eb.547cefff59264966071344fd63f8a663.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: "Best seller",
//             price: "4.97",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+3 options",
//             title: "Time and Tru Women's Americana Bandana, Polished Blue",
//             rating: null,
//             ratingCount: null,
//             shipping: "Shipping, arrives tomorrow",
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 2,
//             image: "https://i5.walmartimages.com/seo/TT-BUTTON-FRONT-TANK_0c112241-dfbd-46d9-8569-6169e6a2cba9.3734c7e223d49115cd8837774fcae4b0.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: null,
//             price: "14.98",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+3 options",
//             title: "Time and Tru Women's Button Front Tank Top, Size XS-XXXL",
//             rating: null,
//             ratingCount: null,
//             shipping: "Shipping, arrives tomorrow",
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 3,
//             image: "https://i5.walmartimages.com/seo/No-Boundaries-Ribbed-Embroidered-Baby-Tee-Women-s_c402a7c0-c87f-44bb-8fb0-c46b58762314.5dfd17cbaf15caf6247895d906a9fd9f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: "Best seller",
//             price: "8.98",
//             originalPrice: "24.98",
//             youSave: null,
//             unitPrice: "+3 options",
//             title: "No Boundaries Ribbed Embroidered Cotton Baby Tee, Women's XXS-XXL",
//             rating: null,
//             ratingCount: null,
//             shipping: "Shipping, arrives tomorrow",
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 4,
//             image: "https://i5.walmartimages.com/seo/W-NB-BEADED-FLT-SNDL_9b4a605b-0f80-4cae-84ba-8c97f16985da.d846b61ed2f460b820a0878f685472ba.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
//             tag: null,
//             price: "24.98",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+4 options",
//             title: "No Boundaries Women's Beaded Slide Sandals",
//             rating: 5.0,
//             ratingCount: "4",
//             shipping: null,
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 5,
//             image: "https://i5.walmartimages.com/seo/Speedo-Women-s-Colorblock-U-Back-One-Piece-Swimsuit-Sizes-XS-XXL_3d50a683-6a68-4f84-ad5b-9eabde4c2434.045caaf775441a9803c61b151c8e2408.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: null,
//             price: "4.40",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+1 option",
//             title: "Speedo Women's Colorblock U-Back One Piece Swimsuit, Sizes XS-XXL",
//             rating: 2.0,
//             ratingCount: "4",
//             shipping: null,
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 6,
//             image: "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Trend-Crochet-Top-sizes-4-18-Plus_7a8656a3-44a0-4741-a7d1-a4c90049aa68.9c139ce1a4bef04c91abd5b1e57dfa1d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: null,
//             price: "12.98",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+2 options",
//             title: "Wonder Nation Girls Trend Crochet Top, sizes 4-18 & Plus",
//             rating: 5.0,
//             ratingCount: "2",
//             shipping: "Shipping, arrives tomorrow",
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 7,
//             image: "https://i5.walmartimages.com/seo/TT-SEAGRASS-TOTE_3416ecf1-4e30-45d7-b661-97e4163ffcb5.5600a9a0cc9ed13a95b7d8fb0407c3c0.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: "Best seller",
//             price: "18.97",
//             originalPrice: "20.98",
//             youSave: null,
//             unitPrice: "+2 options",
//             title: "Time and Tru Women's Anchor Embroidered Baseball Hat, Blue",
//             rating: 5.0,
//             ratingCount: "3",
//             shipping: "Shipping, arrives tomorrow",
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 8,
//             image: "https://i5.walmartimages.com/seo/TT-ANCHOR-EMB-HAT_4042e3bf-0798-47ff-96f1-ecc5ced60f23.5404473f31d029aa38676fff79183f6a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFFE",
//             tag: null,
//             price: "8.98",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+4 options",
//             title: "No Boundaries Embroidered Red Bandeau Cropped Tankini Swim Top...",
//             rating: null,
//             ratingCount: null,
//             shipping: "Shipping, arrives in 3+ days",
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 9,
//             image: "https://i5.walmartimages.com/seo/Free-Assembly-Women-s-Short-Sleeve-Roll-Neck-Sweater-Sizes-XS-XXL_47fc1258-1a5f-482c-88aa-f081b00b0b46.94c4903c637f3f886c880fa397bb594d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: null,
//             price: "24.00",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+4 options",
//             title: "Free Assembly Women's and Women's Plus Roll Neck Cotton Sweater with...",
//             rating: 5.0,
//             ratingCount: "33",
//             shipping: null,
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 10,
//             image: "https://i5.walmartimages.com/seo/WN-GAUZE-SHIRTS_e7238b40-bcee-4798-86d6-e804ebafccf8.65fb4580dab28b5645888303db7ed70d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: "Best seller",
//             price: "3.98",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+4 options",
//             title: "Wonder Nation Boys' Cotton Gauze Button Front Shirt with Short Sleeves,...",
//             rating: 5.0,
//             ratingCount: "4",
//             shipping: "Shipping, arrives tomorrow",
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 11,
//             image: "https://i5.walmartimages.com/seo/No-Boundaries-Women-s-Embroidered-Red-Bandeau-Cropped-Tankini-Swim-Top-Sizes-XXS-to-XXL_642795a9-ae20-44f8-b53f-0f45bf9e39ff.64ce6dbffcf612cf1051cf96b4212f5c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: null,
//             price: "4.98",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+4 options",
//             title: "No Boundaries Celebration Print Reversible String Bikini Bottoms, Women's...",
//             rating: null,
//             ratingCount: null,
//             shipping: "Shipping, arrives in 3+ days",
//             pickup: null,
//             delivery: null,
//             size: null
//         },
//         {
//             id: 12,
//             image: "https://i5.walmartimages.com/seo/No-Boundaries-Women-s-Celebration-Print-Reversible-Low-Rise-String-Swim-Bottom-Sizes-XXS-to-XXL_fa471347-5b19-4fd8-a922-a202b97930c1.3de8c958e4c8444ced761ed6f15c367c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//             tag: null,
//             price: "13.98",
//             originalPrice: null,
//             youSave: null,
//             unitPrice: "+4 options",
//             title: "No Boundaries Graphic Cotton Tank Bodysuit, Sizes 0M-24M",
//             rating: 5.0,
//             ratingCount: "2",
//             shipping: "Shipping, arrives tomorrow",
//             pickup: "Pickup today",
//             delivery: null,
//             size: null
//         }
//     ];

//     const totalSlides = Math.ceil(allProducts.length / itemsPerView);
//     const maxIndex = totalSlides - 1;

//     const startIndex = currentSlide * itemsPerView;
//     const visibleProducts = allProducts.slice(startIndex, startIndex + itemsPerView);

//     const nextSlide = () => {
//         if (currentSlide < maxIndex) setCurrentSlide(currentSlide + 1);
//     };

//     const prevSlide = () => {
//         if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
//     };

//     const handleProductClick = (product) => {
//         addToRecentlyViewed({
//             id: product.id,
//             image: product.image,
//             title: product.title,
//             nowPrice: product.price,
//             tag: product.tag,
//             originalPrice: product.originalPrice,
//             rating: product.rating,
//             ratingCount: product.ratingCount,
//         });
//         setRecentlyViewed(getRecentlyViewed());
//     };

//     return (
//         <div className="max-w-[1400px] mx-auto px-5 py-4">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold text-gray-800">Just in: fashion</h2>
//                 <Link
//                     to="/new-arrivals"
//                     className="text-black text-sm underline underline-offset-4 hover:text-blue-600 transition-colors"
//                 >
//                     View all
//                 </Link>
//             </div>

//             {/* Slider Container */}
//             <div className="relative">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//                     {visibleProducts.map((product) => (
//                         <Link
//                             to="/product"
//                             key={product.id}
//                             onClick={() => handleProductClick(product)}
//                             state={{ product }}
//                             className="no-underline"
//                         >
//                             <JustInFashionCard
//                                 image={product.image}
//                                 tag={product.tag}
//                                 price={product.price}
//                                 originalPrice={product.originalPrice}
//                                 youSave={product.youSave}
//                                 unitPrice={product.unitPrice}
//                                 title={product.title}
//                                 rating={product.rating}
//                                 ratingCount={product.ratingCount}
//                                 shipping={product.shipping}
//                                 pickup={product.pickup}
//                                 delivery={product.delivery}
//                                 size={product.size}
//                             />
//                         </Link>
//                     ))}
//                 </div>

//                 {/* Navigation Arrows */}
//                 {allProducts.length > itemsPerView && (
//                     <>
//                         <button
//                             onClick={prevSlide}
//                             disabled={currentSlide === 0}
//                             className={`absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         >
//                             <span className="text-xl">❮</span>
//                         </button>
//                         <button
//                             onClick={nextSlide}
//                             disabled={currentSlide === maxIndex}
//                             className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         >
//                             <span className="text-xl">❯</span>
//                         </button>
//                     </>
//                 )}
//             </div>

//             <div className="border-b border-gray-200 mt-14"></div>

//         </div>
//     );
// };

// export default JustInFashionSection;






import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JustInFashionCard from './JustInFashionCard';
import { getProducts, getCategories } from '../api';

const RECENTLY_VIEWED_KEY = 'recentlyViewed';

const addToRecentlyViewed = (product) => {
    let existing = [];
    try {
        existing = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
    } catch { existing = []; }
    existing = existing.filter(p => p.id !== (product.id || product._id));
    existing.unshift(product);
    existing = existing.slice(0, 6);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(existing));
};

const getMerchantId = () => {
    try {
        const raw = localStorage.getItem('merchantData');
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed.id || parsed._id;
    } catch { return null; }
};

const JustInFashionSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerView = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const merchantId = getMerchantId();
                if (!merchantId) {
                    setLoading(false);
                    return;
                }

                // Get categories to find the 'fashion' category
                const categoriesRes = await getCategories(merchantId);
                const categories = categoriesRes.data?.data || categoriesRes.data || [];
                console.log('Categories:', categories);

                const fashionCategory = categories.find(
                    cat => cat.name?.toLowerCase().trim() === 'fashion'
                );
                console.log('Fashion category:', fashionCategory);

                if (!fashionCategory) {
                    console.log('No fashion category found. Create a category named "fashion" in the admin.');
                    setLoading(false);
                    return;
                }

                // Get products for fashion category
                const categoryId = fashionCategory.id || fashionCategory._id;
                const productsRes = await getProducts(merchantId, categoryId);
                const allProducts = productsRes.data?.data || productsRes.data?.products || productsRes.data || [];
                console.log('Fashion products:', allProducts);
                setProducts(Array.isArray(allProducts) ? allProducts : []);
            } catch (err) {
                console.error('Error fetching fashion products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const totalSlides = Math.ceil(products.length / itemsPerView);
    const maxIndex = Math.max(0, totalSlides - 1);
    const startIndex = currentSlide * itemsPerView;
    const visibleProducts = products.slice(startIndex, startIndex + itemsPerView);

    const nextSlide = () => { if (currentSlide < maxIndex) setCurrentSlide(currentSlide + 1); };
    const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };

    const handleProductClick = (product) => {
        addToRecentlyViewed({
            id: product.id || product._id,
            image: product.images?.[0],
            title: product.title,
            nowPrice: product.price,
            tag: null,
            originalPrice: product.original_price || null,
            rating: product.rating || null,
            ratingCount: product.rating_count || null,
        });
    };

    if (loading) {
        return (
            <div className="max-w-[1400px] mx-auto px-5 py-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Just in: fashion</h2>
                    <Link to="/new-arrivals" className="text-black text-sm underline underline-offset-4 hover:text-blue-600">View all</Link>
                </div>
                <div className="flex justify-center py-8 text-gray-400">Loading...</div>
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Just in: fashion</h2>
                <Link to="/new-arrivals" className="text-black text-sm underline underline-offset-4 hover:text-blue-600 transition-colors">
                    View all
                </Link>
            </div>

            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {visibleProducts.map((product) => (
                        <Link
                            to={`/product`}
                            key={product.id || product._id}
                            onClick={() => handleProductClick(product)}
                            state={{ product }}
                            className="no-underline"
                        >
                            <JustInFashionCard
                                image={product.images?.[0]}
                                tag={null}
                                price={product.price}
                                originalPrice={product.original_price || null}
                                youSave={null}
                                unitPrice={null}
                                title={product.title}
                                rating={product.rating || null}
                                ratingCount={product.rating_count || null}
                                shipping={product.has_shipment ? 'Shipping available' : null}
                                pickup={null}
                                delivery={null}
                                size={product.has_variation ? 'Multiple sizes' : null}
                            />
                        </Link>
                    ))}
                </div>

                {products.length > itemsPerView && (
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

            <div className="border-b border-gray-200 mt-14"></div>
        </div>
    );
};

export default JustInFashionSection;