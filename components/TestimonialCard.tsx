import siteData from "@/data.json";

type TestimonialCardProps = {
  initials: string;
  name: string;
  source: string;
  rating: number;
  text: string;
  date: string;
  reviewUrl: string;
};

function Stars({ rating }: { rating: number }) {
  const ariaLabel = siteData.testimonials.ariaRatingTemplate.replace("{rating}", String(rating));

  return (
    <div className="inline-flex gap-[2px]" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path
            d="M12 2.5L14.9 8.5L21.5 9.4L16.7 14L17.9 20.5L12 17.3L6.1 20.5L7.3 14L2.5 9.4L9.1 8.5L12 2.5Z"
            fill={index < rating ? "#FFB400" : "#d3d7e0"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({
  initials,
  name,
  source,
  rating,
  text,
  date,
  reviewUrl,
}: TestimonialCardProps) {
  const openReviewAriaLabel = siteData.testimonials.ariaOpenReviewTemplate.replace("{name}", name);

  return (
    <article className="review-card relative grid gap-3 p-5 pb-12 md:p-6 md:pb-12">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center bg-[#121B73] text-[14px] font-bold tracking-[0.08em] text-white">
          {initials}
        </div>
        <div className="flex flex-col">
          <strong className="text-[15px] text-[#121B73]">{name}</strong>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#555866]">
              {source}
            </span>
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[conic-gradient(from_45deg,#4285f4_0deg_90deg,#34a853_90deg_180deg,#fbbc05_180deg_270deg,#ea4335_270deg_360deg)] text-[10px] font-bold text-white">
              {siteData.testimonials.googleBadgeLetter}
            </span>
          </div>
        </div>
      </div>

      <Stars rating={rating} />
      <p className="m-0 text-[15px] leading-8 text-[#555866]">{text}</p>
      <p className="m-0 text-[13px] italic text-[#555866]">{date}</p>

      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={openReviewAriaLabel}
        className="absolute bottom-4 right-4 inline-flex h-8 w-8 items-center justify-center border border-[#006FAE] text-[#006FAE] transition-colors duration-200 hover:bg-[#006FAE] hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            d="M7 17L17 7M9 7H17V15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </article>
  );
}
