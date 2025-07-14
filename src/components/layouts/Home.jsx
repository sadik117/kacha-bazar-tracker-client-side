import React from "react";
import Banner from "./Banner";
import ProductSection from "./ProductSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>KachaBazar || Home</title>
      </Helmet>
      <Banner></Banner>
      <ProductSection></ProductSection>
    </div>
  );
};

export default Home;
