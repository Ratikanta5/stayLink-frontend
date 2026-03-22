import React from "react";

const RoomDetailsSkeleton = () => {
  return (
    <section className="min-h-screen px-6 py-16 bg-gray-50 animate-pulse">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Image Skeleton */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>
          <div className="flex gap-3 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[80px] h-[60px] bg-gray-300 rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="h-6 bg-gray-300 w-2/3 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
          <div className="h-6 bg-gray-300 w-1/4 rounded"></div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>

          <div className="h-10 bg-gray-300 rounded mt-6"></div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetailsSkeleton;
