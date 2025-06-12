import React from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedEvents from "../../components/FeaturedEvents/FeaturedEvents";

const Home = () => {
  return (
    <div>
      <Banner />
      <section className="max-w-7xl mx-auto">
        <FeaturedEvents />
      </section>
    </div>
  );
};

export default Home;
