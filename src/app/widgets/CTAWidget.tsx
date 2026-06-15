import { ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function CTAWidget() {
  return (
    <section
      className="py-24 px-6 text-center"
      style={{ background: "linear-gradient(160deg, #fdf0f8 0%, #fff8f5 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <p
          className="text-5xl mb-4"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#c8896a" }}
        >
          Your story deserves a beautiful home
        </p>
        <p className="text-stone-500 mb-8">
          Join hundreds of couples and families who chose MemoryPage for their special day.
        </p>
        <PrimaryButton href="/templates" size="lg">
          Create Your Website <ArrowRight size={16} />
        </PrimaryButton>
      </div>
    </section>
  );
}
