import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0f2a3d] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Find Your Perfect Stay Without the Hassle
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Skip brokers, save time, and connect directly with property owners.
          Start exploring verified listings or post your requirement today.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary CTA */}
          <button
            onClick={() => navigate("/listings")}
            className="bg-white text-[#0f2a3d] px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Explore Listings
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => navigate("/post-requirement")}
            className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0f2a3d] transition"
          >
            Post Requirement
          </button>
        </div>

        {/* Trust line */}
        <p className="text-sm text-gray-400 mt-8">
          No brokers • No hidden charges • Fast responses
        </p>
      </div>
    </section>
  );
};

export default CTA;
