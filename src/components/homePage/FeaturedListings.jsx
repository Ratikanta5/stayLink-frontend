import React, { useEffect, useRef } from "react";
import { useRooms } from "../../contexts/roomContext/RoomContext";
import { useNavigate } from "react-router-dom";

const FeaturedListings = () => {
  const { rooms, loading } = useRooms();
  const navigate = useNavigate();

  const scrollRef = useRef();

  // 🔥 AUTO SCROLL
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({
        left: 300,
        behavior: "smooth",
      });

      // loop back to start
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-10">
          Featured Listings
        </h1>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500">Loading rooms...</p>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth"
          >
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => navigate(`/room/${room.id}`)}
                className="min-w-[280px] bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              >
                {/* Image */}
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{room.title}</h3>

                  <p className="text-sm text-gray-500">📍 {room.city}</p>

                  <p className="font-bold mt-2 text-[#0f2a3d]">
                    ₹{room.price}/month
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent double navigation
                      navigate(`/room/${room.id}`);
                    }}
                    className="mt-3 w-full bg-[#0f2a3d] text-white py-2 rounded-lg hover:bg-[#0c2232]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
