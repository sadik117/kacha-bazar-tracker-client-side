import React from "react";
import Banner from "./Banner";
import ProductSection from "./ProductSection";
import { Helmet } from "react-helmet-async";
import AdsCarousel from "./AdsCarouselSection";
import AppStatsSection from "./AppStatsSection";
import Pricing from "./Pricing";
import ReviewSection from "./ReviewSection";
import NewsletterSection from "./NewsLetterSection";
import WhyChooseUsSection from "./WhyChooseUsSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>KachaBazar || Home</title>
      </Helmet>
      <Banner></Banner>
      <ProductSection></ProductSection>
      <AdsCarousel></AdsCarousel>
      <ReviewSection></ReviewSection>
      <Pricing></Pricing>
      <WhyChooseUsSection></WhyChooseUsSection>
      <AppStatsSection></AppStatsSection>
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
