import { useState } from "react";
import MachineryCard from "./MachineryCard";
import BookingModal from "./BookingModal";
import tractorImg from "@/assets/tractor.png";
import harvesterImg from "@/assets/harvester.png";
import rotavatorImg from "@/assets/rotavator.png";
import { Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MachineryResultsProps {
  location: { state: string; crop: string; soil: string } | null;
}

const machineryData = [
  {
    id: 1,
    name: "Mahindra Arjun 605",
    nameHindi: "महिंद्रा अर्जुन 605 ट्रैक्टर",
    image: tractorImg,
    category: "Tractor",
    rating: 4.8,
    price: "₹800/hr",
    specs: {
      power: "55 HP Engine",
      fuelType: "Diesel",
      suitableFor: "All Soil Types",
    },
    isRecommended: true,
  },
  {
    id: 2,
    name: "John Deere Harvester",
    nameHindi: "जॉन डीयर हार्वेस्टर",
    image: harvesterImg,
    category: "Harvester",
    rating: 4.6,
    price: "₹2,500/hr",
    specs: {
      power: "120 HP Engine",
      fuelType: "Diesel",
      suitableFor: "Wheat, Rice, Sugarcane",
    },
    isRecommended: false,
  },
  {
    id: 3,
    name: "Heavy Duty Rotavator",
    nameHindi: "हेवी ड्यूटी रोटावेटर",
    image: rotavatorImg,
    category: "Tillage",
    rating: 4.5,
    price: "₹400/hr",
    specs: {
      power: "Works with 35+ HP",
      fuelType: "Tractor Attached",
      suitableFor: "Soil Preparation",
    },
    isRecommended: false,
  },
];

const MachineryResults = ({ location }: MachineryResultsProps) => {
  const [selectedMachinery, setSelectedMachinery] = useState<typeof machineryData[0] | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBook = (machinery: typeof machineryData[0]) => {
    setSelectedMachinery(machinery);
    setIsBookingOpen(true);
  };

  if (!location) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent-foreground">AI Recommendations</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Recommended for Your Farm
            </h2>
            <p className="text-muted-foreground">
              Based on <span className="font-medium text-foreground">{location.state}</span>,{" "}
              <span className="font-medium text-foreground">{location.crop}</span>, and{" "}
              <span className="font-medium text-foreground">{location.soil}</span>
            </p>
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
            Filter Results
          </Button>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machineryData.map((machinery, index) => (
            <div
              key={machinery.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MachineryCard
                {...machinery}
                onBook={() => handleBook(machinery)}
              />
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedMachinery && (
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            machinery={selectedMachinery}
          />
        )}
      </div>
    </section>
  );
};

export default MachineryResults;
