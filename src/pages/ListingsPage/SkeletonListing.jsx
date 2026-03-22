import React from "react";

const SkeletonListing = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
        >
          {/* Image */}
          <div className="w-full h-44 bg-gray-200" />

          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-4 bg-gray-200 rounded w-3/4" />

            {/* Location */}
            <div className="h-3 bg-gray-200 rounded w-1/2" />

            {/* Price + badge */}
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-5 bg-gray-200 rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonListing;