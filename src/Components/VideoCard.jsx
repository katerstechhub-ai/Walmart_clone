import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ videoThumbnail, username, productImage, productPrice, productTitle, productId, videoUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 ">
            {/* Video Container */}
            <div className="relative">
                <video
                    src={videoUrl}
                    poster={videoThumbnail}
                    className="w-full h-120 object-cover"
                    controls={isPlaying}
                    onEnded={() => setIsPlaying(false)}
                    id={`video-${productId}`}
                />

                {/* Play button - transparent, smaller, positioned at bottom right near volume/CC */}
                {!isPlaying && (
                    <button
                        onClick={() => {
                            setIsPlaying(true);
                            document.getElementById(`video-${productId}`).play();
                        }}
                        className="absolute bottom-12 right-12 bg-black bg-opacity-40 rounded-full p-1.5 hover:bg-opacity-60 transition-all"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                )}

               

                {/* Username - ON THE IMAGE (bottom left) */}
                <div className="absolute bottom-2 left-2">
                    <p className="text-xs text-white  bg-opacity-40 px-2 py-0.5 rounded">{username}</p>
                </div>
            </div>

            {/* Product Info - below video */}
            <div className="flex items-center gap-3 p-3 pt-3 border-t border-gray-100">
                <Link to={`/product/${productId}`} className="flex-shrink-0">
                    <img
                        src={productImage}
                        alt={productTitle}
                        className="w-12 h-12 object-cover rounded"
                    />
                </Link>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black">${productPrice}</p>
                    <p className="text-xs text-gray-600 truncate">{productTitle}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;