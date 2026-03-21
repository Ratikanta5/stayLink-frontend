import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiPhone,
  FiTarget,
  FiZap,
  FiDollarSign,
  FiHome,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const Trust = () => {
  const navigate = useNavigate();
  const trustPoints = [
    {
      title: "Verified Property Details",
      desc: "Complete and clear info including rent, deposit, and rules.",
      icon: <FiCheckCircle />,
    },
    {
      title: "Direct Owner Connection",
      desc: "No brokers. Connect directly with property owners.",
      icon: <FiPhone />,
    },
    {
      title: "Smart Matching System",
      desc: "Find rooms based on your budget, location, and preferences.",
      icon: <FiTarget />,
    },
    {
      title: "No Time Wastage",
      desc: "Post once and get multiple responses quickly.",
      icon: <FiZap />,
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden charges. Clear breakdown of all costs.",
      icon: <FiDollarSign />,
    },
    {
      title: "Real-Time Availability",
      desc: "Active listings to avoid already occupied rooms.",
      icon: <FiHome />,
    },
    {
      title: "Safe & Reliable Platform",
      desc: "Your data is secure and protected at all times.",
      icon: <FiShield />,
    },
    {
      title: "Built for Students & Professionals",
      desc: "Designed for people relocating to new cities.",
      icon: <FiUsers />,
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose StayLink?
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Everything is designed to save your time, reduce confusion, and make
            finding a place simple and reliable.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((item, index) => (
            <div
              key={index}
              className="group border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300 bg-gray-50"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/listings")}
            className="bg-[#0f2a3d] text-white px-8 py-3 rounded-full text-sm hover:bg-[#0c2232] transition shadow-md"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trust;
