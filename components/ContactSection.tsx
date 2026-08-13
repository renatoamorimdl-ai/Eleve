"use client";

import { useMemo, useState } from "react";
import siteData from "@/data.json";
import Button from "./Button";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const whatsappHref = useMemo(() => {
    const fallbackHref = siteData.contact.form.whatsappUrl;
    const defaultText = [
      "Olá, vim pelo site e gostaria de solicitar um orçamento.",
      name ? `Nome: ${name}` : "",
      phone ? `Telefone: ${phone}` : "",
      message ? `Mensagem: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const url = new URL(fallbackHref);
      url.searchParams.set("text", defaultText);
      return url.toString();
    } catch {
      return fallbackHref;
    }
  }, [message, name, phone]);

  const handleSubmitClick = () => {
    if (isSaving) return;
    if (!name && !phone && !message) return;

    setIsSaving(true);

    // Envia os dados para a planilha de leads sem bloquear a abertura do
    // WhatsApp, que continua acontecendo normalmente pelo href do botão.
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        message,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      }),
      keepalive: true,
    })
      .catch(() => {
        // Falha silenciosa: nunca deve impedir o usuário de falar no WhatsApp.
      })
      .finally(() => setIsSaving(false));
  };

  return (
    <section id={siteData.contact.sectionId} className="section-padding bg-[#f7f7f7]">
      <div className="site-container grid grid-cols-1 gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
        <article className="anim-left grid gap-5 border border-[#e0e3ea] bg-white p-5 md:p-7">
          <div>
            <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#006FAE]">
              {siteData.contact.eyebrow}
            </p>
            <h3 className="m-0 mt-2 text-[28px] font-bold uppercase tracking-[0.05em] text-[#121B73] md:text-[34px]">
              {siteData.contact.title}
            </h3>
          </div>

          <ul className="m-0 grid list-none gap-4 p-0">
            {siteData.contact.items.map((item) => (
              <li key={item.label} className="border-l-[3px] border-l-[#006FAE] bg-[#f3f4fb] px-3 py-2">
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#555866]">
                  {item.label}
                </span>
                <span className="mt-1 block text-[14px] font-semibold text-[#121B73]">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          <form className="grid gap-3">
            <p className="m-0 text-[12px] font-bold uppercase tracking-[0.12em] text-[#121B73]">
              {siteData.contact.form.title}
            </p>

            <label className="grid gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#555866]">
                {siteData.contact.form.nameLabel}
              </span>
              <input
                type="text"
                placeholder={siteData.contact.form.namePlaceholder}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-10 border border-[#d5d9e5] px-3 text-[14px] text-[#121B73] outline-none transition-colors focus:border-[#006FAE]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#555866]">
                {siteData.contact.form.phoneLabel}
              </span>
              <input
                type="tel"
                placeholder={siteData.contact.form.phonePlaceholder}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-10 border border-[#d5d9e5] px-3 text-[14px] text-[#121B73] outline-none transition-colors focus:border-[#006FAE]"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#555866]">
                {siteData.contact.form.messageLabel}
              </span>
              <textarea
                rows={4}
                placeholder={siteData.contact.form.messagePlaceholder}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="resize-y border border-[#d5d9e5] px-3 py-2 text-[14px] text-[#121B73] outline-none transition-colors focus:border-[#006FAE]"
              />
            </label>

            <Button
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSubmitClick}
              className="mt-1 w-full !min-h-[42px] !px-5 md:w-fit md:!min-h-[44px]"
            >
              {siteData.contact.form.buttonLabel}
            </Button>
          </form>
        </article>

        <article className="anim-right anim-delay-1 overflow-hidden border border-[#e0e3ea] bg-white">
          <div className="border-b border-b-[#e0e3ea] px-5 py-4 md:px-6">
            <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#006FAE]">
              {siteData.contact.locationTitle}
            </p>
            <p className="m-0 mt-1 text-[15px] font-semibold text-[#121B73]">
              {siteData.contact.locationText}
            </p>
          </div>

          <div className="h-[320px] w-full md:h-full md:min-h-[620px]">
            <iframe
              title={siteData.contact.mapTitle}
              src={siteData.contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
