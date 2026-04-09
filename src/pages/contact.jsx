import { useState } from "react";
import Navigation from "../Components/Navigation";
import Footer from "../Components/footer";

function Contact() {
    let [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    let [errors, setErrors] = useState({});
    let [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        let { name, value } = e.target;
        setForm(function(prev) { return { ...prev, [name]: value }; });
        // Clear error on change
        setErrors(function(prev) { return { ...prev, [name]: "" }; });
    }

    function validate() {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required.";
        } else if (form.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (form.phone && !/^[0-9+\s-]{7,15}$/.test(form.phone)) {
            newErrors.phone = "Please enter a valid phone number.";
        }

        if (!form.message.trim()) {
            newErrors.message = "Message is required.";
        } else if (form.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        }

        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        let found = validate();
        if (Object.keys(found).length > 0) {
            setErrors(found);
            return;
        }
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        setErrors({});
    }

    let contactInfo = [
        { icon: "📍", label: "Address", value: "123 Victoria Island, Lagos, Nigeria" },
        { icon: "📞", label: "Phone", value: "+234 123 456 7890" },
        { icon: "✉️", label: "Email", value: "info@realestate.com" },
        { icon: "🕐", label: "Hours", value: "Mon - Fri: 8am - 6pm" },
    ];

    return (
        <div className="font-sans">
            <Navigation />

            {/* ── Hero ── */}
            <div className="relative h-[50vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
                    alt="Contact hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }}></div>
                <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
                    <span className="inline-block bg-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Reach Out
                    </span>
                    <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">Contact Us</h1>
                    <p className="text-gray-200 text-lg">We'd love to hear from you</p>
                </div>
            </div>

            {/* ── Contact Body ── */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-14">

                    {/* Info */}
                    <div>
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 leading-tight">
                            We're Here to Help You
                        </h2>

                        <div className="space-y-5 mb-10">
                            {contactInfo.map(function(info) {
                                return (
                                    <div key={info.label} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <span className="text-2xl">{info.icon}</span>
                                        <div>
                                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{info.label}</p>
                                            <p className="text-gray-700 font-medium">{info.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Map placeholder */}
                        <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center border border-gray-200">
                            <p className="text-gray-400 text-sm">📍 Map — Victoria Island, Lagos</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div>
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Message Us</p>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Send a Message</h2>

                        {submitted && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl mb-6 flex items-center gap-3">
                                <span className="text-xl">✅</span>
                                <div>
                                    <p className="font-semibold">Message sent successfully!</p>
                                    <p className="text-sm">We'll get back to you within 24 hours.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Ade Johnson"
                                    className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="e.g. ade@email.com"
                                    className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                            </div>

                            {/* Phone (optional) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="e.g. +234 800 000 0000"
                                    className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Your Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Tell us about the property you're looking for..."
                                    className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"}`}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
                            >
                                Send Message →
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Contact;