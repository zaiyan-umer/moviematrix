import React from "react";
import YouTube from "react-youtube";

const TrailerPlayer = ({ trailerId, onClose }) => {
    if (!trailerId) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative max-w-3xl w-full p-4 bg-black rounded"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-4 max-sm:right-[20px] w-[20px] transition cursor-pointer"
                >
                    <img className="object-cover" src="../src/assets/close.png" alt="" />
                </button>

                <YouTube
                    videoId={trailerId}
                    opts={{
                        height: "390",
                        width: "100%",
                        playerVars: {
                            autoplay: 1,
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default TrailerPlayer;
