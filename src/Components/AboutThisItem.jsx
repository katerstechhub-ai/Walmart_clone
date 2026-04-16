import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AboutThisItem = () => {
    const [openSection, setOpenSection] = useState('productDetails'); // Default open

    const toggleSection = (section) => {
        if (openSection === section) {
            setOpenSection(null);
        } else {
            setOpenSection(section);
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto px-3 py-3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">About this item</h2>

            {/* Product Details Section */}
            <div className=" mb-3 border-gray-700 border-t overflow-hidden">
                <button
                    onClick={() => toggleSection('productDetails')}
                    className="w-full flex justify-between items-center p-4 bg-white "
                >
                    <span className="font-semibold text-gray-800">Product details</span>
                    {openSection === 'productDetails' ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {openSection === 'productDetails' && (
                    <div className="p-4  ">
                        <p className="text-[13px] text-gray-700 mb-3">
                            Check out this Blend Fabric Crochet Top only by Wonder Nation, the embroidery artwork adds just the right touch to elevate this classic piece. It's the perfect top to wear from day to night. Suitable for various occasions such as daily wear, outdoor, vacation, beach, party, photograph, family gathering etc.
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-3">
                            <li>Imported</li>
                            <li>Easy care</li>
                            <li>Soft fabric</li>
                        </ul>
                        <div className="text-xs text-gray-500 mt-3 pt-3 ">
                            <p>We aim to show you accurate product information. Manufacturers, suppliers and others provide what you see here, and we have not verified it. <button className="text-black underline">See our disclaimer</button></p>
                        </div>
                    </div>
                )}
            </div>

            {/* Specifications Section */}
            <div className=" border-gray-500 mb-3 border-t overflow-hidden">
                <button
                    onClick={() => toggleSection('specifications')}
                    className="w-full flex justify-between items-center p-4 bg-white "
                >
                    <span className="font-semibold text-gray-800">Specifications</span>
                    {openSection === 'specifications' ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {openSection === 'specifications' && (
                    <div className="p-4 ">
                        <div className="space-y-3">
                            <div className="sm:flex-row sm:justify-between py-2">
                                <span className="font-bold text-sm text-gray-700 w-32">Clothing size</span>
                                <p className="text-sm text-gray-600">XLP</p>
                            </div>
                            <div className=" sm:flex-row sm:justify-between py-2 ">
                                <span className="font-bold text-sm text-gray-700 w-32">Color</span>
                                <p className="text-sm text-gray-600">MELON DELIGHT</p>
                            </div>
                            <div className="sm:flex-row sm:justify-between py-2 ">
                                <span className="font-bold text-sm text-gray-700 w-32">Top style</span>
                                <p className="text-sm text-gray-600">Pullover</p>
                            </div>
                            <div className=" sm:flex-row sm:justify-between py-2">
                                <span className="font-bold text-sm text-gray-700 w-32">Pattern</span>
                                <p className="text-sm text-gray-600">Crochet with Granny Square Floral Bottom Border</p>
                            </div>
                        </div>
                        <button className="text-blue-600 text-sm underline mt-4">More details</button>
                    </div>
                )}
            </div>

            {/* Directions Section */}
            <div className="  border-gray-500 border-t overflow-hidden">
                <button
                    onClick={() => toggleSection('directions')}
                    className="w-full flex justify-between items-center p-4 bg-white "
                >
                    <span className="font-semibold text-gray-800">Directions</span>
                    {openSection === 'directions' ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {openSection === 'directions' && (
                    <div className="p-4 ">
                        <p className="text-sm text-gray-700">Fabric Care Instructions: Machine Washable</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutThisItem;