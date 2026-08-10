"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import siteData from "@/data.json";
import Button from "./Button";

function BrandBlock() {
  return (
    <div className="mx-auto flex w-full justify-center md:mx-0 md:w-auto md:justify-start">
      <Image
        src={siteData.hero.brandLogoSrc}
        alt={siteData.hero.brandLogoAlt}
        width={484}
        height={277}
        className="mx-auto h-auto w-[220px] object-contain md:mx-0 md:w-[360px]"
        priority
      />
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(
        ".hero-anim-slab, .hero-anim-image, .hero-anim-brand, .hero-anim-copy, .hero-anim-cta",
      ),
    );
    if (!targets.length) return;

    targets.forEach((target) => target.classList.remove("anim-in-view"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("anim-in-view"));
      return;
    }

    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        targets.forEach((target) => target.classList.add("anim-in-view"));
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
      targets.forEach((target) => target.classList.remove("anim-in-view"));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-anim-root relative overflow-hidden bg-[#f7f7f7] px-0 pb-8 pt-3 md:min-h-[86vh] md:bg-[#121B73] md:pt-0"
    >
      <div
        className="hero-anim-slab pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[65%] bg-[#f4f4f4] md:block [clip-path:polygon(0_0,84%_0,69%_100%,0_100%)]"
        aria-hidden="true"
      />

      <div className="site-container relative z-10 grid grid-cols-1 items-center md:min-h-[calc(86vh-70px)] md:grid-cols-[1.05fr_0.95fr] md:gap-4">
        <div className="order-2 mx-auto flex w-full max-w-[440px] flex-col items-center md:order-1 md:mx-0 md:max-w-[640px] md:items-start">
          <div className="hero-anim-brand">
            <BrandBlock />
          </div>

          <div className="hero-anim-copy mx-auto mt-5 flex w-full max-w-[390px] items-stretch gap-4 md:mx-0 md:mt-8 md:w-auto md:max-w-[44ch]">
            <span className="w-[3px] min-w-[3px] bg-[#006FAE] md:w-[2px] md:min-h-[78px]" aria-hidden="true" />
            <p className="m-0 text-left text-[14px] italic leading-[1.58] md:text-[18px] md:leading-[1.65]">
              {siteData.hero.description}
            </p>
          </div>

          <div className="hero-anim-cta mx-auto mt-5 grid w-full max-w-[390px] grid-cols-2 gap-[10px] md:mx-0 md:mt-8 md:flex md:w-auto md:max-w-none md:grid-cols-none md:gap-3">
            <Button
              href={siteData.hero.ctaPrimary.href}
              fullWidth
              className="md:!min-h-[44px] md:w-auto md:!px-6 md:!text-[12px] md:whitespace-nowrap"
            >
              {siteData.hero.ctaPrimary.label}
            </Button>
            <Button
              href={siteData.hero.ctaSecondary.href}
              variant="outline"
              fullWidth
              className="md:!min-h-[44px] md:w-auto md:!px-6 md:!text-[12px] md:whitespace-nowrap"
            >
              {siteData.hero.ctaSecondary.label}
            </Button>
          </div>
        </div>

        <div className="order-1 relative mx-auto mb-3 w-[105vw] max-w-[560px] translate-x-[-22%] md:order-2 md:mb-0 md:w-[58vw] md:max-w-[1020px] md:justify-self-end md:-translate-x-[7%]">
          <div className="hero-anim-image">
            <Image
              src={siteData.hero.imageSrc}
              alt={siteData.hero.imageAlt}
              width={1120}
              height={630}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
