import { Suspense } from "react";
import FeatureCards from "@/components/home/FeatureCards";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import HeroSection from "@/components/home/HeroSection";
import CtaBanner from "@/components/home/CtaBanner";
import FeaturedProductsFallback from "@/components/home/FeaturedProductsFallback";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <Suspense fallback={<FeaturedProductsFallback />}>
        <FeaturedProductsSection />
      </Suspense>
      <CtaBanner />
    </>
  );
};

export default Home;
