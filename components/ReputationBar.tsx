import siteData from "@/data.json";

function Stars() {
  return (
    <div className="inline-flex gap-[2px]" aria-label={siteData.reputation.ariaRating}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path
            d="M12 2.5L14.9 8.5L21.5 9.4L16.7 14L17.9 20.5L12 17.3L6.1 20.5L7.3 14L2.5 9.4L9.1 8.5L12 2.5Z"
            fill="#FFB400"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ReputationBar() {
  return (
    <section className="bg-[#121B73] py-8 md:py-10">
      <div className="site-container grid grid-cols-[1fr_auto] items-center gap-5">
        <div className="anim-left">
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
            {siteData.reputation.eyebrow}
          </p>
          <p className="m-0 mt-2 max-w-[46ch] text-[14px] leading-7 text-white/80 md:text-[15px]">
            {siteData.reputation.description}
          </p>
        </div>

        <div className="anim-right anim-delay-1 grid justify-items-end gap-1">
          <strong className="text-[44px] leading-none text-white">{siteData.reputation.score}</strong>
          <Stars />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
            {siteData.reputation.label}
          </span>
        </div>
      </div>
    </section>
  );
}
