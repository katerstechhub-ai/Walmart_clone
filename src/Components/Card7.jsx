import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Card7 = ({ image, username, products, id }) => {
    const [activeDot, setActiveDot] = useState(0);

    return (
        <div className="relative rounded-lg overflow-hidden group cursor-pointer">
            {/* Background Image */}
            <div
                className="relative bg-cover bg-center min-h-[400px]"
                style={{ backgroundImage: `url(${image})` }}
            >
                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0 bg-opacity-30"></div>

                {/* Username - Bottom Left on Image */}
                <div className="absolute bottom-4 left-4 z-10">
                    <p className="text-white text-sm font-medium">{username}</p>
                </div>

                {/* White Dots - Bottom Center on Image */}
                {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            onMouseEnter={() => setActiveDot(index)}
                            onMouseLeave={() => setActiveDot(0)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeDot === index ? 'bg-white scale-125' : 'bg-white/60'
                                }`}
                        />
                    ))}
                </div> */}

                {/* Black Info Box - Shows on dot hover */}
                {products.map((product, index) => (
                    <div
                        key={index}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-85 text-white p-2 rounded-lg transition-all duration-300 z-20 w-[40%] ${activeDot === index ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    >
                        <p className="text-xs font-semibold">{product.title}</p>
                        <p className="text-xs font-bold mt-1">${product.price}</p>
                        <Link to={`/product/${product.id}`} className="text-xs text-blue-300 underline mt-1 inline-block">
                            Shop now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card7;