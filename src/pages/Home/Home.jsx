import React from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";
import { Testimonial } from "../../components/Testimonial/Testimonial";
import { PopularSports } from "../../components/PopularSports/PopularSports";
import PageTitle from "../../utils/PageTitle/PageTitle";
import OurFeatures from "../../components/OurFeatures/OurFeatures";

const Home = () => {
  return (
    <div>
      <PageTitle title="Home" />
      <Banner />
      <OurFeatures />
      <section className="max-w-7xl mx-auto">
        <FeaturedEvents />
        <PopularSports />
        <Testimonial />
      </section>
    </div>
  );
};

export default Home;
