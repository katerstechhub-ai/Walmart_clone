import Navigation from "../Components/Navigation";
import Footer from "../Components/footer";

function About() {
    return (
        <div className="font-sans">
            <Navigation />

            {/* ── Hero ── */}
            <div className="relative h-[50vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
                    alt="About hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }}></div>
                <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
                    <span className="inline-block bg-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Who We Are
                    </span>
                    <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">About Us</h1>
                    <p className="text-gray-200 text-lg">Learn more about our story and mission</p>
                </div>
            </div>

            {/* ── Our Story ── */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-14 items-center">
                    <div>
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 leading-tight">
                            Helping Nigerians Find Home Since 2014
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 2014, RealEstate began with a simple mission: to make property transactions in Nigeria transparent, accessible, and hassle-free.
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Over the past decade, we've helped thousands of Nigerians find their dream homes and secure profitable investments.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Today, we operate across major cities in Nigeria with a team of expert agents dedicated to serving you.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Our office"
                            className="w-full h-80 object-cover"
                        />
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-6 mt-16">
                    <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl">
                        <div className="text-3xl mb-4">🎯</div>
                        <h3 className="text-xl font-bold text-blue-700 mb-3">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To simplify property transactions and provide Nigerians with transparent, reliable real estate services that put clients first.
                        </p>
                    </div>
                    <div className="bg-green-50 border border-green-100 p-8 rounded-2xl">
                        <div className="text-3xl mb-4">🌍</div>
                        <h3 className="text-xl font-bold text-green-700 mb-3">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To become Africa's most trusted and innovative real estate platform, connecting people to properties they love.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="bg-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        {[
                            { value: "1,000+", label: "Happy Clients" },
                            { value: "500+", label: "Properties Sold" },
                            { value: "50+", label: "Expert Agents" },
                            { value: "98%", label: "Satisfaction Rate" },
                        ].map(function (stat) {
                            return (
                                <div key={stat.label}>
                                    <div className="text-4xl font-extrabold mb-2">{stat.value}</div>
                                    <div className="text-blue-100 text-sm">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default About;