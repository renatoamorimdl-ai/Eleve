import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  href,
  ...restProps
}: ButtonProps) {
  const variantClasses =
    variant === "primary" ? "btn-primary" : "btn-outline";
  const normalizedHref = typeof href === "string" ? href.toLowerCase() : "";
  const isWhatsApp = normalizedHref.includes("wa.me") || normalizedHref.includes("whatsapp");
  const trackType = isWhatsApp ? "whatsapp_click" : "cta_click";

  return (
    <a
      className={`btn ${variantClasses} text-center whitespace-normal break-words ${
        fullWidth ? "w-full" : ""
      } ${className}`.trim()}
      href={href}
      data-track-click={trackType}
      {...restProps}
    >
      {children}
      
    </a>
  );
}

