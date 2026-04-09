import React from 'react';
import Navigation from '../Components/Navigation';
import HeroSlider from '../Components/heroslider';

const Home = () => {
    return (
        <div>
            <Navigation />
            <HeroSlider />
            {/* Rest of your homepage content will go here */}
        </div>
    );
};

export default Home;