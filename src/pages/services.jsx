import Navigation from "../Components/Navigation";
import Footer from "../Components/footer";

function Services() {
    function handleLearnMore(title) {
        alert(`Learn more about: ${title}\nOur team will reach out with full details.`);
    }

    let services = [
        {
            icon: "🏠",
            title: "Property Sales",
            desc: "Buy and sell properties at the best market prices with our expert guidance and full support.",
            color: "bg-blue-50 text-blue-600 border-blue-100",
        },
        {
            icon: "🔑",
            title: "Property Rentals",
            desc: "Find your perfect rental home or list your property for rent with verified tenants.",
            color: "bg-green-50 text-green-600 border-green-100",
        },
        {
            icon: "🛡️",
            title: "Property Management",
            desc: "We handle maintenance, tenants, and everything in between so you don't have to.",
            color: "bg-purple-50 text-purple-600 border-purple-100",
        },
        {
            icon: "💬",
            title: "Free Consultation",
            desc: "Get expert advice on your real estate investments with no strings attached.",
            color: "bg-orange-50 text-orange-600 border-orange-100",
        },
        {
            icon: "📄",
            title: "Legal Support",
            desc: "Full legal assistance for all property documentation, title verification, and conveyancing.",
            color: "bg-red-50 text-red-600 border-red-100",
        },
        {
            icon: "📊",
            title: "Property Valuation",
            desc: "Get an accurate, up-to-date market value for your property from certified professionals.",
            color: "bg-yellow-50 text-yellow-600 border-yellow-100",
        },
    ];

    return (
        <div className="font-sans">
            <Navigation />

            {/* ── Hero ── */}
            <div className="relative h-[50vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
                    alt="Services hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }}></div>
                <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
                    <span className="inline-block bg-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        What We Offer
                    </span>
                    <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">Our Services</h1>
                    <p className="text-gray-200 text-lg">Comprehensive real estate solutions tailored for you</p>
                </div>
            </div>

            {/* ── Services Grid ── */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-14">
                    <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Everything You Need</p>
                    <h2 className="text-4xl font-extrabold text-gray-800">We've Got You Covered</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(function (service) {
                        return (
                            <div
                                key={service.title}
                                className={`bg-white border ${service.color.split(" ")[2]} p-7 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col`}
                            >
                                <div className={`w-14 h-14 ${service.color.split(" ")[0]} rounded-2xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                                <button
                                    onClick={function () { handleLearnMore(service.title); }}
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
                                >
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── CTA Banner ── */}
            <div className="bg-blue-600 py-16">
                <div className="max-w-3xl mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl font-extrabold mb-4">Ready to Get Started?</h2>
                    <p className="text-blue-100 mb-8">Talk to one of our expert agents today. No commitment, just great advice.</p>
                    <button
                        onClick={function () { alert("Redirecting you to our contact page..."); }}
                        className="bg-white text-blue-600 font-bold px-10 py-3.5 rounded-xl hover:bg-blue-50 active:scale-95 transition-all shadow-lg"
                    >
                        Contact Us Now
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Services;