import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-14 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow">
                                <span className="text-white font-bold text-sm">RE</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">RealEstate</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your trusted partner for finding dream homes and smart investments across Nigeria.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/about", label: "About Us" },
                                { to: "/services", label: "Services" },
                                { to: "/contact", label: "Contact" },
                            ].map(function (link) {
                                return (
                                    <li key={link.to}>
                                        <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition">
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>123 Victoria Island, Lagos, Nigeria</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <span>+234 123 456 7890</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>✉️</span>
                                <span>info@realestate.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">Follow Us</h3>
                        <div className="flex flex-col space-y-2">
                            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(function (platform) {
                                return (
                                    <a
                                        key={platform}
                                        href="#"
                                        className="text-gray-400 hover:text-white text-sm transition flex items-center gap-2"
                                        onClick={function (e) {
                                            e.preventDefault();
                                            alert(`Opening ${platform}...`);
                                        }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                                        {platform}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; 2024 RealEstate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;