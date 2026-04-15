import React, { useState } from 'react';
import VideoCard from './VideoCard';
import videoFrame from '../assets/videoframe_2998.png';

const FeaturedVideosSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerView = 4; // Show 4 videos at a time

    // 8 videos from your screenshots
    const allVideos = [
        // First 4 Videos
        {
            id: 801,
            videoThumbnail: VideoFrame,
            videoUrl: "https://advertising.walmart.com/dam/assets/f5412e0b-91ae-49fc-b873-b5605fa0c079/2/jobs/4eee509b-e8fe-47ca-90e9-3c38bef051e7/720x1280_PROGRESSIVE-5000_30_720x1280.mp4",
            username: "@mariasabel_cct",
            productImage: "https://i5.walmartimages.com/asr/d57a4137-845a-452b-b1b8-9b6ca14ec790.0ca113846efba69ece8d7ec1ddbed076.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            productPrice: "9.97",
            productTitle: "HASK Soothe + Tea Tree Oil Scalp Care Shampoo",
            productId: 8011
        },
        {
            id: 802,
            videoThumbnail: VideoFrame,
            videoUrl: "https://advertising.walmart.com/dam/assets/416294ab-bbbe-4572-a0a7-61398fcf7bb2/1/jobs/f281bd04-90b4-4d35-ab2a-cc597419d2ae/432x768_PROGRESSIVE-2500_30_432x768.mp4",
            username: "@_monhay_",
            productImage: "https://i5.walmartimages.com/asr/3324f791-44fc-4120-839b-43173f350645.f9b9eade6895f25a24d17f30089bd4b1.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            productPrice: "20.00",
            productTitle: "Neutrogena Hair Restore Strength + Purity Shampoo",
            productId: 8021
        },
        {
            id: 803,
            videoThumbnail: VideoFrame,
            videoUrl: "https://advertising.walmart.com/dam/assets/137c80fc-cb01-4fea-a755-94b47d12cf67/1/jobs/56426162-6810-40d6-9949-f3ad753f1b93/720x1280_PROGRESSIVE-5000_30_720x1280.mp4",
            username: "@afcmama",
            productImage: "https://i5.walmartimages.com/seo/e-l-f-Cosmetics-Eyeshadow-Palette-Nude-Rose-Gold_25c5d4f2-b75c-4dc8-9920-75a9e60e3856_1.e915cdefa1d955fd4269bc61e67a43ea.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            productPrice: "11.00",
            productTitle: "e.l.f. Perfect 10 Eyeshadow Palette, Nude Rose Gold",
            productId: 8031
        },
        {
            id: 804,
            videoThumbnail: VideoFrame,
            videoUrl: "https://advertising.walmart.com/dam/assets/7ee4b645-7b8b-4318-bec9-0b8067c04247/2/jobs/3dfec61c-527b-4a71-85d2-00d0ec862783/720x1280_PROGRESSIVE-5000_30_720x1280.mp4",
            username: "@https://www.insta...",
            productImage: "https://i5.walmartimages.com/seo/RESIN-Extra-Deep-Coaster-Resin-Molds-Silicone-Large-6-Cavity-Silicone-Molds-Resin-Round-Silicone-Coaster-Molds-Epoxy-Resin-Cups-Mats-DIY-Craft_2aadbd2e-75fb-4080-9cdc-0e2563f247e6.aeeccafc1fcfc8ad161d94e4e4db0f2e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            productPrice: "18.99",
            productTitle: "LET'S RESIN Extra Deep Coaster Resin Molds Silicone...",
            productId: 8041
        },
        // Next 4 Videos
        {
            id: 805,
            videoThumbnail: VideoFrame,
            videoUrl: "https://advertising.walmart.com/dam/assets/c63e928c-dfa1-4ec3-bbb7-37f75e5cf949/1/jobs/16be9479-69ae-419b-a3cc-b84894d351b6/720x1280_PROGRESSIVE-5000_30_720x1280.mp4",
            username: "@haskhair",
            productImage: "https://i5.walmartimages.com/seo/2-Pack-9-inch-Rotating-Lazy-Susan-Organizer-LAMU-Turntable-Non-Skid-Rack-for-Kitchen-Fridge-Bathroom-Vanity-Countertop-Makeup-Organizing-Clear_b5b63721-1eed-45e2-a017-b8be5a592f35.038c4c21a405d9c796d7d3fccd8a2e53.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFFE",
            productPrice: "13.99",
            productTitle: "2 Pack 9 inch Rotating Lazy Susan Organizer,LAMU...",
            productId: 8051
        },
        {
            id: 806,
            videoThumbnail:VideoFrame,
            videoUrl: "https://advertising.walmart.com/dam/assets/e4670132-8843-4320-b402-69ab5aac7e21/2/jobs/fc3c9b5b-2292-447a-886a-0dbb856246d3/720x1280_PROGRESSIVE-5000_30_720x1280.mp4",
            username: "@Shuang Yu",
            productImage: "https://i5.walmartimages.com/seo/FIFINE-Open-Back-Gaming-Headset-with-Microphone-USB-Wired-Big-Over-Ear-Headset-for-PC-PS5-7-1-Surround-Sound-EQ-Modes-RGB-Lighting-Switch_91fdc490-0f84-41d8-a916-9e871c0a2568.df056ac5d2fc45f9862b3d880b0dbd5d.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            productPrice: "32.97",
            productTitle: "OATHX Kids Drum Set, Musical Instruments for...",
            productId: 8061
        },
        {
            id: 807,
            videoThumbnail: VideoFrame,
            videoUrl: "https://advertising.walmart.com/dam/assets/ebaef5b3-1090-421a-8dbd-b0448c498680/1/jobs/49846167-69b7-43f7-8074-e4406e4f4d90/432x768_PROGRESSIVE-2500_30_432x768.mp4",
            username: "@walmartcreator",
            productImage: "https://i5.walmartimages.com/seo/Garnier-Micellar-Cleansing-Water-Waterproof-Adult-100-ml_91fb0835-0f17-4cad-a08d-a72dca4da929.09c21f0b3f2161677c88180a90dff164.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
            productPrice: "18.74",
            productTitle: "Better Homes & Gardens 3-Piece Natural Woven Water Bottle",
            productId: 8071
        },
        {
            id: 808,
            videoThumbnail: VideoFrame,
            videoUrl: "https://advertising.walmart.com/dam/assets/5cc704b4-b5a8-4d93-bfec-d60837a46856/1/jobs/a528965d-167b-49db-9a58-c1972a4ba10c/720x1280_PROGRESSIVE-5000_30_720x1280.mp4",
            username: "@letsresin",
            productImage: "https://i5.walmartimages.com/seo/Owala-FreeSip-SS-24oz-Pink_4da363b7-67b2-448e-85d4-960edff86ab7.61f4d943e0c8b679b8f5e5a93e0756d5.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            productPrice: "29.97",
            productTitle: "Owala FreeSip Stainless Steel Water Bottle, 240z,Sugar Spice Pink",
            productId: 8081
        }
    ];

    const totalSlides = Math.ceil(allVideos.length / itemsPerView);
    const maxIndex = totalSlides - 1;

    const startIndex = currentSlide * itemsPerView;
    const visibleVideos = allVideos.slice(startIndex, startIndex + itemsPerView);

    const nextSlide = () => {
        if (currentSlide < maxIndex) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="max-w-[1400px] mx-auto px-5 py-8">
            {/* Header - LEFT ALIGNED */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Featured in videos</h2>
                <p className="text-gray-600 mt-1">See what creators are sharing</p>
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* 4 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleVideos.map((video) => (
                        <VideoCard
                            key={video.id}
                            videoThumbnail={video.videoThumbnail}
                            videoUrl={video.videoUrl}
                            username={video.username}
                            productImage={video.productImage}
                            productPrice={video.productPrice}
                            productTitle={video.productTitle}
                            productId={video.productId}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                {allVideos.length > itemsPerView && (
                    <>
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className={`absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <span className="text-xl">❮</span>
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === maxIndex}
                            className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition-all z-10 ${currentSlide === maxIndex ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <span className="text-xl">❯</span>
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {/* {totalSlides > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                                        ? "bg-blue-600 w-6"
                                        : "bg-gray-300 w-2 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default FeaturedVideosSection;