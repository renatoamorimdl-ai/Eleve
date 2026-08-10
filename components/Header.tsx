"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "@/data.json";
import Button from "./Button";

const NAV_ITEMS = siteData.header.navItems;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(siteData.header.brand.href);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sectionHrefs = NAV_ITEMS.map((item) => item.href).filter(
      (href) => href !== siteData.header.brand.href
    );

    const handleScroll = () => {
      // Efeito de sombra/blur no header
      setScrolled(window.scrollY > 20);

      // Scroll Spy logic
      const marker = window.scrollY + 120;
      let current = siteData.header.brand.href;

      for (const href of sectionHrefs) {
        const section = document.querySelector(href) as HTMLElement | null;
        if (!section) continue;
        if (section.offsetTop <= marker) current = href;
      }
      setActiveHref(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-[#EEE7E1]/80 backdrop-blur-md shadow-sm h-[60px] md:h-[80px]" 
          : "bg-[#EEE7E1] h-[70px] md:h-[100px]"
      } border-b border-[#d8d1cb]/50`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo Area */}
        <div className="flex lg:flex-1">
          <a href={siteData.header.brand.href} className="-m-1.5 p-1.5 transition-transform hover:scale-105">
            <Image
              src={siteData.header.brand.logoSrc}
              alt={siteData.header.brand.logoAlt}
              width={180}
              height={50}
              className="h-8 w-auto md:h-10"
              priority
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:gap-x-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="relative">
              <a
                href={item.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-[#006FAE] ${
                  activeHref === item.href ? "text-[#006FAE]" : "text-[#2f445d]"
                }`}
              >
                {item.label}
              </a>
              {activeHref === item.href && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-[22px] left-0 h-[3px] w-full bg-[#006FAE]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* CTA & Mobile Toggle */}
        <div className="flex flex-1 justify-end items-center gap-4">
          <Button
            href={siteData.header.cta.href}
            className="!hidden lg:!inline-flex items-center rounded-none bg-[#0073B1] px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#2f445d] hover:shadow-xl active:scale-95"
          >
            {siteData.header.cta.line1} {siteData.header.cta.line2}
          </Button>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen(!open)}
          >
            <span className={`h-0.5 w-6 bg-[#006FAE] transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-[#006FAE] transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-[#006FAE] transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[#d8d1cb] bg-[#EEE7E1] md:hidden"
          >
            <ul className="space-y-4 px-6 py-8">
              {NAV_ITEMS.map((item) => (
                <li key={`mobile-${item.label}`}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block text-lg font-bold uppercase tracking-widest ${
                      activeHref === item.href ? "text-[#006FAE]" : "text-[#2f445d]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <div className="pt-4">
                 <Button href={siteData.header.cta.href} className="w-full justify-center !min-h-[34px] !px-4 text-[11px] bg-[#0073B1] text-white">
                    {siteData.header.cta.line1}
                 </Button>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
