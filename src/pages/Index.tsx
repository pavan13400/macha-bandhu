import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LocationSelector from "@/components/LocationSelector";
import MachineryResults from "@/components/MachineryResults";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    state: string;
    crop: string;
    soil: string;
  } | null>(null);

  const handleLocationSelect = (data: { state: string; crop: string; soil: string }) => {
    setSelectedLocation(data);
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LocationSelector onLocationSelect={handleLocationSelect} />
        <div id="results">
          <MachineryResults location={selectedLocation} />
        </div>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
