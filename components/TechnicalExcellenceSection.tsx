import Image from "next/image";
import siteData from "@/data.json";

export default function TechnicalExcellenceSection() {
  return (
    <section id={siteData.technicalExcellence.sectionId} className="section-padding overflow-hidden bg-white">
      <div className="site-container grid grid-cols-1 gap-8 md:grid-cols-[1.02fr_0.98fr] md:items-stretch md:gap-7">
        <article className="anim-left">
          <span className="mb-4 block h-[4px] w-16 bg-[#006FAE]" aria-hidden="true" />
          <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#006FAE]">
            {siteData.technicalExcellence.eyebrow}
          </p>
          <h3 className="m-0 mt-2 text-[26px] font-semibold uppercase tracking-[0.06em] text-[#121B73] md:text-[34px]">
            {siteData.technicalExcellence.title}
          </h3>

          <p className="mb-3 mt-5 text-[15px] leading-8 text-[#555866] md:text-[16px]">
            {siteData.technicalExcellence.paragraph1}
          </p>
          <p className="m-0 text-[15px] leading-8 text-[#555866] md:text-[16px]">
            {siteData.technicalExcellence.paragraph2}
          </p>

          <ul className="mt-8 grid list-none gap-4 p-0">
            {siteData.technicalExcellence.points.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#006FAE] text-xs font-bold text-white">
                  {siteData.technicalExcellence.checkSymbol}
                </span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1e2b48]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <div className="anim-right anim-delay-1 grid h-[250px] max-h-[250px] grid-cols-[minmax(0,1.7fr)_minmax(0,0.45fr)_minmax(0,0.45fr)] gap-2 self-start overflow-hidden sm:h-[300px] sm:max-h-[300px] md:h-[430px] md:max-h-[430px] md:gap-4 lg:h-[470px] lg:max-h-[470px] xl:h-[500px] xl:max-h-[500px]">
          {siteData.technicalExcellence.images.map((image) => (
            <div key={image.src} className="h-full overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="!h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
