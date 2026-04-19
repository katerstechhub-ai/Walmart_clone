import React, { useState } from 'react';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FaTruck,
    FaUndo,
    FaMapMarkerAlt,
    FaStar,
    FaHeart,
    FaGift,
    FaShare,
    FaSearchPlus,
    FaChevronDown,
    FaChevronUp,
    FaCheck
} from 'react-icons/fa';
import RatingsSection from '../Components/RatingsSection';
import RecentlyViewedSection from '../Components/RecentlyViewedSection';
import AboutThisItem from '../Components/AboutThisItem';
import PopularItemsSection from '../Components/PopularItemsSection';
import ProductsYouMayAlsoLike from '../Components/ProductsYouMayAlsoLike';
import CustomerRatingsSection from '../Components/CustomerRatingsSection';
import MoreItemsToExplore from '../Components/MoreItemsToExplore';
import DisneysectionSection from '../Components/Disneysection';
import ProductsRelatedToThisItem from '../Components/ProductsRelatedToThisItem';
import { updateCart, getCart } from '../api';

const ProductDetailsPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state?.product;

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState(0);
    const [deliverySavings, setDeliverySavings] = useState(true);
    const [showKeyFeatures, setShowKeyFeatures] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const getUserId = () => {
        try {
            const userData = localStorage.getItem('walmart_user');
            if (userData) {
                const parsed = JSON.parse(userData);
                return parsed.id || parsed._id;
            }
            return null;
        } catch {
            return null;
        }
    };

    const saveCartExtras = (productId, size, image, name, price, color) => {
        let extras = JSON.parse(localStorage.getItem('cartExtras') || '{}');
        extras[productId] = { size, image, name, price, color };
        localStorage.setItem('cartExtras', JSON.stringify(extras));
    };

    const productImages = product?.images?.length > 0
        ? product.images
        : ["https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Trend-Crochet-Top-sizes-4-18-Plus_7a8656a3-44a0-4741-a7d1-a4c90049aa68.9c139ce1a4bef04c91abd5b1e57dfa1d.jpeg"];

    const sizes = product?.has_variation
        ? ['XS', 'S', 'M', 'L', 'XL', 'XXL']
        : ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XLP'];

    const colorVariants = product?.variations?.length > 0
        ? product.variations
            .filter(v => v.type === 'color')
            .flatMap(v => v.content.map((c, i) => ({
                id: i,
                name: c.text,
                image: c.display?.find(d => d.type === 'image')?.value || productImages[0],
                imageIndex: Math.min(i, productImages.length - 1),
                price: product.price
            })))
        : [{ id: 0, name: 'Default', image: productImages[0], imageIndex: 0, price: product?.price || '0.00' }];

    const productTitle = product?.title || 'Wonder Nation Girls Trend Crochet Top';
    const productPrice = product?.price || colorVariants[selectedColor]?.price || '0.00';
    const productDescription = product?.descp || 'No description available.';
    const productBrand = product?.brand || 'Wonder Nation';

    const handleAddToCart = async () => {
        const userId = getUserId();

        if (!userId) {
            showToast('Please sign in to add items to cart', 'error');
            setTimeout(() => navigate('/signin'), 1500);
            return;
        }

        if (product?.has_variation && !selectedSize) {
            showToast('Please select a size', 'error');
            return;
        }

        setAddingToCart(true);

        try {
            const mainImg = document.getElementById('mainProductImage')?.src || productImages[currentImage];
            const selectedSizeValue = selectedSize || 'OS';
            const selectedColorName = colorVariants[selectedColor]?.name || 'Default';

            // First, fetch current cart to check if product already exists
            const cartResponse = await getCart(userId);
            const cartData = cartResponse.data?.data || cartResponse.data;

            let existingCartItemId = null;
            let existingQuantity = 0;

            // Check if product already exists in cart
            if (cartData && Array.isArray(cartData)) {
                for (const cartItem of cartData) {
                    if (cartItem.products && Array.isArray(cartItem.products)) {
                        for (const prod of cartItem.products) {
                            if ((prod.id || prod._id) === (product.id || product._id)) {
                                existingCartItemId = cartItem.id;
                                existingQuantity = cartItem.quantity || 1;
                                break;
                            }
                        }
                    } else if (cartItem.product_id === (product.id || product._id)) {
                        existingCartItemId = cartItem.id;
                        existingQuantity = cartItem.quantity || 1;
                        break;
                    }
                    if (existingCartItemId) break;
                }
            }

            // Save extras to localStorage
            saveCartExtras(
                String(product.id || product._id),
                selectedSizeValue,
                mainImg,
                productTitle,
                parseFloat(productPrice),
                selectedColorName
            );

            // If product exists, update quantity by +1; otherwise add new with quantity 1
            let response;
            if (existingCartItemId) {
                // Update existing item quantity (add 1 to current)
                const newQuantity = existingQuantity + 1;
                const payload = {
                    user_id: userId,
                    product_id: product.id || product._id,
                    quantity: newQuantity,
                    has_variation: product?.has_variation || false
                };

                response = await updateCart(payload);
            } else {
                // Add new item with quantity 1
                const cartDataPayload = {
                    user_id: userId,
                    product_id: product.id || product._id,
                    quantity: 1,
                    has_variation: product?.has_variation || false
                };

                if (product?.has_variation && selectedSize) {
                    const sizeIndex = sizes.indexOf(selectedSize);
                    cartDataPayload.variation = {
                        quantity: 1,
                        color_index: selectedColor,
                        size_index: sizeIndex >= 0 ? sizeIndex : 0
                    };
                }

                response = await updateCart(cartDataPayload);
            }

            if (response.status === 200 || response.status === 201) {
                showToast('Item added to cart successfully!', 'success');
                window.dispatchEvent(new Event('cartUpdated'));
                setTimeout(() => navigate('/cart'), 1500);
            } else {
                throw new Error('Failed to add to cart');
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
            showToast(err.response?.data?.message || 'Failed to add item to cart', 'error');
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            {toast && (
                <div className="fixed top-20 right-4 z-50 animate-slide-in">
                    <div className={`${toast.type === 'success' ? 'bg-black' : 'bg-red-600'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
                        {toast.type === 'success' ? <FaCheck className="text-white" /> : <span className="text-white font-bold">!</span>}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}

            <div className="ml-4 max-w-[1400px] py-8 mt-6 flex-grow">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-[70%]">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1">
                                {productImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index}`}
                                        className={`w-12 h-12 object-cover rounded cursor-pointer border-2 ${currentImage === index ? 'border-blue-600' : 'border-gray-300'}`}
                                        onClick={() => setCurrentImage(index)}
                                    />
                                ))}
                            </div>

                            <div className="flex-1 order-1 md:order-2">
                                <div className="relative">
                                    <img
                                        id="mainProductImage"
                                        src={previewImage || productImages[currentImage]}
                                        alt={productTitle}
                                        className="w-full rounded-lg"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                                            <FaShare className="text-gray-600 text-sm" />
                                        </button>
                                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                                            <FaHeart className="text-gray-600 text-sm" />
                                        </button>
                                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                                            <FaSearchPlus className="text-gray-600 text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/3 order-3">
                                <span className="bg-blue-200 text-blue-900 font-bold text-xs px-2 py-1 rounded">Best seller</span>
                                <p className="text-black text-xs mt-2">{productBrand}</p>
                                <h1 className="text-sm font-bold mt-1">{productTitle}</h1>

                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex text-yellow-400 text-xs">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <FaStar key={i} className={i <= Math.floor(product?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-600">
                                        {product?.rating_count ? `(${product.rating_count})` : '(No ratings yet)'}
                                    </span>
                                </div>

                                {productDescription && (
                                    <p className="text-xs text-gray-600 mt-2">{productDescription}</p>
                                )}

                                {colorVariants.length > 1 && (
                                    <div className="mt-3">
                                        <p className="text-xs text-gray-700">Color: <span className="font-semibold">{colorVariants[selectedColor]?.name}</span></p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {colorVariants.map((color, index) => (
                                                <button
                                                    key={color.id}
                                                    onClick={() => {
                                                        setSelectedColor(index);
                                                        setCurrentImage(color.imageIndex);
                                                        setPreviewImage(null);
                                                    }}
                                                    onMouseEnter={() => {
                                                        if (index !== selectedColor) setPreviewImage(productImages[color.imageIndex]);
                                                    }}
                                                    onMouseLeave={() => setPreviewImage(null)}
                                                    className="text-center"
                                                >
                                                    <div className={`w-14 h-14 rounded-full border-2 ${selectedColor === index ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-300'} overflow-hidden`}>
                                                        <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <p className="text-xs font-bold mt-1">${color.price}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product?.has_variation && (
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs font-semibold">Size: <span className="font-normal">{selectedSize || 'Select'}</span></p>
                                            <button className="text-black text-xs underline">Size guide</button>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-2 py-0.5 h-9 w-9 rounded border text-xs transition-all ${selectedSize === size
                                                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 rounded-lg">
                                    <button
                                        onClick={() => setShowKeyFeatures(!showKeyFeatures)}
                                        className="w-full flex justify-between items-center p-2 rounded-lg"
                                    >
                                        <span className="font-bold text-sm">Key item features</span>
                                        {showKeyFeatures ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                                    </button>
                                    {showKeyFeatures && (
                                        <div className="p-2">
                                            {product?.attrib?.length > 0 ? (
                                                product.attrib.map((attr, i) => (
                                                    <div key={i}>
                                                        <p className="text-xs font-semibold mb-1">{attr.type}</p>
                                                        <ul className="list-disc pl-4 space-y-0.5 text-xs mb-2">
                                                            {attr.content?.map((item, j) => (
                                                                <li key={j}>{item.name}: {item.value}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))
                                            ) : (
                                                <ul className="list-disc pl-4 space-y-0.5 text-sm">
                                                    <li>Imported</li>
                                                    <li>Easy care</li>
                                                    <li>Soft fabric</li>
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <RatingsSection />
                        <RecentlyViewedSection />
                        <AboutThisItem />
                        <PopularItemsSection />
                        <ProductsYouMayAlsoLike />
                        <CustomerRatingsSection />
                    </div>

                    <div className="lg:w-[25%]">
                        <div className="sticky top-20">
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <div className="mb-1">
                                    <span className="text-xl font-bold">${productPrice}</span>
                                    {product?.has_discount && product?.discount > 0 && (
                                        <span className="text-xs text-green-600 ml-2">{product.discount}% off</span>
                                    )}
                                    <p className="text-xs text-gray-500">Price when purchased online</p>
                                </div>

                                <div className="flex items-center gap-1 mb-3">
                                    <FaUndo className="text-gray-600 text-xs" />
                                    <span className="text-xs">{product?.has_refund_policy ? 'Free 90-day returns' : 'No returns'}</span>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={addingToCart}
                                    className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors mb-3 disabled:opacity-50"
                                >
                                    {addingToCart ? 'Adding...' : 'Add to cart'}
                                </button>

                                {!getUserId() && (
                                    <p className="text-xs text-gray-500 text-center mb-3">
                                        <Link to="/signin" className="text-blue-600 underline">Sign in</Link> to add items to cart
                                    </p>
                                )}

                                <div className="mb-3">
                                    <p className="font-semibold text-xs mb-1">How you'll get this item:</p>
                                    <label className="flex items-start gap-2 p-2 bg-gray-50 rounded cursor-pointer border">
                                        <div className={`w-4 h-4 rounded-sm flex-shrink-0 mt-0.5 flex items-center justify-center ${deliverySavings ? 'bg-black' : 'border border-gray-400 bg-white'}`}>
                                            {deliverySavings && <FaCheck className="text-white text-[10px]" />}
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-xs font-medium">I want delivery savings with Walmart+</span>
                                            <p className="text-[10px] text-gray-500 mt-0.5">Try 30 days of Free Shipping with Walmart+!</p>
                                        </div>
                                        <input type="checkbox" className="hidden" checked={deliverySavings} onChange={() => setDeliverySavings(!deliverySavings)} />
                                    </label>
                                </div>

                                <div className="flex justify-center mb-3">
                                    <div className="flex gap-2 w-full max-w-[250px]">
                                        <div className={`flex-1 text-center border p-2 rounded ${product?.has_shipment ? 'bg-white border-gray-700' : 'bg-gray-100 opacity-50'}`}>
                                            <FaTruck className="mx-auto text-gray-600 text-sm" />
                                            <p className="text-[11px] font-semibold mt-1">Shipping</p>
                                            <p className="text-[10px] text-gray-500">{product?.has_shipment ? 'Available' : 'Not available'}</p>
                                        </div>
                                        <div className="flex-1 text-center p-2 border rounded bg-gray-100 opacity-50">
                                            <FaMapMarkerAlt className="mx-auto text-gray-400 text-sm" />
                                            <p className="text-[11px] font-semibold mt-1">Pickup</p>
                                            <p className="text-[10px] text-gray-400">Not available</p>
                                        </div>
                                        <div className="flex-1 text-center p-2 border rounded bg-gray-100 opacity-50">
                                            <FaTruck className="mx-auto text-gray-400 text-sm" />
                                            <p className="text-[11px] font-semibold mt-1">Delivery</p>
                                            <p className="text-[10px] text-gray-400">Not available</p>
                                        </div>
                                    </div>
                                </div>

                                {product?.shipping_locations?.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-600">Ships to: {product.shipping_locations.join(', ')}</p>
                                    </div>
                                )}

                                <div className="border-t pt-3 mb-3">
                                    <p className="text-xs">Sold and shipped by <span className="font-semibold">Walmart.com</span></p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <FaUndo className="text-gray-600 text-xs" />
                                        <span className="text-xs">Free 90-day returns</span>
                                        <button className="text-blue-600 text-[10px] underline">Details</button>
                                    </div>
                                    <p className="text-xs mt-1">This item is gift eligible <button className="text-blue-600 text-[10px] underline">Learn more</button></p>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex items-center gap-1 text-gray-700 text-xs hover:text-blue-600">
                                        <FaHeart /> Add to list
                                    </button>
                                    <button className="flex items-center gap-1 text-gray-700 text-xs hover:text-blue-600">
                                        <FaGift /> Add to registry
                                    </button>
                                </div>
                            </div>

                            <div className="shadow rounded-lg p-3">
                                <div className="flex items-center gap-1 mb-2">
                                    <span className="bg-blue-200 text-blue-900 font-bold text-[9px] px-1 py-0.5 rounded">Best seller</span>
                                </div>
                                <div className="flex gap-3 mb-3">
                                    <img src="https://i5.walmartimages.com/seo/Justice-Girls-Cinch-Front-Top-Sizes-XS-XLP_7c108f42-be39-4258-af5e-cbfd26cceaf2.5e4635521cf12298da422ef3784ad71f.jpeg" alt="Sponsored" className="w-24 h-24 object-cover rounded" />
                                    <div>
                                        <p className="text-md font-bold">$12.00</p>
                                        <p className="text-sm text-gray-600">Justice Girls Cinch Front Top</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <div className="flex text-yellow-500 text-[10px]">
                                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                            </div>
                                            <span className="text-[10px] text-gray-600">16</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Shipping, arrives in 3+ days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MoreItemsToExplore />
            <DisneysectionSection />
            <ProductsRelatedToThisItem />
            <Footer />

            <style jsx>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in { animation: slideIn 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default ProductDetailsPage;