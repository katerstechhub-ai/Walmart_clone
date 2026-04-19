import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JustInFoodCard from './JustInFoodCard';
import { getProducts, getCategories } from '../api';

const RECENTLY_VIEWED_KEY = 'recentlyViewed';

const addToRecentlyViewed = (product) => {
    let existing = [];
    try {
        existing = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
    } catch { existing = []; }
    existing = existing.filter(p => p.id !== (product.id || product._id));
    existing.unshift({
        id: product.id || product._id,
        image: product.images?.[0],
        title: product.title,
        nowPrice: product.price,
        tag: null,
        originalPrice: product.original_price || null,
        rating: product.rating || null,
        ratingCount: product.rating_count || null,
    });
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

const JustInHome = () => {
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

                // Get categories to find the 'home' category
                const categoriesRes = await getCategories(merchantId);
                const categories = categoriesRes.data?.data || categoriesRes.data || [];
                console.log('Categories:', categories);

                // Try different possible home category names
                const homeCategory = categories.find(
                    cat => {
                        const name = cat.name?.toLowerCase().trim();
                        return name === 'home' ||
                            name === 'home & living' ||
                            name === 'home decor' ||
                            name === 'furniture' ||
                            name === 'home goods' ||
                            name === 'home & kitchen';
                    }
                );
                console.log('Home category:', homeCategory);

                if (!homeCategory) {
                    console.log('No home category found. Create a category named "home" in the admin.');
                    setLoading(false);
                    return;
                }

                // Get products for home category
                const categoryId = homeCategory.id || homeCategory._id;
                const productsRes = await getProducts(merchantId, categoryId);
                const allProducts = productsRes.data?.data || productsRes.data?.products || productsRes.data || [];
                console.log('Home products:', allProducts);
                setProducts(Array.isArray(allProducts) ? allProducts : []);
            } catch (err) {
                console.error('Error fetching home products:', err);
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
        addToRecentlyViewed(product);
    };

    if (loading) {
        return (
            <div className="max-w-[1400px] mx-auto px-5 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Just in: home</h2>
                    <Link to="/new-arrivals" className="text-black text-sm underline underline-offset-4 hover:text-blue-600">View all</Link>
                </div>
                <div className="flex justify-center py-8 text-gray-400">Loading...</div>
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Just in: home</h2>
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
                            <JustInFoodCard
                                image={product.images?.[0]}
                                tag={product.is_best_seller ? "Best seller" : null}
                                price={product.price}
                                originalPrice={product.original_price || null}
                                youSave={null}
                                unitPrice={product.unit_price ? `+${product.unit_price} options` : null}
                                title={product.title}
                                rating={product.rating || null}
                                ratingCount={product.rating_count || null}
                                shipping={product.has_shipment ? 'Shipping available' : null}
                                pickup={null}
                                delivery={null}
                                size={product.has_variation ? 'Multiple sizes' : null}
                                saveWithW={null}
                                buttonText="+ Add"
                                buttonOptions={null}
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

export default JustInHome;