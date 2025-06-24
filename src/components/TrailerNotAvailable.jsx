const TrailerNotAvailable = (props) => {
    const {setNoTrailerFor, noTrailerFor} = props;
    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            onClick={() => setNoTrailerFor(null)}
        >
            <div
                className="bg-gray-900 text-white p-6 rounded-xl shadow-xl max-w-sm text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold text-red-400 mb-2">Trailer Not Available</h2>
                <p className="text-sm">
                    Sorry, we couldn't find a trailer for <br /><span className="font-semibold text-white">"{noTrailerFor}"</span>
                </p>
                <button
                    className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                    onClick={() => setNoTrailerFor(null)}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default TrailerNotAvailable