import { useEffect, useState } from "react";
import room1 from "../../assets/living-rooms/living-room1.jpg";
import room2 from "../../assets/living-rooms/living-room2.jpg";
import room3 from "../../assets/living-rooms/living-room3.jpg";
import room4 from "../../assets/living-rooms/living-room4.jpg";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [room1, room2, room3, room4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 sec

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative w-full h-screen">
      {/* Full Width Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      />

      {/* Strong Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <p className="text-teal-300 tracking-[3px] text-sm mb-4">
          PREMIUM ROOM RENTALS
        </p>

        <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight">
          <span className="text-teal-400">Find Your Perfect</span> <br />
          Room to Rent
        </h1>

        <p className="text-gray-200 mt-6 text-lg md:text-xl max-w-2xl">
          Discover cozy, affordable, and fully-furnished rooms in your favorite
          city. Move in anytime.
        </p>
      </div>

      {/* Floating Search Box */}
      {/* <div className="absolute bottom-[-50px] w-full flex justify-center px-4 z-20">
        <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-4 w-full max-w-4xl">
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-500 mb-1">City</label>
            <select className="border rounded-lg px-3 py-2 focus:outline-none">
              <option>Select city</option>
              <option>Mumbai</option>
              <option>Delhi</option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-500 mb-1">Move-in Date</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button className="bg-[#0f2a3d] text-white px-6 py-2 rounded-lg hover:bg-[#0c2232] transition">
              Search
            </button>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
