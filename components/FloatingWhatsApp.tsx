"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import siteData from "@/data.json";

const formCopy = siteData.contact.form.floating;

function buildWhatsAppHref(name: string, phone: string) {
  const fallbackHref = siteData.contact.form.whatsappUrl;
  const text = [
    "Olá, vim pelo site e gostaria de solicitar um orçamento.",
    `Nome: ${name}`,
    `Telefone: ${phone}`,
  ].join("\n");

  try {
    const url = new URL(fallbackHref);
    url.searchParams.set("text", text);
    return url.toString();
  } catch {
    return fallbackHref;
  }
}

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const nameInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    nameInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const nextErrors: { name?: string; phone?: string } = {};

    if (cleanName.length < 2) nextErrors.name = formCopy.nameError;
    if (cleanPhone.replace(/\D/g, "").length < 10) nextErrors.phone = formCopy.phoneError;

    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;

    // Grava o lead na planilha sem bloquear a abertura do WhatsApp.
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cleanName,
        phone: cleanPhone,
        message: formCopy.leadMessage,
        pageUrl: window.location.href,
      }),
      keepalive: true,
    }).catch(() => {
      // Falha silenciosa: nunca deve impedir o usuário de falar no WhatsApp.
    });

    // Evento do GTM disparado no momento em que o WhatsApp realmente abre
    // (mesmo evento usado pelo botão "Enviar mensagem" do formulário).
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      click_url: buildWhatsAppHref(cleanName, cleanPhone),
      click_text: "Botão flutuante - envio do formulário",
    });

    // window.open precisa acontecer dentro do clique para não ser bloqueado.
    window.open(buildWhatsAppHref(cleanName, cleanPhone), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Falar no WhatsApp"
        aria-haspopup="dialog"
        data-track-click="whatsapp_float_open"
        className="whatsapp-float"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-[22px] w-[22px]"
          fill="currentColor"
        >
          <path d="M16.006 3C8.832 3 3 8.74 3 15.808c0 2.233.586 4.414 1.7 6.337L3 29l7.137-1.66a13.085 13.085 0 0 0 5.87 1.383h.005c7.173 0 12.995-5.74 12.995-12.808C29.007 8.74 23.18 3 16.006 3Zm0 23.555h-.004a10.908 10.908 0 0 1-5.56-1.52l-.4-.238-4.236.986.993-4.116-.26-.42a10.67 10.67 0 0 1-1.64-5.632c0-5.879 4.85-10.662 10.81-10.662 5.958 0 10.806 4.783 10.806 10.662 0 5.878-4.848 10.66-10.809 10.66Zm5.926-8.02c-.324-.159-1.918-.942-2.215-1.05-.297-.108-.513-.16-.73.16-.216.319-.837 1.05-1.026 1.266-.19.216-.378.243-.703.081-.324-.16-1.372-.498-2.614-1.587-.967-.848-1.62-1.895-1.81-2.214-.189-.318-.02-.49.142-.648.146-.142.324-.368.487-.552.162-.184.216-.318.324-.53.108-.212.054-.398-.027-.557-.081-.16-.729-1.742-.999-2.386-.262-.628-.53-.543-.73-.554-.188-.01-.405-.012-.621-.012-.216 0-.568.08-.865.399-.297.318-1.135 1.103-1.135 2.688 0 1.584 1.162 3.115 1.324 3.33.162.216 2.285 3.632 5.66 4.946.804.31 1.431.496 1.92.635.807.229 1.541.197 2.122.12.647-.086 1.918-.782 2.188-1.536.27-.753.27-1.399.189-1.536-.08-.135-.297-.216-.621-.376Z" />
        </svg>
        <span>WhatsApp</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 md:items-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[400px] border border-[#e0e3ea] bg-white p-5 shadow-2xl md:p-6"
          >
            <h3
              id={titleId}
              className="m-0 text-[22px] font-bold uppercase tracking-[0.05em] text-[#121B73]"
            >
              {formCopy.title}
            </h3>
            <p className="m-0 mt-2 text-[13px] text-[#555866]">{formCopy.subtitle}</p>

            <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-3">
              <label className="grid gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#555866]">
                  {siteData.contact.form.nameLabel}
                </span>
                <input
                  ref={nameInputRef}
                  type="text"
                  autoComplete="name"
                  placeholder={siteData.contact.form.namePlaceholder}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className="h-10 border border-[#d5d9e5] px-3 text-[14px] text-[#121B73] outline-none transition-colors focus:border-[#006FAE]"
                />
                {errors.name && <span className="text-[12px] text-[#b3261e]">{errors.name}</span>}
              </label>

              <label className="grid gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#555866]">
                  {siteData.contact.form.phoneLabel}
                </span>
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={siteData.contact.form.phonePlaceholder}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  className="h-10 border border-[#d5d9e5] px-3 text-[14px] text-[#121B73] outline-none transition-colors focus:border-[#006FAE]"
                />
                {errors.phone && <span className="text-[12px] text-[#b3261e]">{errors.phone}</span>}
              </label>

              <button
                type="submit"
                className="btn btn-primary mt-1 w-full !min-h-[44px] text-center"
              >
                {formCopy.buttonLabel}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="min-h-[36px] cursor-pointer border-0 bg-transparent text-[12px] font-semibold uppercase tracking-[0.1em] text-[#555866] hover:text-[#121B73]"
              >
                {formCopy.cancelLabel}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
