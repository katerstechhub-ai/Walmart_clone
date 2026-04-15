import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto">
            {/* Top Section - Light Blue Background with Feedback - CENTERED */}
            <div className="bg-blue-100 py-8 px-5">
                <div className="max-w-[1400px] mx-auto text-center">
                    <p className="text-gray-800 font-medium mb-4">We'd love to hear what you think!</p>
                    <button className="border border-gray-800 text-gray-800 bg-white font-bold px-6 py-2 rounded-full ">
                        Give feedback
                    </button>
                </div>
            </div>

            {/* Main Footer - Dark Blue Background with Links */}
            <div className="bg-blue-900 py-8 px-5">
                <div className="max-w-[1400px] mx-auto">
                    {/* First Line of Links */}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mb-4">
                        <Link to="/all-departments" className="text-white text-sm hover:underline">All Departments</Link>
                        <Link to="/store-directory" className="text-white text-sm hover:underline">Store Directory</Link>
                        <Link to="/careers" className="text-white text-sm hover:underline">Careers</Link>
                        <Link to="/our-company" className="text-white text-sm hover:underline">Our Company</Link>
                        <Link to="/sell-on-walmart" className="text-white text-sm hover:underline">Sell on Walmart.com</Link>
                        <Link to="/help" className="text-white text-sm hover:underline">Help</Link>
                        <Link to="/accessibility" className="text-white text-sm hover:underline">Accessibility</Link>
                        <Link to="/tax-exempt-program" className="text-white text-sm hover:underline">Tax Exempt Program</Link>
                        <Link to="/safety-data-sheet" className="text-white text-sm hover:underline">Safety Data Sheet</Link>

                        <Link to="/get-the-walmart-app" className="text-white text-sm hover:underline">Get the Walmart App</Link>
                    </div>

                    {/* Second Line of Links */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-4">
                        <Link to="/terms-of-use" className="text-white text-sm hover:underline">Terms of Use</Link>
                        <Link to="/privacy-notice" className="text-white text-sm hover:underline">Privacy Notice</Link>
                        <Link to="/california-supply-chain-act" className="text-white text-sm hover:underline">California Supply Chain Act</Link>
                        <Link to="/learn-about-spark-driver" className="text-white text-sm hover:underline">Learn about Spark Driver</Link>
                        <Link to="/your-privacy-choices" className="text-white text-sm hover:underline">Your Privacy Choices</Link>
                        <Link to="/product-recalls" className="text-white text-sm hover:underline">Product Recalls</Link>
                        <Link to="/consumer-health-data-privacy-notices" className="text-white text-sm hover:underline">Consumer Health Data Privacy Notices</Link>
                    </div>

                    {/* Third Line of Links */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6">
                        <Link to="/brand-shop-directory" className="text-white text-sm hover:underline">Brand Shop Directory</Link>
                        <Link to="/customer-privacy-center" className="text-white text-sm hover:underline">Customer Privacy Center</Link>
                        <Link to="/pharmacy" className="text-white text-sm hover:underline">Pharmacy</Link>
                        <Link to="/walmart-business" className="text-white text-sm hover:underline">Walmart Business</Link>
                        <Link to="/delete-account" className="text-white text-sm hover:underline">Delete Account</Link>

                    </div>

                    {/* Copyright Section */}
                    <div className=" pt-6 mt-4">
                        <p className="text-white text-xs text-center">
                            © 2026 Walmart. The trademarks Walmart and the Walmart Spark design are registered with the US Patent and Trademark Office. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;