import React from "react";
import { useParams } from "react-router-dom";
import { useRooms } from "../../contexts/roomContext/RoomContext";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms } = useRooms();

  const room = rooms.find((r) => r.id === Number(id));

  if (!room) {
    return <p className="text-center mt-10">Room not found</p>;
  }

  return (
    <section className="min-h-screen px-6 py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-80 object-cover rounded-lg"
        />

        <h1 className="text-2xl font-bold mt-6">{room.title}</h1>

        <p className="text-gray-500 mt-2">📍 {room.city}</p>

        <p className="text-xl font-semibold text-[#0f2a3d] mt-4">
          ₹{room.price}/month
        </p>

        <p className="mt-4 text-gray-600">
          Full room details will go here. Add amenities, rules, images, etc.
        </p>

        <button className="mt-6 bg-[#0f2a3d] text-white px-6 py-3 rounded-lg">
          Contact Owner
        </button>
      </div>
    </section>
  );
};

export default RoomDetails;