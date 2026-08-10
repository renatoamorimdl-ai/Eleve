"use client";

import { useEffect, useRef } from "react";
import siteData from "@/data.json";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoScrollingRef = useRef(false);

  const stopAutoPlay = () => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  };

  const startAutoPlay = () => {
    if (autoTimerRef.current) return;

    autoTimerRef.current = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      const firstCard = track.querySelector<HTMLElement>("[data-review-card='true']");
      const step = (firstCard?.offsetWidth ?? track.clientWidth * 0.82) + 16;
      const maxLeft = track.scrollWidth - track.clientWidth;
      const nextLeft = track.scrollLeft + step >= maxLeft - 4 ? 0 : track.scrollLeft + step;

      isAutoScrollingRef.current = true;
      track.scrollTo({ left: nextLeft, behavior: "smooth" });

      window.setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 550);
    }, 3200);
  };

  const pauseAndResumeAutoPlay = () => {
    stopAutoPlay();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      startAutoPlay();
    }, 6000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  return (
    <section id={siteData.testimonials.sectionId} className="section-padding bg-white">
      <div className="hidden site-container md:grid md:grid-cols-3 md:gap-5">
        {siteData.testimonials.items.map((item, index) => (
          <div key={item.name} className={`anim-rise anim-delay-${Math.min(index + 1, 4)}`}>
            <TestimonialCard
              initials={item.initials}
              name={item.name}
              source={siteData.testimonials.source}
              rating={item.rating}
              text={item.text}
              date={item.date}
              reviewUrl={item.reviewUrl}
            />
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <div
          ref={trackRef}
          className="reviews-scrollbar site-container -mr-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-6"
          onTouchStart={pauseAndResumeAutoPlay}
          onMouseDown={pauseAndResumeAutoPlay}
          onWheel={pauseAndResumeAutoPlay}
          onScroll={() => {
            if (isAutoScrollingRef.current) return;
            pauseAndResumeAutoPlay();
          }}
        >
          {siteData.testimonials.items.map((item) => (
            <div
              key={`mobile-${item.name}`}
              data-review-card="true"
              className="anim-rise w-[82vw] min-w-[82vw] snap-center"
            >
              <TestimonialCard
                initials={item.initials}
                name={item.name}
                source={siteData.testimonials.source}
                rating={item.rating}
                text={item.text}
                date={item.date}
                reviewUrl={item.reviewUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
