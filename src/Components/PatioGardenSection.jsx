import React from 'react';
import Card5 from './Card5';

const PatioGardenSection = () => {
    // 6 products from your screenshot exactly
    const products = [
        {
            id: 501,
            image: "https://i5.walmartimages.com/seo/IronMax-13Amp-Corded-Scarifier-15-Electric-Lawn-Dethatcher-w-50L-Collection-Bag-Orange_61b77659-f14b-4a77-8b39-a7d6feebe077.f849321e58f5f2e9a7112f06baa2c35a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "IronMax 13Amp Corded Scarifier 15\" Electric Lawn...",
            price: "129.99",
            originalPrice: "209.00",
            buttonText: "Options"
        },
        {
            id: 502,
            image: "https://i5.walmartimages.com/seo/Ktaxon-10-x10-Ez-Pop-Up-Wedding-Party-Tent-Folding-W-Sides-Carry-Bag_c1d63165-e640-49ba-98d7-22a85479d559.e7eef1e228fa180e06540020998d9be4.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Ktaxon 10x10 Ez Pop Up Canopy Tent, Outdoor Sun...",
            price: "109.99",
            originalPrice: "129.99",
            buttonText: "Options"
        },
        {
            id: 503,
            image: "https://i5.walmartimages.com/seo/Costway-3pcs-Patio-Acacia-Wood-Bistro-Table-Rocking-Chair-Set-All-Weather-Rope-Outdoor_038a53ef-54cf-4ac9-be33-73863fc4b4fb.25eddf448bcecbf77ff23fe5bea83047.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Costway 3pcs Patio Acacia Wood Bistro Table Rockin...",
            price: "214.99",
            originalPrice: "369.00",
            buttonText: "Options"
        },
        {
            id: 504,
            image: "https://i5.walmartimages.com/seo/Gymax-Patio-Garden-Acacia-Wood-Bench-Dining-Bench-w-Slatted-Seat-Indonesia-Teak_9c04cf23-fb19-4821-b979-d53448e6fdf0.6ba3ebf6e09f31bc97690803276dbdf2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Gymax Patio Garden Acacia Wood Bench Dining Ben...",
            price: "95.99",
            originalPrice: "153.99",
            buttonText: "Options"
        },
        {
            id: 505,
            image: "https://i5.walmartimages.com/seo/Gymax-Patio-Outdoor-Chaise-Lounge-Chair-Recliner-w-Adjustable-Backrest-Brown_6cc21fe6-5e54-43d9-b531-bf42baca398d.654817a91160973e0f72dc588f93313e.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Gymax Patio Outdoor Chaise Lounge Chair...",
            price: "87.65",
            originalPrice: "119.99",
            buttonText: "Options"
        },
        {
            id: 506,
            image: "https://i5.walmartimages.com/seo/Costway-79-Acacia-Wood-Patio-Table-8-Person-Outdoor-Dining-Table-with-Umbrella-Hole_0ccc47e8-18ad-4575-b84f-7758b72d6b75.193293233d70dfaf2803d8aa82535350.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            title: "Costway 79\" Acacia Wood Patio Table 8-Person...",
            price: "189.99",
            originalPrice: "319.00",
            buttonText: "Options"
        }
    ];

    return (
        <div className="max-w-[1400px] mx-auto px-5 mb-6 py-8">
            {/* Header with Title and View All Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Save on patio & garden</h2>
            </div>

            {/* Products Grid - 6 columns on desktop like Discover Great Brands */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {products.map((product) => (
                    <Card5
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        buttonText={product.buttonText}
                    />
                ))}
            </div>
        </div>
    );
};

export default PatioGardenSection;