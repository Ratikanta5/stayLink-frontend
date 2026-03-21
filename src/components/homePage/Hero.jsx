import { useEffect, useState } from "react";

const images = [
  "/images/rooms/living-room1.webp",
  "/images/rooms/living-room2.webp",
  "/images/rooms/living-room3.webp",
  "/images/rooms/living-room4.webp",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // preload
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Images */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt="room"
          loading={index === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
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
          city.
        </p>
      </div>
    </section>
  );
};

export default Hero;
