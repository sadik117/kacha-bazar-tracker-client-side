import React from "react";
import Banner from "./Banner";
import ProductSection from "./ProductSection";
import { Helmet } from "react-helmet-async";
import AdsCarousel from "./AdsCarousel";
import AppStatsSection from "./AppStatsSection";
import Pricing from "./Pricing";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>KachaBazar || Home</title>
      </Helmet>
      <Banner></Banner>
      <ProductSection></ProductSection>
      <AdsCarousel></AdsCarousel>
      <Pricing></Pricing>
      <AppStatsSection></AppStatsSection>
    </div>
  );
};

export default Home;
