import React from 'react';
import { Link } from 'react-router-dom';

const CartFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-6 px-5 mt-8">
            <div className="max-w-[1400px] mx-auto">
                {/* Footer Links - Centered */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-gray-600 mb-4">
                    <Link to="/" className="hover:underline">© 2026 Walmart. All Rights Reserved.</Link>
                    <Link to="/feedback" className="hover:underline">Give feedback</Link>
                    <Link to="/privacy/california" className="hover:underline">CA Privacy Rights</Link>
                    <Link to="/privacy/choices" className="hover:underline">Your Privacy Choices</Link>
                    <Link to="/privacy/notice" className="hover:underline">Notice at Collection</Link>
                    <Link to="/privacy/request" className="hover:underline">Request My Personal Information</Link>
                    <Link to="/account/delete" className="hover:underline">Delete Account</Link>
                    <Link to="/legal/supply-chain" className="hover:underline">California Supply Chains Act</Link>
                </div>
            </div>
        </footer>
    );
};

export default CartFooter;