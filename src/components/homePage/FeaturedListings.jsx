import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRooms } from "../../contexts/roomContext/RoomContext";
import { useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";

const FeaturedListings = () => {
  const { rooms, loading } = useRooms();
  const navigate = useNavigate();

  const scrollRef = useRef();
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // ✅ Stable random 10 rooms (NO reshuffle every render)
  const featuredRooms = useMemo(() => {
    if (!rooms || rooms.length === 0) return [];

    const shuffled = [...rooms];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 10);
  }, [rooms]);

  // ✅ Detect user scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeout;

    const handleScroll = () => {
      setIsUserScrolling(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 1500);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ✅ Auto scroll (does NOT fight user, does NOT jump to start)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isUserScrolling) return;

      // stop at end (no snap-back)
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        return;
      }

      container.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isUserScrolling]);

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
            {featuredRooms.map((room) => (
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

                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FiMapPin className="text-gray-400" />
                    {room.city}
                  </p>

                  <p className="font-bold mt-2 text-[#0f2a3d]">
                    ₹{room.price}/month
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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
