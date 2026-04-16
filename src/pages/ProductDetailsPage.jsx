import React, { useState } from 'react';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
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

const ProductDetailsPage = () => {
    const [selectedSize, setSelectedSize] = useState('XXL');
    const [selectedColor, setSelectedColor] = useState(0);
    const [deliverySavings, setDeliverySavings] = useState(true);
    const [showKeyFeatures, setShowKeyFeatures] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);

    // Product images for slider
    const productImages = [
        "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Trend-Crochet-Top-sizes-4-18-Plus_7a8656a3-44a0-4741-a7d1-a4c90049aa68.9c139ce1a4bef04c91abd5b1e57dfa1d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
        "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Trend-Crochet-Top-sizes-4-18-Plus_e51f30fc-7aad-46d2-937c-3e87d6995c3a.14aa63e445dc9528505b4909146c1a98.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
        "https://i5.walmartimages.com/seo/Wonder-Nation-Girls-Trend-Crochet-Top-sizes-4-18-Plus_7cb8a5ee-b152-4534-8c0b-1f0d71e24a4a.0e10d921cf76cd8b8f9b3c326096cea5.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",

    ];

    // Available sizes
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XLP'];

    // Color variants with images and prices
    const colorVariants = [
        { id: 0, name: "MELON DELIGHT", imageIndex: 0, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwAwgMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIEBv/EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/EABoBAQEBAQADAAAAAAAAAAAAAAABAgQDBQf/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APLGAvUPsSSSCwFIBECANAQAhECIEAaAjNFaAgFIEAIRECBEkkw12pJ5XSkkgkUgEkIAVUQAgQJKiAFCMhoCCggQAgSgGhGUkgdyRbdKBSCBQAFIANAQCkUQAgRCkVEAKBmqkDIBFEAIGQkhHegW3UkiiBEIJJAA0AAIRADRQAKEAIEAIEApAzQCKM0IoR3JJp1IpCJJIJJAAUigUgQUGigyiEQUEUQCtCqzWQ1QjNZDQGaEkI7iC26UkkEkgSSAIhFAIQFBACg0VECVSsgECAEDNFBoGKkkI7Sk06UUhEkgQIqKEgioEIoBAAECBEDIBoGQCBmgGhWKEkiO9JNukpIRKJIIVJFAIRUCyioEAAQIgRRkA0DNAIVmgGgYoSQj/9k=", price: "12.98", colorClass: "bg-yellow-100" },
        { id: 1, name: "OLD IVORY CREAM", imageIndex: 1, image: "data:image/jpeg;base64,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", price: "12.98", colorClass: "bg-pink-200" },
        { id: 2, name: "Black Soot", imageIndex: 2, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAVEAEBAAAAAAAAAAAAAAAAAAAAAf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aw8BVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFAAARUAUQRQBQAAAAAAAAAEWIoCKAiiAqAIoAoAAAAAAAAACKAIAAKAigAAAAAAAAAAAAAAAigIoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIP/2Q==", price: "12.98", colorClass: "bg-gray-800" }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <div className="ml-4  max-w-[1400px]  py-8 mt-6 flex-grow">
                {/* Two column layout */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT DIV - Made wider */}
                    <div className="lg:w-[70%]">
                        <div className="flex flex-col md:flex-row gap-4">

                            {/* Thumbnail Images - Vertical line on the left */}
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

                            {/* Main Image */}
                            <div className="flex-1 order-1 md:order-2">
                                <div className="relative">
                                    <img
                                        src={previewImage || productImages[currentImage]}
                                        alt="Product"
                                        className={`w-full rounded-lg transition-opacity ${previewImage ? 'opacity-100' : 'opacity-100'}`}
                                    />
                                    {/* Image Icons */}
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

                            {/* Product Info - Right side of left div */}
                            <div className="md:w-1/3 order-3">
                                {/* Best Seller Badge */}
                                <span className="bg-blue-200 text-blue-900 font-bold text-xs px-2 py-1 rounded">Best seller</span>

                                {/* Brand and Title */}
                                <Link to="/brand/wonder-nation" className="text-black text-xs hover:underline block mt-2">Wonder Nation</Link>
                                <h1 className="text-sm font-bold mt-1">Wonder Nation Girls Trend Crochet Top, sizes 4-18 & Plus</h1>

                                {/* Ratings */}
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex text-gray-300 text-xs">
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                    </div>
                                    <span className="text-xs text-gray-600">(No ratings yet)</span>
                                </div>

                                {/* Color - Rounded divs with images */}
                                <div className="mt-3">
                                    <p className="text-xs text-gray-700">Color: <span className="font-semibold">{colorVariants[selectedColor].name}</span></p>
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
                                {/* Price */}
                                <div className="mt-3">
                                    <div className="flex items-center gap-2">
                                        <button className="text-black text-xs underline">See options</button>
                                    </div>
                                </div>

                                {/* Size Selection */}
                                <div className="mt-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-semibold">Clothing Size: <span className="font-normal">{selectedSize}</span></p>
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

                                {/* Key Item Features - Dropdown */}
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
                                            <ul className="list-disc pl-4 space-y-0.5 text-sm">
                                                <li>Imported</li>
                                                <li>Easy care</li>
                                                <li>Soft fabric</li>
                                            </ul>
                                            <button className="text-black text-sm underline mt-1">View all item details</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <RatingsSection/>
                        <RecentlyViewedSection/>
                        <AboutThisItem/>
                    </div>

                    {/* RIGHT DIV - Made slimmer */}
                    <div className="lg:w-[25%]">
                        {/* Sticky Box with Gray Background - only main product info */}
                        <div className="sticky top-20">
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                {/* Price */}
                                <div className="mb-1">
                                    <span className="text-xl font-bold">${colorVariants[selectedColor].price}</span>
                                    <p className="text-xs text-gray-500">Price when purchased online</p>
                                </div>

                                {/* Free Returns */}
                                <div className="flex items-center gap-1 mb-3">
                                    <FaUndo className="text-gray-600 text-xs" />
                                    <span className="text-xs">Free 90-day returns</span>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors mb-3">
                                    Add to cart
                                </button>

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

                                {/* Shipping/Pickup/Delivery Options */}
                                <div className="flex justify-center mb-3">
                                    <div className="flex gap-2 w-full h-50 max-w-[250px]">
                                        <div className="flex-1 text-center border border-gray-700 p-2 border rounded bg-white">
                                            <FaTruck className="mx-auto text-gray-600 text-sm" />
                                            <p className="text-[11px] font-semibold mt-1">Shipping</p>
                                            <p className="text-[10px] text-gray-500">Arrives Apr 18</p>
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

                                {/* Location */}
                                <div className="mb-3">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-gray-600 text-xs" />
                                            <span className="text-xs">Sacramento, 95829</span>
                                        </div>
                                        <button className="text-black text-xs underline">Change</button>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-0.5">Arrives by Sat, Apr 18. Order within 7 hr 3 min</p>
                                </div>

                                {/* Seller Info */}
                                <div className="border-t pt-3 mb-3">
                                    <p className="text-xs">Sold and shipped by <span className="font-semibold">Walmart.com</span></p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <FaUndo className="text-gray-600 text-xs" />
                                        <span className="text-xs">Free 90-day returns</span>
                                        <button className="text-blue-600 text-[10px] underline">Details</button>
                                    </div>
                                    <p className="text-xs mt-1">This item is gift eligible <button className="text-blue-600 text-[10px] underline">Learn more</button></p>
                                </div>

                                {/* Add to List & Registry */}
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-1 text-gray-700 text-xs hover:text-blue-600">
                                        <FaHeart /> Add to list
                                    </button>
                                    <button className="flex items-center gap-1 text-gray-700 text-xs hover:text-blue-600">
                                        <FaGift /> Add to registry
                                    </button>
                                </div>
                            </div>

                            {/* Sponsored Product - OUTSIDE the gray background, no slider arrows */}
                            <div className="shadow rounded-lg p-3">
                                <div className="flex items-center gap-1 mb-2">
                                    <span className="bg-blue-200 text-blue-900 font-bold text-[9px] px-1 py-0.5 rounded">Best seller</span>
                                </div>
                                <div className="flex gap-3 mb-3">
                                    <img src="https://i5.walmartimages.com/seo/Justice-Girls-Cinch-Front-Top-Sizes-XS-XLP_7c108f42-be39-4258-af5e-cbfd26cceaf2.5e4635521cf12298da422ef3784ad71f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" alt="Sponsored" className="w-33 h-33 object-cover rounded" />
                                    <div>
                                        <p className="text-md font-bold">$12.00</p>
                                        <p className="text-sm text-gray-600">Justice Girls Cinch Front Top, Sizes XS - XLP</p>
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

            <Footer />
        </div>
    );
};

export default ProductDetailsPage;