import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRooms } from "../../contexts/roomContext/RoomContext";
import { FiMapPin, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import RoomDetailsSkeleton from "./RoomDetailsSkeleton";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, loading } = useRooms();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const room = rooms.find((r) => r._id === id);

  // ✅ Smooth skeleton delay
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const mediaItems = [
    ...(room?.media?.images || []),
    ...(room?.media?.video ? [room.media.video] : []),
  ];

  const isVideoIndex = (index) =>
    room?.media?.video && index === mediaItems.length - 1;

  const handleContactRequest = () => {
    toast.success(`Request sent to ${room.owner?.name}`);
  };

  // 🔥 Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      setActiveIndex((prev) =>
        prev < mediaItems.length - 1 ? prev + 1 : prev,
      );
    } else if (diff < -50) {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  // ✅ Skeleton UI
  if (loading || showSkeleton) {
    return <RoomDetailsSkeleton />;
  }

  if (!room) {
    return <p className="text-center mt-10">Room not found</p>;
  }

  return (
    <section className="min-h-screen px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* MEDIA */}
        <div className="bg-white rounded-xl shadow p-4">
          {/* Main */}
          <div
            className="w-full h-[400px] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isVideoIndex(activeIndex) ? (
              <video
                src={mediaItems[activeIndex]}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={mediaItems[activeIndex]}
                loading="lazy"
                alt="room"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`min-w-[80px] h-[60px] rounded-md overflow-hidden cursor-pointer border-2 ${
                  activeIndex === index
                    ? "border-[#0f2a3d]"
                    : "border-transparent"
                }`}
              >
                {isVideoIndex(index) ? (
                  <video src={item} className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={item}
                    loading="lazy"
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">{room.title}</h1>

            <p className="text-gray-500 mt-2 flex items-center gap-2">
              <FiMapPin />
              {room.location?.area}
            </p>

            <p className="text-2xl font-bold mt-4 text-[#0f2a3d]">
              ₹{room.rentDetails?.monthlyRent}/month
            </p>

            <p className="mt-4 text-gray-600">{room.description}</p>

            <hr className="my-6" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Property:</strong> {room.propertyType}
              </p>
              <p>
                <strong>Room:</strong> {room.roomType}
              </p>
              <p>
                <strong>Tenant:</strong> {room.preferredTenant?.tenantType}
              </p>
              <p>
                <strong>Gender:</strong>{" "}
                {room.preferredTenant?.genderPreference}
              </p>
              <p>
                <strong>Deposit:</strong> ₹{room.rentDetails?.securityDeposit}
              </p>
              <p>
                <strong>Maintenance:</strong> ₹
                {room.rentDetails?.maintenanceCharge}
              </p>
            </div>
          </div>

          {/* Owner + CTA */}
          <div className="mt-6 border-t pt-4">
            <p className="text-gray-600 text-sm">Owner</p>
            <p className="font-semibold">{room.owner?.name}</p>

            <button
              onClick={handleContactRequest}
              className="mt-4 w-full bg-[#0f2a3d] text-white py-3 rounded-lg hover:bg-[#0c2232]"
            >
              Request Contact
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-5 right-5 text-white text-2xl"
          >
            <FiX />
          </button>

          <div
            className="w-full max-w-4xl px-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isVideoIndex(activeIndex) ? (
              <video
                src={mediaItems[activeIndex]}
                controls
                className="w-full max-h-[80vh] object-contain"
              />
            ) : (
              <img
                src={mediaItems[activeIndex]}
                alt="fullscreen"
                className="w-full max-h-[80vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomDetails;
