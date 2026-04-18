import React from 'react';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';
import JustInFashionSection from '../Components/JustInFashionSection';
import CategoryGridSection from '../Components/CategoryGridSection';
import NewInFoodBevs from '../Components/NewInFoodBevs';
import JustInTech from '../Components/JustInTech';
import JustInToys from '../Components/JustInToys';
import FavoriteBrandsSection from '../Components/FavoriteBrandsSection';

const NewArrivalsPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <HeroSection />
            <CategoryGridSection/>
            <JustInFashionSection/>
            <NewInFoodBevs/>
            <JustInTech/>
            <JustInToys/>
            <FavoriteBrandsSection/>

            <Footer />
        </div>
    );
};

export default NewArrivalsPage;