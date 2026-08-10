type SectionHeroProps = {
  eyebrow: string;
  title: string;
  flat?: boolean;
};

export default function SectionHero({ eyebrow, title, flat = false }: SectionHeroProps) {
  return (
    <section
      className={`section-hero min-h-[230px] md:min-h-[250px] ${
        flat ? "section-hero-flat" : ""
      }`}
    >
      <div className="site-container section-hero-content flex min-h-[230px] items-center py-10 md:min-h-[250px] md:py-12">
        <div className="max-w-[760px]">
          <p className="anim-left m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 md:text-[12px]">
            {eyebrow}
          </p>
          <h2 className="anim-left anim-delay-1 m-0 mt-3 text-[34px] font-extrabold uppercase tracking-[0.06em] text-white md:text-[56px] md:leading-[1.02]">
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
}
