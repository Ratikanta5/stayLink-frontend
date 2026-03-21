import React from "react";
import Hero from "../../components/homePage/Hero";
import Trust from "../../components/homePage/Trust";
import FeaturedListings from "../../components/homePage/FeaturedListings";
import HowItWorks from "../../components/homePage/HowItWorks";
import CTA from "../../components/homePage/CTA";
import Testimonials from "../../components/homePage/Testimonials";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero (NO padding here) */}
      <Hero />

      {/* Rest sections */}
      <section className="mt-12 flex flex-col gap-12">
        <Trust />
        <FeaturedListings />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </section>
    </div>
  );
};

export default Home;
