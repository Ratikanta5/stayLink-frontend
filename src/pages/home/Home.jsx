import React from "react";
import Hero from "../../components/homePage/Hero";
import Trust from "../../components/homePage/Trust";
import FeaturedListings from "../../components/homePage/FeaturedListings";
import HowItWorks from "../../components/homePage/HowItWorks";
import CTA from "../../components/homePage/CTA";
import Testimonials from "../../components/homePage/Testimonials";
import SEO from "../../components/seo/SEO";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero (NO padding here) */}
      <Hero />
      
      <SEO
        title="Affordable Rooms in Mumbai | Find PG & Flats"
        description="Explore verified rooms, PGs, and flats in Mumbai. Filter by price, location, and amenities."
        keywords="rooms in mumbai, pg in mumbai, flats in bandra"
      />

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
