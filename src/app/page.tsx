import Navbar from "@/components/Navbar";
import HeroWidget from "./widgets/HeroWidget";
import EventTypesWidget from "./widgets/EventTypesWidget";
import HowItWorksWidget from "./widgets/HowItWorksWidget";
import FeaturesPricingWidget from "./widgets/FeaturesPricingWidget";
import CTAWidget from "./widgets/CTAWidget";
import FooterWidget from "./widgets/FooterWidget";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroWidget />
      <EventTypesWidget />
      <HowItWorksWidget />
      <FeaturesPricingWidget />
      <CTAWidget />
      <FooterWidget />
    </div>
  );
}
