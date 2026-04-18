import React from 'react';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';
import JustInFashionSection from '../Components/JustInFashionSection';

const NewArrivalsPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <HeroSection />
            <JustInFashionSection/>

            <Footer />
        </div>
    );
};

export default NewArrivalsPage;