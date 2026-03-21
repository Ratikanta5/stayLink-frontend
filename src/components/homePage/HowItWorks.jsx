import React from "react";
import { FiMapPin, FiEdit3, FiTarget, FiPhoneCall } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Select Your Location",
      desc: "Choose your preferred city to explore available rooms tailored to your area.",
      icon: <FiMapPin />,
    },
    {
      step: "02",
      title: "Post Your Requirement",
      desc: "Tell us your budget, room type, and preferences in a few simple steps.",
      icon: <FiEdit3 />,
    },
    {
      step: "03",
      title: "Get Matched Listings",
      desc: "Receive relevant room options that match your needs instantly.",
      icon: <FiTarget />,
    },
    {
      step: "04",
      title: "Connect with Owners",
      desc: "Directly contact property owners without brokers or hidden fees.",
      icon: <FiPhoneCall />,
    },
  ];

  return (
    <section className="bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How StayLink Works
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Find your perfect stay in just a few simple steps. No confusion, no
            middlemen.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-4 bg-[#0f2a3d] text-white text-xs px-3 py-1 rounded-full">
                Step {item.step}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4 mt-4">{item.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* if no user loged in then redirect to login if loggedin don't show button */}
        <div className="text-center mt-16">
          <button className="bg-[#0f2a3d] text-white px-8 py-3 rounded-full text-sm hover:bg-[#0c2232] transition shadow-md">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
