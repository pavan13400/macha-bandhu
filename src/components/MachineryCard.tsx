import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Fuel, Gauge, Wrench, Calendar } from "lucide-react";

interface MachineryCardProps {
  name: string;
  nameHindi: string;
  image: string;
  category: string;
  rating: number;
  price: string;
  specs: {
    power: string;
    fuelType: string;
    suitableFor: string;
  };
  isRecommended?: boolean;
  onBook: () => void;
}

const MachineryCard = ({
  name,
  nameHindi,
  image,
  category,
  rating,
  price,
  specs,
  isRecommended,
  onBook,
}: MachineryCardProps) => {
  return (
    <div className={`group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 ${isRecommended ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}>
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="hero-gradient text-primary-foreground font-semibold px-3 py-1">
            ⭐ AI Recommended
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{nameHindi}</p>

        {/* Specs */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gauge className="w-4 h-4 text-primary" />
            <span>{specs.power}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4 text-primary" />
            <span>{specs.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wrench className="w-4 h-4 text-primary" />
            <span>{specs.suitableFor}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Rental from</p>
            <p className="text-lg font-bold text-primary">{price}</p>
          </div>
          <Button variant={isRecommended ? "hero" : "default"} onClick={onBook}>
            <Calendar className="w-4 h-4" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MachineryCard;
