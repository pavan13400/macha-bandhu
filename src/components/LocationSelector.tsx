import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown, Check, Search } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const crops = [
  { name: "Rice (धान)", icon: "🌾" },
  { name: "Wheat (गेहूं)", icon: "🌾" },
  { name: "Sugarcane (गन्ना)", icon: "🎋" },
  { name: "Cotton (कपास)", icon: "🌿" },
  { name: "Maize (मक्का)", icon: "🌽" },
  { name: "Pulses (दालें)", icon: "🫘" },
];

const soilTypes = [
  "Alluvial Soil (जलोढ़ मिट्टी)",
  "Black Soil (काली मिट्टी)", 
  "Red Soil (लाल मिट्टी)",
  "Laterite Soil (लेटेराइट मिट्टी)",
  "Sandy Soil (बलुई मिट्टी)",
];

interface LocationSelectorProps {
  onLocationSelect: (data: { state: string; crop: string; soil: string }) => void;
}

const LocationSelector = ({ onLocationSelect }: LocationSelectorProps) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStates = indianStates.filter(state => 
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (selectedState && selectedCrop && selectedSoil) {
      onLocationSelect({
        state: selectedState,
        crop: selectedCrop,
        soil: selectedSoil,
      });
    }
  };

  return (
    <section id="find" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Smart Selection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tell Us About Your Farm
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your location and farming details for personalized machinery recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8 shadow-elevated">
            <div className="grid md:grid-cols-1 gap-8">
              {/* State Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Select Your State (राज्य चुनें)
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsStateOpen(!isStateOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-border bg-background hover:border-primary/50 transition-colors text-left"
                  >
                    <span className={selectedState ? "text-foreground" : "text-muted-foreground"}>
                      {selectedState || "Choose a state..."}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isStateOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {isStateOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-card border border-border rounded-xl shadow-elevated overflow-hidden animate-scale-in">
                      <div className="p-2 border-b border-border">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search state..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredStates.map((state) => (
                          <button
                            key={state}
                            onClick={() => {
                              setSelectedState(state);
                              setIsStateOpen(false);
                              setSearchTerm("");
                            }}
                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted transition-colors text-left"
                          >
                            <span className="text-sm">{state}</span>
                            {selectedState === state && <Check className="w-4 h-4 text-primary" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Crop Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  🌾 Select Your Crop (फसल चुनें)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {crops.map((crop) => (
                    <button
                      key={crop.name}
                      onClick={() => setSelectedCrop(crop.name)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedCrop === crop.name
                          ? "border-primary bg-primary/10 shadow-soft"
                          : "border-border hover:border-primary/50 bg-background"
                      }`}
                    >
                      <span className="text-xl">{crop.icon}</span>
                      <span className="text-sm font-medium">{crop.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Soil Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  🏔️ Soil Type (मिट्टी का प्रकार)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {soilTypes.map((soil) => (
                    <button
                      key={soil}
                      onClick={() => setSelectedSoil(soil)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedSoil === soil
                          ? "border-primary bg-primary/10 shadow-soft"
                          : "border-border hover:border-primary/50 bg-background"
                      }`}
                    >
                      {selectedSoil === soil && <Check className="w-4 h-4 text-primary" />}
                      <span className="text-sm font-medium">{soil}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                variant="hero"
                size="xl"
                className="w-full mt-4"
                onClick={handleSubmit}
                disabled={!selectedState || !selectedCrop || !selectedSoil}
              >
                Get Machinery Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSelector;
