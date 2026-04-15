import React from 'react';

const WarmerWeatherSection = () => {
    return (
        <div className="max-w-[1400px] items-center mx-auto px-5 py-8">
            {/* Header */}


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {/* First Div - Gardening essentials from $4.97 */}
                <div
                    className="rounded-lg p-6 flex flex-col justify-start gap-3 min-h-[400px] bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: "url('https://i5.walmartimages.com/dfw/4ff9c6c9-ed54/k2-_a176cfce-3228-43d7-ad7a-66694f5d0e16.v1.jpg?odnHeight=1316&odnWidth=1316&odnBg=&odnDynImageQuality=70')", backgroundColor: "#2d5a27" }}
                >
                    <div className="relative z-10">
                        <p className="text-sm text-blue-900 font-bold mt-1">Get ready for warmer weather</p>
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Gardening essentials from $4.97</h3>
                    </div>
                    <button className="relative z-10 border rounded-[20px] px-4 py-1.5 bg-white text-black text-sm cursor-pointer w-fit font-medium">
                        Shop now
                    </button>
                </div>

                {/* Second Div - Complex with two sections */}
                <div className="flex flex-col gap-4">
                    {/* Top Banner - Furniture & decor */}
                    <div
                        className="rounded-lg p-6 flex-1 flex flex-col justify-start gap-3 bg-cover bg-center relative overflow-hidden min-h-[180px]"
                        style={{ backgroundImage: "url('https://i5.walmartimages.com/dfw/4ff9c6c9-dee0/k2-_b07a5416-86cc-41e9-917c-564d2e050c1d.v1.jpg?odnHeight=584&odnWidth=1024&odnBg=&odnDynImageQuality=70')" }}
                    >
                        <div className="relative z-10">
                            <h3 className="text-sm font-bold text-blue-900">Furniture & decor from $14.88</h3>
                            <p className="text-xl text-blue-900  font-bold mt-1">New in patio: Beautiful by Drew</p>
                        </div>
                        <button className="relative z-10 cursor-pointer text-blue-900 text-sm underline underline-offset-4 text-left w-fit font-medium">
                            Shop now
                        </button>
                    </div>

                    {/* Two flexed divs below */}
                    <div className="grid grid-cols-2 gap-4 flex-1">
                        {/* Left - Great finds for your patio */}
                        <div
                            className="rounded-lg p-4 flex flex-col justify-start gap-3 bg-cover bg-center relative overflow-hidden min-h-[150px]"
                            style={{ backgroundImage: "url('https://i5.walmartimages.com/dfw/4ff9c6c9-4e70/k2-_31598dc1-93fd-476c-a264-ae376e035b1b.v1.jpg?odnHeight=684&odnWidth=496&odnBg=&odnDynImageQuality=70')", backgroundColor: "#f5f5dc" }}
                        >

                            <div className="relative z-10">
                                <h4 className="text-lg font-bold text-white">Smart mowers & more outdoor tech</h4>
                            </div>

                            <button className="relative z-10 cursor-pointer text-blue-600 underline underline-offset-4 text-left w-fit text-xs font-medium">
                                Shop now
                            </button>
                        </div>

                        {/* Right - Smart mowers & more outdoor tech */}
                        <div
                            className="rounded-lg p-4 flex flex-col justify-start gap-3 bg-cover bg-center relative overflow-hidden min-h-[150px]"
                            style={{ backgroundImage: "url('https://i5.walmartimages.com/dfw/4ff9c6c9-ca6b/k2-_344dceaa-cfab-460a-9def-7123da8cc718.v1.jpg?odnHeight=684&odnWidth=496&odnBg=&odnDynImageQuality=70')", backgroundColor: "#e8f4f8" }}
                        >
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">Trees, shrubs & more for the garden</h3>
                            </div>

                            <button className="relative z-10 cursor-pointer text-blue-600 underline underline-offset-4 text-left w-fit text-xs font-medium">
                                Shop now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Third Div - Trees, shrubs & more for the garden */}
                <div
                    className="rounded-lg p-6 flex flex-col justify-start gap-3 min-h-[500px] bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: "url('https://i5.walmartimages.com/dfw/4ff9c6c9-3ddf/k2-_00ea3100-7a54-4f5f-bac0-b29343e8f7ba.v1.jpg?odnHeight=1316&odnWidth=770&odnBg=&odnDynImageQuality=70')", backgroundColor: "#3a6b4b" }}
                >
                    <div className="relative z-10">
                        <h4 className="text-sm font-bold text-blue-900">Great finds for your patio</h4>
                        <p className="text-lg font-bold text-blue-900 mt-1">Introducing My Texas House furniture & decor</p>
                    </div>
                    <button className="relative z-10 cursor-pointer text-blue-900 underline underline-offset-4 text-left w-fit font-medium">
                        Shop now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WarmerWeatherSection;