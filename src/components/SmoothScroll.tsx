"use client";
import { useEffect, useRef, type ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let smoother: { kill: () => void } | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.4,
        effects: true,
      });
    })();

    return () => { smoother?.kill(); };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper" style={{ overflow: "hidden", height: "100vh", position: "fixed", width: "100%", top: 0, left: 0 }}>
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
