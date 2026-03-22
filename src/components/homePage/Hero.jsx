import { useEffect, useState } from "react";
import room1 from "../../assets/living-rooms/living-room1.jpg";
import room2 from "../../assets/living-rooms/living-room2.jpg";
import room3 from "../../assets/living-rooms/living-room3.jpg";
import room4 from "../../assets/living-rooms/living-room4.jpg";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [room1, room2, room3, room4];

  useEffect(() => {
    // 🔥 Preload all images (fix flicker)
    images.forEach((img) => {
      const image = new Image();
      image.src = img;
    });

    // 🔥 Auto slide
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 🔥 Layered Images (NO backgroundImage switching) */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`room-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            loading="eager"
          />
        ))}
      </div>

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
          city. Move in anytime.
        </p>
      </div>
    </section>
  );
};

export default Hero;