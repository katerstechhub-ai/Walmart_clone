import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative p-6 w-full overflow-hidden">
            <div className="relative h-[150px] md:h-[180px] w-full">
                <img
                    src="https://i5.walmartimages.com/dfw/4ff9c6c9-bb27/k2-_a52f31ac-28d4-47b9-9359-64cca03c48cc.v1.jpg?odnHeight=300&odnWidth=1612&odnBg=&odnDynImageQuality=70"
                    alt="New Arrivals"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ">
                    <div className="container mx-auto px-5 h-full flex flex-col justify-center items-center text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-950 ">
                            New arrivals are here
                        </h1>
                        <p className="text-base md:text-lg text-blue-950 ">
                            Fashion, beauty, food—grab 'em all.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;