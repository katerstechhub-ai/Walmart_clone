import { useNavigate } from "react-router-dom";

function Card(props) {
    let navigate = useNavigate();

    function handleViewDetails() {
        navigate(`/properties/${props.id}`);
    }

    return (
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
            <div className="overflow-hidden relative">
                <img
                    src={props.image}
                    alt={props.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    For Sale
                </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold text-gray-800 leading-tight">{props.title}</h2>
                    <span className="text-base font-bold text-blue-600 whitespace-nowrap ml-2">{props.price}</span>
                </div>

                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                    <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {props.location}
                </p>

                <div className="flex gap-4 text-gray-500 text-sm mb-5 border-t border-gray-100 pt-4">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {props.beds} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        {props.baths} Baths
                    </span>
                </div>

                <button
                    onClick={handleViewDetails}
                    className="mt-auto bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

export default Card;