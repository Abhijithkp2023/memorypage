"use client";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import OutlineButton from "@/components/ui/OutlineButton";
import slides from "@/data/heroSlides.json";

export default function HeroWidget() {
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // the rounded box that scales
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = () => (window as any).gsap as any;

  const runTransition = (prev: number, next: number) => {
    const gsap = g();
    if (!gsap || !containerRef.current) return;

    const prevSlide = slideRefs.current[prev];
    const nextSlide = slideRefs.current[next];
    const box = containerRef.current;

    gsap.killTweensOf([box, bgRef.current]);

    const tl = gsap.timeline();

    // 1. Container falls down (border-radius preserved throughout)
    tl.to(box, {
      y: "108%",
      opacity: 0,
      duration: 0.7,
      ease: "power3.in",
    });

    // 2. Swap the image at the bottom (invisible)
    tl.call(() => {
      if (prevSlide) gsap.set(prevSlide, { opacity: 0, zIndex: 1 });
      if (nextSlide) gsap.set(nextSlide, { opacity: 1, zIndex: 10 });
      gsap.set(box, { y: "0%", scale: 0.65, opacity: 0 });
    });

    // 3. Container scales back in with new image
    tl.to(box, {
      scale: 1,
      opacity: 1,
      duration: 0.75,
      ease: "power2.out",
    });

    // 4. Background colour at midway
    tl.to(bgRef.current, {
      backgroundColor: slides[next].color,
      duration: 0.5,
      ease: "power1.inOut",
    }, 0.6);
  };

  // Load gsap script
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).gsap) return;
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    document.head.appendChild(s);
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      const prev = activeRef.current;
      const next = (prev + 1) % slides.length;
      activeRef.current = next;
      runTransition(prev, next);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={bgRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: slides[0].color }}
    >
      <div
        className="max-w-350 mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* Left — text */}
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-10 text-stone-900 leading-tight">
            Create your{" "}
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.15em", color: "#c8896a" }}>
              perfect
            </span>
            <br />
            event website
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <PrimaryButton href="/templates" size="lg">
              Browse Templates <ArrowRight size={16} />
            </PrimaryButton>
            <OutlineButton href="/w/demo-wedding" size="lg">
              View Demo Site
            </OutlineButton>
          </div>
        </div>

        {/* Right — the container scales/falls as one unit */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-3xl shadow-2xl"
          style={{ aspectRatio: "16/9" }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              ref={(el) => { slideRefs.current[i] = el; }}
              className="absolute inset-0 w-full h-full"
              style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 10 : 1 }}
            >
              <img
                src={slide.image}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
