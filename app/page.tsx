import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SectionHero from "@/components/SectionHero";
import TechnicalExcellenceSection from "@/components/TechnicalExcellenceSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReputationBar from "@/components/ReputationBar";
import EleveInActionSection from "@/components/EleveInActionSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import siteData from "@/data.json";

export default function Home() {
  const [servicesHero, technicalHero, testimonialsHero, contactHero] = siteData.home.sectionHeroes;
  const actionHero = siteData.actionGallery;

  return (
    <div className="bg-white">
      <Header />
      <main>
        <HeroSection />
        <SectionHero eyebrow={servicesHero.eyebrow} title={servicesHero.title} />
        <ServicesSection />
        <SectionHero eyebrow={technicalHero.eyebrow} title={technicalHero.title} />
        <TechnicalExcellenceSection />
        <SectionHero eyebrow={testimonialsHero.eyebrow} title={testimonialsHero.title} />
        <TestimonialsSection />
        <SectionHero eyebrow={actionHero.eyebrow} title={actionHero.title} />
        <EleveInActionSection />
        <ReputationBar />
        <SectionHero eyebrow={contactHero.eyebrow} title={contactHero.title} />
        <ContactSection />
      </main>
      <FooterSection />
      <FloatingWhatsApp />
    </div>
  );
}
