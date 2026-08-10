import Image from "next/image";
import siteData from "@/data.json";

export default function FooterSection() {
  const year = String(new Date().getFullYear());
  const copyrightText = siteData.footer.copyrightTemplate.replace("{year}", year);

  return (
    <footer className="bg-[#121B73] py-8 text-[#EAF0FF] md:py-10">
      <div className="site-container grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6">
        <a href={siteData.footer.brandHref} className="anim-left w-fit" aria-label={siteData.footer.brandLabel}>
          <Image
            src={siteData.footer.brandLogoSrc}
            alt={siteData.footer.brandAlt}
            width={340}
            height={92}
            className="h-auto w-[130px] object-contain brightness-0 invert"
          />
        </a>

        <nav aria-label={siteData.footer.navAriaLabel} className="anim-rise anim-delay-1">
          <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-2 p-0 md:flex md:items-center md:justify-center md:gap-6">
            {siteData.footer.links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-[#CFE0FF]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="anim-right anim-delay-2 grid gap-1 text-[11px] md:justify-items-end">
          <span className="font-semibold uppercase tracking-[0.12em] text-white">
            {siteData.footer.attendanceText}
          </span>
          <span className="text-[#DCE7FF]">{siteData.footer.whatsappText}</span>
          <a
            href={siteData.footer.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={siteData.footer.instagram.ariaLabel}
            className="mt-1 inline-flex items-center gap-2 text-[#DCE7FF] transition-colors hover:text-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>{siteData.footer.instagram.handle}</span>
          </a>
        </div>
      </div>

      <div className="anim-rise anim-delay-3 site-container mt-6 grid gap-2 border-t border-t-white/20 pt-4 text-[10px] uppercase tracking-[0.1em] text-[#DCE7FF] md:grid-cols-[1fr_auto] md:items-center">
        <p className="m-0">{copyrightText}</p>
        <a
          href={siteData.footer.developerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="m-0 justify-self-start text-white transition-colors hover:text-[#CFE0FF] md:justify-self-end"
        >
          {siteData.footer.developerLabel}
        </a>
      </div>
    </footer>
  );
}
