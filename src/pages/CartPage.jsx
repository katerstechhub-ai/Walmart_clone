import React, { useState } from 'react';
import Navigation from '../Components/Navigation';
import { Link } from 'react-router-dom';
import { FaTruck, FaUndo, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaTrash, FaRegHeart } from 'react-icons/fa';
import AddYourEssentialsSection from '../Components/AddYourEssentialsSection';
import CartFooter from '../Components/CartFooter';

const CartPage = () => {
    const [isPickupOpen, setIsPickupOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const subtotal = 35.00 * quantity;
    const estimatedTotal = subtotal;

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <div className="w-full mx-auto px-5 py-8 flex-grow">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT SIDE */}
                    <div className="lg:w-2/3">
                        {/* Cart Title */}
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Cart (1 item)</h1>

                        {/* Pickup and Delivery Dropdown */}
                        <div className="mb-6">
                            <button
                                onClick={() => setIsPickupOpen(!isPickupOpen)}
                                className="flex items-center gap-2 justify-between w-full rounded-lg p-4 "
                            >
                                <div className="flex items-center gap-2">
                                    <img src="https://i5.walmartimages.com/dfw/63fd9f59-3023/b0689b83-9f3a-46e7-ba79-83da819aeec2/v1/thumb_on_phone.svg" alt="" />
                                    <span className="font-bold text-[23px] text-gray-800">Pickup and delivery options</span>
                                </div>
                                {isPickupOpen ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
                            </button>

                            {isPickupOpen && (
                                <div className=" border-t-0 rounded-b-lg p-4 bg-white">
                                    <div className="flex gap-4">
                                        <div className="flex-1 flex flex-col items-center text-center p-2 border rounded bg-white">
                                            <img src="https://i5.walmartimages.com/dfw/63fd9f59-3023/b0689b83-9f3a-46e7-ba79-83da819aeec2/v1/thumb_on_phone.svg" alt="" />
                                            <p className="text-sm font-semibold mt-1">Shipping</p>
                                            <p className="text-xs text-green-600">Available</p>
                                        </div>
                                        <div className="flex-1 text-center p-2 border rounded bg-gray-100 opacity-50">
                                            <FaMapMarkerAlt className="mx-auto text-gray-400" />
                                            <p className="text-sm font-semibold mt-1">Pickup</p>
                                            <p className="text-xs text-gray-400">Not available</p>
                                        </div>
                                        <div className="flex-1 text-center p-2 border rounded bg-gray-100 opacity-50">
                                            <FaTruck className="mx-auto text-gray-400" />
                                            <p className="text-sm font-semibold mt-1">Delivery</p>
                                            <p className="text-xs text-gray-400">Not available</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="shadow-lg rounded-lg overflow-hidden mb-4">
                            {/* Blue Background Top Section with Truck Icon */}
                            <div className="bg-blue-50 p-8 flex items-center gap-2">
                                <img src="https://i5.walmartimages.com/dfw/63fd9f59-1b5e/5452ae02-a31f-4ef1-9a45-62ac0b06c13b/v1/mci-shipping.svg" />
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-gray-800">Free shipping, arrives by Sat, Apr 25</span>
                                    <Link to="/change-zip" className="text-sm text-black underline">95829</Link>
                                </div>
                            </div>

                            {/* Product Content */}
                            <div className="p-4">
                                <div className="flex gap-4">
                                    {/* Product Image */}
                                    <img
                                        src="https://i5.walmartimages.com/seo/Nee-Doh-Swirlin-Usa-Nice-Cube-1-pc_b287ed30-90ea-4652-b8cd-78c77a3c5e6d.690357663a2a4b81b43280b02c2a6503.png?odnHeight=144&odnWidth=144&odnBg=FFFFFF"
                                        alt="Nee Doh Swirlin Usa Nice Cube"
                                        className="w-24 h-24 object-cover rounded"
                                    />

                                    {/* Product Details */}
                                    <div className="flex-1">

                                        <p className="text-xs text-gray-600 mb-1">Sold and shipped by <Link to="/seller/eec" className="font-semibold hover:underline">Eec</Link></p>
                                        <p className="text-xs text-black mb-2">Free shipping</p>
                                        <h3 className="font-semibold text-gray-800 text-sm mb-1">Nee Doh Swirlin Usa Nice Cube, 1 pc</h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            <FaUndo className="text-gray-500 text-xs" />
                                            <span className="text-xs text-gray-600">Free 30-day returns</span>
                                        </div>
                                        <p className="text-xs text-red-700 font-semibold">Only 5 left</p>
                                    </div>

                                    {/* Price and Quantity */}
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-800">${(35.00 * quantity).toFixed(2)}</p>
                                        <div className="flex items-center rounded-full border mt-2">
                                            <button onClick={decreaseQuantity} className="w-10 h-7 text-lg font-bold ">-</button>
                                            <span className="w-8 text-center text-sm">{quantity}</span>
                                            <button onClick={increaseQuantity} className="w-10 h-7 text-lg font-bold">+</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mt-20 pt-2">
                                    <button className="text-sm text-gray-600 hover:text-red-500 flex items-center gap-1">
                                        <FaTrash className="text-xs" /> Remove
                                    </button>
                                    <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                                        <FaRegHeart className="text-xs" /> Save for later
                                    </button>
                                </div>
                            </div>
                        </div>
                        <AddYourEssentialsSection />
                    </div>

                    {/* RIGHT SIDE - Sticky */}
                    <div className="lg:w-1/3">
                        <div className="sticky shadow-2xl rounded-lg p-6 top-20">
                            {/* Continue to Checkout Button */}
                            <div className="flex justify-center">
                                <button className="w-70 bg-blue-600 h-9 text-white py-1 rounded-full font-semibold hover:bg-blue-700 transition-colors mb-4">
                                    Continue to checkout
                                </button>
                            </div>

                            {/* Warning Text */}
                            <div className='flex items-center  bg-blue-900 rounded-md '>
                                <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-dbc8/k2-_5f1ffe8f-c68e-4169-aaa6-147c5c76c3a6.v1.png" className='h-10 w-10  p-1' />
                                <p className="text-xs p-3 text-white mb-2">
                                    Check out soon before it's sold out.
                                </p>
                            </div>

                            {/* Sign In Prompt */}
                            <p className="text-xs text-center text-black mt-3 mb-4">
                                For the best shopping experience, <Link to="/signin" className="text-black underline">sign in</Link>
                            </p>

                            {/* Order Summary */}
                            <div className="border-t pt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Subtotal (1 item)</span>
                                    <span className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Taxes</span>
                                    <span className="text-gray-600">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between mt-4 pt-4 border-t">
                                    <span className="text-lg font-bold text-gray-800">Estimated total</span>
                                    <span className="text-lg font-bold text-gray-800">${estimatedTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CartFooter />
        </div>
    );
};

export default CartPage;