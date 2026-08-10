import Image from "next/image";
import Button from "./Button";

type ServiceCardProps = {
  image: string;
  title: string;
  description: string;
  capacityLabel?: string;
  capacityValue?: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
};

export default function ServiceCard({
  image,
  title,
  description,
  capacityLabel,
  capacityValue,
  ctaLabel,
  ctaHref,
  className = "",
}: ServiceCardProps) {
  return (
    <article className={`service-card flex h-full flex-col ${className}`.trim()}>
      <Image
        src={image}
        alt={title}
        width={760}
        height={420}
        className="h-[220px] w-full border-b border-b-[#E0E3EA] object-cover"
      />

      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="m-0 text-[18px] font-bold leading-7 text-[#121B73]">{title}</h3>
        </div>

        <p className="m-0 text-[14px] leading-7 text-[#555866]">{description}</p>

        {capacityLabel && capacityValue ? (
          <div className="w-fit max-w-full border-l-[3px] border-l-[#121B73] bg-[#f3f4fb] px-3 py-2">
            <span className="block text-[10px] font-bold uppercase tracking-[0.09em] text-[#555866]/85">
              {capacityLabel}
            </span>
            <span className="block text-[12px] font-bold uppercase tracking-[0.08em] text-[#121B73]">
              {capacityValue}
            </span>
          </div>
        ) : null}

        <Button
          href={ctaHref}
          fullWidth
          className="min-h-[42px] text-[11px] tracking-[0.1em] transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90"
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
