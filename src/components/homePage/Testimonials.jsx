import React from "react";
import { useTestimonials } from "../../contexts/testimonialContext/TestimonialContext";
import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const { testimonials, loading } = useTestimonials();

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Users Say
          </h2>
          <p className="text-gray-600 mt-3">
            Real experiences from people who found their stay through StayLink.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500">Loading testimonials...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FiMapPin className="text-gray-400" />
                      <span>{item.city}</span>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  “{item.text}”
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < item.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
