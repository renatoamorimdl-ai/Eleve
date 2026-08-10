"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import siteData from "@/data.json";

const AUTOPLAY_MS = 3800;

export default function EleveInActionSection() {
  const slides = siteData.actionGallery.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
        return;
      }
      if (window.innerWidth < 1100) {
        setCardsPerView(2);
        return;
      }
      setCardsPerView(3);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, slides.length - cardsPerView),
    [slides.length, cardsPerView],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const safeCurrent = Math.min(current, maxIndex);
        return safeCurrent >= maxIndex ? 0 : safeCurrent + 1;
      });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [maxIndex]);

  const goPrev = () => {
    setActiveIndex((current) => {
      const safeCurrent = Math.min(current, maxIndex);
      return safeCurrent <= 0 ? maxIndex : safeCurrent - 1;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      const safeCurrent = Math.min(current, maxIndex);
      return safeCurrent >= maxIndex ? 0 : safeCurrent + 1;
    });
  };

  const visibleIndex = Math.min(activeIndex, maxIndex);
  const translatePercent = (visibleIndex * 100) / cardsPerView;

  return (
    <section id={siteData.actionGallery.sectionId} className="section-padding bg-[#f7f7f7]">
      <div className="site-container">
        <div className="mx-auto max-w-[920px] text-center">
          <p className="anim-rise m-0 text-[14px] leading-7 text-[#555866] md:text-[16px] md:leading-8">
            {siteData.actionGallery.subtitle}
          </p>
        </div>

        <div className="anim-rise anim-delay-1 mt-8">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(-${translatePercent}%, 0, 0)` }}
            >
              {slides.map((item) => (
                <figure
                  key={item.src}
                  className="w-full shrink-0 px-2 md:px-2.5"
                  style={{ flexBasis: `${100 / cardsPerView}%` }}
                >
                  <div className="relative h-[250px] sm:h-[280px] md:h-[300px] lg:h-[320px]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"
                      className="object-cover object-[center_82%]"
                    />
                  </div>
                </figure>
              ))}
            </div>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Slide anterior"
              className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-[#0a64a6] text-white transition-colors hover:bg-[#09558d]"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Próximo slide"
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-[#0a64a6] text-white transition-colors hover:bg-[#09558d]"
            >
              ›
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {slides.map((item, index) => {
              const inView = index >= visibleIndex && index < visibleIndex + cardsPerView;
              return (
                <p
                  key={item.caption}
                  className={`m-0 border-l-2 pl-3 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                    inView ? "border-l-[#0a64a6] text-[#121B73]" : "border-l-[#c8d5e2] text-[#6c7283]"
                  }`}
                >
                  {item.caption}
                </p>
              );
            })}
          </div>
        </div>



        <div className="anim-rise anim-delay-3 mt-8 grid justify-items-center gap-3 text-center">
          <a
            href={siteData.contact.form.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track-click="whatsapp_click"
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 bg-[#0a64a6] px-6 text-center text-[12px] font-bold uppercase tracking-[0.08em] !text-white transition-all duration-200 hover:bg-[#09558d] md:w-auto"
          >
            <span className="!text-white">{siteData.actionGallery.ctaLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <p className="m-0 max-w-[720px] text-[12px] font-medium text-[#555866] md:text-[13px]">
            {siteData.actionGallery.ctaSupport}
          </p>
        </div>
      </div>
    </section>
  );
}
