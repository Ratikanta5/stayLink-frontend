import React, { useState, useMemo } from "react";
import { useRooms } from "../../contexts/roomContext/RoomContext";
import { useLocation } from "../../contexts/locationContext/LocationContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SkeletonListing from "./SkeletonListing";

// 🔥 Icons
import { FiMapPin } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";

const ListingsPage = () => {
  const { rooms, loading } = useRooms();
  const { location } = useLocation();
  const navigate = useNavigate();

  const [showNearby, setShowNearby] = useState(false);

  // 🔴 Haversine formula
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 🔥 Nearby filter
  const nearbyRooms = useMemo(() => {
    if (!location?.lat || !location?.lng) return [];

    return rooms.filter((room) => {
      const distance = getDistance(
        location.lat,
        location.lng,
        room.location.lat,
        room.location.lng,
      );
      return distance <= 5;
    });
  }, [rooms, location]);

  const displayedRooms = showNearby ? nearbyRooms : rooms;

  return (
    <div className="p-4 sm:p-6 pt-24 max-w-7xl mx-auto">
      {/* 🔥 HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Discover rooms near your location or explore all listings
          </p>
        </div>

        <button
          onClick={() => setShowNearby(!showNearby)}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium transition-all duration-200 
          ${
            showNearby
              ? "bg-gray-200 text-black hover:bg-gray-300"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {showNearby ? "Showing Nearby Rooms (5km)" : "Find Rooms Near Me"}
        </button>
      </div>

      {/* ⚠️ ERROR */}
      {showNearby && (!location?.lat || !location?.lng) && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded mb-6 text-sm">
          Location not available. Please enable location access.
        </div>
      )}

      {/* 🔥 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <SkeletonListing count={6} />
        ) : displayedRooms.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No rooms found in your selected range.
          </div>
        ) : (
          displayedRooms.map((room) => (
            <div
              key={room._id}
              onClick={() => navigate(`/room/${room._id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer group"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={room.media.images[0]}
                  alt={room.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                />

                {/* VERIFIED BADGE */}
                {room.verified && (
                  <span className="absolute top-2 left-2 bg-white text-green-600 text-xs px-2 py-1 rounded flex items-center gap-1 shadow">
                    <FaCheckCircle className="text-green-500" />
                    Verified
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {room.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <FiMapPin />
                  {room.location.area}
                </p>

                <p className="text-lg font-bold mt-3 text-black">
                  ₹{room.rentDetails.monthlyRent}
                </p>

                {/* 🔥 ACTIONS */}
                <div className="mt-4 flex gap-2">
                  {/* VIEW DETAILS */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/room/${room._id}`);
                    }}
                    className="flex-1 bg-black text-white py-2 rounded-md text-sm flex items-center justify-center gap-1 hover:bg-gray-800"
                  >
                    <MdOutlineRemoveRedEye />
                    View
                  </button>

                  {/* REQUEST CONTACT */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success(`Request sent to ${room.owner?.name}`);
                    }}
                    className="flex-1 border border-black text-black py-2 rounded-md text-sm flex items-center justify-center gap-1 hover:bg-gray-100"
                  >
                    <IoCallOutline />
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListingsPage;
