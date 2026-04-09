import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/footer";
import Card from "../Components/Card";
import Toast from "../Components/toast";
import useToast from "../Components/usetoast";

let featuredProperties = [
    { id: 1, image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80", title: "Luxury Villa", price: "₦250M", location: "Banana Island, Lagos", beds: "5", baths: "4" },
    { id: 2, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80", title: "Modern Apartment", price: "₦85M", location: "Victoria Island, Lagos", beds: "3", baths: "2" },
    { id: 3, image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80", title: "Cozy Bungalow", price: "₦45M", location: "Magodo, Lagos", beds: "2", baths: "1" },
    { id: 4, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80", title: "Penthouse", price: "₦150M", location: "Lekki, Lagos", beds: "4", baths: "3" },
    { id: 5, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80", title: "Beachfront Estate", price: "₦380M", location: "Elegushi, Lagos", beds: "6", baths: "5" },
    { id: 6, image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80", title: "Townhouse", price: "₦65M", location: "Ikeja GRA, Lagos", beds: "3", baths: "3" },
];

let agents = [
    { name: "Mr. Adekunle Gold", role: "Senior Agent", exp: "10+ years experience", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" },
    { name: "Mrs. Funke Adebayo", role: "Luxury Specialist", exp: "8+ years experience", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" },
    { name: "Mr. Tunde Bakare", role: "Commercial Expert", exp: "12+ years experience", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" },
];

function Home() {
    let navigate = useNavigate();
    let { toasts, showToast } = useToast();
    let [search, setSearch] = useState("");

    function handleSearch() {
        if (!search.trim()) {
            showToast("Please enter a location to search.", "error");
            return;
        }
        navigate("/properties");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSearch();
    }

    function handleContactAgent(name) {
        showToast(`Connecting you with ${name}...`, "info");
    }

    return (
        <div className="font-sans">
            <Navigation />
            <Toast toasts={toasts} />

            {/* ── Hero ── */}
            <div className="relative h-screen overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }}></div>

                <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
                    <span className="inline-block bg-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                        Nigeria's #1 Property Platform
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
                        Find Your <span className="text-blue-400">Dream Home</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl">
                        Discover verified properties across Lagos and beyond with expert guidance every step of the way.
                    </p>

                    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-2 flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={function(e) { setSearch(e.target.value); }}
                            onKeyDown={handleKeyDown}
                            placeholder="Search by location (e.g. Lekki, Lagos)..."
                            className="flex-1 px-4 py-3 text-gray-800 text-sm rounded-xl outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all"
                        >
                            Search
                        </button>
                    </div>

                    <div className="flex gap-8 mt-12">
                        {[
                            { value: "1,000+", label: "Happy Clients" },
                            { value: "500+", label: "Properties" },
                            { value: "50+", label: "Expert Agents" },
                        ].map(function(stat) {
                            return (
                                <div key={stat.label} className="text-center">
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-xs text-gray-300 mt-1">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Featured Properties ── */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Hand-picked</p>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Featured Properties</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Premium listings across Nigeria's most sought-after neighbourhoods</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProperties.map(function(p) {
                        return (
                            <Card
                                key={p.id}
                                id={p.id}
                                image={p.image}
                                title={p.title}
                                price={p.price}
                                location={p.location}
                                beds={p.beds}
                                baths={p.baths}
                            />
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={function() { navigate("./pages/allproperty.jsx"); }}
                        className="bg-blue-600 text-white px-10 py-3.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
                    >
                        View All Properties
                    </button>
                </div>
            </div>

            {/* ── Agents ── */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Our Team</p>
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-3">Meet Our Expert Agents</h2>
                        <p className="text-gray-500">Professional agents ready to help you find your dream home</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {agents.map(function(agent) {
                            return (
                                <div key={agent.name} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                                    <div className="overflow-hidden">
                                        <img src={agent.img} alt={agent.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">{agent.name}</h3>
                                        <p className="text-blue-600 font-semibold text-sm mb-1">{agent.role}</p>
                                        <p className="text-gray-400 text-xs mb-5">{agent.exp}</p>
                                        <button
                                            onClick={function() { handleContactAgent(agent.name); }}
                                            className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
                                        >
                                            Contact Agent
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Why Choose Us ── */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-2">Our Advantage</p>
                        <h2 className="text-4xl font-extrabold text-gray-800">Why Choose Us</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: "✅", label: "Verified Properties", desc: "All listings thoroughly vetted and inspected", color: "bg-blue-50" },
                            { icon: "💰", label: "Best Prices", desc: "Get the most competitive market rates", color: "bg-green-50" },
                            { icon: "⚡", label: "Fast Process", desc: "Quick and seamless property transactions", color: "bg-purple-50" },
                            { icon: "🔒", label: "Secure & Legal", desc: "Full legal documentation support", color: "bg-orange-50" },
                        ].map(function(item) {
                            return (
                                <div key={item.label} className="text-center group">
                                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-base font-bold text-gray-800 mb-2">{item.label}</h3>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
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

export default Home;