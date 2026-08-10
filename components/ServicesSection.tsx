import siteData from "@/data.json";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section id={siteData.services.sectionId} className="section-padding bg-white">
      <div className="site-container grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-5">
        {siteData.services.items.map((service, index) => (
          <ServiceCard
            key={service.title}
            image={service.image}
            title={service.title}
            description={service.description}
            capacityLabel={service.capacityLabel}
            capacityValue={service.capacityValue}
            ctaLabel={siteData.services.cardCtaLabel}
            ctaHref={siteData.services.contactHref}
            className={index % 2 === 0 ? "anim-left" : "anim-right"}
          />
        ))}
      </div>
    </section>
  );
}
